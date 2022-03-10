import styled from 'styled-components';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { BsFolderPlus } from 'react-icons/bs';
import { roomAlertAtom } from 'client/atom/alertAtom';
import socket from 'client/config/socket';
import { MAX_ROOM_NAME_LENGTH, ROOM_ALERT_MESSAGE } from 'shared/constant';

const NewRoomWrapper = styled.div<{ isActivated: boolean }>`
  position: relative;

  min-height: 60px;
  width: 280px;

  border: solid 1px #cdb699;
  border-radius: 10px;
  background-color: #dfd3c3;

  display: flex;
  justify-content: space-evenly;
  align-items: center;

  &:hover {
    filter: brightness(110%);
  }

  transition: filter 0.2s;

  cursor: ${({ isActivated }) => (isActivated ? 'default' : 'pointer')};
`;
const NewRoomButton = styled.div<{ isActivated: boolean }>`
  position: absolute;
  left: 15px;

  color: #596e79;

  transform: ${({ isActivated }) => `translateX(${isActivated ? 225 : 0}px)`};
  transition: transform 0.4s;

  cursor: pointer;
`;
const NewRoomInput = styled.input<{ isActivated: boolean }>`
  position: absolute;
  width: ${({ isActivated }) => `${isActivated ? 155 : 0}px`};
  left: 15px;
  background-color: #ffeddb;
  color: #596e79;
  border: none;
  border-radius: 5px;

  opacity: ${({ isActivated }) => `${isActivated ? 0.99 : 0}`};

  font-size: 16px;
  &::placeholder {
    font-size: 14px;
  }

  transition: width 0.4s;
`;
const NewRoomAlert = styled.div`
  position: absolute;
  bottom: 5px;
  left: 50%;
  color: #dd4a48;
  font-size: 10px;
  transform: translateX(-50%);
  white-space: nowrap;
`;

const NewRoom = () => {
  const [inputValue, setInputValue] = useState('');
  const [isActivated, setActivated] = useState(false);
  const [alert, setAlert] = useRecoilState(roomAlertAtom);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    isActivated && setTimeout(() => inputRef.current.focus(), 400);
  }, [isActivated]);

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
    <NewRoomWrapper isActivated={isActivated} onClick={() => setActivated(true)}>
      <NewRoomInput
        placeholder="방 이름을 입력해주세요."
        ref={inputRef}
        value={inputValue}
        onChange={inputChangeHandler}
        isActivated={isActivated}
        onKeyPress={({ key }) => key === 'Enter' && createRoom()}
        spellCheck={false}
        maxLength={MAX_ROOM_NAME_LENGTH}
      />
      <NewRoomButton isActivated={isActivated} onClick={() => isActivated && createRoom()}>
        <BsFolderPlus size={22} />
      </NewRoomButton>

      <NewRoomAlert>{alert}</NewRoomAlert>
    </NewRoomWrapper>
  );
};

export default NewRoom;
