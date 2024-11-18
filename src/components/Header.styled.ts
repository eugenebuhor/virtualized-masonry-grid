import styled from 'styled-components';
import { Section } from './Layout.tsx';

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${({ theme }) => theme.layout.headerHeight};
  min-width: ${({ theme }) => theme.layout.minWidth};
`;

export const StyledSection = styled(Section)`
  align-items: center;
`;
