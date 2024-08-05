import React, { useState } from 'react';
import { Navbar } from '../../components/dashboard-components/navbar/navbar';
import { Sidebar } from '../../components/dashboard-components/sidebar/sidebar';
import { useAuth } from '../../../context/auth-context';
import { TextEditor } from '../../components/dashboard-components/text-editor/text-editor';
import { Button } from '../../components';
import { FaArrowLeft } from 'react-icons/fa';
import { AlertUtils } from '@/utils/alert-utils';
import { createTicket } from '@/services/ticket-service';
import TicketPanel from '../admin-pages/ticket-panel';


export const Tickets: React.FC = () => {
    document.title = 'Meus tickets | HakyOff Academy';

    const [createTicketMode, setCreateTicketMode] = useState(false);
    const [isOpen, setIsOpen] = useState(true);

    const { currentUser, userSettings } = useAuth();
    const [title, setTitle] = useState('');
    const [editorContent, setEditorContent] = useState('');


    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };


    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            await createTicket(title, editorContent, currentUser?.email, currentUser!.displayName);
            setTitle('');
            setEditorContent('');
            setCreateTicketMode(false);
            AlertUtils.success(`Seu ticket ${title} foi criado com sucesso e será tratado pelo suporte`);

        } catch (error) {
            AlertUtils.error('Ocorreu um erro ao tentar criar seu ticket');
        }
    };


    return (
        <div className={`${userSettings.darkMode ? 'dark' : ''}`}>
            <Navbar />
            <Sidebar toggleSidebar={toggleSidebar} isOpen={isOpen} />
            <div className={`min-h-screen p-4 sm:pt-20 ${isOpen ? 'sm:ml-[10rem]' : 'sm:ml-[4rem]'} transition-all duration-300 bg-gray-100 dark:bg-gray-900`}>
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
                        <TicketPanel />
                    </>
                )}
            </div>
        </div>
    );
};
