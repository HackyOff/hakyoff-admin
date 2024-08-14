import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '@/domain/config/firebase';
import { IMLab } from '@/domain/models/labs-model';
import { Navbar } from '../navbar/navbar';
import { Sidebar } from '../sidebar/sidebar';
import { useAuth } from '@/context/auth-context';
import { ICtfsChallenge } from '@/interfaces/ctfs/ctfs-intrface';
import { LabChallengeList } from '../../labs-components/labChallengeList';
import { LabChallengeModal } from '../../labs-components/labChallengeMOdal';
import { AlertUtils } from '@/utils/alert-utils';
import firebase from 'firebase/compat/app';
import { IHackerScore } from '@/domain/models/score-model';

export const LabChallenges: React.FC = () => {
    const { labId } = useParams();
    const [lab, setLab] = useState<IMLab | null>(null);
    const [selectedLabChallenge, setSelectedLabChallenge] = useState<ICtfsChallenge | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userCtfs, setUserCtfs] = useState<string[]>([]);
    const [loadingC, setLoadingC] = useState(false);
    const [msg, setMsg] = useState('');
    const { currentUser } = useAuth();

    document.title = 'Admin | Laboratórios Virtuais';

    const [isOpen, setIsOpen] = useState(true); // Definir o estado isOpen aqui

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const fetchLab = async () => {
            const querySnapshot = await db.collection('labs').where('lab_id', '==', labId ?? '').get();
            if (!querySnapshot.empty) {
                setLab(querySnapshot.docs[0].data() as IMLab);
            }
        };
        fetchLab();
    }, [labId]);

    useEffect(() => {
        const fetchUserCtfs = async () => {
            if (currentUser) {
                try {
                    const userCtfsCollection = db.collection('admins').doc(currentUser.uid).collection('resolvedChallengesLab');
                    const snapshot = await userCtfsCollection.get();
                    const userCtfsData = snapshot.docs.map(doc => doc.id);
                    setUserCtfs(userCtfsData);
                } catch (error) {
                    console.error('Erro ao buscar CTFs Lab do admin:', error);
                }
            }
        };
        fetchUserCtfs();
    }, [currentUser]);

    const openModal = (challenge: ICtfsChallenge) => {
        setSelectedLabChallenge(challenge);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedLabChallenge(null);
        setMsg('');
    };

    const handleSubmitFlag = async (flag: string) => {
        if (!selectedLabChallenge || !currentUser) return;
        setLoadingC(true);

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

                        setLoadingC(false);
                        setMsg('right');
                        AlertUtils.success('Parabéns ' + currentUser.displayName?.split(' ').pop() + ' , você conseguiu resolver este desafio!');
                        //  closeModal();
                    } else {
                        setLoadingC(false);
                        console.error('Nenhum documento encontrado na coleção hacking para o usuário:', currentUser.email);
                        alert('Erro ao atualizar a pontuação. Tente novamente.');
                    }
                } else {
                    setLoadingC(false);
                    console.error('selectedLabChallenge.id não é uma string:', selectedLabChallenge.id);
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

    const handleEditChallenge = async (challenge: ICtfsChallenge) => {
        console.log(challenge)
        // Redireciona para a página de edição do desafio
        //history.push(`/edit-challenge/${challenge.id}`);
    };

    const handleDeleteChallenge = async (challenge: ICtfsChallenge) => {
        if (window.confirm('Tem certeza de que deseja excluir este desafio?')) {
            try {
                // Exclui o desafio da coleção
                await db.collection('labs').doc(labId ?? '').collection('challenges').doc(challenge.id).delete();
                AlertUtils.success('Desafio excluído com sucesso!');
                // Atualiza a lista de desafios
                setLab(prevLab => ({
                    ...prevLab!,
                    challenges: prevLab?.challenges.filter(ch => ch.id !== challenge.id) ?? []
                }));
                closeModal();
            } catch (error) {
                console.error('Erro ao excluir o desafio:', error);
                alert('Erro ao excluir o desafio. Tente novamente.');
            }
        }
    };

    return (
        <>
            <div className="">
                <Navbar />
                <Sidebar toggleSidebar={toggleSidebar} isOpen={isOpen} /> {/* Passar isOpen para Sidebar */}

                <div className={`min-h-screen p-4 sm:pt-20 ${isOpen ? 'sm:ml-[10rem]' : 'sm:ml-[4rem]'} transition-all duration-300 bg-gray-100 dark:bg-gray-900`}>
                    <div className="flex-grow p-6">
                        <h1 className="text-2xl font-bold"><span className="hacker">Laboratório Virtual:</span> {lab?.lab_name}</h1>

                        <br />
                        <br />
                        <LabChallengeList
                            challenges={lab?.challenges ?? []}
                            userCtfs={userCtfs}
                            onChallengeClick={openModal}
                        />
                    </div>
                </div>
            </div>
            <LabChallengeModal
                challenge={selectedLabChallenge}
                isOpen={isModalOpen}
                onClose={closeModal}
                onSubmitFlag={handleSubmitFlag}
                onEdit={handleEditChallenge}
                onDelete={handleDeleteChallenge}
                loading={loadingC}
                msg={msg}
            />
        </>
    );
};
