import { lazy, Suspense } from 'react';
import { type RouteObject, Navigate } from 'react-router-dom';
import MainLayout from './MainLayout';

const GalleryPage = lazy(() => import('../pages/GalleryPage.tsx'));

const routes: RouteObject[] = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <GalleryPage />
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
