// Trainings.tsx
import React, { useEffect, useMemo, useState } from 'react';
import { Navbar } from '../../components/dashboard-components/navbar/navbar';
import { Sidebar } from '../../components/dashboard-components/sidebar/sidebar';
import { HackingTable } from '../../components/dashboard-components/hacking-table/hacking-table.';
import { HakyOffSquare, Preloader } from '../../components';
import { extra } from '../../../utils/image-exporter'; 
import { useAuth } from '@/context/auth-context';
import { LoaderText } from '@/presentation/components/dashboard-components/loader-text/loader-text';
import { fetchAlunosAll } from '@/services/fetch-haclers';
import { IAluno } from '@/interfaces/aluno/aluno';

export const Hacking: React.FC = () => {

    document.title = ' Ranking dos melhores Hackers | HakyOff'
    const { userSettings } = useAuth(); // Adicione a função de logout aqui
    const [loading, setLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(true); // Definir o estado isOpen aqui
    const [hackers, setHackers] = useState<IAluno[]>([]);



    const fetchHackers = useMemo(() => {
        return () => fetchAlunosAll(setLoading, setHackers);
    }, []);

    useEffect(() => {
        fetchHackers();
    }, [fetchHackers]);


    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    if (loading) {
        return <Preloader />
    }

    return (
        <div className={`${userSettings.darkMode ? 'dark' : ''}`}>
            <Navbar />
            <Sidebar toggleSidebar={toggleSidebar} isOpen={isOpen} /> {/* Passar isOpen para Sidebar */}
            <div className={`min-h-screen hid p-4 sm:pt-20 ${isOpen ? 'sm:ml-[10rem]' : 'sm:ml-[4rem]'} transition-all duration-300 bg-gray-100 dark:bg-gray-900`}>
 
                <div className="relative w-full px-3 py-4 mt-2 bg-white rounded-lg shadow sm:mt-10 sm:px-5 sm:py-6 dark:bg-slate-100/20">
                    <HakyOffSquare className='dark:text-white' />
                    <div className="absolute top-0 bottom-0 left-0 right-0 z-10 "></div>
                    <br />
                    <img src={extra.hack_face} className='absolute dark:hidden -top-2 opacity-[.2] right-3' alt="" />
                    <img src={extra.hack_face_white} className='absolute hidden dark:block -top-2 opacity-[.2] right-3' alt="" />
                    <h2 className="text-2xl font-bold sm:text-3xl hacker dark:text-white ">Alunos registrados </h2>
                </div>

                <div className="mt-8 sm:mt-16">
                    {
                        loading ?
                            <>
                                <center>
                                    <LoaderText text='Caregando dados.' />
                                </center>
                            </>
                            :
                            <>
                                <HackingTable data={hackers} />
                            </>
                    }
                </div>
            </div>
        </div>)
};

