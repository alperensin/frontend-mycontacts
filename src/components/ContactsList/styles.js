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
      margin-bottom: 8px;
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

export const Card = styled.div`
  ${({ theme: { colors: { primary, gray } } }) => css`
    background: #FFFFFF;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
    padding: 16px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    & + & {
      margin-top: 16px;
    }

    .info {

      .contact-name {
        display: flex;
        align-items: center;

        small {
          background: ${primary.lighter};
          color: ${primary.main};
          font-weight: bold;
          text-transform: uppercase;
          padding: 4px;
          border-radius: 4px;
          margin-left: 8px;
        }
      }

      span {
        display: block;
        font-size: 14px;
        color: ${gray[200]};
      }
    }

    .actions {
      display: flex;
      align-items: center;

      button {
        background: transparent;
        border: none;
        margin-left: 8px;

        &:hover {
          opacity: 0.75;
        }
      }

      a:hover {
        opacity: 0.75;
      }

    }

  `}
`;
