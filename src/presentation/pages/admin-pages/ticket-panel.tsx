import { useAuth } from '@/context/auth-context';
import { ITicket } from '@/domain/models/ticket-model';
import { AddNotificationsUtils } from '@/infra/services/add-notifications-utils';
import { fetchAllTickets, updateTicketStatus } from '@/services/ticket-service';
import { sendEmailSupport } from '@/utils/email-noreply';
import { GetStatusColor } from '@/utils/get-status-color-utils';
import { ticketEmailTemplate } from '@/utils/templates/ticket-email-template';
import { useState, useEffect } from 'react';  // Importe suas funções do Firebase

const TicketPanel = () => {
    const [tickets, setTickets] = useState<ITicket[]>([]);
    const { currentUser } = useAuth()
    useEffect(() => {
        const fetchTickets = async () => {
            const ticketsList = await fetchAllTickets();
            setTickets(ticketsList);
        };

        fetchTickets();
    }, []);

    const handleStatusChange = async (ticketId: string, status: string, studentEmail: string, ticketCode: number) => {
        await updateTicketStatus(ticketId, status);
        const subject = `Ticket Nº ${ticketCode} - ${status}`;
        let message = ''
        if (status == 'Pendente') {
            message = `Seu ticket com ID ${ticketCode} foi visualizado pela nossa equipa e foi marcado como ${status}. está sendo tratado e será notificado quando totalmente tratado`;
        }
        else if (status === 'Resolvido') {
            message = `Seu ticket com ID ${ticketCode} foi resolvido e marcado como ${status}.`;
        }
        else {
            message = ''
        }

        await AddNotificationsUtils({
            student_email: studentEmail,
            user_name: currentUser?.displayName || '',
            title: subject,
            content: message,
        });

        const emailHtml = ticketEmailTemplate(ticketCode, status, message);
        await sendEmailSupport(studentEmail, subject, emailHtml);

    };

    return (
        <div>
            <h1>Painel de Tickets</h1>
            <ul>
                {tickets.map(ticket => (
                    <li className='bg-slate-200 border border-green-400 my-4 shadow-lg px-2 py-3' key={ticket.id}>
                        <p>
                            <span className="font-bold">({ticket.code})</span> -  {ticket.title}
                        </p>
                        <p>Status: <span className={` text-xs ${GetStatusColor(ticket.status)}`}> {ticket.status}</span></p>
                        <p>
                            De: {ticket.student_name} - {ticket.student_email} <a href={`mailto:${ticket.student_email}`} className='text-sm underline text-blue-700' target="__blank" rel="noreferrer">Responder</a>
                        </p>
                        <br />
                        <button className='px-3 py-2 border-orange-400 border-2 text-orange-00 text-sm me-2 mt-4' onClick={() => handleStatusChange(ticket.id, 'Pendente', ticket.student_email, ticket.code)}>Marcar como Pendente</button>
                        <button className='px-3 py-2 bg-green-500 text-sm me-2 mt-4' onClick={() => handleStatusChange(ticket.id, 'Resolvido', ticket.student_email, ticket.code)}>Marcar como Resolvido</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TicketPanel;
