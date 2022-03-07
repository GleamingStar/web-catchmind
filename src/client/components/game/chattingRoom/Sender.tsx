import styled from 'styled-components';
import { ChangeEvent, KeyboardEvent, useState } from 'react';
import { BsCursor } from 'react-icons/bs';
import socket from 'client/config/socket';

const SenderWrapper = styled.div`
  position: relative;
  width: 300px;
  height: 60px;
  background-color: #f7ecde;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const SenderInput = styled.input`
  padding: 9px;
  width: 280px;
  height: 40px;
  border: 1px solid #e9dac1;
  border-radius: 10px;
`;
const SenderButton = styled.div`
  position: absolute;
  right: 20px;

  color: #493323;

  &:hover {
    filter: brightness(250%);
  }

  transition: filter 0.25s;

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
        autoFocus={true}
        spellCheck={false}
      />
      <SenderButton onClick={sendMessage}>
        <BsCursor />
      </SenderButton>
    </SenderWrapper>
  );
};

export default Sender;
