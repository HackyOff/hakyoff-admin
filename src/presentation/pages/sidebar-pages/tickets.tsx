import React, { useEffect, useState, useMemo } from 'react';
import { Navbar } from '../../components/dashboard-components/navbar/navbar';
import { Sidebar } from '../../components/dashboard-components/sidebar/sidebar';
import { useAuth } from '../../../context/auth-context';
import { TextEditor } from '../../components/dashboard-components/text-editor/text-editor';
import { Button } from '../../components';
import { FaArrowLeft, FaFilter } from 'react-icons/fa';
import { TicketComponent } from '../../components/dashboard-components/ticket-component/ticket-component';
import { Modal } from '../../components/modal-ticket/modal-ticket';
import { ITicket } from '../../../domain/models/ticket-model';
import { GetStatusColor } from '@/utils/get-status-color-utils';
import { renderTicketSkeletons } from '@/utils/render-skeleton-ticket';
import { AlertUtils } from '@/utils/alert-utils';
import { fetchTickets, createTicket, deleteTicket } from '@/services/ticket-service';


export const Tickets: React.FC = () => {
    document.title = 'Meus tickets | HakyOff Academy';

    const [createTicketMode, setCreateTicketMode] = useState(false);
    const [isOpen, setIsOpen] = useState(true);
    const [tickets, setTickets] = useState<ITicket[]>([]);
    const [loading, setLoading] = useState(true);

    const { currentUser, userSettings } = useAuth();
    const [title, setTitle] = useState('');
    const [editorContent, setEditorContent] = useState('');
    const [selectedTicket, setSelectedTicket] = useState<ITicket | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = (ticket: ITicket) => {
        setSelectedTicket(ticket);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedTicket(null);
    };

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const fetchTicketsMemo = useMemo(() => {
        return async () => {
            setLoading(true);
            if (currentUser?.email) {
                const fetchedTickets = await fetchTickets(currentUser.email);
                setTickets(fetchedTickets);
            }
            setLoading(false);
        };
    }, [currentUser]);

    useEffect(() => {
        fetchTicketsMemo();
    }, [fetchTicketsMemo]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            await createTicket(title, editorContent, currentUser?.email, currentUser!.displayName);
            setTitle('');
            setEditorContent('');
            setCreateTicketMode(false);
            AlertUtils.success(`Seu ticket ${title} foi criado com sucesso e será tratado pelo suporte`);
            fetchTicketsMemo();
        } catch (error) {
            AlertUtils.error('Ocorreu um erro ao tentar criar seu ticket');
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteTicket(id);
            AlertUtils.success('Ticket apagado com sucesso!');
            fetchTicketsMemo();
        } catch (error: any) {
            AlertUtils.error('Erro ao apagar ticket, tente novamente mais tarde');
        }
    };

    return (
        <div className={`${userSettings.darkMode ? 'dark' : ''}`}>
            <Navbar />
            <Sidebar toggleSidebar={toggleSidebar} isOpen={isOpen} />
            <div className={`min-h-screen p-4 sm:pt-20 ${isOpen ? 'sm:ml-[14rem]' : 'sm:ml-[4rem]'} transition-all duration-300 bg-gray-100 dark:bg-gray-900`}>
                <br />
                {createTicketMode ? (
                    <>
                        <Button
                            text='Voltar'
                            leftIcon={FaArrowLeft}
                            onClick={() => setCreateTicketMode(false)}
                            color='primary'
                            className='hacker text-xs'
                        />
                        <br />
                        <br />
                        <div className="flex dark:text-white items-center justify-center bg-gray-100 dark:bg-slate-100/10">
                            <div className="w-full p-6 rounded-lg shadow-lg">
                                <h2 className="mb-4 sm:text-2xl text-lg font-semibold">Abrir um ticket para obter suporte da nossa equipe de suporte</h2>
                                <hr />
                                <br />
                                <div className="mb-4">
                                    <label htmlFor="title" className="block mt-4 mb-2 sm:text-xl hacker text-xs font-bold dark:text-white text-gray-700">Assunto do ticket</label>
                                    <input
                                        type="text"
                                        id="title"
                                        className="block w-full px-2 py-3 mt-1 border border-gray-300 rounded-md shadow-sm outline-none dark:border-2 dark:border-white dark:bg-white/20 focus:ring-indigo-500 focus:border-primary sm:text-sm"
                                        value={title}
                                        placeholder='Insira um assunto para o seu ticket'
                                        onChange={(e) => setTitle(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="content" className="block mt-4 mb-2 sm:text-xl hacker text-xs font-bold dark:text-white text-gray-700">Conteúdo do ticket</label>
                                    <TextEditor editorContent={editorContent} setEditorContent={setEditorContent} />
                                </div>
                                <Button
                                    onClick={handleSubmit}
                                    text='Criar Ticket'
                                    color='primary'
                                />
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <h2 className="sm:text-3xl text-2xl font-bold dark:text-white hacker">Seus tickets</h2>
                        <br />
                        <div className="w-full px-5 py-6 bg-white rounded-lg shadow dark:bg-slate-100/10">
                            <Button
                                text='Abrir Ticket'
                                onClick={() => setCreateTicketMode(true)}
                                color='primary'
                                className='click text-xs sm:text-md'
                            />
                        </div>
                        <br />
                        <br />
                        {loading ? (
                            renderTicketSkeletons()
                        ) : (
                            tickets.length > 0 ? (
                                tickets.map((ticket) => (
                                    <TicketComponent
                                        key={ticket.id}
                                        ticket={ticket}
                                        onDelete={handleDelete}
                                        onView={() => openModal(ticket)}
                                    />
                                ))
                            ) : (
                                <div className="bg-white dark:bg-slate-100/10 text-center rounded-lg shadow w-full py-[10rem] px-5">
                                    <FaFilter className='mx-auto text-gray-500 text-9xl' />
                                    <br />
                                    <br />
                                    <h2 className="text-gray-500">
                                        Meus tickets pendentes aparecerão aqui!
                                    </h2>
                                </div>
                            )
                        )}

                        {isModalOpen && selectedTicket && (
                            <Modal isOpen={isModalOpen} onClose={closeModal}>
                                <h2 className="mb-1 text-xl font-bold">{selectedTicket.title}</h2>
                                <hr />
                                <div className="flex sm:flex-row flex-col gap-3 my-3 text-sm hacker">
                                    <p className={`my-auto text-[10px] me-auto sm:me-0 px-2 ${GetStatusColor(selectedTicket.status)}`}> {selectedTicket.status}</p>
                                    <span className="hidden sm:block"> &middot;</span>
                                    <span className="my-auto text-xs"> {selectedTicket.createdAt.toLocaleString()}</span>
                                </div>
                                <p>
                                    <div dangerouslySetInnerHTML={{ __html: selectedTicket.content }} />
                                </p>
                                <br />
                                <br />
                            </Modal>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};
