import { accountAtom } from 'client/atom/accountAtom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import Lobby from './lobby/Lobby';
import Login from './login/Login';

const MainWrapper = styled.div`
  position: relative;

  width: 800px;
  height: 600px;

  background-color: #c8f2ef;
`;

const Main = () => {
  const account = useRecoilValue(accountAtom);
  return (
    <MainWrapper>
      {!account && <Login />}
      {account && <Lobby />}
    </MainWrapper>
  );
};

export default Main;
