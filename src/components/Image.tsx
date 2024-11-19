import { type SyntheticEvent, type ImgHTMLAttributes, useState, forwardRef } from 'react';
import { ImageContainer, Img, PlaceholderImg } from './Image.styled.ts';

interface CommonImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  /**
   * Image source URL.
   */
  src: string;

  /**
   * Alternative text for the image.
   */
  alt: string;

  /**
   * Optional placeholder image source URL.
   */
  placeholderSrc?: string;

  /**
   * Optional placeholder background color.
   */
  placeholderColor?: string;

  /**
   * Fixed width for the image in pixels.
   */
  width?: number;

  /**
   * Fixed height for the image in pixels.
   */
  height?: number;

  /**
   * Enables the image to fill its container within aspect ratio.
   */
  fill?: boolean;

  /**
   * Event handler triggered when the image successfully loads.
   */
  onLoad?: (event: SyntheticEvent<HTMLImageElement, Event>) => void;

  /**
   * Event handler triggered when the image fails to load.
   */
  onError?: (event: SyntheticEvent<HTMLImageElement, Event>) => void;

  /**
   * Image fit within its container.
   */
  objectFit?: 'contain' | 'cover';
}

interface PlaceholderSrc {
  placeholderSrc?: string;
  placeholderColor?: never;
}

interface PlaceholderColor {
  placeholderColor?: string;
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
        <PlaceholderImg
          data-testid="image placeholder"
          src={placeholderSrc}
          $objectFit={objectFit}
          alt=""
        />
      ) : null}
      <Img
        data-testid="image"
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
