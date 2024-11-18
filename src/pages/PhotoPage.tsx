import { useTheme } from 'styled-components';
import { useLocation, useParams, type Location } from 'react-router';
import { usePhoto } from '../hooks/query/usePhoto.ts';
import PhotoImage from '../components/photo/PhotoImage.tsx';
import type { Photo } from '../types/pexels.ts';
import { Main, Section } from '../components/Layout.tsx';
import PhotoMeta from '../components/photo/PhotoMeta.tsx';
import useMediaQuery from '../hooks/useMediaQuery.ts';
import NavBack from '../components/photo/NavBack.tsx';

const NoResultFallback = () => {
  return (
    <Main>
      <Section>
        <div>Cannot find photo.</div>
      </Section>
    </Main>
  );
};

const LoadingFallback = () => {
  return (
    <Main>
      <Section>
        <div>Loading...</div>
      </Section>
    </Main>
  );
};

const ErrorFallback = ({ refetch }: { refetch: () => void }) => {
  return (
    <Main>
      <Section>
        <div>
          <h2>Unable to Load Photo</h2>
          <p>There was an error while loading the photo. Please try again.</p>
          <button type="button" onClick={() => refetch()}>
            Retry
          </button>
        </div>
      </Section>
    </Main>
  );
};

const PhotoPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.viewport.mediaQueries.mobile);
  const { photoId } = useParams();
  const { state } = useLocation() as Location<{ data: Photo; query?: string } | null>;
  const { data, isLoading, isError, refetch } = usePhoto(
    { id: parseInt(photoId!) },
    { enabled: !state?.query },
  );

  const photo = state?.data || data;

  if (isLoading) {
    return <LoadingFallback />;
  }

  if (isError) {
    return <ErrorFallback refetch={refetch} />;
  }

  if (!photo) {
    return <NoResultFallback />;
  }

  return (
    <>
      <NavBack query={state?.query} photoId={photo.id} />

      <Main $columns={isMobile ? 1 : 2}>
        <Section>
          <PhotoImage
            src={photo.src.portrait}
            alt={photo.alt}
            srcSet={`${photo.src.large} 1x, ${photo.src.large2x} 2x`}
            width={photo.width}
            height={photo.height}
            color={photo.avg_color}
          />
        </Section>
        <Section>
          <PhotoMeta photographer={photo.photographer} alt={photo.alt} />
        </Section>
      </Main>
    </>
  );
};

export default PhotoPage;
