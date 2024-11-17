import styled from 'styled-components';
import { useLocation, useParams, type Location } from 'react-router';
import { usePhoto } from '../hooks/usePhoto.ts';
import PhotoImage from '../components/photo/PhotoImage.tsx';
import type { Photo } from '../types/pexels.ts';
import { Main, Section } from '../components/Layout.tsx';
import PhotoMeta from '../components/photo/PhotoMeta.tsx';

const StyledMain = styled(Main)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 2rem;

  @media ${({ theme }) => theme.viewport.mediaQueries.tablet} {
    flex-direction: row;
  }
`;

const ImageSection = styled(Section)`
  display: flex;
  flex-direction: column;
  align-content: flex-start;
  margin: unset;
`;

const MetaSection = styled(Section)`
  display: flex;
  flex-direction: column;
  align-content: flex-start;
  margin: unset;
`;

const PhotoPage = () => {
  const { state } = useLocation() as Location<Photo | null>;
  const { photoId } = useParams();
  const { data } = usePhoto({ id: parseInt(photoId!) }, { enabled: !state });

  const photo = state || data;

  if (!photo) {
    return <div>Photo not found.</div>;
  }

  console.log('Photo', photo);

  return (
    <StyledMain>
      <ImageSection>
        <PhotoImage
          src={photo.src.portrait}
          placeholderSrc={photo.src.small}
          alt={photo.alt}
          srcSet={`${photo.src.large} 1x, ${photo.src.large2x} 2x`}
          width={photo.width}
          height={photo.height}
          bgColor={photo.avg_color}
        />
      </ImageSection>
      <MetaSection>
        <PhotoMeta photographer={photo.photographer} alt={photo.alt} />
      </MetaSection>
    </StyledMain>
  );
};

export default PhotoPage;
