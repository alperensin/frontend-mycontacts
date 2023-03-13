import styled, { css } from 'styled-components';

export const ListHeader = styled.header`
  ${({ theme: { colors: { primary } }, orderBy }) => css`
    margin-top: 24px;
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

      img {
        transform: ${orderBy === 'asc' ? 'rotate(180deg)' : 'rotate(0deg)'};
        transition: transform 0.2s ease-in;
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
          opacity: 0.80;
        }
      }

      a:hover {
        opacity: 0.80;
      }

    }

  `}
`;