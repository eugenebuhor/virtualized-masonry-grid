import {
  type SyntheticEvent,
  type ImgHTMLAttributes,
  useState,
  forwardRef,
  useEffect,
} from 'react';
import { StyledImage } from './Image.styled.ts';

interface CommonImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  placeholderSrc?: string;
  onLoad?: (event: Event | SyntheticEvent<HTMLImageElement, Event>) => void;
  onError?: (event: (Event | string) | SyntheticEvent<HTMLImageElement, Event>) => void;
}

interface FixedSizeImageProps extends CommonImageProps {
  width: number;
  height: number;
  fill?: never;
}

interface FillImageProps extends CommonImageProps {
  fill: boolean;
  width?: never;
  height?: never;
}

type ImageProps = FixedSizeImageProps | FillImageProps;

const ImageComponent = forwardRef<HTMLImageElement, ImageProps>((props, ref) => {
  const {
    src,
    width,
    height,
    fill,
    sizes,
    srcSet,
    placeholderSrc,
    onLoad,
    onError,
    loading = 'lazy',
    decoding = 'async',
    fetchPriority = 'auto',
    ...rest
  } = props;

  const [loaded, setLoaded] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(placeholderSrc || '');

  useEffect(() => {
    const img = new Image();
    img.src = src;
    if (srcSet) {
      img.srcset = srcSet;
    }

    img.onload = (event: Event) => {
      setCurrentSrc(src);
      setLoaded(true);
      if (onLoad) {
        onLoad(event);
      }
    };

    img.onerror = (event: Event | string) => {
      if (onError) {
        onError(event);
      }
    };
  }, [src, srcSet, onLoad, onError]);

  return (
    <StyledImage
      src={currentSrc}
      srcSet={loaded ? srcSet : undefined}
      sizes={loaded ? sizes : undefined}
      width={!fill ? width : undefined}
      height={!fill ? height : undefined}
      ref={ref}
      loading={loading}
      decoding={decoding}
      fetchPriority={fetchPriority}
      {...rest}
      $fill={fill}
      $blurred={Boolean(placeholderSrc) && !loaded}
    />
  );
});

export default ImageComponent;
