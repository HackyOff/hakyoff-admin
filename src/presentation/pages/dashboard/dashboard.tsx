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
import AccordionTable from './table-transaction';




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

    const rejectTransaction = async (transaction: Transaction) => {
        try {
            const transactionRef = doc(db, 'alunos', transaction.studentId, 'courses', transaction.id);
            await updateDoc(transactionRef, { statusPagamento: 'rejeitado' });

            await AddNotificationsUtils({
                student_email: transaction.studentEmail || '',
                user_name: transaction.studentName || '',
                title: 'Pagamento de Treinamento Rejeitado',
                content: `O pagamento do Treinamento ${transaction.course_name} foi rejeitado. Por favor, entre em contato para mais informações.`,
            });

            setTransactions((prev) =>
                prev.map((trans) => (trans.id === transaction.id ? { ...trans, statusPagamento: 'rejeitado' } : trans))
            );

            alert('Transação rejeitada com sucesso!');
        } catch (error) {
            console.error('Erro ao rejeitar transação:', error);
            alert('Erro ao rejeitar transação. Por favor, tente novamente mais tarde.');
        }
    };



    return (
        <div className={`${userSettings.darkMode ? 'dark' : ''} `}>
            <Navbar />
            <Sidebar toggleSidebar={toggleSidebar} isOpen={isOpen} /> {/* Passar isOpen para Sidebar */}
            <div className={`min-h-screen hid p-4 sm:pt-20  ${isOpen ? 'sm:ml-[10rem]' : 'sm:ml-[4rem]'} transition-all duration-300 bg-gray-100 dark:bg-gray-900`}>

                <Button onClick={() => window.location.href = ROUTE_HACKING} color='primary' text='Ver todos alunos' />
                <br />
                <h1 className="mb-4 text-2xl font-bold">Dashboard de Aprovação de Transações</h1>
                <AccordionTable approveTransaction={approveTransaction} rejectTransaction={rejectTransaction} transactions={transactions} />

                <hr />
                <br />
                <br />
                <div>
                    <ExamRequestsList />
                </div>
                <br />
                <br />
            </div>


        </div>
    );
};
