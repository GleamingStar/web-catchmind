import styled from 'styled-components';
import { MouseEvent, MouseEventHandler, useEffect, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { contextAtom } from 'client/atom/canvasAtom';
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

const Board = () => {
  const game = useRecoilValue(gameAtom);
  const isPainter = useRecoilValue(isPainterSelector);
  const canvasRef = useRef(null);

  const [ctx, setCtx] = useRecoilState(contextAtom);
  const [isDown, setDown] = useState(false);

  useEffect(() => {
    const canvas: HTMLCanvasElement = canvasRef.current;
    const context = canvas.getContext('2d');
    context.lineWidth = 2;

    setCtx(context);
  }, []);

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
      <canvas
        width={CANVAS_SIZE}
        height={CANVAS_SIZE}
        onMouseMove={draw}
        onMouseDown={mouseDownHandler}
        onMouseUp={() => setDown(false)}
        onMouseLeave={() => setDown(false)}
        ref={canvasRef}
      />
    </BoardWrapper>
  );
};

export default Board;
