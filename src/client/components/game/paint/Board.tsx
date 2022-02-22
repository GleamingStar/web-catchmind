import styled from 'styled-components';
import { MouseEvent, MouseEventHandler, useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { contextAtom } from 'client/atom/canvasAtom';
import { CANVAS_SIZE } from 'shared/constant';

const BoardWrapper = styled.div`
  position: relative;
  width: 500px;
  height: 500px;
  background-color: #fff;
  border: 4px #cdb699 solid;
`;

const Board = () => {
  const canvasRef = useRef(null);

  const [ctx, setCtx] = useRecoilState(contextAtom);
  const [isDown, setDown] = useState(false);

  useEffect(() => {
    const canvas: HTMLCanvasElement = canvasRef.current;
    const context = canvas.getContext('2d');
    context.lineWidth = 2;

    setCtx(context);
  }, []);

  const draw = ({ nativeEvent }: MouseEvent): MouseEventHandler => {
    if (!ctx) return;
    const { offsetX, offsetY } = nativeEvent;
    if (!isDown) {
      ctx.beginPath();
      ctx.moveTo(offsetX, offsetY);
    } else {
      ctx.lineTo(offsetX, offsetY);
      ctx.stroke();
    }
  };

  return (
    <BoardWrapper>
      <canvas
        width={CANVAS_SIZE}
        height={CANVAS_SIZE}
        onMouseMove={draw}
        onMouseDown={() => setDown(true)}
        onMouseUp={() => setDown(false)}
        onMouseLeave={() => setDown(false)}
        ref={canvasRef}
      />
    </BoardWrapper>
  );
};

export default Board;
