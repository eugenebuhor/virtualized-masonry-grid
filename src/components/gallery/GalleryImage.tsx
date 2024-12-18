import Image from '../Image.tsx';
import { ImageWrapper } from './GalleryImage.styled.ts';
import type { Viewport } from '../../types/theme.ts';
import type { GridColumnsConfig } from '../../types/masonry.ts';

interface GalleryImageProps {
  src: string;
  height: number;
  width: number;
  alt: string;
  srcSet: string;
  color: string;
  mediaQueries: Viewport['mediaQueries'];
  columns: GridColumnsConfig;
}

const GalleryImage = ({
  src,
  height,
  width,
  alt,
  color,
  srcSet,
  mediaQueries,
  columns,
}: GalleryImageProps) => {
  const sizes = `
    calc(100vw / ${columns.mobile}),
    ${mediaQueries.tablet} calc(100vw / ${columns.tablet}),
    ${mediaQueries.laptop} calc(100vw / ${columns.laptop}),
    ${mediaQueries.largeScreen} calc(100vw / ${columns.largeScreen})
  `;

  return (
    <ImageWrapper $aspectRatio={height / width || 1}>
      <Image fill src={src} placeholderColor={color} alt={alt} srcSet={srcSet} sizes={sizes} />
    </ImageWrapper>
  );
};

export default GalleryImage;
