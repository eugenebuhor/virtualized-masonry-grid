import { useInfiniteQuery } from '@tanstack/react-query';
import { searchPhotos, getCuratedPhotos } from '../../api/pexels.ts';
import type {
  GetCuratedPhotosParams,
  PhotosResponse,
  SearchPhotosParams,
} from '../../types/pexels.ts';

type UsePhotosParams = Partial<SearchPhotosParams & GetCuratedPhotosParams>;

const getPageParamFromApiUrl = (url?: string): number | undefined => {
  if (!url) return undefined;

  const params = new URLSearchParams(new URL(url).search);
  const page = params.get('page');
  return page ? parseInt(page, 10) : undefined;
};

export const usePhotos = (params: UsePhotosParams) => {
  const { query, ...restParams } = params;

  return useInfiniteQuery<PhotosResponse>({
    initialPageParam: 1,
    queryKey: ['photos', query],
    queryFn: async ({ pageParam = 1 }) => {
      const apiParams = { ...restParams, page: pageParam as number };

      if (query?.trim()) {
        return searchPhotos({ query: query.trim(), ...apiParams });
      } else {
        return getCuratedPhotos(apiParams);
      }
    },
    getPreviousPageParam: (lastPage) => getPageParamFromApiUrl(lastPage.prev_page),
    getNextPageParam: (lastPage) => getPageParamFromApiUrl(lastPage.next_page),
  });
};
