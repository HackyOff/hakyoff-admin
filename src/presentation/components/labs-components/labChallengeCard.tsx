import { ICtfsChallenge } from '@/interfaces/ctfs/ctfs-intrface';
import React from 'react';
import { FaCheck } from 'react-icons/fa';

interface LabChallengeCardProps {
    challenge: ICtfsChallenge;
    isResolved: boolean;
    onClick: () => void;
}

export const LabChallengeCard: React.FC<LabChallengeCardProps> = ({ challenge, isResolved, onClick }) => {
    return (
        <div
            onClick={onClick}
            title={`Clique para abrir ${challenge.title}`}
            className={`p-4 ${isResolved ? '' : ''} lab-bg mb-4 hover:shadow-smmm shadow-inner hover:shadow-primaryy cursor-pointer border border-white/20 relative rounded`}
        >
            <div className="flex justify-end mb-2 font-bold">
                {isResolved ? <FaCheck className='my-auto text-xl me-2' /> : null}
                {challenge.pts} Pontos
            </div>
            <hr className='border-black' />
            <br />
            <h4 className='mb-2 font-semibold sm:text-xl'>{challenge.title}</h4>
        </div>
    );
};
