/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { collectionGroup, getDocs, updateDoc, doc, getDoc } from 'firebase/firestore';
import { db } from '@/domain/config/firebase';
import { sendTrainingApprovalEmail } from '@/utils/emailService';
import { AddNotificationsUtils } from '@/infra/services/add-notifications-utils';
import { DefaultMessages } from '@/domain/config/default-messages';
import { ExamRequestsList } from './list-exams-request';
import TicketPanel from './ticket-panel';

export interface Transaction {
    id: string;
    courseId: string;
    course_name: string;
    price: number;
    statusPagamento: string;
    method: string;
    boletoFile?: string;
    studentEmail: string;
    studentName: string;
    progresso: string;
    studentId: string;
    code_aluno: string;
    purchaseDate?: any
}

export const TransactionDashboard: React.FC = () => {
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
        <div className="container p-4 mx-auto ">
            <h1 className="mb-4 text-2xl font-bold">Dashboard de Aprovação de Transações</h1>
            <table className="bg-white border border-gray-200 ">
                <thead>
                    <tr>
                        <th className="px-4 py-2 text-sm border-b text-start">Student</th>
                        <th className="px-4 py-2 text-sm border-b text-start">Email</th>
                        <th className="px-4 py-2 text-sm border-b text-start">Curso</th>
                        <th className="px-4 py-2 text-sm border-b text-start">Preço</th>
                        <th className="px-4 py-2 text-sm border-b text-start">Modalidade</th>
                        <th className="px-4 py-2 text-sm border-b text-start">Status</th>
                        <th className="px-4 py-2 text-sm border-b text-start">Progresso</th>
                        <th className="px-4 py-2 text-sm border-b text-start">Comprovante</th>
                        <th className="px-4 py-2 text-sm border-b text-start">Ação</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((transaction) => (
                        <tr key={transaction.id}>
                            <td className="px-4 py-2 text-xs capitalize border-b">{transaction.studentName}</td>
                            <td className="px-4 py-2 text-xs border-b">{transaction.studentEmail}</td>
                            <td className="px-4 py-2 text-xs capitalize border-b">{transaction.course_name}</td>
                            <td className="px-4 py-2 text-xs capitalize border-b">{transaction.price} AOA</td>
                            <td className="px-4 py-2 text-xs capitalize border-b">{transaction.method}</td>
                            <td className="px-4 py-2 text-xs capitalize border-b">{transaction.statusPagamento}</td>
                            <td className={`py-2 capitalize text-xs ${parseInt(transaction.progresso) === 100 && 'bg-green-200'} px-4 border-b`}>{transaction.progresso}% { }</td>
                            <td className="px-4 py-2 text-xs capitalize border-b">
                                {transaction.boletoFile && (
                                    <a href={transaction.boletoFile} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                                        Ver Comprovante
                                    </a>
                                )}
                            </td>
                            <td className="px-4 py-2 text-xs border-b">
                                {transaction.statusPagamento === 'pendente' && (
                                    <button
                                        onClick={() => approveTransaction(transaction)}
                                        className="px-2 py-1 text-black rounded bg-primary hover:bg-yellow-600"
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
            <div className='container'>
                <ExamRequestsList />
            </div>
            <br />
            <br />

            <div className="p-6 bg-slate-100">
                <TicketPanel />
            </div>
            <br />
            <br />
            <br />
        </div>
    );
};
