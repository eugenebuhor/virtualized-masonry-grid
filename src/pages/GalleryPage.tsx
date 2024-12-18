import { useCallback, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { type Location, useLocation } from 'react-router';
import { useTheme } from 'styled-components';
import VirtualizedMasonryGrid from '../components/VirtualizedMasonryGrid.tsx';
import GalleryImage from '../components/gallery/GalleryImage.tsx';
import { Main, Section } from '../components/Layout.tsx';
import { usePhotos } from '../hooks/query/usePhotos.ts';
import { getPhotoSrcSet } from '../utils/pexels.ts';
import type { GridColumnsConfig } from '../types/masonry.ts';

const masonryGridColumns: GridColumnsConfig = {
  mobile: 2,
  tablet: 3,
  laptop: 4,
};

const NoResultsFallback = () => {
  return (
    <Main>
      <Section>
        <div>No photos found.</div>
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
          <h2>Unable to Load Photos</h2>
          <p>There was an error while loading the photos. Please try again.</p>
          <button type="button" onClick={() => refetch()}>
            Retry
          </button>
        </div>
      </Section>
    </Main>
  );
};

const GalleryPage = () => {
  const theme = useTheme();
  const [searchParams] = useSearchParams();
  const { state } = useLocation() as Location<{ itemToScroll: number } | null>;
  const itemToScroll = state?.itemToScroll;
  const query = searchParams.get('query') || '';

  const { data, isLoading, isError, refetch, hasNextPage, fetchNextPage } = usePhotos({
    query,
  });

  const photos = useMemo(() => data?.pages.flatMap((page) => page.photos) || [], [data?.pages]);

  const loadMore = useCallback(() => {
    if (hasNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, fetchNextPage]);

  if (isLoading) {
    return <LoadingFallback />;
  }

  if (isError) {
    return <ErrorFallback refetch={refetch} />;
  }

  const indexToScroll = itemToScroll
    ? photos.findIndex((photo) => photo.id === itemToScroll)
    : undefined;

  if (!photos.length) {
    return <NoResultsFallback />;
  }

  return (
    <Main>
      <Section>
        <VirtualizedMasonryGrid
          items={photos}
          columns={masonryGridColumns}
          loadMore={loadMore}
          hasMore={hasNextPage}
          gap={16}
          overscan={4}
          indexToScroll={indexToScroll}
          // Turn on if performance issues occur
          throttledScroll={false}
        >
          {(photo) => (
            <Link
              to={`/photo/${photo.id}`}
              state={{ data: photo, query }}
              aria-label={`View photo: ${photo.alt}`}
            >
              <GalleryImage
                src={photo.src.portrait}
                color={photo.avg_color}
                alt={photo.alt}
                height={photo.height}
                width={photo.width}
                srcSet={getPhotoSrcSet(photo.src, ['tiny', 'small', 'medium', 'large', 'portrait'])}
                mediaQueries={theme.viewport.mediaQueries}
                columns={masonryGridColumns}
              />
            </Link>
          )}
        </VirtualizedMasonryGrid>
      </Section>
    </Main>
  );
};

export default GalleryPage;
