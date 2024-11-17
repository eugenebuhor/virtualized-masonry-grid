import Image from '../Image.tsx';
import { ImageBackground, ImageContainer, ImageWrapper } from './PhotoImage.styled.ts';

interface PhotoImageProps {
  height: number;
  width: number;
  src: string;
  alt: string;
  srcSet: string;
  placeholderSrc: string;
  bgColor: string;
}

const PhotoImage = ({
  height,
  width,
  src,
  alt,
  srcSet,
  placeholderSrc,
  bgColor,
}: PhotoImageProps) => {
  const aspectRatio = height / width || 1;

  return (
    <ImageBackground $bgColor={bgColor}>
      <ImageContainer $aspectRatio={aspectRatio}>
        <ImageWrapper $aspectRatio={aspectRatio}>
          <Image
            src={src}
            alt={alt}
            srcSet={srcSet}
            placeholderSrc={placeholderSrc}
            fill
            loading="eager"
            fetchPriority="high"
            objectFit="contain"
          />
        </ImageWrapper>
      </ImageContainer>
    </ImageBackground>
  );
};

export default PhotoImage;
