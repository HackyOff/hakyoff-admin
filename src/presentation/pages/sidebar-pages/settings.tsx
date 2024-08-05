import { useAuth } from '@/context/auth-context';
import { Navbar } from '@/presentation/components/dashboard-components/navbar/navbar';
import { Sidebar } from '@/presentation/components/dashboard-components/sidebar/sidebar';
import React, { useState } from 'react';
import { FaCog } from 'react-icons/fa';



export interface UserSettings {
    receiveMarketingEmails: boolean;
    darkMode: boolean;
    language: string;
    notifications: boolean;
}


export const Settings: React.FC = () => {
    const { userSettings, updateUserSettings } = useAuth(); // Utilize o contexto de autenticação


    const [isOpen, setIsOpen] = useState(true); // Estado para controlar a abertura/fechamento do sidebar


    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };


    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = event.target;
        updateUserSettings({ [name]: checked }); // Atualiza a propriedade específica nas configurações do usuário
    };
   
    const handleSaveSettings = () => {
         updateUserSettings(userSettings);
    };

    return (
        <div className={`${userSettings.darkMode ? 'dark' : ''}`}>
            <Navbar />
            <Sidebar toggleSidebar={toggleSidebar} darkMode={false} isOpen={isOpen} />
            <div className={`min-h-screen p-4 pt-20 ${isOpen ? 'sm:ml-[10rem]' : 'sm:ml-[4rem]'} transition-all duration-300 bg-gray-100 dark:bg-gray-900`}>
                <br />
                <div className="flex w-full gap-4 px-5 py-6 bg-white rounded-lg shadow dark:bg-white/80">
                    <FaCog className='my-auto text-xl text-yellow-600' />
                    <h2 className="text-3xl font-bold hacker">Configurações</h2>
                </div>
                <br />
                <div className="w-full px-5 py-6 bg-white rounded-lg shadow dark:bg-white/70">
                    <div className="flex items-center justify-between mb-4">
                        <label className="text-xl font-semibold text-gray-400 dark:text-black hacker">Receber e-mails de marketing</label>
                        <input
                            type="checkbox"
                            name="receiveMarketingEmails"
                            checked={userSettings.receiveMarketingEmails}
                            onChange={handleCheckboxChange}
                            className="w-6 h-6 ml-2 border-gray-300 rounded text-primary focus:ring-primary"
                        />
                    </div>
                    <div className="flex items-center justify-between mb-4">
                        <label className="text-xl font-semibold text-gray-400 dark:text-black hacker">Modo Escuro</label>
                        <input
                            type="checkbox"
                            name="darkMode"
                            checked={userSettings.darkMode}
                            onChange={handleCheckboxChange}
                            className="w-6 h-6 ml-2 border-gray-300 rounded text-primary focus:ring-primary"
                        />
                    </div>
                    {
                        /*

                        <div className="flex items-center justify-between mb-4">
                        <label className="text-xl font-semibold text-gray-400 hacker">Idioma Preferido</label>
                        <select
                            name="language"
                            value={userSettings.language}
                            onChange={handleLanguageChange}
                            className="h-10 px-3 py-2 ml-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary"
                        >
                            <option value="en">Inglês</option>
                            <option value="pt">Português</option>
                             
                        </select>
                        
                    </div>


                        */
                    }
                    <div className="flex items-center justify-between mb-4">
                        <label className="text-xl font-semibold text-gray-400 dark:text-black hacker">Notificações</label>
                        <input
                            type="checkbox"
                            name="notifications"
                            checked={userSettings.notifications}
                            onChange={handleCheckboxChange}
                            className="w-6 h-6 ml-2 border-gray-300 rounded text-primary focus:ring-primary"
                        />
                    </div>
                    <button
                        onClick={handleSaveSettings}
                        className="px-4 py-2 text-white rounded-md dark:text-black bg-primary hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                        Salvar Configurações
                    </button>
                </div>
            </div>
        </div>
    );
};
