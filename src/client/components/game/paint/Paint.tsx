import styled from 'styled-components';
import Board from './Board';
import Tool from './tool/Tool';
import Timer from './modal/Timer';
import Answer from './modal/Answer';
import Start from './modal/Start';
import TimeBar from './modal/TimeBar';
import Alert from './modal/Alert';

const PaintWrapper = styled.div`
  position: relative;
  width: 500px;
  height: 600px;
  @media screen and (max-width: 800px) {
    height: 100%;
    min-height: 700px;
  }
  overflow: hidden;
`;

const Paint = () => {
  return (
    <PaintWrapper>
      <Board />
      <Tool />
      <TimeBar />
      <Answer />
      <Timer />
      <Alert />
      <Start />
    </PaintWrapper>
  );
};

export default Paint;
