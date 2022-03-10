import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { gameAtom } from 'client/atom/gameAtom';
import { currentRoomSelector } from 'client/atom/roomAtom';
import socket from 'client/config/socket';

const StartWrapper = styled.div<{ isActivated: boolean }>`
  position: absolute;
  right: 10px;
  bottom: 110px;
  padding: 5px;
  border-radius: 5px;

  border: 3px solid #cdb699;
  border-radius: 10px;
  background-color: #fbf8f134;
  backdrop-filter: blur(4px);

  transform: ${({ isActivated }) => `translateX(${isActivated ? '0px' : '170px'})`};
  transition: transform 0.4s;
`;

const Start = () => {
  const game = useRecoilValue(gameAtom);
  const room = useRecoilValue(currentRoomSelector);

  return (
    <StartWrapper isActivated={!game && room?.users.length > 1} onClick={() => socket.emit('game/start')}>
      게임시작
    </StartWrapper>
  );
};

export default Start;
