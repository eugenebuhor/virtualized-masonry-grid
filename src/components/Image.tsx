import { type SyntheticEvent, type ImgHTMLAttributes, useState, forwardRef } from 'react';
import { ImageContainer, Img, PlaceholderImg } from './Image.styled.ts';

interface CommonImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  placeholderSrc?: string;
  placeholderColor?: string;
  onLoad?: (event: SyntheticEvent<HTMLImageElement, Event>) => void;
  onError?: (event: SyntheticEvent<HTMLImageElement, Event>) => void;
  objectFit?: 'contain' | 'cover';
}

interface PlaceholderSrc {
  placeholderSrc: string;
  placeholderColor?: never;
}

interface PlaceholderColor {
  placeholderColor: string;
  placeholderSrc?: never;
}

interface FixedSizeProps {
  width: number;
  height: number;
  fill?: never;
}

interface FillProps {
  fill: boolean;
  width?: never;
  height?: never;
}

type ImageProps = CommonImageProps &
  (FixedSizeProps | FillProps) &
  (PlaceholderSrc | PlaceholderColor);

const Image = forwardRef<HTMLDivElement, ImageProps>((props, ref) => {
  const {
    placeholderSrc,
    placeholderColor,
    width,
    height,
    fill,
    onLoad,
    loading = 'lazy',
    decoding = 'async',
    fetchPriority = 'auto',
    objectFit = 'cover',
    ...rest
  } = props;

  const [loaded, setLoaded] = useState(false);

  const handleLoad = (event: SyntheticEvent<HTMLImageElement, Event>) => {
    setLoaded(true);
    if (onLoad) {
      onLoad(event);
    }
  };

  return (
    <ImageContainer
      ref={ref}
      $width={width}
      $height={height}
      $fill={fill}
      $placeholderColor={placeholderColor}
      $objectFit={objectFit}
    >
      {placeholderSrc ? (
        <PlaceholderImg src={placeholderSrc} $objectFit={objectFit} alt="" />
      ) : null}
      <Img
        loading={loading}
        decoding={decoding}
        fetchPriority={fetchPriority}
        onLoad={handleLoad}
        $loaded={loaded}
        $objectFit={objectFit}
        {...rest}
      />
    </ImageContainer>
  );
});

export default Image;
