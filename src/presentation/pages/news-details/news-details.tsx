import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { INews, NewsData } from '@/utils/news-data-uils';
import { DateUtils } from '@/utils/dateutils';
import { Button, HakyOffSquare, Preloader } from '@/presentation/components';
import { logos, svgs } from '@/utils/image-exporter';

import { FacebookShareButton, TwitterShareButton, LinkedinShareButton, WhatsappShareButton } from 'react-share';
import { FaFacebook, FaTwitter, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import { ROUTE_TRAININGS } from '@/utils/sidebar-utils';
import { LazyImage } from '@/presentation/components/lazy-image/lazy-image';
import { useAuth } from '@/context/auth-context';
import { Navbar } from '@/presentation/components/dashboard-components/navbar/navbar';
import { Sidebar } from '@/presentation/components/dashboard-components/sidebar/sidebar';




export const NewsDetailsPage: React.FC = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [news, setNews] = useState<INews | null>(null);
    const [isOpen, setIsOpen] = useState(true);

    const { userSettings } = useAuth();

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };



    useEffect(() => {
        const fetchNews = async () => {
            try {
                const newsData = await NewsData();
                const newsItem = newsData.find((n) => n.id === id) || null;
                setNews(newsItem);
                setLoading(false);
            } catch (error) {
                console.error('Erro ao buscar notícia:', error);
                setLoading(false);
            }
        };

        fetchNews();
    }, [id]);

    if (loading) {
        return <Preloader />;
    }

    if (!news) {
        return <p>Notícia não encontrada.</p>;
    }

    document.title = news.title + ' | HakyOff newsletter'

    const url = 'https://academy.hakyoff.com/news/' + news.id

    return (
        <>

            <div className={`${userSettings.darkMode ? 'dark' : ''}`}>
                <Navbar />
                <Sidebar   toggleSidebar={toggleSidebar} isOpen={isOpen} /> {/* Passar isOpen para Sidebar */}
                <div className={`min-h-screen hid p-4 sm:pt-20  ${isOpen ? 'sm:ml-[10rem]' : 'sm:ml-[4rem]'} transition-all duration-300 bg-gray-100 dark:bg-gray-900`}>
                    <div className=' pb-[10rem] w-full'>

                        <br />
                        <br />
                        <div className="sm:flex container  gap-6 w-full">

                            <div className="sm:w-9/12 dark:text-white">
                                <HakyOffSquare />
                                <h1 className='sm:text-4xl text-2xl  xl:text-5xl font-bold'>{news.title}</h1>
                                <br />
                                <div className="flex gap-4">
                                    <p className='hacker 2xl:text-lg text-sm'>Publicao em: {DateUtils.formatDateToPTSecond(news.date)}</p>
                                    <span>&middot;</span>
                                    <span className='hacker  2xl:text-lg text-sm'>By <b>HakyOff Newsletter</b></span>
                                </div>
                                <br />
                                <LazyImage
                                    src={news.cover}
                                    alt={news.title}
                                    className='w-full sm:h-[30rem] h-[15rem]'
                                    placeholder={svgs.bg_placeholder_svg}
                                />
                                <br />
                                <br />

                                <p>{news.content}</p>
                            </div>
                            <div className="sm:w-3/12 mt-14 sm:mt-0">

                                <div className="bg-black/70 rounded-md py-16 2xl:py-20"><div>

                                    <img src={logos.logo_2} className='w-[10em] mx-auto' alt={news.title} />
                                    <center><span className='text-lg hacker tracking-widest text-white'>Newsletter</span></center>
                                </div>
                                </div>
                                <br />
                                <br />
                                <p className='dark:text-white text-xl hacker mb-2'>Partilhar artigo</p>

                                <div className="flex justify-start gap-10 mt-8">
                                    <FacebookShareButton url={url} >
                                        <FaFacebook className='dark:text-white hover:text-yellow-700' size={32} />
                                    </FacebookShareButton>
                                    <TwitterShareButton url={url} title={news.title}>
                                        <FaTwitter className='dark:text-white hover:text-yellow-700' size={32} />
                                    </TwitterShareButton>
                                    <LinkedinShareButton url={url} summary={news.title}>
                                        <FaLinkedin className='dark:text-white hover:text-yellow-700' size={32} />
                                    </LinkedinShareButton>
                                    <WhatsappShareButton url={url} title={news.title}>
                                        <FaWhatsapp className='dark:text-white hover:text-yellow-700' size={32} />
                                    </WhatsappShareButton>
                                </div>
                                <br />
                                <br />
                                <br />
                                <center>
                                    <h1 className=' text-2xl hacker '>Eleve o seu mindset Hacker</h1>
                                    <br />
                                    <br />
                                    <Button onClick={() => window.location.href = ROUTE_TRAININGS} text='Explore a Academia' color='primary' />
                                </center>
                            </div>

                        </div>

                    </div>
                </div>
            </div >



        </>
    );
};
