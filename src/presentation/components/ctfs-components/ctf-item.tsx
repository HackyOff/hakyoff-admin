import React, { useState } from 'react';
import { ICtfs } from '@/interfaces/ctfs/ctfs-intrface';
import { abbreviateText } from '@/utils/abreviate';
import firebase from 'firebase/compat/app';
import { FaTrash, } from 'react-icons/fa6';
import { FaEdit } from 'react-icons/fa';
import { AlertUtils } from '@/utils/alert-utils';
import { EditCtfForm } from './editctf-form';

interface CtfItemProps {
    ctf: ICtfs;
    index?: number;
}

export const CtfItem: React.FC<CtfItemProps> = ({ ctf }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editingChallengeIndex, setEditingChallengeIndex] = useState<number | null>(null);

    const handleDelete = async () => {
        try {
            await firebase.firestore().collection('ctfs').doc(ctf.id).delete();
            AlertUtils.success('CTF excluído com sucesso');
        } catch (error) {
            AlertUtils.error('Ocorreu um erro ao excluir este CTF');
            console.error('Erro ao excluir o CTF:', error);
        }
    };

    const handleChallengeDelete = async (index: number) => {
        const updatedCtfs = ctf.ctf.filter((_, i) => i !== index);
        try {
            await firebase.firestore().collection('ctfs').doc(ctf.id).update({ ctf: updatedCtfs });
            AlertUtils.success('Desafio excluído com sucesso');
        } catch (error) {
            AlertUtils.error('Ocorreu um erro ao excluir o desafio');
            console.error('Erro ao excluir o desafio:', error);
        }
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleChallengeEdit = (index: number) => {
        setEditingChallengeIndex(index);
    };

    const handleCloseEdit = () => {
        setIsEditing(false);
        setEditingChallengeIndex(null);
    };

    return (
        <div key={ctf.ctf_code} className="px-4 py-2 my-4 mb-4 bg-white rounded-lg shadow-sm dark:bg-slate-100/10">
            {isEditing ? (
                <EditCtfForm ctfId={ctf.id} onClose={handleCloseEdit} />
            ) : (
                <>
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-xl font-bold dark:text-white">{ctf.module}</h3>
                            <p className="text-gray-500 dark:text-gray-400">{abbreviateText(ctf.module, 100)}</p>
                        </div>
                        <div className="flex items-center">
                            <button
                                className="mr-4 text-blue-500 hover:text-blue-700"
                                onClick={handleEdit}
                            >
                                <FaEdit />
                            </button>
                            <button
                                className="text-red-500 hover:text-red-700"
                                onClick={handleDelete}
                            >
                                <FaTrash />
                            </button>
                        </div>
                    </div>
                    <div className="mt-4">
                        {ctf.ctf.map((challenge, i) => (
                            <div key={i} className="flex items-center justify-between px-2 my-1 mt-2 bg-slate-50">
                                <div>
                                    {editingChallengeIndex === i ? (
                                        <EditCtfForm
                                            ctfId={ctf.id}
                                            challenge={challenge}
                                            index={i}
                                            onClose={handleCloseEdit}
                                        />
                                    ) : (
                                        <>
                                            <h4 className="text-lg font-semibold dark:text-white">{challenge.title}</h4>
                                            <p className="text-gray-500 dark:text-gray-400">{abbreviateText(challenge.desc, 80)}</p>
                                        </>
                                    )}
                                </div>
                                <div className="flex items-center text-gray-500 dark:text-gray-400">
                                    <span className="mr-4">{challenge.level}</span>
                                    <button
                                        className="mr-4 text-blue-500 hover:text-blue-700"
                                        onClick={() => handleChallengeEdit(i)}
                                    >
                                        <FaEdit />
                                    </button>
                                    <button
                                        className="text-red-500 hover:text-red-700"
                                        onClick={() => handleChallengeDelete(i)}
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};
