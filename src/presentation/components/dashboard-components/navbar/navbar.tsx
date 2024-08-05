import React, { useState } from 'react';
import { FaBell, FaCog } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { ROUTE_PROFILE } from '@/utils/sidebar-utils';
import { useAuth } from '@/context/auth-context';
import { logos, users } from '@/utils/image-exporter';
import { toHackerName } from '@/utils/to-hacker-name'
import useNotifications from '@/services/notification-service';
import { FaTrash } from 'react-icons/fa6';
//import Switch from "react-switch";



export const Navbar: React.FC = () => {
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const [openNot, setOpenNot] = useState(false);
    const [openSettings, setOpenSettings] = useState(false);
    const { userSettings, updateUserSettings } = useAuth();
    const { sortedNotifications, deleteNotification } = useNotifications(currentUser);



    const handleCheckboxChange = (event: any) => {
        const { name, checked } = event.target;
        updateUserSettings({ [name]: checked }); // Atualiza a propriedade específica nas configurações do usuário
    };

    const handleSaveSettings = () => {
        updateUserSettings(userSettings);
    };

    const userName = currentUser?.displayName?.split(' ').pop() + '_hak' || ''; // Suponha que este seja o nome a ser convertido
    const hackerName = toHackerName(userName);

    return (
        <div className="fixed dark:border-b border-primary/50 left-0 z-50 w-full p-4 overflow-visible text-white bg-gray-900 shadow-md overl">
            <div className="flex items-center justify-between overflow-visible">
                <h1 className="flex my-auto font-bold">
                    <img src={logos.logo_2} className='sm:w-[7em] w-[5.5em] my-auto' alt="" />
                    <span className="mx-2  sm:text-md text-sm  my-auto">|</span>
                    <b className="mt-[.85em] sm:text-md text-xs text-primary">ADMIN PANEL</b>
                </h1>
                <div className="flex items-center space-x-2 sm:space-x-4">
                    <div onClick={() => { navigate(ROUTE_PROFILE); sessionStorage.setItem('menu', '') }} className="flex gap-2 cursor-pointer">
                        <span className='hidden my-auto md:block hacker'> {hackerName}</span>
                        <div style={{ background: `url(${currentUser?.photoURL || users.user_default}) center center`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }} className="w-8 h-8 my-auto border-2 rounded-full border-primary"></div>
                    </div>
                    <div className="relative overflow-visible">
                        <p onClick={() => setOpenNot(!openNot)} title='Ver notificações' className="relative w-6 h-6 overflow-visible cursor-pointer">
                            {
                                sortedNotifications.length > 0 && <span className="font-bold absolute w-[1rem] p-1.5 h-[1rem] grid place-content-center items-center -right-0 -top-0 rounded-full text-xs border-2 text-black bg-primary">
                                    {sortedNotifications.length}
                                </span>
                            }
                            <FaBell className='text-2xl hover:text-primary' />
                        </p>

                        {openNot &&
                            <div onMouseLeave={() => setOpenNot(!openNot)} className="absolute right-0 dark:text-white dark:bg-gray-800 z-10 px-2 pt-2 pb-5 w-[16rem] bg-white rounded-md shadow-lg top-8">
                                <b className='text-black  dark:text-white '>Suas notificações</b>
                                <hr />
                                <br />
                                {sortedNotifications.map((notification, i) => (
                                    <div className='flex flex-col px-2 py-1 my-1.5 text-gray-500 rounded-md dark:rounded-none bg-slate-100/90 dark:bg-slate-100/20' key={i}>
                                        <span className='text-sm font-semibold text-yellow-600 dark:text-white  '>{notification.title}</span>
                                        <span className='text-xs  dark:text-white '>{notification.content}</span>
                                        <div className="w-full text-end ">
                                            <button title='Deletar notificação' onClick={() => deleteNotification(notification?.id)} className='  text-xs text-center   dark:text-red-500 text-red-600 rounded-sm   ms-auto hover:text-red-600 focus:outline-none'>
                                                {

                                                    <span className='my-auto'>
                                                        <FaTrash />
                                                    </span>
                                                }
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                {sortedNotifications.length === 0 &&
                                    <center>
                                        <span className="text-sm text-gray-500  dark:text-white ">Não há notificações</span>
                                    </center>
                                }
                            </div>
                        }
                    </div>
                    <p className="relative hidden w-6 h-6 overflow-visible cursor-pointer">
                        <p title='Configurações' onClick={() => setOpenSettings(!openSettings)}>
                            <FaCog className='text-2xl transition-all hover:rotate-45 hover:text-primary' />

                        </p>
                        {openSettings &&
                            <div onMouseLeave={() => setOpenSettings(!openSettings)} className="absolute right-0 z-10 px-2 pt-2 pb-5 w-[16rem] bg-white rounded-md dark:bg-gray-800 shadow-lg top-8">
                                <b className='text-black dark:text-white'>Configurações da conta</b>
                                <hr />

                                <div className="w-full px-5 py-6  bg-white rounded-lg  dark:bg-gray-800 ">
                                    <div className="flex items-center justify-between mb-4">
                                        <label className="text-sm font-semibold text-gray-400 dark:text-black hacker  dark:text-white">Receber e-mails de marketing</label>
                                        {/*
                                      
                                      <Switch name="receiveMarketingEmails" onChange={handleCheckboxChange} checked={userSettings.receiveMarketingEmails} />
                                  
                                      */}

                                        <input
                                            type="checkbox"
                                            name="receiveMarketingEmails"
                                            checked={userSettings.receiveMarketingEmails}
                                            onChange={handleCheckboxChange}
                                            className="w-5 h-5 ml-2 border-gray-300 rounded text-primary focus:ring-primary"
                                        />
                                    </div>
                                    <div className="flex items-center justify-between mb-4">
                                        <label className="text-sm font-semibold text-gray-400 dark:text-black hacker  dark:text-white">Modo Escuro</label>
                                        <input
                                            type="checkbox"
                                            name="darkMode"
                                            checked={userSettings.darkMode}
                                            onChange={handleCheckboxChange}
                                            className="w-4 h-4 ml-2 border-gray-300 rounded text-primary focus:ring-primary"
                                        />
                                    </div>

                                    <div className="flex items-center justify-between mb-4">
                                        <label className="text-sm font-semibold text-gray-400 dark:text-black hacker  dark:text-white">Notificações</label>
                                        <input
                                            type="checkbox"
                                            name="notifications"
                                            checked={userSettings.notifications}
                                            onChange={handleCheckboxChange}
                                            className="w-4 h-4 ml-2 border-gray-300 rounded text-primary focus:ring-primary"
                                        />
                                    </div>
                                    <button
                                        onClick={handleSaveSettings}
                                        className="px-2 py-1 text-xs text-black mx-auto rounded-md dark:text-black bg-primary hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-primary"
                                    >
                                        Salvar
                                    </button>
                                </div>
                            </div>
                        }

                    </p>
                </div>
            </div>
        </div>
    );
};
