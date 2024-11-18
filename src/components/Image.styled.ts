import styled, { css } from 'styled-components';

interface ImageContainerProps {
  $width?: number;
  $height?: number;
  $fill?: boolean;
  $placeholderColor?: string;
  $objectFit: string;
}

const FillCss = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const FixedSizeCss = css<Pick<ImageContainerProps, '$width' | '$height'>>`
  width: ${({ $width }) => $width}px;
  height: ${({ $height }) => $height}px;
`;

export const ImageContainer = styled.div<ImageContainerProps>`
  position: relative;
  ${(props) =>
    props.$placeholderColor &&
    css`
      background-color: ${props.$placeholderColor || props.theme.palette.surface.secondary};
    `}

  ${(props) => (props.$fill ? FillCss : props.$width && props.$height ? FixedSizeCss : '')}
`;

interface ImgProps {
  $objectFit: string;
  $loaded: boolean;
}

export const Img = styled.img<ImgProps>`
  ${FillCss};
  object-fit: ${({ $objectFit }) => $objectFit};

  opacity: ${({ $loaded }) => ($loaded ? 1 : 0)};
  transition: opacity 0.3s ease-in-out;
`;

interface PlaceholderImgProps {
  $objectFit: string;
}

export const PlaceholderImg = styled.img<PlaceholderImgProps>`
  ${FillCss};
  object-fit: ${({ $objectFit }) => $objectFit};
  z-index: -1;
  opacity: 1;
`;
