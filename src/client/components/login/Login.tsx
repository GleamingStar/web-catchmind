import styled from 'styled-components';
import { ChangeEvent, useState } from 'react';
import { useRecoilState } from 'recoil';
import { loginAlertAtom } from 'client/atom/alertAtom';
import socket from 'client/config/socket';
import { LOGIN_ALERT_MESSAGE, MAX_USER_NAME_LENGTH } from 'shared/constant';

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

const Login = () => {
  const [inputValue, setInputValue] = useState('');
  const [alert, setAlert] = useRecoilState(loginAlertAtom);

  const inputChangeHandler = ({ target }: ChangeEvent<HTMLInputElement>) => setInputValue(target.value);

  const isValid = () => {
    if (inputValue.trim().length === 0) {
      setAlert(LOGIN_ALERT_MESSAGE.EMPTY);
      return false;
    }
    if (inputValue.length > MAX_USER_NAME_LENGTH) {
      setAlert(LOGIN_ALERT_MESSAGE.LENGTH);
      return false;
    }
    return true;
  };

  const login = () => isValid() && socket.emit('login', inputValue.trim());

  return (
    <LoginWrapper>
      <LoginInput
        value={inputValue}
        onChange={inputChangeHandler}
        onKeyPress={({ key }) => key === 'Enter' && login()}
        placeholder="닉네임을 입력해주세요"
        spellCheck={false}
        maxLength={MAX_USER_NAME_LENGTH}
      />
      <LoginButton onClick={login}>입장</LoginButton>
      <LoginAlert>{alert}</LoginAlert>
    </LoginWrapper>
  );
};
export default Login;
