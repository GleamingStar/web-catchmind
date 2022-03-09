import styled from 'styled-components';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { BsArrowCounterclockwise, BsEraser, BsPalette, BsPencil } from 'react-icons/bs';
import { isPainterSelector } from 'client/atom/gameAtom';
import { colorAtom, contextAtom, toolAtom } from 'client/atom/canvasAtom';
import socket from 'client/config/socket';
import { CANVAS_SIZE, COLOR } from 'shared/constant';

const ToolWrapper = styled.div`
  position: absolute;
  left: 25px;
  bottom: 25px;
  width: 450px;
  height: 50px;
  border: 1px #cdb699 solid;
  border-radius: 10px;

  display: flex;
  justify-content: space-around;
  align-items: center;

  overflow: hidden;
`;
const IconWrapper = styled.div`
  color: #493323;
  display: flex;
  align-items: center;

  &:hover {
    filter: brightness(250%);
  }

  transition: filter 0.25s;

  cursor: pointer;
`;
const PaletteWrapper = styled.div`
  position: relative;
  width: 250px;
  height: 30px;
  border-radius: 10px;
  background-color: #e6ddc4;

  display: flex;
  justify-content: space-around;
  align-items: center;
`;
const Color = styled.div<{ color: string }>`
  width: 16px;
  height: 16px;
  background-color: ${({ color }) => color};
  border-radius: 50%;

  &:hover {
    filter: opacity(40%);
  }

  transition: filter 0.25s;

  cursor: pointer;
`;

const Tool = () => {
  const ctx = useRecoilValue(contextAtom);
  const setTool = useSetRecoilState(toolAtom);
  const isPainter = useRecoilValue(isPainterSelector);

  const setPencil = () => {
    setTool('pencil');
    ctx.lineWidth = 2;
    ctx.globalCompositeOperation = 'source-over';
  };

  const setEraser = () => {
    setTool('eraser');
    ctx.lineWidth = 16;
    ctx.globalCompositeOperation = 'destination-out';
  };

  const clickResetHandler = () => {
    if (!isPainter) return;
    ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    socket.emit('canvas/reset');
  };

  return (
    <ToolWrapper>
      <IconWrapper onClick={setPencil}>
        <BsPencil />
      </IconWrapper>
      <IconWrapper onClick={setEraser}>
        <BsEraser />
      </IconWrapper>
      <IconWrapper onClick={clickResetHandler}>
        <BsArrowCounterclockwise />
      </IconWrapper>
      <Palette />
    </ToolWrapper>
  );
};

const Palette = () => {
  const ctx = useRecoilValue(contextAtom);
  const setTool = useSetRecoilState(toolAtom);
  const [currentColor, setColor] = useRecoilState(colorAtom);

  return (
    <PaletteWrapper>
      <BsPalette fill={currentColor} />
      {COLOR.map((color) => (
        <Color
          key={color}
          color={color}
          onClick={() => {
            setTool('pencil');
            setColor(color);
            ctx.lineWidth = 2;
            ctx.globalCompositeOperation = 'source-over';
            ctx.strokeStyle = color;
          }}
        />
      ))}
    </PaletteWrapper>
  );
};

export default Tool;
