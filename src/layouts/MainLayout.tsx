import { Outlet } from 'react-router';
import Header from '../components/Header';
import { FC } from 'react';

export const MainLayout: FC = () => {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};
