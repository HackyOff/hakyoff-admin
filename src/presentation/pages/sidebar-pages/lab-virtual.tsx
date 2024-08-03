// VirtualLabs.tsx
import React from 'react';
import { useState } from 'react';
import { Navbar } from '../../components/dashboard-components/navbar/navbar';
import { Sidebar } from '../../components/dashboard-components/sidebar/sidebar'; 
import { useAuth } from '@/context/auth-context';
import { ROUTE_TRAININGS } from '@/utils/sidebar-utils';
import { ListLabs } from '@/presentation/components/dashboard-components/list-labs/list-labs';
import { FaCartPlus } from 'react-icons/fa6';

export const VirtualLabs: React.FC = () => {

  document.title = 'Laboratórios Virtuais | HakyOff Academy'

  const [isOpen, setIsOpen] = useState(true); // Definir o estado isOpen aqui
  const { userSettings } = useAuth()
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // const navigate = useNavigate()

  return (
    <div className={`${userSettings.darkMode ? 'dark' : ''}`}>
      <Navbar />
      <Sidebar toggleSidebar={toggleSidebar} isOpen={isOpen} /> {/* Passar isOpen para Sidebar */}
      <div className={`min-h-screen p-4 sm:pt-20 ${isOpen ? 'sm:ml-[14rem]' : 'sm:ml-[4rem]'} transition-all duration-300 bg-gray-100 dark:bg-gray-900`}>

        <br />
        <div className="flex dark:bg-slate-100/20 dark:text-white justify-between w-full px-5 py-6 bg-white rounded-lg shadow">
          <h2 className="sm:text-3xl text-2xl font-bold hacker">Labs Virtuais</h2>

          {
            /*
<Button
            text='Comprar treinamento'
            onClick={() => window.location.href = ROUTE_TRAININGS}
            color='primary'
            className='click hidden sm:block'
          />

            */
          }

          <button className='click sm:hidden' onClick={() => window.location.href = ROUTE_TRAININGS}>
            <FaCartPlus className='my-auto dark:text-white text-black text-3xl sm:text-4xl' />
          </button>
        </div>
        <br />


        <ListLabs />


      </div>
    </div>
  )
}; 