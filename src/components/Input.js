import styled, { css } from 'styled-components';

const errorModifier = ({ theme: { colors }, error }) => error && css`
  color: ${colors.danger.main};
  border-color: ${colors.danger.main} !important;
`;

export default styled.input`
  ${({ theme, error }) => css`
    width: 100%;
    background: #FFF;
    border: 2px solid #FFF;
    border-radius: 4px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
    height: 52px;
    outline: none;
    padding: 0 16px;
    font-size: 16px;
    transition: border-color 0.2s ease-in;
    appearance: none;

    &:focus {
      border: 2px solid ${theme.colors.primary.main};
    }

    &[disabled] {
      background-color: ${theme.colors.gray[100]};
      border-color: ${theme.colors.gray[200]};
    }

    ${errorModifier({ theme, error })}
  `}
`;
