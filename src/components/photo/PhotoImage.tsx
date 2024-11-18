import Image from '../Image.tsx';
import { ImageBackground, ImageContainer, ImageWrapper } from './PhotoImage.styled.ts';

interface PhotoImageProps {
  height: number;
  width: number;
  src: string;
  alt: string;
  srcSet: string;
  color: string;
}

const PhotoImage = ({ height, width, src, alt, srcSet, color }: PhotoImageProps) => {
  const aspectRatio = height / width || 1;

  return (
    <ImageBackground $bgColor={color}>
      <ImageContainer $aspectRatio={aspectRatio}>
        <ImageWrapper $aspectRatio={aspectRatio}>
          <Image
            src={src}
            alt={alt}
            srcSet={srcSet}
            placeholderColor={color}
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
