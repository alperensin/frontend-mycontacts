import styled, { css, keyframes } from 'styled-components';

const messageIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(100px);
  }
  to {
    opacity: 1;
    transform: translateY(0px);
  }
`;

const messageOut = keyframes`
  from {
    opacity: 1;
    transform: translateX(0px);
  }
  to {
    opacity: 0;
    transform: translateX(100px);
  }
`;

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
    animation: ${messageIn} 0.3s;

    & + & {
      margin-top: 12px;
    }

    img {
      margin-right: 8px;
    }

    ${containerVariants[type](theme) || containerVariants.default(theme)}

    ${({ isLeaving }) => isLeaving && css`
      animation: ${messageOut} 0.2s forwards;
    `}

  `}
`;
