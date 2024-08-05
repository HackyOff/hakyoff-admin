import { useEffect, useMemo, useState } from 'react';
import { Sidebar } from '../../components/dashboard-components/sidebar/sidebar';
import { Navbar } from '../../components/dashboard-components/navbar/navbar';
import { motion } from 'framer-motion';
import { Button, CardComponent, HakyOffSquare } from '../../components';
import { FaArrowRight } from 'react-icons/fa6';
import { icons } from '../../../utils/image-exporter';
import { useAuth } from '@/context/auth-context';
import { renderCardSkeletons } from '@/utils/course-skeleton-utils';
import { fetchAllCourses } from '@/services/fetch-courses-service';
import { ITraining } from '@/interfaces/training/training';



function Trainings() {
    document.title = 'Treinamentos Disponíveis | HakyOff Academy';

    const [isOpen, setIsOpen] = useState(true);
    const [showError, setShowError] = useState(false);
    const [ref, setRef] = useState("");
    const [courses, setCourses] = useState<ITraining[]>([]);

    const { userSettings } = useAuth();

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const handleSearch = () => {
        setShowError(true);
    };

    const getCoursesMemo = useMemo(() => {
        return async () => {
            try {
                const courses = await fetchAllCourses();
                setCourses(courses);
            } catch (error) {
                console.error('Erro ao buscar cursos:', error);
            }
        };
    }, []);

    useEffect(() => {
        getCoursesMemo();
    }, [getCoursesMemo]);

    return (
        <div className={`${userSettings.darkMode ? 'dark' : ''}`}>
            <Navbar />
            <Sidebar toggleSidebar={toggleSidebar} isOpen={isOpen} />
            <div className={`min-h-screen hid p-4 sm:pt-20 ${isOpen ? 'sm:ml-[10rem]' : 'sm:ml-[4rem]'} transition-all duration-300 bg-gray-100 dark:bg-gray-900`}>
                <section id="trainings" className="mx-2">
                    <HakyOffSquare className='sm:mt-6' />
                    <h2 className="font-semibold dark:text-white hacker text-xl sm:text-3xl mt-[1rem]">Treinamentos Disponíveis</h2>
                    <div className="flex flex-col gap-3 sm:flex-row lg:gap-6">
                        <div className={`border-2 my-auto sm:w-[100%] lg:w-[180%] py-1 mt-4 rounded-md px-3 flex gap-3 ${showError ? "border-red-500 bg-red-500/5" : "border-yellow-600"}`}>
                            <img src={icons.notes} className="w-[2em] h-[2em] my-auto" alt="" />
                            <input
                                type="text"
                                placeholder={'Pesquisar curso'}
                                onChange={(e) => setRef(e.target.value)}
                                className="w-full dark:text-white py-2 bg-transparent border-none outline-none text-hacker"
                            />
                        </div>
                        <div className="sm:w-[7.9rem] my-auto lg:w-[17rem]">
                            <Button
                                text={'Pesquisar'}
                                color="primary"
                                onClick={handleSearch}
                                className="mt-[.5rem] w-full text-lg lg:hidden sm:py-4 py-2 text-center justify-center click sm:text-sm"
                            />
                            <Button
                                text={'Pesquisar'}
                                color="primary"
                                onClick={handleSearch}
                                className="mt-[1rem] lg:flex hidden py-4 click text-sm"
                                rightIcon={FaArrowRight}
                            />
                        </div>
                    </div>
                    {ref && <p className='mt-2 font-normal dark:text-white'>Resultados de: <b>{ref}</b></p>}
                    {
                        courses.length <= 0 ?
                            <>
                                <br />
                                <br />
                                {renderCardSkeletons()}
                            </>
                            :
                            <div className="grid 2xl:grid-cols-4 static z-20 mt-[2rem] lg:grid-cols-3 sm:grid-cols-2 lg:gap-8 sm:gap-[1.5rem] gap-[2.5rem]">
                                {courses.filter((e) => e.title.toLocaleLowerCase().includes(ref.toLocaleLowerCase())).map((course, index) => (
                                    <motion.div
                                        viewport={{ once: true }}
                                        initial={{ opacity: 0, y: 50 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4, delay: index * 0.1 }}
                                        key={course.id}
                                    >
                                        <CardComponent showButtonSub={false} dark={true} datas={course} />
                                    </motion.div>
                                ))}
                            </div>
                    }
                </section>
            </div>
        </div>
    );
};

export default Trainings;
