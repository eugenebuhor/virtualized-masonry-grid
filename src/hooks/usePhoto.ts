import { useQuery } from '@tanstack/react-query';
import { getPhoto } from '../api/pexels';
import type { GetPhotoParams, GetPhotoResponse } from '../types/pexels';

export const usePhoto = (params: GetPhotoParams) => {
  return useQuery<GetPhotoResponse, Error>({
    queryKey: ['photo', params.id],
    queryFn: () => getPhoto(params),
  });
};
