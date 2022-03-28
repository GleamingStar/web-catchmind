import styled from 'styled-components';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { BsArrowCounterclockwise, BsEraser, BsPencil } from 'react-icons/bs';
import { isPainterSelector } from 'client/atom/gameAtom';
import { toolAtom } from 'client/atom/canvasAtom';
import { isPortraitAtom } from 'client/atom/miscAtom';
import socket from 'client/config/socket';
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

  @media screen and (max-width: 800px) {
    top: 590px;
    left: 10px;
    width: 180px;
    height: calc(100% - 600px);
    min-height: 100px;
    flex-direction: column;
    justify-content: space-around;
  }
`;
const FlexSeparator = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;
const IconWrapper = styled.div`
  width: 32px;

  color: #493323;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (hover: hover) {
    &:hover {
      filter: brightness(250%);
    }
  }

  transition: filter 0.25s;

  cursor: pointer;
`;

const Tool = () => {
  const setTool = useSetRecoilState(toolAtom);
  const isPainter = useRecoilValue(isPainterSelector);
  const isPortrait = useRecoilValue(isPortraitAtom);

  const tool = (
    <>
      <IconWrapper onClick={() => setTool('pencil')}>
        <BsPencil />
      </IconWrapper>
      <IconWrapper onClick={() => setTool('eraser')}>
        <BsEraser />
      </IconWrapper>
      <IconWrapper onClick={() => isPainter && socket.emit('canvas/reset')}>
        <BsArrowCounterclockwise />
      </IconWrapper>
    </>
  );

  return (
    <ToolWrapper>
      {isPortrait ? <FlexSeparator>{tool}</FlexSeparator> : tool}
      <Thickness />
      <Palette />
    </ToolWrapper>
  );
};

export default Tool;
