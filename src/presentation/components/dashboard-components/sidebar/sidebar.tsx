import React, { useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { SideBarUtils } from '../../../../utils/sidebar-utils';
import { BiSolidLogOut } from 'react-icons/bi';
import { useAuth } from '../../../../context/auth-context';
import { NavLink } from 'react-router-dom';



interface SidebarProps {
    toggleSidebar?: () => void;
    toggleDarkMode?: () => void;
    darkMode?: boolean;
    isOpen: boolean; // Adicione a prop isOpen aqui
}



export const Sidebar: React.FC<SidebarProps> = ({ toggleSidebar, isOpen }) => {


    const [active, setActive] = useState(sessionStorage.getItem('menu'))
    const { logout } = useAuth(); // Adicione a função de logout aqui

    const handleLogout = async () => {
        try {
            await logout();
            sessionStorage.removeItem('menu')
        } catch (error) {
            console.error('Erro ao fazer logout:', error);
        }
    };


    function setActiveMenu(e: string) {
        sessionStorage.setItem('menu', e)
        setActive(e)
    }

    return (
        <div className={`sm:fixed sidebar flex sm:flex-col top-0 hover:overflow-y-auto left-0 sm:h-full ${isOpen ? 'sm:w-[10rem]' : 'sm:w-16'} bg-white dark:bg-gray-800 text-white transition-all duration-300`}>
            <div className="flex hidden sm:block items-center justify-between p-4">
                <h1 className={`text-lg font-bold ${!isOpen && 'hiddenn'}`}>Dashboard </h1>

            </div>
            <ul className="mt-4 sm:mt-6   mt-[4rem]  sm:flex-col   flex  flex-row w-full">
                <li onClick={toggleSidebar} className="flex hidden sm:block sm:flex-col items-center p-4 cursor-pointer n">
                    <button className="text-black dark:text-white focus:outline-none">
                        {isOpen ? <FaArrowLeft /> : <FaArrowRight />}
                    </button>
                </li>

                {
                    SideBarUtils.map((menu, i) => (
                        <NavLink onClick={() => setActiveMenu(menu.link)} to={menu.link} key={i} className={`  flex justify-center sm:justify-start sm:flex-row flex-col items-center sm:p-4 p-2  sm:w-full  cursor-pointer ${active === menu.link ? ' bg-primary dark:text-black  active:text-white  hover:text-white' : ' dark:text-white  hover:text-white active:text-black'}  text-black click-sidebar`}>
                            <menu.icon className="sm:mr-4" />
                            <span className='text-[8px] sm:text-[14px] 2xl:text-[18px] text-center hidden sm:block'>{isOpen && menu.text}</span>
                        </NavLink>

                    ))
                }

                <li onClick={handleLogout} className="flex text-[8px] sm:text-[14px] 2xl:text-[18px] items-center p-4 text-black cursor-pointer dark:text-white click-sidebar">
                    <BiSolidLogOut className="sm:mr-4 hidden  sm:block" />
                    {isOpen && 'Sair'}
                </li>
                {
                    /*
                        <li onClick={toggleDarkMode} className="flex items-center p-4 cursor-pointer click-sidebar">
                        <button className="flex items-center focus:outline-none">
                            {darkMode ? <FaSun className="mr-4" /> : <FaMoon className="mr-4" />}
                            {isOpen && (darkMode ? 'Claro' : 'Escuro')}
                        </button>
                    </li>
                    */
                }
            </ul>
        </div>
    );
};
