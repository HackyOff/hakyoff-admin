import React, { useEffect, useState } from 'react';
import { Sidebar } from '../../components/dashboard-components/sidebar/sidebar';
import { Navbar } from '../../components/dashboard-components/navbar/navbar';
import { FaFilter } from 'react-icons/fa';
import { Button } from '../../components/button/button';
import { useAuth } from '@/context/auth-context';
import { ITraining } from '../../../interfaces/training/training';
import { CardMyCourses } from '@/presentation/components/dashboard-components/my-trainings-components/card-my-courses';
import { renderCardSkeletons } from '@/utils/course-skeleton-utils';
import { useNavigate } from 'react-router-dom';
import { ROUTE_TRAININGS } from '@/utils/sidebar-utils';
import { fetchMyCourses } from '@/utils/my-course-utils';

export const MyTrainings: React.FC = () => {

    document.title = 'Meus Treinamentos | HakyOff Academy'


    const [isOpen, setIsOpen] = useState(true);
    const [courses, setCourses] = useState<ITraining[]>([]);
    const [loading, setLoading] = useState(true);
    const { currentUser, userSettings } = useAuth();

    useEffect(() => {
        const loadCourses = async () => {
            const fetchedCourses = await fetchMyCourses(currentUser);
            setCourses(fetchedCourses);
            setLoading(false);
        };

        loadCourses();
    }, [currentUser]);


    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const navigate = useNavigate()
    return (
        <div className={`${userSettings.darkMode ? 'dark' : ''}`}>
            <Navbar />
            <Sidebar toggleSidebar={toggleSidebar} isOpen={isOpen} />
            <div className={`min-h-screen p-4 pt-20 ${isOpen ? 'sm:ml-[10rem]' : 'sm:ml-[4rem]'} transition-all duration-300 bg-gray-100 dark:bg-gray-900`}>
                <br />
                <div className="flex justify-between w-full px-5 py-6 bg-white rounded-lg shadow  dark:bg-slate-100/10 dark:text-white">
                    <h2 className="text-3xl font-bold hacker">Seus treinamentos</h2>
                    <Button onClick={() => navigate(ROUTE_TRAININGS)} text='Comprar' color='primary' className='click' />
                </div>
                <br />
                {loading ? (
                    renderCardSkeletons()
                ) : (
                    courses.length > 0 ? (
                        <div className="grid gap-4 md:grid-cols-2  lg:grid-cols-3 2xl:grid-cols-4">
                            {courses.map((course, index) => (
                                <CardMyCourses key={index} course={course} />
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white dark:bg-slate-100/10 text-center rounded-lg shadow w-full py-[10rem] px-5">
                            <FaFilter className='mx-auto text-gray-500 text-9xl' />
                            <br />
                            <br />
                            <h2 className="dark:text-white text-gray-500">
                                Seus treinamentos ativos aparecerão aqui!
                            </h2>
                        </div>
                    )
                )}
            </div>
        </div>
    );
};
