import React from 'react';
import { ICtfsChallenge } from '@/interfaces/ctfs/ctfs-intrface'; 
import { LabChallengeCard } from './labChallengeCard';

interface LabChallengeListProps {
    challenges: ICtfsChallenge[];
    userCtfs: string[];
    onChallengeClick: (challenge: ICtfsChallenge) => void;
}

export const LabChallengeList: React.FC<LabChallengeListProps> = ({ challenges, userCtfs, onChallengeClick }) => {
    return (
        <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
            {challenges.map((challenge, index) => (
                <LabChallengeCard
                    key={index}
                    challenge={challenge}
                    isResolved={userCtfs.includes(challenge.id)}
                    onClick={() => onChallengeClick(challenge)}
                />
            ))}
        </div>
    );
};
