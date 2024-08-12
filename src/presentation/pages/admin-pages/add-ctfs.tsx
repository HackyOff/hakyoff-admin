// AddCtfForm.tsx
import React, { useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { RandomAlphanumeric } from '@/domain/config/navbar-config';

const AddCtfForm: React.FC = () => {
    const [module, setModule] = useState('');
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [link, setLink] = useState('');
    const [flag, settFlag] = useState('');
    const [level, setLevel] = useState('Beginner');
    const [pts, setPts] = useState(0);

    const handleAddCtf = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const newCtf = {
                module,
                ctf: [{
                    id: RandomAlphanumeric,
                    title,
                    desc,
                    level,
                    pts,
                    link,
                    flag
                }]
            };
            await firebase.firestore().collection('ctfs').add(newCtf);
            alert('CTF adicionado com sucesso!');
            setModule('');
            setTitle('');
            setDesc('');
            setLink('')
            setLevel('Beginner');
            settFlag('')
            setPts(0);
        } catch (error) {
            console.error('Erro ao adicionar CTF:', error);
            alert('Erro ao adicionar CTF, tente novamente.');
        }
    };

    return (
        <form onSubmit={handleAddCtf} className="p-4 bg-white rounded shadow-md">
            <div className="mb-4">
                <label className="block text-sm font-medium">Título do Módulo</label>
                <input
                    type="text"
                    value={module}
                    onChange={(e) => setModule(e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium">Título</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium">Link</label>
                <input
                    type="text"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium">Resposta da flag</label>
                <input
                    type="text"
                    value={flag}
                    onChange={(e) => settFlag(e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium">Descrição</label>
                <textarea
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium">Nível</label>
                <select
                    value={level}
                    onChange={(e) => setLevel(e.target.value)}
                    className="w-full p-2 border rounded"
                >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                </select>
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium">Pontos</label>
                <input
                    type="number"
                    value={pts}
                    onChange={(e) => setPts(parseInt(e.target.value))}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>
            <br />
            <button type="submit" className="px-4 py-2 font-semibold rounded bg-primary">Adicionar CTF</button>
            <br />
            <br />
        </form>
    );
};

export default AddCtfForm;
