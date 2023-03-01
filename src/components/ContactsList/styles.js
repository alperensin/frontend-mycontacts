import styled, { css } from 'styled-components';

export const Container = styled.div`
  margin-top: 32px;
`;

export const Header = styled.header`
  ${({ theme: { colors: { primary } } }) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;

    strong {
      font-size: 24px;
      color: #222222;
    }

    a {
      color: ${primary.main};
      text-decoration: none;
      font-weight: bold;
      border: 2px solid ${primary.main};
      padding: 8px 16px;
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.2s ease-in;

      &:hover {
        background: ${primary.main};
        color: #FFFFFF
      }

    }
  `}
`;

export const ListContainer = styled.div`

  ${({ theme: { colors: { primary } } }) => css`
    margin-top: 24px;

    header {
      button {
        background: transparent;
        border: none;
        display: flex;
        align-items: center;

        span {
          color: ${primary.main};
          margin-right: 8px;
        }
      }
    }
  `}

`;
