import axios from 'axios';
import type {
  GetCuratedPhotosParams,
  GetPhotoParams,
  GetPhotoResponse,
  PhotosResponse,
  SearchPhotosParams,
} from '../types/pexels.ts';

const pexelsApi = axios.create({
  baseURL: import.meta.env.VITE_PEXELS_API_URL,
  headers: {
    Authorization: import.meta.env.VITE_PEXELS_API_KEY,
  },
});

export const searchPhotos = async (params: SearchPhotosParams): Promise<PhotosResponse> => {
  const response = await pexelsApi.get<PhotosResponse>('/search', {
    params: {
      page: params.page || 1,
      per_page: params.per_page || 20,
      ...params,
    },
  });

  return response.data;
};

export const getCuratedPhotos = async (params: GetCuratedPhotosParams): Promise<PhotosResponse> => {
  const response = await pexelsApi.get<PhotosResponse>('/curated', {
    params: {
      page: params.page || 1,
      per_page: params.per_page || 20,
    },
  });

  return response.data;
};

export const getPhoto = async (params: GetPhotoParams): Promise<GetPhotoResponse> => {
  const response = await pexelsApi.get(`/photos/${params.id}`);
  return response.data;
};
