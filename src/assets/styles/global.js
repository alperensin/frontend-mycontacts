import { createGlobalStyle, css } from 'styled-components';

export default createGlobalStyle`
  ${({ theme: { backgroundColor } }) => css`
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: "Sora", sans-serif;
    }

    body {
      background: ${backgroundColor};
      font-size: 16px;
    }

    button {
      cursor: pointer;
    }
  `}
`;
