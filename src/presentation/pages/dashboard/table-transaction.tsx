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
                className="w-full text-left py-2 px-4 border border-gray-200 bg-gray-100 hover:bg-gray-200"
            >
                {isExpanded ? 'Minimizar' : 'Expandir'} Tabela de atividades
            </button>
            {isExpanded && (
                <div className="py4 border border-gray-200">
                    <table className="w-full bg-white border border-gray-200">
                        <thead>
                            <tr>
                                <th className="py-2 text-sm text-start px-4 border-b">Student</th>
                                <th className="py-2 text-sm text-start px-4 border-b">Email</th>
                                <th className="py-2 text-sm text-start px-4 border-b">Curso</th>
                                <th className="py-2 text-sm text-start px-4 border-b">Preço</th>
                                <th className="py-2 text-sm text-start px-4 border-b">Modalidade</th>
                                <th className="py-2 text-sm text-start px-4 border-b">Status</th>
                                <th className="py-2 text-sm text-start px-4 border-b">Progresso</th>
                                <th className="py-2 text-sm text-start px-4 border-b">Comprovante</th>
                                <th className="py-2 text-sm text-start px-4 border-b">Ação</th>
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
                                    <td className={`py-2 capitalize text-xs ${parseInt(transaction.progresso) === 100 && 'bg-green-200'} px-4 border-b`}>
                                        {transaction.progresso}%
                                    </td>
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
                </div>
            )}
        </div>
    );
};

export default AccordionTable;
