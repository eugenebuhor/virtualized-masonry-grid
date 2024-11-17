import { ScrollRestoration, Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <>
      <ScrollRestoration />
      <Outlet />
    </>
  );
};

export default MainLayout;
