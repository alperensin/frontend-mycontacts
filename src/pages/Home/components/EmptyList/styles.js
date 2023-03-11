import styled, { css } from 'styled-components';

export const Container = styled.div`
  ${({ theme: { colors: { gray, primary } } }) => css`
    margin-top: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;

    p {
      margin-top: 8px;
      text-align: center;
      color: ${gray[200]};

      strong {
        color: ${primary.main}
      }
    }
  `}
`;
