import styled from 'styled-components';
import socket from 'client/config/socket';
import Waiting from 'client/components/common/Waiting';
import Playing from 'client/components/common/Playing';
import { MAX_USER_PER_ROOM } from 'shared/constant';
import { TRoom } from 'shared/types';

const RoomWrapper = styled.div<{ isFull: boolean }>`
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

  cursor: ${({ isFull }) => (isFull ? 'not-allowed' : 'pointer')};
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

const Room = ({ id, name, status, users }: TRoom) => {
  const isFull = users.length === MAX_USER_PER_ROOM;
  return (
    <RoomWrapper isFull={isFull} onClick={() => !isFull && socket.emit('room/join', id)}>
      <Id>{`#${id}`}</Id>
      <Status>{status === 'WAITING' ? <Waiting size={18} color="596e79" /> : <Playing size={18} />}</Status>
      <People>
        <PeopleIcon />
        <PeopleCount>{`${users.length} / ${MAX_USER_PER_ROOM}`}</PeopleCount>
      </People>
      <Name>{name}</Name>
    </RoomWrapper>
  );
};

const PeopleIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    className="bi bi-people-fill"
    viewBox="0 0 16 16"
    style={{ transform: 'translateY(1px)' }}
  >
    <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
    <path
      fillRule="evenodd"
      d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z"
    />
    <path d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />
  </svg>
);

export default Room;
