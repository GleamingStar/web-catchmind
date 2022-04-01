import styled from 'styled-components';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { isPainterSelector } from 'client/atom/gameAtom';
import { toolAtom } from 'client/atom/canvasAtom';
import { isPortraitAtom } from 'client/atom/miscAtom';
import socket from 'client/config/socket';
import { LANDSCAPE_WIDTH } from 'shared/constant';
import Thickness from './Thickness';
import Palette from './Palette';
import ColorSelector from './ColorSelector';

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

  @media screen and (max-width: ${LANDSCAPE_WIDTH}px) {
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
  justify-content: space-around;
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
  const [isPortrait, setPortrait] = useRecoilState(isPortraitAtom);

  useEffect(() => {
    setPortrait(window.innerWidth < LANDSCAPE_WIDTH);
  }, []);

  const tool = (
    <>
      <IconWrapper onClick={() => setTool('pencil')}>
        <Pencil />
      </IconWrapper>
      <IconWrapper onClick={() => setTool('eraser')}>
        <Eraser />
      </IconWrapper>
      <IconWrapper onClick={() => isPainter && socket.emit('canvas/reset')}>
        <Arrow />
      </IconWrapper>
      {isPortrait && (
        <IconWrapper>
          <ColorSelector />
        </IconWrapper>
      )}
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

const Pencil = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    className="bi bi-pencil"
    viewBox="0 0 16 16"
  >
    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
  </svg>
);

const Eraser = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    className="bi bi-eraser"
    viewBox="0 0 16 16"
  >
    <path d="M8.086 2.207a2 2 0 0 1 2.828 0l3.879 3.879a2 2 0 0 1 0 2.828l-5.5 5.5A2 2 0 0 1 7.879 15H5.12a2 2 0 0 1-1.414-.586l-2.5-2.5a2 2 0 0 1 0-2.828l6.879-6.879zm2.121.707a1 1 0 0 0-1.414 0L4.16 7.547l5.293 5.293 4.633-4.633a1 1 0 0 0 0-1.414l-3.879-3.879zM8.746 13.547 3.453 8.254 1.914 9.793a1 1 0 0 0 0 1.414l2.5 2.5a1 1 0 0 0 .707.293H7.88a1 1 0 0 0 .707-.293l.16-.16z" />
  </svg>
);

const Arrow = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    className="bi bi-arrow-counterclockwise"
    viewBox="0 0 16 16"
  >
    <path fillRule="evenodd" d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z" />
    <path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z" />
  </svg>
);

export default Tool;
