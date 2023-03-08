import styled, { css } from 'styled-components';

export default styled.select`
  ${({ theme: { colors: { primary, gray } } }) => css`
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
      border: 2px solid ${primary.main};
    }

    &[disabled] {
      background-color: ${gray[100]};
      border-color: ${gray[200]};
    }
  `}
`;
