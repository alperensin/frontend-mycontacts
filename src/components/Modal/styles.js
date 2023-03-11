import styled, { css, keyframes } from 'styled-components';

const fadeIn = keyframes`
  /* estilos iniciais */
  from { opacity: 0; }
  /* estilos finais */
  to { opacity: 1; }
`;

const fadeOut = keyframes`
  /* estilos iniciais */
  from { opacity: 1; }
  /* estilos finais */
  to { opacity: 0; }
`;

const scaleIn = keyframes`
  from { transform: scale(0); }
  to { transform: scale(1); }
`;

const scaleOut = keyframes`
  from { transform: scale(1); }
  to { transform: scale(0); }
`;

export const Overlay = styled.div`
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(5px);
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  animation: ${fadeIn} 0.3s;

  ${({ isLeaving }) => isLeaving && css`
    animation: ${fadeOut} 0.2s;
  `}
`;

export const Container = styled.div`
  ${({ theme: { colors }, danger }) => css`
    max-width: 450px;
    width: 100%;
    background: #FFFFFF;
    border-radius: 4px;
    padding: 24px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
    animation: ${scaleIn} 0.3s;

    > h1 {
      font-size: 22px;
      color: ${danger ? colors.danger.main : colors.gray[900]}
    }

    .modal-body {
      margin-top: 32px;
    }

    ${({ isLeaving }) => isLeaving && css`
    animation: ${scaleOut} 0.2s;
  `}
  `}
`;

export const Footer = styled.footer`
  ${({ theme: { colors: { gray } } }) => css`
    display: flex;
    margin-top: 32px;
    align-items: center;
    justify-content: flex-end;

    .cancel-button {
      background: transparent;
      border: none;
      color: ${gray[200]};
      margin-right: 24px;
      font-size: 16px;

      &[disabled] {
        cursor: not-allowed;
      }

    }
  `}
`;
