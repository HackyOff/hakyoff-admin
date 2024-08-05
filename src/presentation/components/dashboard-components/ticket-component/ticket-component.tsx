import { ITicket } from '@/domain/models/ticket-model';
import React from 'react';
import { FaEye, FaTrashAlt } from 'react-icons/fa';


interface TicketComponentProps {
    ticket: ITicket;
    onDelete: (id: string) => void;
    onView: () => void;
}

export const TicketComponent: React.FC<TicketComponentProps> = ({ ticket, onDelete, onView }) => {
    let statusClass = '';

    // Definir a classe com base no status do ticket
    switch (ticket.status) {
        case 'Não Respondido':
            statusClass = 'bg-red-700 font-semibold text-white py-2 sm:px-3 my-1 w-auto rounded-md';
            break;
        case 'Pendente':
            statusClass = 'bg-orange-200 sm:px-[2.5rem] font-semibold text-orange-700 py-2   my-1 w-auto rounded-md';
            break;
        case 'Resolvido':
            statusClass = 'bg-green-700 font-semibold text-white py-2 sm:px-3 my-1 w-auto rounded-md';
            break;
        default:
            statusClass = '';
    }

    return (
        <div onClick={() => onView()} className="flex sm:cursor-pointer transition-all justify-between w-full px-5 py-6 mb-4 bg-white hover:shadow-none hover:bg-white/70 rounded-lg shadow  dark:bg-slate-100/10 dark:hover:bg-slate-100/15 transiction-all">
            <div className='flex gap-5 lg:gap-0 flex-col lg:flex-row justify-between w-full'>
                <div className="lg:w-6/12">
                    <h3 className="dark:text-white text-xl font-bold text-gray-600">{ticket.title}</h3>

                </div>
                <div className=' text-xs sm:hidden'>
                    {DateComp(ticket.createdAt.toLocaleString())}
                </div>
                {
                    /*  <p dangerouslySetInnerHTML={{ __html: ticket.content }} />*/
                }

                <div className="flex w-full sm:gap-10 sm:justify-end justify-between" >
                    <p className={`text-gray-500 my-auto px-2 text-xs sm:text-md ${statusClass}`}> {ticket.status}</p>
                    <div className='sm:block hidden'>
                        {DateComp(ticket.createdAt.toLocaleString())}
                    </div>
                    <button
                        title="ver ticket"
                        className="mr-4  hidden text-sm text-gray-600 hover:text-gray-900"
                        onClick={() => onView()}
                    >
                        <FaEye className="text-xl dark:text-white" />
                    </button>
                    <button
                        title="apagar ticket"
                        className="text-sm text-red-600 hover:text-red-900"
                        onClick={() => onDelete(ticket.id)}
                    >
                        <FaTrashAlt className="text-xl" />
                    </button>
                </div>
            </div>
        </div>
    );
};


function DateComp(ticket_date: string) {
    return (
        <div className='flex flex-col my-auto text-gray-400 dark:text-black'>
            <p className="my-auto text-sm dark:text-white hacker">Data de abertura:</p>
            <p className="my-auto text-sm hacker dark:text-white ">{ticket_date}</p>
        </div>
    )
}