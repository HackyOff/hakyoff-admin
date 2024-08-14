// VirtualLabs.tsx
import React from 'react';
import { useState } from 'react';
import { Navbar } from '../../components/dashboard-components/navbar/navbar';
import { Sidebar } from '../../components/dashboard-components/sidebar/sidebar';
import { useAuth } from '@/context/auth-context';
import { ROUTE_TRAININGS } from '@/utils/sidebar-utils';
import { FaCartPlus } from 'react-icons/fa6';
import { AddLabForm } from '../admin-pages/add-labs';
import { ListLabs } from '@/presentation/components/dashboard-components/list-labs/list-labs';
import { Button } from '@/presentation/components';

export const VirtualLabs: React.FC = () => {

  document.title = 'Laboratórios Virtuais | HakyOff Academy'
  const [viewLabs, setViewLabs] = useState(true)

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
      <div className={`min-h-screen p-4 sm:pt-20 ${isOpen ? 'sm:ml-[10rem]' : 'sm:ml-[4rem]'} transition-all duration-300 bg-gray-100 dark:bg-gray-900`}>

        <br />
        <div className="flex justify-between w-full px-5 py-6 bg-white rounded-lg shadow dark:bg-slate-100/20 dark:text-white">
          <div className="flex justify-between w-full"> 
             <h2 className="text-2xl font-bold sm:text-3xl hacker">Labs Virtuais</h2>

            <Button color='primary' onClick={() => setViewLabs(!viewLabs)} text={viewLabs ? 'Criar Lab' : ' Ver Labs'} />
          </div>
          {
            /*
<Button
            text='Comprar treinamento'
            onClick={() => window.location.href = ROUTE_TRAININGS}
            color='primary'
            className='hidden click sm:block'
          />
            */
          }

          <button className='click sm:hidden' onClick={() => window.location.href = ROUTE_TRAININGS}>
            <FaCartPlus className='my-auto text-3xl text-black dark:text-white sm:text-4xl' />
          </button>
        </div>
        <br />

        {
          viewLabs ?

            <ListLabs />
            :

            <AddLabForm />

        }

      </div>
    </div>
  )
}; 