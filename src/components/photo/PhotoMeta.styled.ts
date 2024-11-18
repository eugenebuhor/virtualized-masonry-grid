import styled from 'styled-components';

export const Caption = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.caption};
`;

export const Title = styled.h2`
  margin-top: 0;
  font-size: ${({ theme }) => theme.typography.fontSize.h2};
  font-family: ${({ theme }) => theme.typography.fontFamily.title};
`;

export const Description = styled.p`
  padding: 1rem;
  background-color: ${({ theme }) => theme.palette.surface.secondary};
  font-size: ${({ theme }) => theme.typography.fontSize.body1};
  border-radius: ${({ theme }) => theme.border.radius.sm};
`;
