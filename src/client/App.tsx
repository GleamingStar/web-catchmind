import { RecoilRoot } from 'recoil';
import Main from './components/Main';
import GlobalStyle from './config/GlobalStyle';

const App = () => (
  <RecoilRoot>
    <GlobalStyle />
    <Main />
  </RecoilRoot>
);

export default App;
