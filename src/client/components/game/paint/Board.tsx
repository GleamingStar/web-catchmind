import styled from 'styled-components';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue, useRecoilValue_TRANSITION_SUPPORT_UNSTABLE } from 'recoil';
import { accountAtom } from 'client/atom/accountAtom';
import { colorAtom, contextAtom, cursorSelector, leftSpaceAtom, thicknessAtom, toolAtom } from 'client/atom/canvasAtom';
import { currentRoomSelector } from 'client/atom/roomAtom';
import { gameAtom, isPainterSelector } from 'client/atom/gameAtom';
import socket from 'client/config/socket';
import { CANVAS_SIZE } from 'shared/constant';

const BORDER = 4;

const BoardWrapper = styled.div`
  position: relative;
  width: 500px;
  height: 500px;
  background-color: #fff;
  border: ${BORDER}px #cdb699 solid;
`;
const Canvas = styled.canvas.attrs(({ cursor }: { cursor: string }) => ({
  style: {
    cursor: `url("${cursor}") 0 16, pointer`,
  },
}))<{ cursor: string }>``;

const Board = () => {
  const game = useRecoilValue(gameAtom);
  const currentRoom = useRecoilValue(currentRoomSelector);
  const account = useRecoilValue(accountAtom);
  const isPainter = useRecoilValue(isPainterSelector);
  const cursor = useRecoilValue(cursorSelector);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [ctx, setCtx] = useRecoilState(contextAtom);
  const leftSpace = useRecoilValue_TRANSITION_SUPPORT_UNSTABLE(leftSpaceAtom);
  const [tool, setTool] = useRecoilState(toolAtom);
  const [thickness, setThickness] = useRecoilState(thicknessAtom);
  const [color, setColor] = useRecoilState(colorAtom);
  const [location, setLocation] = useState({ x0: 0, y0: 0 });
  const [isDown, setDown] = useState(false);
  const [isThrottled, setThrottled] = useState(true);

  const isValid = ctx && isPainter && game?.status !== 'WAITING';

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    context.lineCap = 'round';
    setTool('pencil');
    setThickness(2);
    setColor('#000000');
    setCtx(context);
  }, []);

  const down = (x0: number, y0: number) => {
    setDown(true);
    ctx.moveTo(x0, y0);
    setLocation({ x0, y0 });
  };

  const up = () => setDown(false);

  const draw = useCallback(
    (x: number, y1: number) => {
      if (!isValid || !isDown || !isThrottled) return;

      setThrottled(false);

      const x1 = x - leftSpace;
      ctx.beginPath();
      ctx.moveTo(location.x0, location.y0);
      ctx.lineTo(x1, y1);
      ctx.globalCompositeOperation = tool === 'pencil' ? 'source-over' : 'destination-out';
      ctx.strokeStyle = color;
      ctx.lineWidth = thickness;
      ctx.stroke();
      ctx.closePath();
      socket.emit('canvas/draw', { tool, color, thickness, location: { ...location, x1, y1 } });
      setLocation({ x0: x1, y0: y1 });

      setTimeout(() => setThrottled(true), 10);
    },
    [ctx, isValid, leftSpace, isDown, tool, color, thickness, location, isThrottled]
  );

  const mouseMoveHandler = ({ pageX, pageY }: MouseEvent) => draw(pageX - BORDER, pageY - BORDER);
  const touchMoveHandler = ({ targetTouches }: TouchEvent) =>
    draw(targetTouches[0].pageX - BORDER, targetTouches[0].pageY - BORDER);

  useEffect(() => {
    window.addEventListener('mousemove', mouseMoveHandler);
    window.addEventListener('touchmove', touchMoveHandler);
    window.addEventListener('mouseup', up);
    window.addEventListener('touchend', up);

    return () => {
      window.removeEventListener('mousemove', mouseMoveHandler);
      window.removeEventListener('touchmove', touchMoveHandler);
      window.removeEventListener('mouseup', up);
      window.removeEventListener('touchend', up);
    };
  }, [draw]);

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

  return (
    <BoardWrapper>
      <Canvas
        width={CANVAS_SIZE}
        height={CANVAS_SIZE}
        onMouseDown={({ nativeEvent }) => isValid && down(nativeEvent.offsetX, nativeEvent.offsetY)}
        onTouchStart={({ targetTouches }) =>
          isValid && down(targetTouches[0].pageX - BORDER, targetTouches[0].pageY - BORDER)
        }
        cursor={cursor}
        ref={canvasRef}
      />
    </BoardWrapper>
  );
};

export default Board;
