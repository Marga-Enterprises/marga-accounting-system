import { useState } from 'react';
import Navbar from '@components/layout/Navbar';
import Sidebar from '@components/layout/Sidebar';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <Navbar onMenuClick={() => setSidebarOpen(true)} />
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <Outlet />
    </>
  );
};

export default MainLayout;
