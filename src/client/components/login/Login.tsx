import { accountAtom, checkSession } from 'client/atom/accountAtom';
import { ChangeEvent, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { ERROR_MESSAGE, MAX_USER_NAME_LENGTH } from 'shared/constant';
import styled from 'styled-components';

const LoginWrapper = styled.div`
  position: relative;
  width: 400px;
  height: 300px;
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

const ALERT_MESSAGE_USER = {
  LENGTH: `${MAX_USER_NAME_LENGTH}자 이하 이름을 입력해주세요`,
  EMPTY: '닉네임을 제대로 입력해주세요',
  DUPLICATE: '이미 사용하고 있는 닉네임입니다',
  NONE: '',
};

const Login = () => {
  const setAccount = useSetRecoilState(accountAtom);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [alert, setAlert] = useState(ALERT_MESSAGE_USER.NONE);

  const inputChangeHandler = ({ target }: ChangeEvent<HTMLInputElement>) => setInputValue(target.value);

  const isValid = () => {
    if (isLoading) return false;
    if (inputValue.trim().length === 0) {
      setAlert(ALERT_MESSAGE_USER.EMPTY);
      return false;
    }
    if (inputValue.length > MAX_USER_NAME_LENGTH) {
      setAlert(ALERT_MESSAGE_USER.LENGTH);
      return false;
    }
    return true;
  };

  const login = async () => {
    if (!isValid()) return;

    setLoading(true);
    setAlert(ALERT_MESSAGE_USER.NONE);

    try {
      const response = await fetch('/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: inputValue }),
      });

      if (!response.ok) {
        const { message } = await response.json();

        throw new Error(message);
      }

      const { user } = await response.json();

      setAccount(user);
    } catch ({ message }) {
      if (message === ERROR_MESSAGE.DUPLICATED_USER) {
        setAlert(ALERT_MESSAGE_USER.DUPLICATE);
      } else if (message === ERROR_MESSAGE.ALREADY_LOGINED) {
        setAccount(await checkSession());
      } else {
        console.error('network error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginWrapper>
      <LoginInput value={inputValue} onChange={inputChangeHandler} placeholder="닉네임을 입력해주세요" />
      <LoginButton onClick={login}>입장</LoginButton>
      <LoginAlert>{alert}</LoginAlert>
    </LoginWrapper>
  );
};
export default Login;
