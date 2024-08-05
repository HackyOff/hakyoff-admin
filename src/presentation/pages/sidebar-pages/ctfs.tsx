import React, { useState, useEffect } from 'react';
import { Navbar } from '../../components/dashboard-components/navbar/navbar';
import { Sidebar } from '../../components/dashboard-components/sidebar/sidebar';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { FaAngleRight, FaCheckCircle, FaEdit, FaRegTimesCircle, FaFilter } from 'react-icons/fa';
import { ICtfsChallenge, ICtfs } from '@/interfaces/ctfs/ctfs-intrface';
import { GetStatusColor } from '@/utils/get-status-color-utils';
import { Modal } from '@/presentation/components/modal-ticket/modal-ticket';
import { Button } from '@/presentation/components';
import { abbreviateText } from '@/utils/abreviate';
import { useAuth } from '@/context/auth-context';
import { getCTFBackgroundColor } from '@/utils/get-ctf-bgcolor';
import { IHackerScore } from '@/domain/models/score-model';
import { renderTicketSkeletons } from '@/utils/render-skeleton-ticket';
import { LoaderText } from '@/presentation/components/dashboard-components/loader-text/loader-text';
import { AlertUtils } from '@/utils/alert-utils';
import { extra } from '@/utils/image-exporter';
import { FaFilterCircleXmark } from 'react-icons/fa6';

