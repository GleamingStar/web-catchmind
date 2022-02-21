import styled from 'styled-components';
import { ChangeEvent, useState } from 'react';
import socket from 'client/config/socket';
import { MAX_USER_NAME_LENGTH } from 'shared/constant';

const LoginWrapper = styled.div`
  position: absolute;
  width: 400px;
  height: 300px;

  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const LoginInput = styled.input`
  position: absolute;
  top: 40%;
  left: 10%;
`;
const LoginButton = styled.button`
  position: absolute;
  top: 40%;
  right: 10%;
`;
const LoginAlert = styled.div`
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
`;

const ALERT_MESSAGE = {
  LENGTH: `${MAX_USER_NAME_LENGTH}자 이하 이름을 입력해주세요`,
  EMPTY: '닉네임을 제대로 입력해주세요',
  NONE: '',
};

const Login = () => {
  const [inputValue, setInputValue] = useState('');
  const [alert, setAlert] = useState(ALERT_MESSAGE.NONE);

  const inputChangeHandler = ({ target }: ChangeEvent<HTMLInputElement>) => setInputValue(target.value);

  const isValid = () => {
    if (inputValue.trim().length === 0) {
      setAlert(ALERT_MESSAGE.EMPTY);
      return false;
    }
    if (inputValue.length > MAX_USER_NAME_LENGTH) {
      setAlert(ALERT_MESSAGE.LENGTH);
      return false;
    }
    setAlert(ALERT_MESSAGE.NONE);
    return true;
  };

  const login = () => isValid() && socket.emit('login', inputValue.trim());

  return (
    <LoginWrapper>
      <LoginInput value={inputValue} onChange={inputChangeHandler} placeholder="닉네임을 입력해주세요" />
      <LoginButton onClick={login}>입장</LoginButton>
      <LoginAlert>{alert}</LoginAlert>
    </LoginWrapper>
  );
};
export default Login;
