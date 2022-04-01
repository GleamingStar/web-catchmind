import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { isUserListOnSelector } from 'client/atom/headerAtom';
import { currentRoomSelector } from 'client/atom/roomAtom';
import User from 'client/components/common/User';
import { LANDSCAPE_WIDTH } from 'shared/constant';

const UserListWrapper = styled.div<{ isActivated: boolean }>`
  position: absolute;

  padding: 10px;
  width: 210px;
  max-height: 300px;
  top: 90px;
  right: 10px;
  transform: ${({ isActivated }) => `translateX(${isActivated ? '0px' : '220px'})`};
  @media screen and (max-width: ${LANDSCAPE_WIDTH}px) {
    top: 80px;
    left: 0;
    width: 200px;
    transform: ${({ isActivated }) => `translateX(${isActivated ? '0px' : '-220px'})`};
    height: calc(var(--vh, 1vh) * 100 - 580px);
    min-height: 120px;
    max-height: none;
  }

  border: 3px solid #cdb699;
  border-radius: 10px;

  background-color: #fbf8f134;
  backdrop-filter: blur(3px);

  overflow-y: scroll;

  display: flex;
  flex-direction: column;

  z-index: 1;

  transition: transform 0.4s;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const UserList = () => {
  const room = useRecoilValue(currentRoomSelector);
  const isOn = useRecoilValue(isUserListOnSelector);

  return (
    <UserListWrapper isActivated={isOn}>
      {room?.users.map((user) => (
        <User key={user.id} {...user} />
      ))}
    </UserListWrapper>
  );
};

export default UserList;
