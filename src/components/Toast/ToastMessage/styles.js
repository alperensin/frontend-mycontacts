import styled, { css } from 'styled-components';

const containerVariants = {
  default: ({ colors: { primary } }) => css`
    background: ${primary.main};
  `,
  success: ({ colors: { success } }) => css`
    background: ${success.main};
  `,
  danger: ({ colors: { danger } }) => css`
    background: ${danger.main};
  `,
};

export const Container = styled.div`
  ${({ theme, type }) => css`
    padding: 16px 32px;
    color: #FFFFFF;
    border-radius: 4px;
    box-shadow: 0px 20px 20px -16px rgba(0, 0, 0, 0.25);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    & + & {
      margin-top: 12px;
    }

    img {
      margin-right: 8px;
    }

    ${containerVariants[type](theme) || containerVariants.default(theme)}

  `}
`;
