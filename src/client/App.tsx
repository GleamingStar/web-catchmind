import { lazy, Suspense } from 'react';
import { RecoilRoot } from 'recoil';
import GlobalStyle from './config/GlobalStyle';
const Main = lazy(() => import('./components/Main'));

const App = () => (
  <RecoilRoot>
    <GlobalStyle />
    <Suspense fallback={null}>
      <Main />
    </Suspense>
  </RecoilRoot>
);

export default App;
