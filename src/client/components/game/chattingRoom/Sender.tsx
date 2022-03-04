import styled from 'styled-components';
import { ChangeEvent, KeyboardEvent, useState } from 'react';
import socket from 'client/config/socket';

const SenderWrapper = styled.div`
  position: relative;
  width: 300px;
  height: 60px;
  background-color: #f7ecde;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;
const SenderInput = styled.input``;
const SenderButton = styled.button`
  cursor: pointer;
`;

const Sender = () => {
  const [inputValue, setInputValue] = useState<string>('');

  const inputChangeHandler = ({ target }: ChangeEvent<HTMLInputElement>) => setInputValue(target.value);

  const sendMessage = () => {
    if (inputValue.length === 0) return;
    socket.emit('chat', inputValue);
    setInputValue('');
  };

  const inputKeyPressHandler = ({ key }: KeyboardEvent<HTMLInputElement>) => key === 'Enter' && sendMessage();

  return (
    <SenderWrapper>
      <SenderInput
        value={inputValue}
        onKeyPress={inputKeyPressHandler}
        onChange={inputChangeHandler}
        placeholder="메세지 보내기"
      />
      <SenderButton onClick={sendMessage}>전송</SenderButton>
    </SenderWrapper>
  );
};

export default Sender;
