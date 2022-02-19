import styled from 'styled-components';
import socket from 'client/config/socket';

const RoomWrapper = styled.div`
  position: relative;

  min-height: 60px;
  width: 280px;
  margin-top: 20px;

  color: #bb6464;

  border: solid 1px #cdb699;
  border-radius: 10px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Room = ({ id, name }: { id: number; name: string }) => (
  <RoomWrapper onClick={() => socket.emit('room/join', id)}>{name}</RoomWrapper>
);

export default Room;
