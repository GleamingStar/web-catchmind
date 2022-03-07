import styled from 'styled-components';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  BsFillFileRuledFill,
  BsFillReplyFill,
  BsFillPlayCircleFill,
  BsHourglassSplit,
  BsDoorOpenFill,
  BsPeopleFill,
} from 'react-icons/bs';
import { currentRoomSelector } from 'client/atom/roomAtom';
import { toggleModalAtom } from 'client/atom/modalAtom';
import { gameAtom } from 'client/atom/gameAtom';
import socket from 'client/config/socket';
import UserList from './UserList';
import ScoreBoard from './ScoreBoard';

const HeaderWrapper = styled.div`
  position: absolute;
  right: 0;
  width: 300px;
  height: 80px;
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

  &:hover {
    filter: brightness(250%);
  }

  transition: filter 0.25s;

  cursor: pointer;
`;
const ScoreBoardButton = styled.div<{ isActivated: boolean }>`
  position: absolute;
  bottom: 10px;
  right: 10px;

  &:hover {
    filter: ${({ isActivated }) => `brightness(${isActivated ? '250' : '100'}%)`};
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

  &:hover {
    filter: brightness(250%);
  }

  transition: filter 0.25s;

  cursor: pointer;
`;
const DoorWrapper = styled.div``;
const ReplyWrapper = styled.div`
  margin-left: -3px;
  display: flex;
  align-items: center;
`;

const Header = () => {
  const room = useRecoilValue(currentRoomSelector);
  const game = useRecoilValue(gameAtom);
  const toggleModal = useSetRecoilState(toggleModalAtom);

  return (
    <HeaderWrapper>
      <Exit />
      <RoomName>{`#${room?.id} ${room?.name}`}</RoomName>
      <RoomStatus>{room?.status === 'WAITING' ? <BsHourglassSplit /> : <BsFillPlayCircleFill />}</RoomStatus>
      <UserListButton onClick={() => toggleModal((status) => (status === 1 ? 0 : 1))}>
        <BsPeopleFill />
      </UserListButton>
      <ScoreBoardButton
        isActivated={game !== null}
        onClick={() => game && toggleModal((status) => (status === 2 ? 0 : 2))}
      >
        <BsFillFileRuledFill />
      </ScoreBoardButton>
      <UserList />
      {game && <ScoreBoard />}
    </HeaderWrapper>
  );
};

const Exit = () => (
  <ExitWrapper onClick={() => socket.emit('room/leave')}>
    <DoorWrapper>
      <BsDoorOpenFill />
    </DoorWrapper>
    <ReplyWrapper>
      <BsFillReplyFill size={8} />
    </ReplyWrapper>
  </ExitWrapper>
);

export default Header;
