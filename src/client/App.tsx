import styled from 'styled-components';
import { lazy, Suspense } from 'react';
import { LANDSCAPE_WIDTH, PORTRAIT_WIDTH } from 'shared/constant';
import GlobalStyle from './config/GlobalStyle';
import Spinner from './components/common/Spinner';
const Main = lazy(() => import('./components/Main'));

const AppWrapper = styled.div`
  position: relative;

  width: ${LANDSCAPE_WIDTH}px;
  height: 600px;

  @media screen and (max-width: ${LANDSCAPE_WIDTH}px) {
    width: ${PORTRAIT_WIDTH}px;
    min-height: 700px;
    height: calc(var(--vh, 1vh) * 100);
  }

  background-color: #dfd3c3;
  overflow: hidden;

  user-select: none;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const App = () => (
  <AppWrapper>
    <GlobalStyle />
    <Suspense fallback={<Spinner size={500} />}>
      <Main />
    </Suspense>
  </AppWrapper>
);

export default App;
