import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { roomListAtom } from 'client/atom/roomAtom';
import NewRoom from './NewRoom';
import Room from './Room';

const RoomListWrapper = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  padding: 20px;
  height: 560px;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  overflow-y: scroll;

  ::-webkit-scrollbar {
    width: 10px;
    background-color: #ffeddb;
    border-radius: 10px;
  }
`;

const RoomList = () => {
  const roomList = useRecoilValue(roomListAtom);

  return (
    <RoomListWrapper>
      <NewRoom />
      {roomList.map((room) => (
        <Room key={room.id} {...room} />
      ))}
    </RoomListWrapper>
  );
};

export default RoomList;
