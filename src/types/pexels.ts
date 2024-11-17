export enum PhotoSize {
  Original = 'original',
  Large2x = 'large2x',
  Large = 'large',
  Medium = 'medium',
  Small = 'small',
  Portrait = 'portrait',
  Landscape = 'landscape',
  Tiny = 'tiny',
}

export type PhotoSizeType = `${PhotoSize}`;

export interface Photo {
  id: number;
  width: number;
  height: number;
  url: string;
  photographer: string;
  src: { [key in PhotoSizeType]: string };
  alt: string;
  avg_color: string;
}

/* API */

export interface SearchPhotosParams {
  query: string;
  page?: number;
  per_page?: number;
}

export interface GetCuratedPhotosParams {
  page?: number;
  per_page?: number;
}

export interface GetPhotoParams {
  id: number;
}

export interface PhotosResponse {
  photos: Photo[];
  page: number;
  per_page: number;
  next_page?: string;
  prev_page?: string;
  total_results: number;
}

export type GetPhotoResponse = Photo;
