import { useInfiniteQuery } from '@tanstack/react-query';
import { searchPhotos, getCuratedPhotos } from '../api/pexels.ts';
import type {
  GetCuratedPhotosParams,
  PhotosResponse,
  SearchPhotosParams,
} from '../types/pexels.ts';

type UsePhotosParams = Partial<SearchPhotosParams & GetCuratedPhotosParams>;

const getPageParamFromApiUrl = (url?: string): number | boolean => {
  if (!url) return false;

  const params = new URLSearchParams(new URL(url).search);
  return Number(params.get('page'));
};

export const usePhotos = (params: UsePhotosParams) => {
  const { query, page, ...restParams } = params;

  return useInfiniteQuery<PhotosResponse>({
    initialPageParam: page ?? 1,
    queryKey: ['photos', query],
    queryFn: async ({ pageParam = page ?? 1 }) => {
      const apiParams = { ...restParams, page: pageParam as number };

      if (query?.trim()) {
        return searchPhotos({ query: query.trim(), ...apiParams });
      } else {
        return getCuratedPhotos(apiParams);
      }
    },
    getPreviousPageParam: (lastPage) => getPageParamFromApiUrl(lastPage.prev_page) ?? false,
    getNextPageParam: (lastPage) => getPageParamFromApiUrl(lastPage.next_page) ?? false,
  });
};
