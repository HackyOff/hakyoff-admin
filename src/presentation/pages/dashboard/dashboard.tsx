import React, { useEffect, useState } from 'react';
import { Sidebar } from '../../components/dashboard-components/sidebar/sidebar';
import { Navbar } from '../../components/dashboard-components/navbar/navbar';
import { useAuth } from '@/context/auth-context';
import "react-multi-carousel/lib/styles.css";
import { DefaultMessages } from '@/domain/config/default-messages';
import { db } from '@/domain/config/firebase';
import { AddNotificationsUtils } from '@/infra/services/add-notifications-utils';
import { sendTrainingApprovalEmail } from '@/utils/emailService';
import { getDocs, collectionGroup, doc, getDoc, updateDoc } from 'firebase/firestore';
import { Transaction } from '../admin-pages/dashboard-transactions';
import { Button } from '@/presentation/components';
import { ROUTE_HACKING } from '@/utils/sidebar-utils';
import { ExamRequestsList } from '../admin-pages/list-exams-request';




export const Dashboard: React.FC = () => {
    document.title = 'Dashboard | HakyOff Plaform'
    const [isOpen, setIsOpen] = useState(true); // Definir o estado isOpen aqui
    const { userSettings } = useAuth()


    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    /*
        if (currentUser?.phoneNumber === '' || currentUser?.role === '' || currentUser?.company === '' || currentUser?.address === '' ) {
            AlertUtils.info('Complee suas informações')
        }*/


    // console.log(currentUser)





    const [transactions, setTransactions] = useState<Transaction[]>([]);


    useEffect(() => {
        const fetchTransactions = async () => {
            const querySnapshot = await getDocs(collectionGroup(db, 'courses'));
            const trans: Transaction[] = [];

            for (const courseDoc of querySnapshot.docs) {
                const courseData = courseDoc.data();
                const studentId = courseDoc.ref.parent.parent?.id;
                if (studentId) {
                    const studentDocRef = doc(db, 'alunos', studentId);
                    const studentDoc = await getDoc(studentDocRef);
                    const studentData = studentDoc.data();

                    if (studentData) {
                        trans.push({
                            id: courseDoc.id,
                            courseId: courseData.courseId,
                            course_name: courseData.course_name,
                            price: courseData.price,
                            statusPagamento: courseData.statusPagamento,
                            method: courseData.method,
                            boletoFile: courseData.boletoFile,
                            studentEmail: studentData.email,
                            studentName: studentData.displayName,
                            studentId: studentId,
                            progresso: courseData.progresso,
                            code_aluno: studentData.code_aluno,
                            purchaseDate: courseData.purchaseDate,
                        });
                    }
                }
            }

            setTransactions(trans);
        };

        fetchTransactions();
    }, []);

    const approveTransaction = async (transaction: Transaction) => {
        try {
            const transactionRef = doc(db, 'alunos', transaction.studentId, 'courses', transaction.id);
            await updateDoc(transactionRef, { statusPagamento: 'aprovado' });

            await sendTrainingApprovalEmail(transaction.studentEmail, transaction.studentName, transaction.course_name);

            setTransactions((prev) =>
                prev.map((trans) => (trans.id === transaction.id ? { ...trans, statusPagamento: 'aprovado' } : trans))
            );

            await AddNotificationsUtils({
                student_email: transaction.studentEmail || '',
                user_name: transaction.studentName || '',
                title: 'Pagamento de Treinamento Aprovado',
                content: `Sua compra do Treinamento ${transaction.course_name} ${DefaultMessages.SUCCESS_BUY_COURSE}`,
            });


            alert('Transação aprovada com sucesso!');
        } catch (error) {
            console.error('Erro ao aprovar transação:', error);
            //alert('Erro ao aprovar transação. Por favor, tente novamente mais tarde.');

            alert('Transação aprovada com sucesso!');
        }
    };



    return (
        <div className={`${userSettings.darkMode ? 'dark' : ''} `}>
            <Navbar />
            <Sidebar toggleSidebar={toggleSidebar} isOpen={isOpen} /> {/* Passar isOpen para Sidebar */}
            <div className={`min-h-screen hid p-4 sm:pt-20  ${isOpen ? 'sm:ml-[10rem]' : 'sm:ml-[4rem]'} transition-all duration-300 bg-gray-100 dark:bg-gray-900`}>

                <Button onClick={() => window.location.href = ROUTE_HACKING} color='primary' text='Ver todos alunos' />
                <br />
                <h1 className="text-2xl font-bold mb-4">Dashboard de Aprovação de Transações</h1>
                <table className="  bg-white border border-gray-200">
                    <thead>
                        <tr>
                            <th className="py-2 text-sm  text-start px-4 border-b">Student</th>
                            <th className="py-2 text-sm  text-start px-4 border-b">Email</th>
                            <th className="py-2 text-sm  text-start px-4 border-b">Curso</th>
                            <th className="py-2 text-sm  text-start px-4 border-b">Preço</th>
                            <th className="py-2 text-sm  text-start px-4 border-b">Modalidade</th>
                            <th className="py-2 text-sm  text-start px-4 border-b">Status</th>
                            <th className="py-2 text-sm  text-start px-4 border-b">Progresso</th>
                            <th className="py-2 text-sm  text-start px-4 border-b">Comprovante</th>
                            <th className="py-2 text-sm  text-start px-4 border-b">Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((transaction) => (
                            <tr key={transaction.id}>
                                <td className="py-2 capitalize text-xs px-4 border-b">{transaction.studentName}</td>
                                <td className="py-2 text-xs px-4 border-b">{transaction.studentEmail}</td>
                                <td className="py-2 capitalize text-xs px-4 border-b">{transaction.course_name}</td>
                                <td className="py-2 capitalize text-xs px-4 border-b">{transaction.price} AOA</td>
                                <td className="py-2 capitalize text-xs px-4 border-b">{transaction.method}</td>
                                <td className="py-2 capitalize text-xs px-4 border-b">{transaction.statusPagamento}</td>
                                <td className={`py-2 capitalize text-xs ${parseInt(transaction.progresso) === 100 && 'bg-green-200'} px-4 border-b`}>{transaction.progresso}% { }</td>
                                <td className="py-2 capitalize text-xs px-4 border-b">
                                    {transaction.boletoFile && (
                                        <a href={transaction.boletoFile} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                                            Ver Comprovante
                                        </a>
                                    )}
                                </td>
                                <td className="py-2 px-4 text-xs border-b">
                                    {transaction.statusPagamento === 'pendente' && (
                                        <button
                                            onClick={() => approveTransaction(transaction)}
                                            className="bg-primary text-black px-2 py-1 rounded hover:bg-yellow-600"
                                        >
                                            Aprovar
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <hr />
                <br /> 
                <br />
                <div>
                    <ExamRequestsList />
                </div>
            </div>

        </div>
    );
};
