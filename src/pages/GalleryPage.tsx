import { useCallback } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
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
  const query = searchParams.get('query') || '';
  const page = searchParams.get('page') || '1';
  const { data, isLoading, isError, refetch, hasNextPage, fetchNextPage } = usePhotos({
    query,
    page: parseInt(page, 10),
  });

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

  const photos = data?.pages.flatMap((page) => page.photos) || [];

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
        >
          {(photo) => (
            <Link to={`/photo/${photo.id}`} state={photo}>
              <GalleryImage
                src={photo.src.portrait}
                placeholderSrc={photo.src.small}
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
