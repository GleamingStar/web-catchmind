import styled from 'styled-components';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { BsArrowCounterclockwise, BsEraser, BsPencil } from 'react-icons/bs';
import { isPainterSelector } from 'client/atom/gameAtom';
import { contextAtom, toolAtom } from 'client/atom/canvasAtom';
import socket from 'client/config/socket';
import { CANVAS_SIZE } from 'shared/constant';
import Thickness from './Thickness';
import Palette from './Palette';

const ToolWrapper = styled.div`
  position: absolute;
  left: 25px;
  bottom: 25px;
  width: 450px;
  height: 50px;
  border: 1px #cdb699 solid;
  border-radius: 10px;

  display: flex;
  justify-content: space-evenly;
  align-items: center;

  overflow: hidden;
`;
const IconWrapper = styled.div`
  width: 32px;

  color: #493323;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    filter: brightness(250%);
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
    ctx.globalCompositeOperation = 'source-over';
  };

  const setEraser = () => {
    setTool('eraser');
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
      <Thickness />
      <Palette />
    </ToolWrapper>
  );
};

export default Tool;
