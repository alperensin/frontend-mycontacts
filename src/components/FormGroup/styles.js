import styled, { css } from 'styled-components';

export const Container = styled.div`
  ${({ theme: { colors: { danger } } }) => css`
    & + & {
      margin-top: 16px;
    }

    small {
      color: ${danger.main};
      font-size: 12px;
      display: block;
      margin-top: 8px;
    }

    .form-item {
      position: relative;

      .loader {
        position: absolute;
        top: 18px;
        right: 16px;
      }
    }
  `}
`;
