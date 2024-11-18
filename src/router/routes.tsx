import { lazy, Suspense } from 'react';
import { type RouteObject, Navigate } from 'react-router-dom';
import MainLayout from './MainLayout';

const GalleryPage = lazy(() => import('../pages/GalleryPage.tsx'));
const GalleryPhotoPage = lazy(() => import('../pages/PhotoPage.tsx'));

const routes: RouteObject[] = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<div>Loading GalleryPage...</div>}>
            <GalleryPage />
          </Suspense>
        ),
      },
      {
        path: '/photo/:photoId',
        element: (
          <Suspense fallback={<div>Loading GalleryPhotoPage...</div>}>
            <GalleryPhotoPage />
          </Suspense>
        ),
      },
      {
        path: '*',
        element: <Navigate to="/" replace />,
      },
    ],
  },
];

export default routes;
