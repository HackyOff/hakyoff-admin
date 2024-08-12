/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Transaction } from '../admin-pages/dashboard-transactions';

interface AccordionTableProps {
    transactions: any[];
    approveTransaction: (transaction: Transaction) => void;
}


const AccordionTable: React.FC<AccordionTableProps> = ({ transactions, approveTransaction }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    
    const toggleAccordion = () => {
        setIsExpanded(!isExpanded);
    };
    
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
                    <table className="w-full bg-white border border-gray-200">
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
                                    <td className={`py-2 capitalize text-xs ${parseInt(transaction.progresso) === 100 && 'bg-green-200'} px-4 border-b`}>
                                        {transaction.progresso}%
                                    </td>
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
                </div>
            )}
        </div>
    );
};

export default AccordionTable;
