import React, { useState, useEffect } from 'react';
import { Navbar } from '../../components/dashboard-components/navbar/navbar';
import { Sidebar } from '../../components/dashboard-components/sidebar/sidebar';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { useAuth } from '@/context/auth-context';
import { renderTicketSkeletons } from '@/utils/render-skeleton-ticket';
import { ICtfs } from '@/interfaces/ctfs/ctfs-intrface';
import { CtfList } from '@/presentation/components/ctfs-components/ctf-list';
import { FilterBar } from '@/presentation/components/ctfs-components/filter-bar';


export const Ctfs: React.FC = () => {
    document.title = 'CTFS HakyOff | HakyOff Academy';

    const [isOpen, setIsOpen] = useState(true);
    const [loading, setLoading] = useState(true);
    const [ctfs, setCtfs] = useState<ICtfs[]>([]);
    const [filters, setFilters] = useState({ name: '', difficulty: '', category: '' });
    const [createCtf, setCreateCtf] = useState(false);

    const { currentUser, userSettings } = useAuth();

    useEffect(() => {
        const fetchCtfs = async () => {
            try {
                const ctfsCollection = firebase.firestore().collection('ctfs');
                const snapshot = await ctfsCollection.get();
                const ctfsData = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })) as unknown as ICtfs[];
                setCtfs(ctfsData);
                setLoading(false);
            } catch (error) {
                console.error('Erro ao buscar CTFs do Firestore:', error);
            }
        };

        fetchCtfs();
    }, [currentUser]);

    const toggleSidebar = () => setIsOpen(!isOpen);

    const filteredCtfs = ctfs.filter(ctf => {
        const categoryMatch = filters.category === '' || ctf.module.toLowerCase() === filters.category.toLowerCase();
        const filteredChallenges = ctf.ctf.filter(challenge => {
            const challengeNameMatch = challenge.title.toLowerCase().includes(filters.name.toLowerCase());
            const challengeDifficultyMatch = filters.difficulty === '' || challenge.level.toLowerCase() === filters.difficulty.toLowerCase();
            const challengeCategoryMatch = filters.category === '' || ctf.module.toLowerCase() === filters.category.toLowerCase();
            return challengeNameMatch && challengeDifficultyMatch && challengeCategoryMatch;
        });
        return categoryMatch && filteredChallenges.length > 0;
    });

    return (
        <div className={`${userSettings.darkMode ? 'dark' : ''}`}>
            <Navbar />
            <br />
            <br />
            <Sidebar toggleSidebar={toggleSidebar} isOpen={isOpen} />
            <div className={`min-h-screen p-4 sm:pt-6 ${isOpen ? 'sm:ml-[10rem]' : 'sm:ml-[4rem]'} transition-all duration-300 bg-gray-100 dark:bg-gray-900`}>
                <h2 className='mt-4 text-2xl font-bold tracking-wider sm:text-4xl hacker dark:text-white'>Desafios CTFS</h2>
                <FilterBar filters={filters} setFilters={setFilters} setCreateCtf={setCreateCtf} createCtf={createCtf} />
                {loading ? renderTicketSkeletons() : <CtfList ctfs={filteredCtfs} createCtf={createCtf} />}
            </div>
        </div>
    );
};
