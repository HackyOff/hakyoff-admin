import React, { useEffect, useState, useMemo } from 'react';
import { Navbar } from '../../components/dashboard-components/navbar/navbar';
import { Sidebar } from '../../components/dashboard-components/sidebar/sidebar';
import { INews, NewsData } from '../../../utils/news-data-uils';
import { CardNews } from '../../components/dashboard-components/card-news/card-news';
import { FaFilter } from 'react-icons/fa6';
import { renderCardSkeletons } from '@/utils/course-skeleton-utils';
import { useAuth } from '@/context/auth-context';

export const News: React.FC = () => {

    document.title = 'Ultimas notícias CyberNews | HakyOff CyberNews';

    const [isOpen, setIsOpen] = useState(true);
    const [loading, setLoading] = useState(true);
    const [news, setNews] = useState<INews[]>([]);

    const { userSettings } = useAuth();

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const fetchNewsMemo = useMemo(() => {
        return async () => {
            try {
                const newsData = await NewsData();
                setNews(newsData);
                setLoading(false);
            } catch (error) {
                console.error('Erro ao buscar notícias:', error);
            }
        };
    }, []);

    useEffect(() => {
        fetchNewsMemo();
    }, [fetchNewsMemo]);

    return (
        <div className={`${userSettings.darkMode ? 'dark' : ''}`}>
            <Navbar />
            <Sidebar toggleSidebar={toggleSidebar} isOpen={isOpen} />
            <div className={`min-h-screen hid px-4 sm:pt-24 ${isOpen ? 'sm:ml-[10rem]' : 'sm:ml-[4rem]'} transition-all duration-300 bg-gray-100 dark:bg-gray-900`}>
                <h2 className="text-2xl pt-6 sm:pt-0 sm:text-4xl font-bold hacker dark:text-white">Newsletter HakyOff</h2>
                <br />
                <hr />
                <br />
                <br />
                {loading ? (
                    renderCardSkeletons()
                ) : (
                    news.length > 0 ? (
                        <div className="grid justify-start gap-6 sm:grid-cols-2 2xl:grid-cols-4 lg:grid-cols-3">
                            {
                                news.map((news, i) => (
                                    <CardNews key={i} news={news} />
                                ))
                            }
                        </div>
                    ) : (
                        <div className="bg-white text-center rounded-lg shadow w-full py-[10rem] px-5">
                            <FaFilter className='mx-auto text-gray-500 text-9xl' />
                            <br />
                            <br />
                            <h2 className="text-gray-500">
                                Não há notícias por apresentar ainda!
                            </h2>
                        </div>
                    )
                )}
            </div>
        </div>
    );
};
