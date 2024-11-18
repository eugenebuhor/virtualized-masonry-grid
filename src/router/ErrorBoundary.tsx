import { useRouteError, isRouteErrorResponse, Link } from 'react-router-dom';
import styled from 'styled-components';
import { Main, Section } from '../components/Layout.tsx';

const Message = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSize.h1};
`;

const Description = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.h5};
`;

const Details = styled.pre`
  color: ${({ theme }) => theme.palette.text.secondary};
  white-space: pre-wrap;
`;

const ErrorBoundary = () => {
  const error = useRouteError();
  let errorMessage: string;

  if (isRouteErrorResponse(error)) {
    errorMessage = `Error ${error.status}: ${error.statusText}`;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else {
    errorMessage = 'An unknown error occurred';
  }

  return (
    <Main>
      <Section>
        <Link to="/">←&nbsp;&nbsp;&nbsp;Back to Home</Link>
        <Message>Oops!</Message>
        <Description>An unexpected error has occurred.</Description>
        <Details>{errorMessage}</Details>
      </Section>
    </Main>
  );
};

export default ErrorBoundary;
