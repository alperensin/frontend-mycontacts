import styled, { css } from 'styled-components';

export const Container = styled.header`
  ${({ theme: { colors: { primary } } }) => css`
    margin-bottom: 24px;

    a {
      text-decoration: none;
      display: flex;
      align-items: center;
      transition: all 0.2s ease-in;

      span {
        font-weight: bold;
        color: ${primary.main};
      }

      img {
        transform: rotate(-90deg);
        margin-right: 8px;
      }

      &:hover {
        opacity: 0.80;
      }
    }

    h1 {
      font-size: 24px;
    }
  `}
`;
