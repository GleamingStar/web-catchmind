import { Suspense } from 'react';
import styled from 'styled-components';
import Login from './login/Login';

const MainWrapper = styled.div`
  position: relative;

  width: 800px;
  height: 600px;

  background-color: #c8f2ef;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Main = () => {
  return (
    <MainWrapper>
      <Suspense fallback={<div>로딩중</div>}>
        <Login />
      </Suspense>
    </MainWrapper>
  );
};

export default Main;
