import styled, { css } from 'styled-components';

export const Container = styled.div`
  ${({ theme: { colors: { danger } } }) => css`
    margin-top: 16px;
    display: flex;
    align-items: center;

    .details {
      margin-left: 24px;

      strong {
        font-size: 22px;
        color: ${danger.main};
        display: block;
        margin-bottom: 8px;
      }

    }
  `}
`;
