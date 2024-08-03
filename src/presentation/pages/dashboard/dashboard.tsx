import React, { useEffect, useState } from 'react';
import { Sidebar } from '../../components/dashboard-components/sidebar/sidebar';
import { Navbar } from '../../components/dashboard-components/navbar/navbar';
import { FaArrowRight, FaExclamationTriangle } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Button, CardComponent } from '../../components';
import { CardNews } from '../../components/dashboard-components/card-news/card-news';
import { useNavigate } from 'react-router-dom';
import { ROUTE_PROFILE } from '../../../utils/sidebar-utils';
import { useAuth } from '@/context/auth-context';
import { INews, NewsData } from '@/utils/news-data-uils';
import { FaFilter } from 'react-icons/fa6';
import { fetchAllCourses } from '@/services/fetch-courses-service';
import { ITraining } from '@/interfaces/training/training';
import { fetchMyCourses } from '@/utils/my-course-utils';
import { CardMyCoursesDashboard } from '../../components/dashboard-components/my-trainings-components/card-my-courses-dashboard';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { responsive } from '@/domain/config/carousel-config';
import { renderCardNewsSkeletons } from '@/utils/news-card-skeleton';




export const Dashboard: React.FC = () => {
    document.title = 'Dashboard | HakyOff Plaform'
    const [isOpen, setIsOpen] = useState(true); // Definir o estado isOpen aqui
    const { userSettings, currentUser } = useAuth()
    const [courses, setCourses] = useState<ITraining[]>([]);
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true);
    const [news, setNews] = useState<INews[]>([]); // Estado para armazenar as notícias
    const [mycourses, setMyCourses] = useState<ITraining[]>([]);


    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };


    useEffect(() => {
        const loadCourses = async () => {
            const fetchedCourses = await fetchMyCourses(currentUser);
            setMyCourses(fetchedCourses);
            setLoading(false);
        };

        loadCourses();
    }, [currentUser]);



    useEffect(() => {
        const fetchNews = async () => {
            try {
                const newsData = await NewsData(); // Utilizar a função para buscar as notícias
                setNews(newsData);
                setLoading(false)
            } catch (error) {
                setLoading(false)
                console.error('Erro ao buscar notícias:', error);
            }
        };

        fetchNews();
    }, []);

    /*
        if (currentUser?.phoneNumber === '' || currentUser?.role === '' || currentUser?.company === '' || currentUser?.address === '' ) {
            AlertUtils.info('Complee suas informações')
        }*/


    // console.log(currentUser)



    useEffect(() => {

        async function getCourses() {

            const courses = await fetchAllCourses()

            setCourses(courses)

        }

        getCourses();
    }, []);



    return (
        <div className={`${userSettings.darkMode ? 'dark' : ''} `}>
            <Navbar />
            <Sidebar toggleSidebar={toggleSidebar} isOpen={isOpen} /> {/* Passar isOpen para Sidebar */}
            <div className={`min-h-screen hid p-4 sm:pt-20  ${isOpen ? 'sm:ml-[14rem]' : 'sm:ml-[4rem]'} transition-all duration-300 bg-gray-100 dark:bg-gray-900`}>

                <div className="flex justify-end">
                    {currentUser?.phoneNumber === '' || currentUser?.role === '' || currentUser?.company === '' || currentUser?.address === '' ?
                        <div onClick={() => navigate(ROUTE_PROFILE)} className="py-3 cursor-pointer px-6 rounded-lg shadow bg-yellow-400/30">
                            <div className="flex dark:text-white text-yellow-700 gap-6 py-2   font-light tracking-wider">
                                <FaExclamationTriangle className='text-2xl my-auto' />
                                <p>Por favor termine de preencher o seu perfil</p>
                            </div>
                        </div>
                        : null
                    }
                </div>

                {
                    mycourses.filter((course) => course.progresso !== undefined && course.progresso < 100 && course.statusPagamento === 'aprovado').length > 0 ? (
                        <>
                            <h2 className='sm:text-3xl text-xl font-semibold dark:text-white hacker my-6'>Continue seu treinamento</h2>
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                                {mycourses.filter((course) => course.progresso !== undefined && course.progresso < 100 && course.statusPagamento === 'aprovado').map((course, index) => (
                                    <CardMyCoursesDashboard key={index} course={course} />
                                ))}
                            </div>
                        </>
                    ) : null
                }

                <div className="flex sm:flex-nowrap sm:flex-row flex-col flex-wrap justify-between sm:mt-[3rem] mt-[1rem]">
                    <h2 className="my-auto sm:text-3xl text-xl font-semibold dark:text-white hacker ">Notícias recentes _ </h2>
                    {
                        /*
                            <Button onClick={() => navigate(ROUTE_NEWS)} className='my-auto hidden lg:block ' text='Todas Notícias' color='primary' />
                            <Button onClick={() => navigate(ROUTE_NEWS)} className='my-auto lg:hidden me-auto sm:me-0 mt-2 text-xs sm:text-normal' rightIcon={FaArrowRight} text=' Notícias' color='primary' />
                        */
                    }
                </div>
                <br />

                {loading ? (
                    renderCardNewsSkeletons()
                ) : (
                    news.length > 0 ? (
                        <div className=" sm:mt-4">
                            <Carousel
                                swipeable={true}
                                draggable={true}
                                showDots={true}
                                responsive={responsive}
                                //autoPlay={props.deviceType !== "mobile" ? true : false}
                                autoPlaySpeed={1000}
                                keyBoardControl={true}
                            //deviceType={this.props.deviceType}

                            >
                                {
                                    news.filter((n) => n.new).map((news, i) => (

                                        <CardNews key={i} news={news} />
                                    ))
                                }
                            </Carousel>
                        </div>
                    ) : (
                        <div className="bg-white text-center dark:bg-slate-100/10 rounded-lg shadow w-full xl:py-[10rem] sm:py-[8rem] py-[5rem] px-5">
                            <FaFilter className='mx-auto text-gray-500 sm:text-9xl text-7xl' />
                            <br />
                            <br />
                            <h2 className="text-gray-500 hacker">
                                Não há notícias por apresentar ainda!
                            </h2>
                        </div>
                    )
                )}


                <center className='sm:v'>
                    <br />
                    <Button rightIcon={FaArrowRight} text='Ver todas Notícias' color='primary' className='text-xs sm:text-md' />
                    <br />
                </center>


                <section
                    id="trainings"
                    className="mx-2"
                >
                    <h2 className="font-semibold dark:text-white hacker sm:text-4xl text-2xl mt-[3rem]">Treinamentos em destaque _ </h2>

                    <div className="grid 2xl:grid-cols-4 static z-20 mt-[1.5rem] lg:grid-cols-3 sm:grid-cols-2 lg:gap-8 sm:gap-[1.5rem] gap-[2.5rem]">
                        {courses.filter((f) => f.destaque).map((train, index) => (

                            <motion.div
                                viewport={{ once: true }}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                key={train.id}
                            >
                                <CardComponent showButtonSub={false} dark={true} datas={train} />
                            </motion.div>
                        ))}
                    </div>
                    <br /><br />
                </section>
            </div>

        </div>
    );
};
