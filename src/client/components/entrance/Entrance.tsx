import styled from 'styled-components';
import { ChangeEvent, useState } from 'react';
import { useRecoilState } from 'recoil';
import { BsFillPersonPlusFill, BsGithub } from 'react-icons/bs';
import { loginAlertAtom } from 'client/atom/miscAtom';
import socket from 'client/config/socket';
import { LOGIN_ALERT_MESSAGE, MAX_USER_NAME_LENGTH } from 'shared/constant';
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
  const [inputValue, setInputValue] = useState('');
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

  const login = () => isValid() && socket.emit('login', inputValue.trim());

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
          <BsFillPersonPlusFill />
        </LoginButton>
      </Login>
      <LoginAlert>{alert}</LoginAlert>
      <DisconnectAlert />
      <ZoomOutAlert />
      <GitHubButton>
        <BsGithub size={30} onClick={() => window.open('https://github.com/GleamingStar/web-catchmind')} />
      </GitHubButton>
    </EntranceWrapper>
  );
};

export default Entrance;
