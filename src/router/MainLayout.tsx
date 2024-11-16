import { ScrollRestoration, Outlet } from 'react-router-dom';
import { Main } from '../components/Layout';

const MainLayout = () => {
  return (
    <>
      <ScrollRestoration />
      <Main>
        <Outlet />
      </Main>
    </>
  );
};

export default MainLayout;
