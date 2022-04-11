import styled from 'styled-components';
import Header from './header/Header';
import Paint from './paint/Paint';
import ChattingRoom from './chattingRoom/ChattingRoom';

const GameWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const Game = () => (
  <GameWrapper>
    <Paint />
    <Header />
    <ChattingRoom />
  </GameWrapper>
);

export default Game;
