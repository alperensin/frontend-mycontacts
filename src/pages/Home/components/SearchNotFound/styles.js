import styled, { css } from 'styled-components';

export const Container = styled.div`
  ${({ theme: { colors: { gray } } }) => css`
    margin-top: 16px;
    display: flex;
    align-items: flex-start;

    span {
      color: ${gray[200]};
      margin-left: 24px;
      word-break: break-word;
    }
  `}
`;
