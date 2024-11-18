import { useTheme } from 'styled-components';
import { useLocation, useParams, type Location } from 'react-router';
import { usePhoto } from '../hooks/usePhoto.ts';
import PhotoImage from '../components/photo/PhotoImage.tsx';
import type { Photo } from '../types/pexels.ts';
import { Main, Section } from '../components/Layout.tsx';
import PhotoMeta from '../components/photo/PhotoMeta.tsx';
import useMediaQuery from '../hooks/useMediaQuery.ts';

const PhotoPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.viewport.mediaQueries.mobile);
  const { state } = useLocation() as Location<Photo | null>;
  const { photoId } = useParams();
  const { data } = usePhoto({ id: parseInt(photoId!) }, { enabled: !state });

  const photo = state || data;

  if (!photo) {
    return <div>Photo not found.</div>;
  }

  return (
    <Main $columns={isMobile ? 1 : 2}>
      <Section>
        <PhotoImage
          src={photo.src.portrait}
          placeholderSrc={photo.src.small}
          alt={photo.alt}
          srcSet={`${photo.src.large} 1x, ${photo.src.large2x} 2x`}
          width={photo.width}
          height={photo.height}
          bgColor={photo.avg_color}
        />
      </Section>
      <Section>
        <PhotoMeta photographer={photo.photographer} alt={photo.alt} />
      </Section>
    </Main>
  );
};

export default PhotoPage;
