import { useEffect, useMemo, useState } from 'react';
import { Sidebar } from '../../components/dashboard-components/sidebar/sidebar';
import { Navbar } from '../../components/dashboard-components/navbar/navbar';
import { motion } from 'framer-motion';
import { Button, CardComponent, HakyOffSquare } from '../../components';
import { useAuth } from '@/context/auth-context';
import { renderCardSkeletons } from '@/utils/course-skeleton-utils';
import { fetchAllCourses } from '@/services/fetch-courses-service';
import { ITraining } from '@/interfaces/training/training'; 
import { AddCoursePage } from '../admin-pages/add-courses';


function Trainings() {

    document.title = 'Treinamentos Disponíveis | HakyOff Academy';


    const [isOpen, setIsOpen] = useState(true);
    const [createCourse, setcreateCourse] = useState(false);
    const [courses, setCourses] = useState<ITraining[]>([]);

    const { userSettings } = useAuth();

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
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
                    <br />
                    <br />
                    <div className="flex justify-between">
                        <div>
                            <HakyOffSquare className='sm:mt-6' />
                            <h2 className="font-semibold dark:text-white hacker text-xl sm:text-3xl mt-[1rem]">Treinamentos Disponíveis</h2>

                        </div>
                        <Button className='mt-auto' color='primary' onClick={() => setcreateCourse(!createCourse)} text={createCourse ? 'Ver Treinamentos ' : ' Adicionar Treinamento'} />

                    </div>
                    {
                        createCourse ?
                            <AddCoursePage />
                            : <>
                                {
                                    courses.length <= 0 ?
                                        <>
                                            <br />
                                            <br />
                                            {renderCardSkeletons()}
                                        </>
                                        :
                                        <div className="grid 2xl:grid-cols-4 static z-20 mt-[2rem] lg:grid-cols-3 sm:grid-cols-2 lg:gap-8 sm:gap-[1.5rem] gap-[2.5rem]">
                                            {courses.map((course, index) => (
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
                            </>
                    }
                </section>
            </div>
        </div>
    );
}



export default Trainings;
