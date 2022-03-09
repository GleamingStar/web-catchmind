import styled from 'styled-components';
import Board from './Board';
import Tool from './Tool';
import Timer from './Timer';
import Answer from './Answer';
import Start from './Start';
import TimeBar from './TimeBar';
import Alert from './Alert';

const PaintWrapper = styled.div`
  position: relative;
  width: 500px;
  height: 600px;
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
