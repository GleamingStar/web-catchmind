import styled from 'styled-components';
import { ChangeEvent, useState } from 'react';
import { useRecoilState } from 'recoil';
import { roomAlertAtom } from 'client/atom/alertAtom';
import socket from 'client/config/socket';
import { MAX_ROOM_NAME_LENGTH, ROOM_ALERT_MESSAGE } from 'shared/constant';

const NewRoomWrapper = styled.div`
  position: relative;

  min-height: 60px;
  width: 280px;

  border: solid 1px #cdb699;
  border-radius: 10px;

  display: flex;
  justify-content: center;
  align-items: center;
`;
const NewRoomTitle = styled.div`
  color: #bb6464;
`;
const NewRoomInput = styled.input`
  width: 145px;
  background-color: #ffeddb;
  border: none;
  border-radius: 5px;

  color: #bb6464;
`;
const NewRoomButton = styled.button`
  margin-left: 20px;

  background-color: #cdb699;

  color: #bb6464;

  border: none;

  border-radius: 8px;
`;
const NewRoomAlert = styled.div`
  position: absolute;
  top: 74%;
  left: 50%;
  transform: translateX(-50%);
  color: red;
  font-size: 10px;
  white-space: nowrap;
`;

const NewRoom = () => {
  const [inputValue, setInputValue] = useState('');
  const [isActivated, setActivated] = useState(false);
  const [alert, setAlert] = useRecoilState(roomAlertAtom);

  const inputChangeHandler = ({ target }: ChangeEvent<HTMLInputElement>) => setInputValue(target.value);

  const isValid = () => {
    if (inputValue.trim().length === 0) {
      setAlert(ROOM_ALERT_MESSAGE.EMPTY);
      setInputValue('');
      return false;
    }
    if (inputValue.length > MAX_ROOM_NAME_LENGTH) {
      setAlert(ROOM_ALERT_MESSAGE.LENGTH);
      return false;
    }
    return true;
  };

  const createRoom = () => isValid() && socket.emit('room/create', inputValue.trim());

  return (
    <NewRoomWrapper>
      {isActivated ? (
        <>
          <NewRoomInput placeholder="방 이름을 입력해주세요" value={inputValue} onChange={inputChangeHandler} />
          <NewRoomButton onClick={createRoom}>만들기</NewRoomButton>
        </>
      ) : (
        <NewRoomTitle onClick={() => setActivated(true)}>새 방 생성</NewRoomTitle>
      )}
      <NewRoomAlert>{alert}</NewRoomAlert>
    </NewRoomWrapper>
  );
};

export default NewRoom;
