// LabChallenges.tsx
import { db } from '@/domain/config/firebase';
import { IMLab } from '@/domain/models/labs-model';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Navbar } from '../navbar/navbar';
import { ROUTE_TRAININGS } from '@/utils/sidebar-utils';
import { FaCartPlus, FaCheckCircle, FaRegTimesCircle } from 'react-icons/fa';
import 'reactjs-popup/dist/index.css';
import { useAuth } from '@/context/auth-context';
import { StringUtils } from '@/utils/string-utils';
import { ICtfsChallenge } from '@/interfaces/ctfs/ctfs-intrface';
import { IHackerScore } from '@/domain/models/score-model';
import { AlertUtils } from '@/utils/alert-utils';
import { GetStatusColor } from '@/utils/get-status-color-utils';
import firebase from 'firebase/compat/app';
import { LoaderText } from '../loader-text/loader-text';
import { Button, HakyModalDefault, Preloader } from '../..';
import { FaCheck, FaLink } from 'react-icons/fa6';
import { Sidebar } from '../sidebar/sidebar';


export const LabChallenges: React.FC = () => {
    const { labId } = useParams();
    const [lab, setLab] = useState<IMLab | null>(null);
    const [flag, setFlag] = useState('');
    const [loadingC, setLoadingC] = useState(false);
    const [selectedLabChallenge, setselectedLabChallenge] = useState<ICtfsChallenge | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userCtfs, setUserCtfs] = useState<string[]>([]); // IDs dos CTFs resolvidos pelo usuário
    const [msg, setMsg] = useState('');
    const { currentUser, userSettings } = useAuth()

    document.title = 'Laboratórios Virtuais | HakyOff Academy'

    const [isOpen, setIsOpen] = useState(true); // Definir o estado isOpen aqui

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };


    useEffect(() => {
        const fetchLab = async () => {
            const querySnapshot = await db.collection('labs').where('lab_id', '==', labId ? labId : '').get();
            if (!querySnapshot.empty) {
                setLab(querySnapshot.docs[0].data() as IMLab);
            }
        };

        fetchLab();
    }, [labId]);



    const openModal = (chal: ICtfsChallenge) => {
        setselectedLabChallenge(chal);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setselectedLabChallenge(null);
        setFlag('');
    };


    const handleSubmitFlag = async () => {
        if (!selectedLabChallenge || !currentUser) return;
        setLoadingC(true)

        if (flag === selectedLabChallenge.flag) {
            try {
                // Atualiza a subcoleção de CTFs resolvidos do usuário
                const userCtfsCollection = firebase.firestore().collection('admins').doc(currentUser.uid).collection('resolvedChallengesLab');


                if (typeof selectedLabChallenge.id === 'string') {
                    await userCtfsCollection.doc(selectedLabChallenge.id).set({
                        ctfName: selectedLabChallenge.title,
                        lab: lab?.lab_name,
                        lab_id: lab?.lab_id,
                        course_id: lab?.course_id,
                        course: lab?.course_name,
                        timestamp: firebase.firestore.FieldValue.serverTimestamp()
                    });

                    // Atualiza a coleção hacking do usuário
                    const hackingCollection = firebase.firestore().collection('hacking');
                    const hackingQuery = hackingCollection.where('student_email', '==', currentUser.email);
                    const hackingSnapshot = await hackingQuery.get();

                    if (!hackingSnapshot.empty) {
                        const hackerDoc = hackingSnapshot.docs[0];
                        const hackerData = hackerDoc.data() as IHackerScore;

                        const updatedScore = hackerData.score + selectedLabChallenge.pts;
                        const updatedSolvedChallenges = hackerData.solved_challenges + 1;

                        await hackingCollection.doc(hackerDoc.id).update({
                            score: updatedScore,
                            solved_challenges: updatedSolvedChallenges
                        });

                        setUserCtfs([...userCtfs, selectedLabChallenge.id]);

                        setLoadingC(false)
                        setMsg('right')
                        AlertUtils.success('Parabés ' + currentUser.displayName?.split(' ').pop() + ' , você conseguiiu resolver este desafio!')
                        //  closeModal();
                    } else {

                        setLoadingC(false)
                        console.error('Nenhum documento encontrado na coleção hacking para o usuário:', currentUser.email);
                        alert('Erro ao atualizar a pontuação. Tente novamente.');
                    }
                } else {
                    setLoadingC(false)
                    console.error('selectedLabChallenge.id não é uma string:', selectedLabChallenge.id);
                    alert('Erro ao submeter a flag. Tente novamente.');
                }
            } catch (error) {
                setLoadingC(false)
                console.error('Erro ao atualizar os CTFs resolvidos do usuário:', error);
                alert('Erro ao submeter a flag. Tente novamente.');
            }
        } else {
            setMsg('wrong')
            setLoadingC(false)
            setTimeout(() => {
                setMsg('')
            }, 6000);
        }
    };




    useEffect(() => {

        const fetchUserCtfs = async () => {
            if (currentUser) {
                try {
                    const userCtfsCollection = firebase.firestore().collection('admins').doc(currentUser.uid).collection('resolvedChallengesLab');
                    const snapshot = await userCtfsCollection.get();
                    const userCtfsData = snapshot.docs.map(doc => doc.id);
                    setUserCtfs(userCtfsData);
                } catch (error) {
                    console.error('Erro ao buscar CTFs Lab do usuário:', error);
                }
            }
        };


        fetchUserCtfs();
    }, [currentUser]);




    if (!lab) {
        return <Preloader />;
    }

    return (

        <div className={`${userSettings.darkMode ? 'dark' : ''}`}>
            <Navbar />
            <Sidebar toggleSidebar={toggleSidebar} isOpen={isOpen} /> {/* Passar isOpen para Sidebar */}
            <div className={`min-h-screen p-4 sm:pt-20 ${isOpen ? 'sm:ml-[10rem]' : 'sm:ml-[4rem]'} transition-all duration-300 bg-gray-100 dark:bg-gray-900`}>
                <br />
                <div className="flex justify-between w-full px-5 py-6 bg-white rounded-lg shadow dark:bg-slate-100/20 dark:text-white">
                    <h2 className="text-2xl font-bold sm:text-3xl hacker"><b className='font-poppins'>LAB <span className="hacker">:</span> </b><span className="hacker">
                        {lab.lab_name}</span></h2>
                    <button className='click sm:hidden' onClick={() => window.location.href = ROUTE_TRAININGS}>
                        <FaCartPlus className='my-auto text-3xl text-black dark:text-white sm:text-4xl' />
                    </button>
                </div>
                <br />

                {
                    /*


                    <div className="">
                    <p className=''><b>Courso:</b> <span className="hacker ms-2"> {lab.course_name}</span></p>
                    <br />
                </div>


                    */
                }
                <br />
                <div className="grid gap-5  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
                    {lab.challenges.map((challenge, index) => (
                        <div onClick={() => userCtfs.includes(challenge.id) ? null : openModal(challenge)} title={`Clique para abrir ${challenge.title}`} key={index} className={`p-4 ${userCtfs.includes(challenge.id) ? '  ' : ' '} lab-bg  mb-4 hover:shadow-smmm shadow-inner hover:shadow-primaryy cursor-pointer  border border-white/20 relative rounded`}>

                            <div className="flex justify-end mb-2 font-bold">
                                {
                                    userCtfs.includes(challenge.id)

                                        ?
                                        <FaCheck className='my-auto text-xl  me-2' />
                                        :

                                        null

                                }
                                {challenge.pts} Pontos
                            </div>
                            <hr className='border-black ' />

                            {
                                /*
                                 <Popup trigger={<div className='absolute flex gap-1 right-6 top-6'>
                                    <div className={`h-[4px] hidden   ${userCtfs.includes(challenge.id) ? 'bg-green-500' : 'bg-white/70'} w-full my-auto rounded-full `}></div>
    
    
                                    <div className="hidden sm:block">
                                        {
                                            userCtfs.includes(challenge.id)
    
                                                ?
                                                <FaCheckCircle className='text-4xl text-green-500 ' />
                                                :
                                                <FaTimesCircle className='text-4xl  text-red-500/70' />
    
    
                                        }
                                    </div>
    
                                </div>
                                } position={userCtfs.includes(challenge.id) ? "right center" : "left center"}>
                                    {
                                        userCtfs.includes(challenge.id) ?
                                            <div className='relative p-1 text-sm hacker'>
                                                <img src={extra.hack_face} className='absolute w-[5.8em] -top-3 right-0 opacity-[.15]' alt="" />
                                                <div className="text-sm">
                                                    <center>
                                                        <FaCheckCircle className='mb-2 text-4xl text-green-500 ' />
    
                                                    </center>
                                                    <b>{StringUtils.getFirstWord(currentUser?.displayName ? currentUser.displayName : '')}</b>,  Parabéns , você pontuou neste desafio e foi acrescio no ranking, resolva os próximos desafios.</div></div>
                                            :
                                            <div className='relative p-1 text-sm hacker'>
                                                <img src={extra.hack_face} className='absolute w-[5.8em] -top-3 right-0 opacity-[.15]' alt="" />
                                                <b>{StringUtils.getFirstWord(currentUser?.displayName ? currentUser.displayName : '')}</b>,  Resolva este desafio para pontuar no Ranking e no seu perTreinamento de treinamento </div>
                                    }
                                </Popup>
                                */
                            }
                            <br />
                            <h4 className='mb-2 font-semibold sm:text-xl'>{challenge.title}</h4>


                            {

                                /*
                         <div className="flex justify-start gap-5 mb-2 flex-start ">
                                <p className={`my-auto border  px-2 border-white/50 sm:text-sm text-xs ${getCTFBackgroundColor(challenge.level)} text-primary`}> {challenge.level}</p>

                                <p className='my-auto  text-primary sm:text-md'><span className="text-white">Pontos: </span>{challenge.pts}<span className=""> PTS</span></p>

                            </div>
                                 <button disabled={userCtfs.includes(challenge.id)} onClick={() => userCtfs.includes(challenge.id) ? null : openModal(challenge)} className={`  border px-2  border-white/50 text-sm   ${userCtfs.includes(challenge.id) ? 'bg-green-600 line-through text-white hacker font-semibold' : 'bg-primary hover:shadow-white  hover:shadow-md'} text-black rounded-sm  uppercase`}>   {userCtfs.includes(challenge.id) ? 'RESOLVIDO' : 'Resolver'}</button>
    
                                <p className='mt-4'>
                                    {challenge.desc}
    
                                </p>
    
                                */
                            }
                        </div>
                    ))}
                </div>
            </div>

            {isModalOpen && selectedLabChallenge && (
                <HakyModalDefault className='text-white sm:w-[40rem] h-[27rem] sm:p-10 py-10 px-3' setShow={closeModal} show={true} bgDefault={true} shadowDeault={true}>
                    <h2 className="mb-1 text-xl font-bold">{selectedLabChallenge.title}</h2>
                    <hr />
                    <p className='mt-4'>
                        ID: {selectedLabChallenge.id}
                    </p>
                    <div className="flex gap-3 my-3 text-sm hacker">
                        <p className={`my-auto font-bold text-lg ${GetStatusColor(selectedLabChallenge.level)}`}> {selectedLabChallenge.pts} Pts</p>

                    </div>
                    <p>
                        <span className='flex gap-4'>Link: <a target='__blank' href={selectedLabChallenge.link} className="flex gap-2 text-yellow-600 underline">{selectedLabChallenge.link} <FaLink className='my-auto ms-2' /></a></span>
                        <div dangerouslySetInnerHTML={{ __html: selectedLabChallenge.desc }} />
                        <br />
                    </p>
                    {
                        msg === 'wrong' ?

                            <>
                                <div className="flex gap-4 px-4 py-3 mb-2 text-sm font-bold text-white bg-red-400/30">
                                    <FaRegTimesCircle className='my-auto ' />
                                    <span className='my-auto'>Flag incorreta. Tente novamente.</span>
                                </div>
                            </> :

                            msg === 'right' ?
                                <>
                                    <div className="flex flex-col gap-2 px-4 py-2 mb-2 font-bold text-center text-white rounded-lg bg-green-400/30">
                                        <FaCheckCircle className='mx-auto my-auto text-2xl' />
                                        <span className='my-auto text-sm'>Flag correta, acertou em cheio <span className="underline">{StringUtils.getFirstWord(currentUser?.displayName ? currentUser?.displayName : '')}</span>, resolva o seu próximo desafio ! </span>
                                    </div>
                                </>
                                : null
                    }
                    <input
                        type="text"
                        value={flag}
                        onChange={(e) => setFlag(e.target.value)}
                        className='w-full px-2 py-2 text-xs text-black border-2 rounded-md outline-none sm:text-md focus-within:border-primary'
                        placeholder='Insira a flag capturada'
                    />
                    <br />
                    <div className="text-end mt-7">
                        {
                            loadingC ?
                                <>
                                    <LoaderText text='Verifcando sua flag.' />
                                </> :

                                <Button disabled={msg == 'right'} text='Submeter' color='primary' className='text-xs text-black click sm:text-md ms-auto' onClick={handleSubmitFlag} />
                        }
                    </div>
                </HakyModalDefault>
            )}



        </div >


    );
};

