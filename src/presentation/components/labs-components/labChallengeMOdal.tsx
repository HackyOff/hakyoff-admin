import React, { useState } from 'react';
import { ICtfsChallenge } from '@/interfaces/ctfs/ctfs-intrface';
import { FaCheckCircle, FaLink, FaRegTimesCircle, FaEdit, FaTrash } from 'react-icons/fa';
import { GetStatusColor } from '@/utils/get-status-color-utils';
import { StringUtils } from '@/utils/string-utils';
import { LoaderText } from '../dashboard-components/loader-text/loader-text';
import { Button } from '../button/button';
import { HakyModalDefault } from '../haky-modal-default/hacky-modal-default';
import { useAuth } from '@/context/auth-context';

interface LabChallengeModalProps {
    challenge: ICtfsChallenge | null;
    isOpen: boolean;
    onClose: () => void;
    onSubmitFlag: (flag: string) => void;
    onEdit: (challenge: ICtfsChallenge) => void;
    onDelete: (challenge: ICtfsChallenge) => void;
    loading: boolean;
    msg: string;
}

export const LabChallengeModal: React.FC<LabChallengeModalProps> = ({
    challenge,
    isOpen,
    onClose,
    onSubmitFlag,
    onEdit,
    onDelete,
    loading,
    msg,
}) => {
    const [flag, setFlag] = useState('');

    const { currentUser } = useAuth();

    const handleFlagSubmit = () => {
        onSubmitFlag(flag);
    };

    if (!challenge) return null;

    return (
        <HakyModalDefault className='text-white sm:w-[40rem] h-[27rem] sm:p-10 py-10 px-3' setShow={onClose} show={isOpen} bgDefault={true} shadowDeault={true}>
            <h2 className="mb-1 text-xl font-bold">{challenge.title}</h2>
            <hr />
            <p className='mt-4'>ID: {challenge.id}</p>
            <div className="flex gap-3 my-3 text-sm hacker">
                <p className={`my-auto font-bold text-lg ${GetStatusColor(challenge.level)}`}>{challenge.pts} Pts</p>
            </div>
            <p>
                <span className='flex gap-4'>Link: <a target='__blank' href={challenge.link} className="flex gap-2 text-yellow-600 underline">{challenge.link} <FaLink className='my-auto ms-2' /></a></span>
                <div dangerouslySetInnerHTML={{ __html: challenge.desc }} />
                <br />
            </p>
            {msg === 'wrong' && (
                <div className="flex gap-4 px-4 py-3 mb-2 text-sm font-bold text-white bg-red-400/30">
                    <FaRegTimesCircle className='my-auto' />
                    <span className='my-auto'>Flag incorreta. Tente novamente.</span>
                </div>
            )}
            {msg === 'right' && (
                <div className="flex flex-col gap-2 px-4 py-2 mb-2 font-bold text-center text-white rounded-lg bg-green-400/30">
                    <FaCheckCircle className='mx-auto my-auto text-2xl' />
                    <span className='my-auto text-sm'>
                        Flag correta, acertou em cheio <span className="underline">{StringUtils.getFirstWord(currentUser?.displayName ?? '')}</span>, resolva o seu próximo desafio!
                    </span>
                </div>
            )}
            <input
                type="text"
                value={flag}
                onChange={(e) => setFlag(e.target.value)}
                className='w-full px-2 py-2 text-xs text-black border-2 rounded-md outline-none sm:text-md focus-within:border-primary'
                placeholder='Insira a flag capturada'
            />
            <br />
            <div className="text-end mt-7">
                {loading ? (
                    <LoaderText text='Verificando sua flag.' />
                ) : (
                    <Button disabled={msg === 'right'} text='Submeter' color='primary' className='text-xs text-black click sm:text-md ms-auto' onClick={handleFlagSubmit} />
                )}
                {currentUser && ( // Verifica se o usuário é admin
                    <div className="flex gap-4 mt-4">
                        <Button text='Editar' color='secondary' className='hidden text-xs text-black click sm:text-md' onClick={() => onEdit(challenge)} rightIcon={FaEdit} />
                        <Button text='Excluir' color='danger' className='text-xs text-black click sm:text-md' onClick={() => onDelete(challenge)} rightIcon={FaTrash} />
                    </div>
                )}
            </div>
        </HakyModalDefault>
    );
};
