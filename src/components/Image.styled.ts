import styled, { css } from 'styled-components';

interface StyledImageContainerProps {
  $width?: number;
  $height?: number;
  $fill?: boolean;
  $placeholderSrc?: string;
  $loaded: boolean;
}

const FillCss = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const DimensionCss = css<Pick<StyledImageContainerProps, '$width' | '$height'>>`
  width: ${({ $width }) => $width}px;
  height: ${({ $height }) => $height}px;
`;

export const StyledImageContainer = styled.div<StyledImageContainerProps>`
  position: relative;
  background-image: url(${({ $placeholderSrc }) => $placeholderSrc});
  background-size: cover;
  background-position: center;

  ${(props) => (props.$fill ? FillCss : props.$width && props.$height ? DimensionCss : '')}
`;

interface StyledImageProps {
  $loaded: boolean;
}

export const StyledImage = styled.img<StyledImageProps>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  opacity: ${({ $loaded }) => ($loaded ? 1 : 0)};
  transition: opacity 0.3s ease-in-out;
`;
