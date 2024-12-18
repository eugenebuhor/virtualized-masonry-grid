import { useQuery } from '@tanstack/react-query';
import { getPhoto } from '../../api/pexels.ts';
import type { GetPhotoParams, GetPhotoResponse } from '../../types/pexels.ts';

export const usePhoto = (params: GetPhotoParams, options?: { enabled?: boolean }) => {
  return useQuery<GetPhotoResponse, Error>({
    queryKey: ['photo', params.id],
    queryFn: () => getPhoto(params),
    enabled: options?.enabled !== false,
  });
};
