import styled from 'styled-components';
import { MouseEvent, MouseEventHandler, useEffect, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { accountAtom } from 'client/atom/accountAtom';
import { contextAtom, cursorSelector } from 'client/atom/canvasAtom';
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

const Board = () => {
  const game = useRecoilValue(gameAtom);
  const currentRoom = useRecoilValue(currentRoomSelector);
  const account = useRecoilValue(accountAtom);
  const isPainter = useRecoilValue(isPainterSelector);
  const cursor = useRecoilValue(cursorSelector);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [ctx, setCtx] = useRecoilState(contextAtom);
  const [isDown, setDown] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.lineWidth = 2;

    setCtx(context);
  }, []);

  useEffect(() => {
    socket.on(
      'canvas/update',
      () => account.id === currentRoom.users[0].id && socket.emit('canvas/draw', canvasRef.current.toDataURL())
    );
    return () => {
      socket.off('canvas/update');
    };
  }, [currentRoom]);

  const mouseDownHandler = ({ nativeEvent }: MouseEvent): MouseEventHandler => {
    if (!ctx) return;
    setDown(true);
    ctx.beginPath();
    ctx.moveTo(nativeEvent.offsetX, nativeEvent.offsetY);
  };

  const draw = ({ nativeEvent }: MouseEvent): MouseEventHandler => {
    if (!ctx || !isDown || !isPainter || game?.status === 'WAITING') return;
    ctx.lineTo(nativeEvent.offsetX, nativeEvent.offsetY);
    ctx.stroke();
    socket.emit('canvas/draw', canvasRef.current.toDataURL());
  };

  return (
    <BoardWrapper>
      <Canvas
        width={CANVAS_SIZE}
        height={CANVAS_SIZE}
        onMouseMove={draw}
        onMouseDown={mouseDownHandler}
        onMouseUp={() => setDown(false)}
        onMouseLeave={() => setDown(false)}
        cursor={cursor}
        ref={canvasRef}
      />
    </BoardWrapper>
  );
};

export default Board;
