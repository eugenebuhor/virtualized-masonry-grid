import { Link, useSearchParams } from 'react-router-dom';
import styled, { useTheme } from 'styled-components';
import Image from '../components/Image.tsx';
import VirtualizedMasonryGrid from '../components/VirtualizedMasonryGrid.tsx';
import { Main, Section } from '../components/Layout.tsx';
import { usePhotos } from '../hooks/usePhotos.ts';
import { getPhotoSrcSet } from '../utils/pexels.ts';
import type { ColumnsConfig } from '../types/masonry.ts';

const masonryGridColumns: ColumnsConfig = {
  mobile: 2,
  tablet: 3,
  largeScreen: 4,
};

const ImageWrapper = styled.div<{ $aspectRatio: number }>`
  display: block;
  width: 100%;
  border-radius: ${(props) => props.theme.border.radius.md};
  padding-bottom: ${(props) => props.$aspectRatio * 100}%;
  position: relative;

  transition: transform 0.2s ease-in-out;
  overflow: hidden;

  &:hover {
    transform: scale(1.015);
  }
`;

const GalleryPage = () => {
  const theme = useTheme();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  const { data, isLoading, isError } = usePhotos({
    query,
    page: 1,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading photos.</div>;
  }

  const photos = data?.pages.flatMap((page) => page.photos) || [];

  if (!photos.length) {
    return <div>No photos found.</div>;
  }

  return (
    <Main>
      <Section>
        <VirtualizedMasonryGrid items={photos} columns={masonryGridColumns} gap={16} overscan={8}>
          {(photo) => {
            const srcSet = getPhotoSrcSet(photo.src, ['small', 'medium', 'large', 'large2x']);
            const sizes = `
              ${theme.viewport.mediaQueries.mobile} calc(100vw / ${masonryGridColumns.mobile}),
              ${theme.viewport.mediaQueries.tablet} calc(100vw / ${masonryGridColumns.tablet}),
              ${theme.viewport.mediaQueries.laptop} calc(100vw / ${masonryGridColumns.laptop}),
              ${theme.viewport.mediaQueries.largeScreen} calc(100vw / ${masonryGridColumns.largeScreen}),
              100vw
            `;

            return (
              <Link to={`/gallery/${photo.id}`} state={photo}>
                <ImageWrapper $aspectRatio={photo.height / photo.width} key={photo.id}>
                  <Image
                    src={photo.src.medium}
                    placeholderSrc={photo.src.small}
                    alt={photo.alt}
                    srcSet={srcSet}
                    sizes={sizes}
                    fill
                  />
                </ImageWrapper>
              </Link>
            );
          }}
        </VirtualizedMasonryGrid>
      </Section>
    </Main>
  );
};

export default GalleryPage;
