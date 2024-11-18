import { lazy, Suspense } from 'react';
import { type RouteObject, Navigate } from 'react-router-dom';
import MainLayout from './MainLayout.tsx';
import ErrorBoundary from './ErrorBoundary.tsx';
import SuspenseFallback from './SuspenseFallback.tsx';

const GalleryPage = lazy(() => import('../pages/GalleryPage.tsx'));
const GalleryPhotoPage = lazy(() => import('../pages/PhotoPage.tsx'));

const routes: RouteObject[] = [
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<SuspenseFallback />}>
            <GalleryPage />
          </Suspense>
        ),
      },
      {
        path: '/photo/:photoId',
        element: (
          <Suspense fallback={<SuspenseFallback />}>
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
