import styled from 'styled-components';
import { MouseEvent, MouseEventHandler, useCallback, useEffect, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { accountAtom } from 'client/atom/accountAtom';
import { colorAtom, contextAtom, cursorSelector, thicknessAtom, toolAtom } from 'client/atom/canvasAtom';
import { currentRoomSelector } from 'client/atom/roomAtom';
import { gameAtom, isPainterSelector } from 'client/atom/gameAtom';
import socket from 'client/config/socket';
import { CANVAS_SIZE } from 'shared/constant';

const BoardWrapper = styled.div`
  position: relative;
  width: 500px;
  height: 500px;
  background-color: #fff;
  border: 4px #cdb699 solid;
`;
const Canvas = styled.canvas<{ cursor: string }>`
  cursor: url(${({ cursor }) => `"${cursor}"`}) 0 16, pointer;
`;

const throttle = (callback, delay) => {
  let previousCall = new Date().getTime();

  return (...args) => {
    const time = new Date().getTime();

    if (time - previousCall >= delay) {
      previousCall = time;
      callback(...args);
    }
  };
};

const Board = () => {
  const game = useRecoilValue(gameAtom);
  const currentRoom = useRecoilValue(currentRoomSelector);
  const account = useRecoilValue(accountAtom);
  const isPainter = useRecoilValue(isPainterSelector);
  const cursor = useRecoilValue(cursorSelector);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [location, setLocation] = useState({ x0: 0, y0: 0 });
  const [ctx, setCtx] = useRecoilState(contextAtom);
  const [tool, setTool] = useRecoilState(toolAtom);
  const [thickness, setThickness] = useRecoilState(thicknessAtom);
  const [color, setColor] = useRecoilState(colorAtom);
  const [isDown, setDown] = useState(false);

  const isValid = ctx && isPainter && game?.status !== 'WAITING';

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    context.lineCap = 'round';
    setTool('pencil');
    setThickness(2);
    setColor('black');
    setCtx(context);
  }, []);

  useEffect(() => {
    setDown(false);
  }, [isPainterSelector]);

  const update = useCallback(() => {
    account.id === currentRoom.users[0].id && socket.emit('canvas/update/response', canvasRef.current.toDataURL());
  }, [account, currentRoom.users]);

  useEffect(() => {
    socket.on('canvas/update/request', update);
    return () => {
      socket.off('canvas/update/request');
    };
  }, [update]);

  const mouseDownHandler = ({ nativeEvent }: MouseEvent): MouseEventHandler => {
    if (!isValid) return;
    const { offsetX, offsetY } = nativeEvent;
    setDown(true);
    ctx.beginPath();
    ctx.moveTo(offsetX, offsetY);
    setLocation({ x0: offsetX, y0: offsetY });
  };

  const mouseMoveHandler = ({ nativeEvent }: MouseEvent): MouseEventHandler => {
    if (!isValid || !isDown) return;
    const { offsetX, offsetY } = nativeEvent;
    ctx.moveTo(location.x0, location.y0);
    ctx.lineTo(offsetX, offsetY);
    ctx.globalCompositeOperation = tool === 'pencil' ? 'source-over' : 'destination-out';
    ctx.strokeStyle = color;
    ctx.lineWidth = thickness;
    ctx.stroke();
    socket.emit('canvas/draw', { tool, color, thickness, location: { ...location, x1: offsetX, y1: offsetY } });

    setLocation({ x0: offsetX, y0: offsetY });
  };

  const mouseUpHandler = ({ nativeEvent }: MouseEvent): MouseEventHandler => {
    if (!isDown) return;
    setDown(false);
    if (!isValid) return;
    const { offsetX, offsetY } = nativeEvent;
    ctx.moveTo(location.x0, location.y0);
    ctx.lineTo(offsetX, offsetY);
    ctx.globalCompositeOperation = tool === 'pencil' ? 'source-over' : 'destination-out';
    ctx.strokeStyle = color;
    ctx.lineWidth = thickness;
    ctx.stroke();
    socket.emit('canvas/draw', { tool, color, thickness, location: { ...location, x1: offsetX, y1: offsetY } });
  };

  return (
    <BoardWrapper>
      <Canvas
        width={CANVAS_SIZE}
        height={CANVAS_SIZE}
        onMouseMove={throttle(mouseMoveHandler, 10)}
        onMouseDown={mouseDownHandler}
        onMouseUp={mouseUpHandler}
        onMouseLeave={mouseUpHandler}
        cursor={cursor}
        ref={canvasRef}
      />
    </BoardWrapper>
  );
};

export default Board;