export const Ctfs: React.FC = () => {

    document.title = 'CTFS HakyOff | HakyOff Academy'

    const [isOpen, setIsOpen] = useState(true);
    const [selectedCTF, setSelectedCTF] = useState<ICtfsChallenge | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [loadingC, setLoadingC] = useState(false);
    const [ctfs, setCtfs] = useState<ICtfs[]>([]);
    const [userCtfs, setUserCtfs] = useState<string[]>([]); // IDs dos CTFs resolvidos pelo usuário
    const [flag, setFlag] = useState('');
    const [msg, setMsg] = useState('');
    const [filters, setFilters] = useState({
        name: '',
        difficulty: '',
        category: ''
    });

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

        const fetchUserCtfs = async () => {
            if (currentUser) {
                try {
                    const userCtfsCollection = firebase.firestore().collection('admins').doc(currentUser.uid).collection('resolvedCtfs');
                    const snapshot = await userCtfsCollection.get();
                    const userCtfsData = snapshot.docs.map(doc => doc.id);
                    setUserCtfs(userCtfsData);
                } catch (error) {
                    console.error('Erro ao buscar CTFs do usuário:', error);
                }
            }
        };

        fetchCtfs();
        fetchUserCtfs();
    }, [currentUser]);

    const openModal = (ticket: ICtfsChallenge) => {
        setSelectedCTF(ticket);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedCTF(null);
        setFlag('');
    };

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const handleSubmitFlag = async () => {
        if (!selectedCTF || !currentUser) return;
        setLoadingC(true);

        if (flag === selectedCTF.flag) {
            try {
                // Atualiza a subcoleção de CTFs resolvidos do usuário
                const userCtfsCollection = firebase.firestore().collection('admins').doc(currentUser.uid).collection('resolvedCtfs');
                if (typeof selectedCTF.id === 'string') {
                    await userCtfsCollection.doc(selectedCTF.id).set({
                        ctfName: selectedCTF.title,
                        timestamp: firebase.firestore.FieldValue.serverTimestamp()
                    });

                    // Atualiza a coleção hacking do usuário
                    const hackingCollection = firebase.firestore().collection('hacking');
                    const hackingQuery = hackingCollection.where('student_email', '==', currentUser.email);
                    const hackingSnapshot = await hackingQuery.get();

                    if (!hackingSnapshot.empty) {
                        const hackerDoc = hackingSnapshot.docs[0];
                        const hackerData = hackerDoc.data() as IHackerScore;

                        const updatedScore = hackerData.score + selectedCTF.pts;
                        const updatedSolvedChallenges = hackerData.solved_challenges + 1;

                        await hackingCollection.doc(hackerDoc.id).update({
                            score: updatedScore,
                            solved_challenges: updatedSolvedChallenges
                        });

                        setUserCtfs([...userCtfs, selectedCTF.id]);

                        setLoadingC(false);
                        setMsg('right');
                        AlertUtils.success(`Parabéns ${currentUser.displayName?.split(' ').pop()}, você conseguiu resolver este desafio!`);
                    } else {
                        setLoadingC(false);
                        console.error('Nenhum documento encontrado na coleção hacking para o usuário:', currentUser.email);
                        alert('Erro ao atualizar a pontuação. Tente novamente.');
                    }
                } else {
                    setLoadingC(false);
                    console.error('selectedCTF.id não é uma string:', selectedCTF.id);
                    alert('Erro ao submeter a flag. Tente novamente.');
                }
            } catch (error) {
                setLoadingC(false);
                console.error('Erro ao atualizar os CTFs resolvidos do usuário:', error);
                alert('Erro ao submeter a flag. Tente novamente.');
            }
        } else {
            setMsg('wrong');
            setLoadingC(false);
            setTimeout(() => {
                setMsg('');
            }, 6000);
        }
    };

    const filteredCtfs = ctfs.filter((ctf) => {
        // Filtro principal dos CTFs
        //const nameMatch = ctf.module.toLowerCase().includes(filters.name.toLowerCase());

        const categoryMatch = filters.category === '' || ctf.module.toLowerCase() === filters.category.toLowerCase();

        // Filtrar os desafios dentro do CTF
        const filteredChallenges = ctf.ctf.filter((challenge) => {
            const challengeNameMatch = challenge.title.toLowerCase().includes(filters.name.toLowerCase());
            const challengeDifficultyMatch = filters.difficulty === '' || challenge.level.toLowerCase() === filters.difficulty.toLowerCase();
            const challengeCategoryMatch = filters.category === '' || ctf.module.toLowerCase() === filters.category.toLowerCase();

            return challengeNameMatch && challengeDifficultyMatch && challengeCategoryMatch;
        });

        return categoryMatch && filteredChallenges.length > 0;
    });



    return (
        <div className={`${userSettings.darkMode ? 'dark' : ''} `}>
            <Navbar />
            <Sidebar toggleSidebar={toggleSidebar} isOpen={isOpen} />
            <div className={`min-h-screen p-4 sm:pt-20 hid ${isOpen ? 'sm:ml-[10rem]' : 'sm:ml-[4rem]'} transition-all duration-300 bg-gray-100 dark:bg-gray-900`}>
                <div>
                    <h2 className='mt-4 sm:text-4xl text-2xl font-bold tracking-wider hacker dark:text-white'>Desafios CTFS</h2>
                    <br />
                    <hr className='hidden sm:block' />
                    <div className="flex flex-col sm:flex-row sm:mt-5 justify-between lg:justify-start w-full  dark:bg-slate-100/10  dark:text-white bg-white shadow py-6 px-4 rounded-lg gap-4">

                        <div className="flex gap-2">
                            <div className="bg-primary/30 dark:bg-primary dark:rounded-md my-auto px-2 py-2 text-yellow-700">
                                <FaFilter className='my-auto' />
                            </div>

                            <input
                                type="text"
                                placeholder="Filtrar titulo do desafio"
                                value={filters.name}
                                onChange={(e) => setFilters({ ...filters, name: e.target.value })}
                                className="border-2 w-full sm:w-auto dark:bg-slate-100/10  dark:text-white px-3 py-1 border-primary/50 text-xs rounded-md"
                            />
                        </div>
                        <div className="flex gap-4">
                            <select
                                value={filters.difficulty}
                                onChange={(e) => setFilters({ ...filters, difficulty: e.target.value })}
                                className="border-2 w-full sm:w-auto outline-none dark:bg-slate-100/10  dark:text-white px-3 py-1 border-primary/50 text-xs rounded-md"
                            >
                                <option className='text-dark' value="">Filtrar por dificuldade</option>
                                <option className='text-dark' value="Beginner">Fácil</option>
                                <option className='text-dark' value="Intermediate">Médio</option>
                                <option className='text-dark' value="Advanced">Difícil</option>
                            </select>
                            {
                                /*
        
                                 <select
                                    value={filters.category}
                                    onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                                    className="border-2  dark:bg-slate-100/10  dark:text-white px-3 py-1 border-primary/50 text-xs rounded-md"
                                >
                                    <option value="">Filtrar por categoria</option>
                                    <option value="web">Web</option>
                                    <option value="criptografia">Criptografia</option>
                                    <option value="forense">Forense</option>
                                     
                            </select>
        
                            */
                            }
                            <div title='Limpar filtro' onClick={() => setFilters({ category: '', name: '', difficulty: '' })} className="bg-primary/30 rouned-sm cursor-pointer click my-auto px-2 py-2  dark:bg-primary dark:rounded-md  text-yellow-700">
                                <FaFilterCircleXmark className='my-auto' />
                            </div>
                        </div>
                    </div>
                    {loading ? (
                        renderTicketSkeletons()
                    ) : (
                        filteredCtfs.length > 0 ? (
                            <>
                                {filteredCtfs.map((ctf, i) => (
                                    <div key={ctf.ctf_code} style={{ background: `linear-gradient(90deg, #FFFFFFFB, #FFFFFFF1),url(${extra.bg_card_ctfs})` }} className='relative  p-5 my-10 bg-white border shadow rounded-xl'>
                                        <h2 className='flex px-2 py-1 font-bold rounded-md z-100 bg-slate-200'>
                                            <FaAngleRight className='my-auto' />
                                            {ctf.module}
                                        </h2>
                                        <div className='z-10'>
                                            {ctf.ctf.length > 0 && (
                                                <div>
                                                    <h4 className='my-1 text-xl font-semibold text-yellow-600 hacker z-100'>Desafios:</h4>
                                                    {ctf.ctf.map((challenge, index) => (
                                                        <div className='flex flex-col lg:flex-row justify-between' key={index}>
                                                            <div className='lg:w-6/12'>
                                                                <div className="flex justify-between">

                                                                    <h5 className='font-semibold'>{challenge.title}</h5>
                                                                    <div className="my-auto sm:hidden  ">
                                                                        <p className={`sm:px-4  px-2 mb-2 sm:mb-0 text-xs py-1 my-auto rounded-sm ${getCTFBackgroundColor(challenge.level)}`}> {challenge.level}</p>
                                                                    </div>
                                                                </div>
                                                                <p className='text-xs lg:text-md'>{abbreviateText(challenge.desc, 70)}</p>
                                                            </div>
                                                            <div className='flex mt-2 sm:mt-0 lg:w-6/12 justify-between'>

                                                                <div className="my-auto hidden sm:block">
                                                                    <p className={`px-4 text-xs py-1 my-auto rounded-sm ${getCTFBackgroundColor(challenge.level)}`}> {challenge.level}</p>
                                                                </div>
                                                                <p className={`px-3 py-1 my-auto text-xs font-semibold text-black rounded-sm  ${userCtfs.includes(challenge.id) ? 'bg-green-600 line-through text-white' : 'bg-primary'}`}>
                                                                    {userCtfs.includes(challenge.id) ? 'RESOLVIDO' : 'NÃO RESOLVIDO'}
                                                                </p>
                                                                <div className="my-auto text-xs  text-end">
                                                                    <p className={` ${userCtfs.includes(challenge.id) ? '  line-through ' : ' '} text-xl font-semibold`}>  {challenge.pts} Pts</p>
                                                                </div>
                                                                <div className="my-auto text-end">
                                                                    <button
                                                                        onClick={() => openModal(challenge)}
                                                                        className={`flex hacker gap-2 px-3 py-2 my-auto text-xs font-semibold text-white bg-black rounded-md click ${userCtfs.includes(challenge.id) ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                                        disabled={userCtfs.includes(challenge.id)}
                                                                    >
                                                                        Resolver
                                                                        <FaEdit className='my-auto' />
                                                                    </button>
                                                                </div></div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                        <img src={extra.hack_face} className={`absolute opacity-[.08] top-0 left-0 rotate-${45 + 2 * i}`} alt="" />
                                    </div>
                                ))}
                            </>
                        ) : (
                            <div className="bg-white dark:bg-slate-100/10 mt-10 text-center rounded-lg shadow w-full sm:py-[8rem] py-[5rem] xl:py-[10rem] px-5">
                                <FaFilter className='mx-auto text-gray-500 xl:text-9xl sm:text-7xl text-5xl' />
                                <br />
                                <br />
                                <h2 className="text-gray-500 text-xs sm:text-md dark:text-white/70 hacker">
                                    Não foram encontrados mais desafios Hacker para você!
                                </h2>
                            </div>
                        )
                    )}
                </div>
            </div>

            {
                isModalOpen && selectedCTF && (
                    <Modal isOpen={isModalOpen} onClose={closeModal}>
                        <h2 className="mb-1 text-xl font-bold">{selectedCTF.title}</h2>
                        <hr />
                        <span className="text-gray-600 mt-4"> ID: {selectedCTF.id}</span>
                        <div className="flex gap-3 my-3 text-sm hacker">
                            <p className={`my-auto font-bold text-lg ${GetStatusColor(selectedCTF.level)}`}> {selectedCTF.pts} Pts</p>

                        </div>
                        <p>
                            <span>Link: <a target='__blank' href={selectedCTF.link} className="text-yellow-600 underline">{selectedCTF.link}</a></span>
                            <br /><br />
                            <div dangerouslySetInnerHTML={{ __html: selectedCTF.desc }} />
                            <br />
                        </p>
                        {
                            msg === 'wrong' ?

                                <>
                                    <div className="bg-red-500/30 text dark:bg-red-400/20-sm  mb-2 text-red-800 dark:text-red-300 font-bold px-4 py-3 flex gap-4">
                                        <FaRegTimesCircle className='my-auto ' />
                                        <span className='my-auto'>Flag incorreta. Tente novamente.</span>
                                    </div>
                                </> :

                                msg === 'right' ?
                                    <>
                                        <div className="bg-green-500/30 text-green-800 font-semibold px-4 py-3 flex flex-col gap-4">
                                            <FaCheckCircle className='my-auto text-2xl mx-auto' />
                                            <span className='my-auto'>Flag incorreta. Tente novamente.</span>
                                        </div>
                                    </>
                                    : null
                        }
                        <input
                            type="text"
                            value={flag}
                            onChange={(e) => setFlag(e.target.value)}
                            className={`border-2 dark:bg-slate-600 dark:border-slate-500 dark:text-white/90 dark:tracking-widest dark:hacker outline-none focus-within:border-primary w-full py-2 px-2 rounded-md ${msg === 'wrong' && 'animate-bounce border-red-600'}`}
                            placeholder='Insira a flag capturada'
                        />
                        <br />
                        <div className="text-end mt-7">
                            {
                                loadingC ?
                                    <>
                                        <LoaderText text='Verificando sua flag.' />
                                    </> :

                                    <Button text='Submeter' color='primary' className='click ms-auto' onClick={handleSubmitFlag} />
                            }
                        </div>
                    </Modal>
                )
            }
        </div >
    );
};
