import { Suspense } from 'react';
import Login from './login/Login';

const Main = () => {
  return (
    <Suspense fallback={<div>로딩중</div>}>
      <Login />
    </Suspense>
  );
};

export default Main;
