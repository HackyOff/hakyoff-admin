import { useAuth } from '@/context/auth-context';
import { ITicket } from '@/domain/models/ticket-model';
import { AddNotificationsUtils } from '@/infra/services/add-notifications-utils';
import { fetchAllTickets, updateTicketStatus } from '@/services/ticket-service';
import { abbreviateText } from '@/utils/abreviate';
import { sendEmailSupport } from '@/utils/email-noreply';
import { GetStatusColor } from '@/utils/get-status-color-utils';
import { ticketEmailTemplate } from '@/utils/templates/ticket-email-template';
import { useState, useEffect } from 'react';

const TicketPanel = () => {
    const [tickets, setTickets] = useState<ITicket[]>([]);
    const [statusFilter, setStatusFilter] = useState<string>('');  // Estado para o filtro de status
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
        if (status === 'Pendente') {
            message = `Seu ticket com ID ${ticketCode} foi visualizado pela nossa equipa e foi marcado como ${status}. está sendo tratado e será notificado quando totalmente tratado.`;
        } else if (status === 'Resolvido') {
            message = `Seu ticket com ID ${ticketCode} foi resolvido e marcado como ${status}.`;
        }

        await AddNotificationsUtils({
            student_email: studentEmail,
            user_name: currentUser?.displayName || '',
            title: subject,
            content: message,
        });

        const emailHtml = ticketEmailTemplate(ticketCode, status, message);
        await sendEmailSupport(studentEmail, subject, emailHtml);
 
        const updatedTickets = await fetchAllTickets();
        setTickets(updatedTickets);
    };
 
    const filteredTickets = statusFilter
        ? tickets.filter(ticket => ticket.status === statusFilter)
        : tickets;

    return (
        <div>
            <h1 className='text-2xl font-bold '>Tickets abertos</h1>

            {/* Filtro de status */}
            <div className="mb-4">
                <label htmlFor="statusFilter" className="mr-2">Filtrar por Status:</label>
                <select
                    id="statusFilter"
                    className='p-2 border border-gray-400 outline-none'
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                >
                    <option value="">Todos</option>
                    <option value="Pendente">Pendente</option>
                    <option value="Não Respondido">Não Respondido</option>
                    <option value="Resolvido">Resolvido</option>
                </select>
            </div>

            <ul>
                {filteredTickets.map(ticket => (
                    <li className='px-2 py-3 my-4 bg-white border border-yellow-400 shadow-lg' key={ticket.id}>
                        <p>
                            <span className="font-bold">({ticket.code})</span> -  {ticket.title}
                        </p>
                        <p>Status: <span className={`text-xs ${GetStatusColor(ticket.status)}`}> {ticket.status}</span></p>
                        <p>
                            De: {ticket.student_name} - {abbreviateText(ticket.student_email, 50)} <a href={`mailto:${ticket.student_email}`} className='text-sm text-blue-700 underline' target="__blank" rel="noreferrer">Responder</a>
                        </p>
                        <br />
                        <button className='px-3 py-2 mt-4 text-sm border-2 border-orange-400 text-orange-00 me-2' onClick={() => handleStatusChange(ticket.id, 'Pendente', ticket.student_email, ticket.code)}>Marcar como Pendente</button>
                        <button className='px-3 py-2 mt-4 text-sm bg-green-500 me-2' onClick={() => handleStatusChange(ticket.id, 'Resolvido', ticket.student_email, ticket.code)}>Marcar como Resolvido</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TicketPanel;
