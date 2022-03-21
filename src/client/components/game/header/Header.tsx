import styled from 'styled-components';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { BsFillFileRuledFill, BsFillReplyFill, BsDoorOpenFill, BsPeopleFill } from 'react-icons/bs';
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
    <BsDoorOpenFill />
    <ReplyWrapper>
      <BsFillReplyFill size={8} />
    </ReplyWrapper>
  </ExitWrapper>
);

export default Header;
