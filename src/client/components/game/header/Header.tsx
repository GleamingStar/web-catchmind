import styled from 'styled-components';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { currentRoomSelector } from 'client/atom/roomAtom';
import { toggleHeaderModalAtom } from 'client/atom/headerAtom';
import { gameAtom } from 'client/atom/gameAtom';
import socket from 'client/config/socket';
import Waiting from 'client/components/common/Waiting';
import Playing from 'client/components/common/Playing';
import UserList from './UserList';
import ScoreBoard from './ScoreBoard';

const HeaderWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 300px;
  height: 80px;
  @media screen and (max-width: 800px) {
    top: 500px;
    left: 0;
    width: 200px;
  }
  background-color: #e9dac1;

  color: #493323;
`;
const RoomName = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  white-space: nowrap;
  transform: translate(-50%, -50%);
`;
const RoomStatus = styled.div`
  position: absolute;
  left: 10px;
  bottom: 10px;
`;
const UserListButton = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;

  @media (hover: hover) {
    &:hover {
      filter: brightness(250%);
    }
  }

  transition: filter 0.25s;

  cursor: pointer;
`;
const ScoreBoardButton = styled.div<{ isActivated: boolean }>`
  position: absolute;
  bottom: 10px;
  right: 10px;

  @media (hover: hover) {
    &:hover {
      filter: ${({ isActivated }) => `brightness(${isActivated ? '250' : '100'}%)`};
    }
  }

  transition: filter 0.25s;

  cursor: ${({ isActivated }) => (isActivated ? 'pointer' : 'default')};
`;
const ExitWrapper = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;

  display: flex;
  align-items: center;

  @media (hover: hover) {
    &:hover {
      filter: brightness(250%);
    }
  }

  transition: filter 0.25s;

  cursor: pointer;
`;
const ReplyWrapper = styled.div`
  margin-left: -3px;
  display: flex;
  align-items: center;
`;

const Header = () => {
  const room = useRecoilValue(currentRoomSelector);
  const game = useRecoilValue(gameAtom);
  const toggleModal = useSetRecoilState(toggleHeaderModalAtom);

  return (
    <HeaderWrapper>
      <Exit />
      <RoomName>{`#${room?.id} ${room?.name}`}</RoomName>
      <RoomStatus>
        {room?.status === 'WAITING' ? <Waiting size={16} color="493323" /> : <Playing size={16} />}
      </RoomStatus>
      <UserListButton onClick={() => toggleModal((status) => (status === 1 ? 0 : 1))}>
        <People />
      </UserListButton>
      <ScoreBoardButton
        isActivated={game !== null}
        onClick={() => game && toggleModal((status) => (status === 2 ? 0 : 2))}
      >
        <Score />
      </ScoreBoardButton>
      <UserList />
      {game && <ScoreBoard />}
    </HeaderWrapper>
  );
};

const Exit = () => (
  <ExitWrapper onClick={() => socket.emit('room/leave')}>
    <DoorOpen />
    <ReplyWrapper>
      <Reply />
    </ReplyWrapper>
  </ExitWrapper>
);

const People = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    className="bi bi-people-fill"
    viewBox="0 0 16 16"
  >
    <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
    <path
      fillRule="evenodd"
      d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z"
    />
    <path d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />
  </svg>
);

const Score = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    className="bi bi-person-lines-fill"
    viewBox="0 0 16 16"
  >
    <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2z" />
  </svg>
);

const DoorOpen = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    className="bi bi-door-open-fill"
    viewBox="0 0 16 16"
  >
    <path d="M1.5 15a.5.5 0 0 0 0 1h13a.5.5 0 0 0 0-1H13V2.5A1.5 1.5 0 0 0 11.5 1H11V.5a.5.5 0 0 0-.57-.495l-7 1A.5.5 0 0 0 3 1.5V15H1.5zM11 2h.5a.5.5 0 0 1 .5.5V15h-1V2zm-2.5 8c-.276 0-.5-.448-.5-1s.224-1 .5-1 .5.448.5 1-.224 1-.5 1z" />
  </svg>
);

const Reply = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="8"
    height="8"
    fill="currentColor"
    className="bi bi-reply-fill"
    viewBox="0 0 16 16"
  >
    <path d="M5.921 11.9 1.353 8.62a.719.719 0 0 1 0-1.238L5.921 4.1A.716.716 0 0 1 7 4.719V6c1.5 0 6 0 7 8-2.5-4.5-7-4-7-4v1.281c0 .56-.606.898-1.079.62z" />
  </svg>
);

export default Header;
