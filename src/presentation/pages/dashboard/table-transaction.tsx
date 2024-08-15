/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { Transaction } from '../admin-pages/dashboard-transactions';
import { db } from '@/domain/config/firebase';
import { getDocs, collectionGroup, doc, getDoc } from 'firebase/firestore';

interface AccordionTableProps {
    transactions: any[];
    approveTransaction: (transaction: Transaction) => void;
    rejectTransaction: (transaction: Transaction) => void;
}

const AccordionTable: React.FC<AccordionTableProps> = ({ rejectTransaction, approveTransaction }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [filter, setFilter] = useState<'Pendente' | 'Aprovado' | 'Rejeitado'>('Pendente');
    // const [filteredTransactions, setFilteredTransactions] = useState<any[] | null>(transactions);

    const toggleAccordion = () => {
        setIsExpanded(!isExpanded);
    };

    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);

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

    useEffect(() => {
        if (filter === "Pendente") {
            setFilteredTransactions(transactions);
        } else {
            setFilteredTransactions(
                transactions.filter((transaction) =>
                    transaction.statusPagamento === filter.toLowerCase()
                )
            );
        }
    }, [filter, transactions]);
    console.log(filteredTransactions)
    return (
        <div className="accordion">
            <button
                onClick={toggleAccordion}
                className="w-full px-4 py-2 text-left bg-gray-100 border border-gray-200 hover:bg-gray-200"
            >
                {isExpanded ? 'Minimizar' : 'Expandir'} Tabela de atividades
            </button>

            {isExpanded && (
                <div className="border border-gray-200 py4">
                    <div className="hidden mb-4">
                        <button onClick={() => setFilter("Aprovado")} className={`px-3 py-1 mr-2 ${filter === 'Aprovado' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
                            Todas
                        </button>
                        <button onClick={() => setFilter('Pendente')} className={`px-3 py-1 mr-2 ${filter === 'Pendente' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
                            Pendentes
                        </button>
                        <button onClick={() => setFilter('Aprovado')} className={`px-3 py-1 mr-2 ${filter === 'Aprovado' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
                            Aprovadas
                        </button>
                        <button onClick={() => setFilter('Rejeitado')} className={`px-3 py-1 ${filter === 'Rejeitado' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
                            Rejeitadas
                        </button>
                    </div>

                    <table className="w-full bg-white border border-gray-200">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 text-sm border-b text-start">Student</th>
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
                            {filteredTransactions?.map((transaction) => (
                                <tr key={transaction.id}>
                                    <td className="px-4 py-2 text-xs capitalize border-b">{transaction.studentName}</td>
                                    <td className="px-4 py-2 text-xs capitalize border-b">{transaction.course_name}</td>
                                    <td className="px-4 py-2 text-xs capitalize border-b">{transaction.price} AOA</td>
                                    <td className="px-4 py-2 text-xs capitalize border-b">{transaction.method}</td>
                                    <td className="px-4 py-2 text-xs capitalize border-b">{transaction.statusPagamento}</td>
                                    <td className={`py-2 capitalize text-xs ${parseInt(transaction.progresso) === 100 && 'bg-green-200'} px-4 border-b`}>
                                        {transaction.progresso}%
                                    </td>
                                    <td className="px-4 py-2 text-xs capitalize border-b">
                                        {transaction.boletoFile && (
                                            <a href={transaction.boletoFile} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                                                Comprovativo
                                            </a>
                                        )}
                                    </td>
                                    <td className="px-4 py-2 text-xs border-b">
                                        {transaction.statusPagamento === 'pendente' && (
                                            <div className='flex gap-2'>
                                                <button
                                                    onClick={() => approveTransaction(transaction)}
                                                    className="px-2 py-1 text-black rounded bg-primary hover:bg-yellow-600"
                                                >
                                                    Aprovar
                                                </button>
                                                <button
                                                    onClick={() => rejectTransaction(transaction)}
                                                    className="px-2 py-1 text-white bg-red-500 rounded hover:bg-red-700"
                                                >
                                                    Rejeitar
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AccordionTable;
