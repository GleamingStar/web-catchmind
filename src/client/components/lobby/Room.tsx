import styled from 'styled-components';
import { BsPeopleFill } from 'react-icons/bs';
import socket from 'client/config/socket';
import Waiting from 'client/components/common/Waiting';
import Playing from 'client/components/common/Playing';
import { MAX_USER_PER_ROOM } from 'shared/constant';
import { TRoom } from 'shared/types';

const RoomWrapper = styled.div`
  position: relative;
  min-height: 60px;
  width: 280px;
  margin-top: 20px;

  background-color: #dfd3c3;
  color: #596e79;
  border: solid 1px #cdb699;
  border-radius: 10px;

  display: flex;
  justify-content: center;
  align-items: center;

  @media (hover: hover) {
    &:hover {
      filter: brightness(110%);
    }
  }

  transition: filter 0.2s;

  cursor: pointer;
`;
const Id = styled.div`
  position: absolute;
  top: 5px;
  left: 15px;
`;
const Status = styled.div`
  position: absolute;
  bottom: 5px;
  left: 15px;
`;
const People = styled.div`
  position: absolute;
  top: 5px;
  right: 20px;
  display: flex;
`;
const PeopleIcon = styled.div`
  transform: translateY(1px);
`;
const PeopleCount = styled.div`
  margin-left: 8px;
`;
const Name = styled.div`
  position: absolute;
  bottom: 8px;
  right: 15px;

  font-size: 21px;
  font-weight: 600;
`;

const Room = ({ id, name, status, users }: TRoom) => (
  <RoomWrapper onClick={() => socket.emit('room/join', id)}>
    <Id>{`#${id}`}</Id>
    <Status>{status === 'WAITING' ? <Waiting size={18} color="596e79" /> : <Playing size={18} />}</Status>
    <People>
      <PeopleIcon>
        <BsPeopleFill size={16} />
      </PeopleIcon>
      <PeopleCount>{`${users.length} / ${MAX_USER_PER_ROOM}`}</PeopleCount>
    </People>
    <Name>{name}</Name>
  </RoomWrapper>
);

export default Room;
