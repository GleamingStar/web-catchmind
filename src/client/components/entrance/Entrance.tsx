import styled from 'styled-components';
import { ChangeEvent, MouseEventHandler } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userImageSelector, userNameAtom } from 'client/atom/accountAtom';
import { loginAlertAtom } from 'client/atom/miscAtom';
import socket from 'client/config/socket';
import { LOGIN_ALERT_MESSAGE, MAX_USER_NAME_LENGTH } from 'shared/constant';
import Preview from './Preview';
import DisconnectAlert from './alert/DisconnectAlert';
import ZoomOutAlert from './alert/ZoomOutAlert';

const EntranceWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
const Title = styled.div`
  position: absolute;
  top: 30%;

  color: #596e79;
  font-size: 30px;
  font-weight: 800;
`;
const Login = styled.div`
  position: absolute;
  top: 55%;
  display: flex;
  align-items: center;
`;
const LoginInput = styled.input`
  width: 230px;
  height: 40px;
  padding: 10px;

  border: none;
  border-radius: 14px;
  background-color: #f0ece2;

  &:focus {
    filter: brightness(120%);
  }
  transition: filter 0.3s;
`;
const LoginButton = styled.div`
  position: absolute;
  right: 10px;

  color: #493323;

  @media (hover: hover) {
    &:hover {
      filter: brightness(250%);
    }
  }

  transition: filter 0.3s;

  cursor: pointer;
`;
const LoginAlert = styled.div`
  position: absolute;
  top: 65%;
  color: #dd4a48;
  font-size: 12px;
  white-space: nowrap;
`;
const GitHubButton = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;

  color: #493323;

  @media (hover: hover) {
    &:hover {
      filter: brightness(250%);
    }
  }

  transition: filter 0.3s;

  cursor: pointer;
`;

const Entrance = () => {
  const [inputValue, setInputValue] = useRecoilState(userNameAtom);
  const userImage = useRecoilValue(userImageSelector);
  const [alert, setAlert] = useRecoilState(loginAlertAtom);

  const inputChangeHandler = ({ target }: ChangeEvent<HTMLInputElement>) => setInputValue(target.value);

  const isValid = () => {
    if (inputValue.trim().length === 0) {
      setAlert(LOGIN_ALERT_MESSAGE.EMPTY);
      setInputValue('');
      return false;
    }
    if (inputValue.length > MAX_USER_NAME_LENGTH) {
      setAlert(LOGIN_ALERT_MESSAGE.LENGTH);
      return false;
    }
    return true;
  };

  const login = () => isValid() && socket.emit('login', inputValue.trim(), userImage);

  return (
    <EntranceWrapper>
      <Title>Web Catchmind</Title>
      <Login>
        <LoginInput
          value={inputValue}
          onChange={inputChangeHandler}
          onKeyPress={({ key }) => key === 'Enter' && login()}
          placeholder="닉네임을 입력해주세요"
          spellCheck={false}
          maxLength={MAX_USER_NAME_LENGTH}
        />
        <LoginButton onClick={login}>
          <PersonPlus />
        </LoginButton>
      </Login>
      <Preview />
      <LoginAlert>{alert}</LoginAlert>
      <DisconnectAlert />
      <ZoomOutAlert />
      <GitHubButton>
        <GitHub onClick={() => window.open('https://github.com/GleamingStar/web-catchmind')} />
      </GitHubButton>
    </EntranceWrapper>
  );
};

const PersonPlus = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    className="bi bi-person-plus-fill"
    viewBox="0 0 16 16"
  >
    <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
    <path
      fillRule="evenodd"
      d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"
    />
  </svg>
);

const GitHub = ({ onClick }: { onClick: MouseEventHandler }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="30"
    height="30"
    fill="currentColor"
    className="bi bi-github"
    viewBox="0 0 16 16"
    onClick={onClick}
  >
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
  </svg>
);

export default Entrance;
