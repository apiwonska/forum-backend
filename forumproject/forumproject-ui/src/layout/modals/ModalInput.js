import styled from 'styled-components';

import theme from 'layout/theme';

export default styled.input`
  border-width: 0;
  border-bottom: 0.2rem solid ${theme.colors.neutralDark};
  background-color: transparent;
  font-family: ${theme.fonts.default};
  font-size: 1.6rem;
  color: ${theme.colors.black};
  height: 2.7rem;

  &[value='']:not(:focus) {
    border-bottom: 0.2rem solid ${theme.colors.neutralLight};
  }

  &:invalid {
    box-shadow: none;
  }

  &,
  &:hover,
  &:focus,
  &:active {
    transition-delay: 9999s;
    transition-property: background-color, color;
  }
`;
