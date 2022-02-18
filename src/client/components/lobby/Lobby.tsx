import styled from 'styled-components';
import RoomList from './RoomList';

const LobbyWrapper = styled.div`
  position: relative;
`;

const Lobby = () => (
  <LobbyWrapper>
    <RoomList />
  </LobbyWrapper>
);

export default Lobby;
