import styled, { css } from 'styled-components';

export const Container = styled.header`
  ${({ theme: { colors: { primary, gray } }, justifyContent }) => css`
    display: flex;
    align-items: center;
    justify-content: ${justifyContent};
    margin-top: 32px;
    border-bottom: 2px solid ${gray[100]};
    padding-bottom: 16px;

    strong {
      font-size: 24px;
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
