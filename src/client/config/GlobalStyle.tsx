import reset from 'styled-reset';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
${reset};
* {
  box-sizing: border-box;
}
a {
  color: inherit;
  text-decoration: none;
}
li {
  display: block;
  text-align: left;
}
ul {
  padding: 0;
  margin: 0;
}
input {
  outline: none;
}
body {
  overscroll-behavior-y: contain;
  display: flex;
  justify-content: center;
}
`;

export default GlobalStyle;
