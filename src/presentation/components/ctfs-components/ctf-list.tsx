import React from 'react';
import { ICtfs } from '@/interfaces/ctfs/ctfs-intrface'; 
import AddCtfForm from '@/presentation/pages/admin-pages/add-ctfs';
import { CtfItem } from './ctf-item';
import { FaFilter } from 'react-icons/fa6';

interface CtfListProps {
    ctfs: ICtfs[];
    createCtf: boolean;
}

export const CtfList: React.FC<CtfListProps> = ({ ctfs, createCtf }) => (
    <>
        {createCtf ? (
            <AddCtfForm />
        ) : (
            ctfs.length > 0 ? (
                <>
                    {ctfs.map((ctf, i) => <CtfItem key={ctf.ctf_code} ctf={ctf} index={i} />)}
                </>
            ) : (
                <div className="bg-white dark:bg-slate-100/10 mt-10 text-center rounded-lg shadow w-full sm:py-[8rem] py-[5rem] xl:py-[10rem] px-5">
                    <FaFilter className='mx-auto text-5xl text-gray-500 xl:text-9xl sm:text-7xl' />
                    <br />
                    <br />
                    <h2 className="text-xs text-gray-500 sm:text-md dark:text-white/70 hacker">
                        Não foram encontrados mais desafios Hacker para você!
                    </h2>
                </div>
            )
        )}
    </>
);
