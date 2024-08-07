// AddNewsPage.tsx
import React, { useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import { addNewsAndNotify } from '@/utils/news-service';
import { RANDOM_CODE } from '@/domain/config/navbar-config';
import { INews } from '@/utils/news-data-uils';
import { AlertUtils } from '@/utils/alert-utils';
import { TextEditor } from '@/presentation/components/dashboard-components/text-editor/text-editor';
import { Button } from '@/presentation/components';
import { ROUTE_NEWS } from '@/utils/sidebar-utils';

export const AddNewsPage: React.FC = () => {
    const [title, setTitle] = useState('');
    const [shortDesc, setShortDesc] = useState('');
    const [content, setContent] = useState('');
    const [cover, setCover] = useState<File | null>(null);
    const [isNew, setIsNew] = useState(true);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!cover || !title || !content || !shortDesc) {
            AlertUtils.error('Por favor adicione uma capa');
            return;
        }

        const storageRef = firebase.storage().ref();
        const coverRef = storageRef.child(`covers/${cover.name}`);
        await coverRef.put(cover);
        const coverUrl = await coverRef.getDownloadURL();

        const newNews: INews = {
            news_code: RANDOM_CODE,
            title: title,
            short_desc: shortDesc,
            content: content,
            cover: coverUrl,
            date: new Date(),
            new: isNew,
        };

        try {
            await addNewsAndNotify(newNews);
            AlertUtils.success('Noticia adicionada com sucesso e enviado para os alunos !');
            setTitle('');
            setShortDesc('');
            setContent('');
            setCover(null);
            setIsNew(true);
        } catch (error: any) {
            AlertUtils.error('Erro ao adicionar notícia ao Firestore:', error.message);
        }
    };

    return (
        <>
            <br />
            <br />
            <div className="flex justify-between">
                <h1 className="text-4xl font-bold  hacker text-gray-900 dark:text-white">Adicionar Newsletter</h1>
                <Button text='Todas Notícias' color='primary' className='my-auto' onClick={() => window.location.href = ROUTE_NEWS} />
            </div>
            <br />
            <br />
            <form onSubmit={handleSubmit} className="max-w-3xl   bg-  dark:bg-gray-800 p-1 rounded-lg  ">
                <div className="mb-6">
                    <label htmlFor="title" className="block text-gray-700 dark:text-gray-300 mb-2">Titulo da Notícia</label>
                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-3 py-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-gray-300"
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="shortDesc" className="block text-gray-700 dark:text-gray-300 mb-2">Breve Descrição:</label>
                    <input
                        id="shortDesc"
                        type="text"
                        value={shortDesc}
                        onChange={(e) => setShortDesc(e.target.value)}
                        className="w-full px-3 py-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-gray-300"
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="cover" className="block text-gray-700 dark:text-gray-300 mb-2">Imagem de Capa:</label>
                    <input
                        id="cover"
                        type="file"
                        onChange={(e) => setCover(e.target.files ? e.target.files[0] : null)}
                        className="w-full px-3 bg-white py-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-gray-300"
                    />
                </div>
                <div className="mb-6">

                    {
                        /*
                    <textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full px-3 py-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-gray-300"
                    />
                        */
                    }
                    <TextEditor editorContent={content} setEditorContent={setContent} />
                </div>
                <div className="mb-6">
                    <label htmlFor="isNew" className="block text-gray-700 dark:text-gray-300 mb-2">Marcar como <b>Novo</b>:</label>
                    <input
                        id="isNew"
                        type="checkbox"
                        checked={isNew}
                        onChange={(e) => setIsNew(e.target.checked)}
                        className="w-5 h-5 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary dark:focus:ring-primary dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                </div>
                <button type="submit" className="w-full px-4 py-2 bg-primary   font-bold rounded-sm hover:bg-primary/90 focus:outline-none focus:bg-primary">
                    Adicionar Newsletter
                </button>
            </form>
        </>
    );
};

export default AddNewsPage;
