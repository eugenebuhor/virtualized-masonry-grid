import React from 'react';
import { useRouteError, isRouteErrorResponse } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

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

const ErrorBoundary: React.FC = () => {
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
    <Container>
      <Message>Oops!</Message>
      <Description>An unexpected error has occurred.</Description>
      <Details>{errorMessage}</Details>
    </Container>
  );
};

export default ErrorBoundary;
