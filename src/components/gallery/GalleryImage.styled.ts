import styled from 'styled-components';

export const ImageWrapper = styled.div<{ $aspectRatio: number }>`
  position: relative;
  display: block;
  width: 100%;
  height: 0;
  padding-bottom: ${(props) => props.$aspectRatio * 100}%;

  border-radius: ${(props) => props.theme.border.radius.md};
  overflow: hidden;

  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.015);
  }
`;
