import styled from 'styled-components';

import theme from 'layout/theme';

export const PageWrapper = styled.div`
  background-color: ${theme.colors.white};
  flex-grow: 1;
`;

export const ContentWrapper = styled.div`
  margin: 4rem auto;
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ErrorMessage = styled.div`
  font-size: 2.6rem;
  text-align: center;
  margin-bottom: 2rem;
`;

export const ErrorExplanation = styled.div`
  font-size: 1.6rem;
  text-align: justify;
  margin-bottom: 3rem;
`;

export const PictureWrapper = styled.div`
  max-width: 40rem;
  margin: 3rem auto;
`;
