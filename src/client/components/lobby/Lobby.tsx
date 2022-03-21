import styled from 'styled-components';
import RoomList from './RoomList';

const LobbyWrapper = styled.div`
  position: relative;
  height: 100%;
`;

const Lobby = () => (
  <LobbyWrapper>
    <RoomList />
  </LobbyWrapper>
);

export default Lobby;
