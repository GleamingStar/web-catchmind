import styled from 'styled-components';
import ChattingRoom from './chattingRoom/ChattingRoom';
import Paint from './paint/Paint';

const GameWrapper = styled.div``;

const Game = () => (
  <GameWrapper>
    <Paint />
    <ChattingRoom />
  </GameWrapper>
);

export default Game;
