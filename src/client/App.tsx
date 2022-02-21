import { RecoilRoot } from 'recoil';
import Main from './components/Main';
import GlobalStyle from './config/GlobalStyle';
import Listener from './config/Listener';

const App = () => (
  <RecoilRoot>
    <GlobalStyle />
    <Main />
    <Listener />
  </RecoilRoot>
);

export default App;
