import React, { useState, useEffect } from 'react';
import { ICtfs, ICtfsChallenge } from '@/interfaces/ctfs/ctfs-intrface';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { Button } from '@/presentation/components';

interface EditCtfFormProps {
    ctfId: string;
    onClose: () => void;
    challenge?: ICtfsChallenge
    index?: number;
}

export const EditCtfForm: React.FC<EditCtfFormProps> = ({ ctfId, onClose, challenge, index }) => {
    const [ctfData, setCtfData] = useState<ICtfs | null>(null);

    useEffect(() => {
        const fetchCtfData = async () => {
            try {
                const doc = await firebase.firestore().collection('ctfs').doc(ctfId).get();
                if (doc.exists) {
                    setCtfData(doc.data() as ICtfs);
                }
            } catch (error) {
                console.error('Erro ao buscar os dados do CTF:', error);
            }
        };

        fetchCtfData();
    }, [ctfId]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (ctfData) {
            try {
                await firebase.firestore().collection('ctfs').doc(ctfId).update(ctfData);
                onClose();
            } catch (error) {
                console.error('Erro ao atualizar o CTF:', error);
            }
        }
    };

    const handleChallengeChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: string) => {
        if (ctfData && index !== undefined) {
            const updatedChallenges = [...ctfData.ctf];
            updatedChallenges[index] = { ...updatedChallenges[index], [field]: e.target.value };
            setCtfData({ ...ctfData, ctf: updatedChallenges });
        }
    };

    if (!ctfData) {
        return <div>Carregando...</div>;
    }

    return (
        <form onSubmit={handleSubmit}>
            {!challenge && (
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Módulo</label>
                    <input
                        type="text"
                        value={ctfData.module}
                        onChange={(e) => setCtfData({ ...ctfData, module: e.target.value })}
                        className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm dark:bg-slate-100/10 dark:text-white"
                    />
                </div>
            )}

            {challenge && (
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Título do Desafio</label>
                    <input
                        type="text"
                        value={challenge.title}
                        onChange={(e) => handleChallengeChange(e, 'title')}
                        className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm dark:bg-slate-100/10 dark:text-white"
                    />

                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Descrição</label>
                    <textarea
                        value={challenge.desc}
                        onChange={(e) => handleChallengeChange(e, 'desc')}
                        className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm dark:bg-slate-100/10 dark:text-white"
                    />

                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Nível</label>
                    <input
                        type="text"
                        value={challenge.level}
                        onChange={(e) => handleChallengeChange(e, 'level')}
                        className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm dark:bg-slate-100/10 dark:text-white"
                    />
                </div>
            )}

            <Button text="Salvar Alterações" type="submit" color="primary" />
            <Button text="Cancelar" type="button" onClick={onClose} />
        </form>
    );
};
