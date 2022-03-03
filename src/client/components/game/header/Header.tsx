import styled from 'styled-components';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { BsFillFileRuledFill, BsFillReplyFill, BsPersonCircle } from 'react-icons/bs';
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
`;
const RoomName = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const RoomStatus = styled.div`
  position: absolute;
  left: 10px;
  bottom: 10px;
`;
const ExitButton = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
`;
const UserListButton = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
`;
const ScoreBoardButton = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
`;

const Header = () => {
  const room = useRecoilValue(currentRoomSelector);
  const game = useRecoilValue(gameAtom);
  const toggleModal = useSetRecoilState(toggleModalAtom);

  return (
    <HeaderWrapper>
      <RoomStatus>{room?.status}</RoomStatus>
      <RoomName>{`#${room?.id} ${room?.name}`}</RoomName>
      <ExitButton onClick={() => socket.emit('room/leave')}>
        <BsFillReplyFill />
      </ExitButton>
      <UserListButton onClick={() => toggleModal((status) => (status === 1 ? 0 : 1))}>
        <BsPersonCircle />
      </UserListButton>
      <ScoreBoardButton onClick={() => game && toggleModal((status) => (status === 2 ? 0 : 2))}>
        <BsFillFileRuledFill />
      </ScoreBoardButton>
      <UserList />
      {game && <ScoreBoard />}
    </HeaderWrapper>
  );
};

export default Header;
