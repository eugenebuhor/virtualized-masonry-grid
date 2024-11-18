import styled from 'styled-components';

export const ImageContainer = styled.div<{ $aspectRatio: number }>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: auto;
  margin-left: auto;

  max-height: 75vh;
  min-height: 300px;
  width: 100%;
  max-width: ${({ $aspectRatio }) => `calc(75vh / ${$aspectRatio})`};

  border-radius: ${(props) => props.theme.border.radius.sm};
  overflow: hidden;
`;

export const ImageWrapper = styled.div<{ $aspectRatio: number }>`
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: ${(props) => props.$aspectRatio * 100}%;
`;

export const ImageBackground = styled.div<{ $bgColor: string }>`
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1;

    background-color: ${(props) => props.$bgColor || props.theme.palette.surface.secondary};
    opacity: 0.2;
  }
`;
