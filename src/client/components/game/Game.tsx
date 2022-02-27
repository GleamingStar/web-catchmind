import styled from 'styled-components';
import ChattingRoom from './chattingRoom/ChattingRoom';
import Header from './header/Header';
import Paint from './paint/Paint';

const GameWrapper = styled.div``;

const Game = () => (
  <GameWrapper>
    <Header />
    <Paint />
    <ChattingRoom />
  </GameWrapper>
);

export default Game;
