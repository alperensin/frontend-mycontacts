import { createGlobalStyle, css } from 'styled-components';

export default createGlobalStyle`
  ${({ theme: { colors: { background } } }) => css`
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: "Sora", sans-serif;
    }

    body {
      background: ${background};
      font-size: 16px;
    }

    button {
      cursor: pointer;
    }
  `}
`;
