import React from 'react';
import { FaFilter } from 'react-icons/fa';
import { Button } from '@/presentation/components';
import { FaFilterCircleXmark } from 'react-icons/fa6';

interface FilterBarProps {
    filters: { name: string; difficulty: string; category: string };
    setFilters: React.Dispatch<React.SetStateAction<{ name: string; difficulty: string; category: string }>>;
    setCreateCtf: React.Dispatch<React.SetStateAction<boolean>>;
    createCtf: boolean;
}

export const FilterBar: React.FC<FilterBarProps> = ({ filters, setFilters, setCreateCtf, createCtf }) => (
    <div className="flex flex-col justify-between w-full gap-4 px-4 py-6 bg-white rounded-lg shadow sm:flex-row sm:mt-5 lg:justify-start dark:bg-slate-100/10 dark:text-white">
        <div className="flex gap-2">
            <div className="px-2 py-2 my-auto text-yellow-700 bg-primary/30 dark:bg-primary dark:rounded-md">
                <FaFilter className='my-auto' />
            </div>
            <input
                type="text"
                placeholder="Filtrar titulo do desafio"
                value={filters.name}
                onChange={(e) => setFilters({ ...filters, name: e.target.value })}
                className="w-full px-3 py-1 text-xs border-2 rounded-md sm:w-auto dark:bg-slate-100/10 dark:text-white border-primary/50"
            />
        </div>
        <div className="flex gap-4">
            <select
                value={filters.difficulty}
                onChange={(e) => setFilters({ ...filters, difficulty: e.target.value })}
                className="w-full px-3 py-1 text-xs border-2 rounded-md outline-none sm:w-auto dark:bg-slate-100/10 dark:text-white border-primary/50"
            >
                <option className='text-dark' value="">Filtrar por dificuldade</option>
                <option className='text-dark' value="Beginner">Fácil</option>
                <option className='text-dark' value="Intermediate">Médio</option>
                <option className='text-dark' value="Advanced">Difícil</option>
            </select>
            <div title='Limpar filtro' onClick={() => setFilters({ category: '', name: '', difficulty: '' })} className="px-2 py-2 my-auto text-yellow-700 cursor-pointer bg-primary/30 rouned-sm click dark:bg-primary dark:rounded-md">
                <FaFilterCircleXmark className='my-auto' />
            </div>
        </div>
        <Button text={createCtf ? 'Ver CTFs' : 'Criar CTF'} onClick={() => setCreateCtf(!createCtf)} className='py-1 my-auto ms-auto click' color='primary' />
    </div>
);
