import styled, { css } from 'styled-components';

const dangerModifier = ({ theme: { colors }, danger }) => danger && css`
  background: ${colors.danger.main};

  &:hover {
      background: ${colors.danger.light};
    }

    &:active {
      background: ${colors.danger.dark};
    }
`;

export const StyledButton = styled.button`
  ${({ theme, danger }) => css`
    height: 52px;
    border: none;
    padding: 0 16px;
    background: ${theme.colors.primary.main} ;
    font-size: 16px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
    font-weight: bold;
    color: #FFFFFF;
    border-radius: 4px;
    transition: background 0.2s ease-in;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      background: ${theme.colors.primary.light};
    }

    &:active {
      background: ${theme.colors.primary.dark};
    }

    &[disabled] {
      background: #CCC !important;
      cursor: default !important;
    }

    ${dangerModifier({ theme, danger })}
  `}
`;
