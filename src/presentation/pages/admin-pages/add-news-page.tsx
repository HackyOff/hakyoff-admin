// AddNewsPage.tsx
import React, { useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import { addNewsAndNotify } from '@/utils/news-service';
import { RANDOM_CODE } from '@/domain/config/navbar-config';
import { INews } from '@/utils/news-data-uils';

export const AddNewsPage: React.FC = () => {
    const [title, setTitle] = useState('');
    const [shortDesc, setShortDesc] = useState('');
    const [content, setContent] = useState('');
    const [cover, setCover] = useState<File | null>(null);
    const [isNew, setIsNew] = useState(true);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!cover) {
            alert('Please select a cover image.');
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
            alert('News added successfully and notifications sent!');
            setTitle('');
            setShortDesc('');
            setContent('');
            setCover(null);
            setIsNew(true);
        } catch (error) {
            console.error('Erro ao adicionar notícia ao Firestore:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-10 px-4">
            <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-8">Add News</h1>
            <form onSubmit={handleSubmit} className="max-w-3xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
                <div className="mb-6">
                    <label htmlFor="title" className="block text-gray-700 dark:text-gray-300 mb-2">Title:</label>
                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-300"
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="shortDesc" className="block text-gray-700 dark:text-gray-300 mb-2">Short Description:</label>
                    <input
                        id="shortDesc"
                        type="text"
                        value={shortDesc}
                        onChange={(e) => setShortDesc(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-300"
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="content" className="block text-gray-700 dark:text-gray-300 mb-2">Content:</label>
                    <textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-300"
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="cover" className="block text-gray-700 dark:text-gray-300 mb-2">Cover Image:</label>
                    <input
                        id="cover"
                        type="file"
                        onChange={(e) => setCover(e.target.files ? e.target.files[0] : null)}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-300"
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="isNew" className="block text-gray-700 dark:text-gray-300 mb-2">New:</label>
                    <input
                        id="isNew"
                        type="checkbox"
                        checked={isNew}
                        onChange={(e) => setIsNew(e.target.checked)}
                        className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                </div>
                <button type="submit" className="w-full px-4 py-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                    Add Newsletter
                </button>
            </form>
        </div>
    );
};

export default AddNewsPage;
