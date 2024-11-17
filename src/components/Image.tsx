import { type SyntheticEvent, type ImgHTMLAttributes, useState, forwardRef } from 'react';
import { StyledImageContainer, StyledImage } from './Image.styled.ts';

interface CommonImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  placeholderSrc?: string;
  onLoad?: (event: SyntheticEvent<HTMLImageElement, Event>) => void;
  onError?: (event: SyntheticEvent<HTMLImageElement, Event>) => void;
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

const ImageComponent = forwardRef<HTMLDivElement, ImageProps>((props, ref) => {
  const {
    placeholderSrc,
    width,
    height,
    fill,
    onLoad,
    loading = 'lazy',
    decoding = 'async',
    fetchPriority = 'auto',
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
    <StyledImageContainer
      ref={ref}
      $width={width}
      $height={height}
      $fill={fill}
      $placeholderSrc={placeholderSrc}
      $loaded={loaded}
    >
      <StyledImage
        loading={loading}
        decoding={decoding}
        fetchPriority={fetchPriority}
        onLoad={handleLoad}
        $loaded={loaded}
        {...rest}
      />
    </StyledImageContainer>
  );
});

export default ImageComponent;
