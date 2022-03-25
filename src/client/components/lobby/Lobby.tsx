import styled from 'styled-components';
import RoomList from './RoomList';
import UserCount from './UserCount';

const LobbyWrapper = styled.div`
  position: relative;
  height: 100%;
`;

const Lobby = () => (
  <LobbyWrapper>
    <UserCount />
    <RoomList />
  </LobbyWrapper>
);

export default Lobby;
