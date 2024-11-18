import { ScrollRestoration, Outlet } from 'react-router-dom';
import Header from '../components/Header.tsx';

const MainLayout = () => {
  return (
    <>
      <ScrollRestoration />

      <Header />
      <Outlet />
    </>
  );
};

export default MainLayout;
