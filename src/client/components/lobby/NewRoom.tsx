import styled from 'styled-components';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { roomAlertAtom } from 'client/atom/miscAtom';
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

  @media (hover: hover) {
    &:hover {
      filter: brightness(110%);
    }
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
        <Folder />
      </NewRoomButton>

      <NewRoomAlert>{alert}</NewRoomAlert>
    </NewRoomWrapper>
  );
};

const Folder = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="22"
    height="22"
    fill="currentColor"
    className="bi bi-folder-plus"
    viewBox="0 0 16 16"
  >
    <path d="m.5 3 .04.87a1.99 1.99 0 0 0-.342 1.311l.637 7A2 2 0 0 0 2.826 14H9v-1H2.826a1 1 0 0 1-.995-.91l-.637-7A1 1 0 0 1 2.19 4h11.62a1 1 0 0 1 .996 1.09L14.54 8h1.005l.256-2.819A2 2 0 0 0 13.81 3H9.828a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 6.172 1H2.5a2 2 0 0 0-2 2zm5.672-1a1 1 0 0 1 .707.293L7.586 3H2.19c-.24 0-.47.042-.683.12L1.5 2.98a1 1 0 0 1 1-.98h3.672z" />
    <path d="M13.5 10a.5.5 0 0 1 .5.5V12h1.5a.5.5 0 1 1 0 1H14v1.5a.5.5 0 1 1-1 0V13h-1.5a.5.5 0 0 1 0-1H13v-1.5a.5.5 0 0 1 .5-.5z" />
  </svg>
);

export default NewRoom;
