import React, { useState } from 'react';
import { useAuth } from '@/context/auth-context';
import { Navbar } from '@/presentation/components/dashboard-components/navbar/navbar';
import { Sidebar } from '@/presentation/components/dashboard-components/sidebar/sidebar';
import AddTrainerPage from '../admin-pages/add-trainer';


export const TrainersPage: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const { userSettings } = useAuth();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`${userSettings.darkMode ? 'dark' : ''}`}>
      <Navbar />
      <Sidebar toggleSidebar={toggleSidebar} isOpen={isOpen} />
      <div className={`min-h-screen p-4 sm:pt-20 ${isOpen ? 'sm:ml-[10rem]' : 'sm:ml-[4rem]'} transition-all duration-300 bg-gray-100 dark:bg-gray-900`}>
        <AddTrainerPage />
      </div>
    </div>
  );
};
