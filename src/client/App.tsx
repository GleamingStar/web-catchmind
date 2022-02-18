import { Suspense } from 'react';
import { RecoilRoot } from 'recoil';
import Main from './components/Main';
import GlobalStyle from './config/GlobalStyle';

const App = () => (
  <RecoilRoot>
    <GlobalStyle />
    <Suspense fallback={<div>세션 로딩중</div>}>
      <Main />
    </Suspense>
  </RecoilRoot>
);

export default App;
