import styled from 'styled-components';
import RoomList from './roomlist/RoomList';
import Description from './description/Description';

const LobbyWrapper = styled.div`
  height: 100%;
  width: 100%;
`;

const Lobby = () => (
  <LobbyWrapper>
    <Description />
    <RoomList />
  </LobbyWrapper>
);

export default Lobby;
