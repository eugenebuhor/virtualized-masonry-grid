import { PhotoSizeType } from '../types/pexels.ts';

export const getPhotoSrcSet = (
  photoSrc: { [key in PhotoSizeType]: string },
  include: PhotoSizeType[],
): string => {
  const srcEntries = Object.entries(photoSrc)
    .filter(([key]) => include.includes(key as PhotoSizeType))
    .map(([, url]) => {
      const dimensionMatch = url.match(/w=(\d+)/) || url.match(/h=(\d+)/);
      const dimension = dimensionMatch ? `${dimensionMatch[1]}w` : null;
      return dimension ? `${url} ${dimension}` : null;
    })
    .filter(Boolean);

  return srcEntries.join(', ');
};
