import styled from 'styled-components';
import Board from './Board';
import Tool from './Tool';
import Timer from './Timer';
import Answer from './Answer';
import Start from './Start';

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
      <Answer />
      <Timer />
      <Start />
    </PaintWrapper>
  );
};


export default Paint;
