import styled, { css } from 'styled-components';

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
`;

export const Container = styled.div`
  ${({ theme: { colors }, danger }) => css`
    max-width: 450px;
    width: 100%;
    background: #FFFFFF;
    border-radius: 4px;
    padding: 24px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);

    > h1 {
      font-size: 22px;
      color: ${danger ? colors.danger.main : colors.gray[900]}
    }

    .modal-body {
      margin-top: 32px;
    }
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
    }
  `}
`;
