import styled, { css } from 'styled-components';

export default styled.button`
  ${({ theme: { colors: { primary } } }) => css`
    width: 100%;
    height: 52px;
    border: none;
    background: ${primary.main} ;
    font-size: 16px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
    font-weight: bold;
    color: #FFFFFF;
    border-radius: 4px;
    transition: background 0.2s ease-in;

    &:hover {
      background: ${primary.light};
    }

    &:active {
      background: ${primary.dark};
    }

    &[disabled] {
      background: #CCC;
      cursor: default;
    }
  `}
`;
