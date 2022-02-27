import { currentRoomSelector } from 'client/atom/roomAtom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import Answer from './Answer';
import Timer from './Timer';

const HeaderWrapper = styled.div`
  position: absolute;
  right: 0;
  width: 300px;
  height: 80px;
  background-color: #E9DAC1;
`;
const RoomId = styled.div``;
const RoomName = styled.div``;
const UserListButton = styled.div``;
const ScoreBoardButton = styled.div``;

const Header = () => {
  const room = useRecoilValue(currentRoomSelector);
  return (
    <HeaderWrapper>
      <Answer />
      <Timer />
    </HeaderWrapper>
  );
};

export default Header;
