import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const MainLayout = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Navbar />

      <div className="main-content w-full lg:w-5/6">
        <Outlet /> 
      </div>
    </div>
  );
};

export default MainLayout;