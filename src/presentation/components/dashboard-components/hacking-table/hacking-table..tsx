import { CountryFlag } from '../../country-flag-component/country-flag-component';
import { IAluno } from '@/interfaces/aluno/aluno';
import { useState } from 'react';

interface IHTable {
    data: IAluno[]
}

export function HackingTable({ data }: IHTable) {
    const [searchTerm, setSearchTerm] = useState<string>('');  // Estado para armazenar o valor da pesquisa

    // Filtra os alunos com base no valor da pesquisa
    const filteredData = data.filter(aluno =>
        aluno.cod_aluno.toString().includes(searchTerm) ||
        aluno.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        aluno.nome.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="w-full overflow-x-auto bg-white rounded-lg shadow sm:px-5 sm:py-6 dark:bg-slate-100/20">
            {/* Campo de entrada para a pesquisa */}
            <div className="mb-4">
                <input
                    type="text"
                    className="w-full p-2 border border-gray-400 outline-none"
                    placeholder="Pesquisar por código, nome ou email"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <table className="min-w-full divide-y divide-gray-200">
                <thead className="dark:bg-slate-100/10 bg-gray-50">
                    <tr className='text-sm font-bold'>
                        <th className="sm:px-6 ps-2 sm:py-3 py-1 text-[10px] tracking-wider dark:text-white text-left text-gray-900 uppercase font-bold">Nome</th>
                        <th className="sm:px-6 sm:py-3 py-1 text-[10px] tracking-wider dark:text-white text-left text-gray-900 uppercase font-bold"><span className="hidden sm:block">Email</span></th>
                        <th className="sm:px-6 sm:py-3 py-1 text-[10px] tracking-wider dark:text-white text-left text-gray-900 uppercase font-bold flex gap-1">Phone</th>
                        <th className="sm:px-6 pe-2 sm:py-3 py-1 text-[10px] tracking-wider dark:text-white text-left text-gray-900 uppercase font-bold">Company</th>
                        <th className="sm:px-6 pe-2 sm:py-3 py-1 text-[10px] tracking-wider dark:text-white text-left text-gray-900 uppercase font-bold">Role</th>
                        <th className="sm:px-6 pe-2 sm:py-3 py-1 text-[10px] tracking-wider dark:text-white text-left text-gray-900 uppercase font-bold">País</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:bg-slate-100/20 dark:text-white">
                    {filteredData.length > 0 ? (
                        filteredData.map((aluno, index: number) => (
                            <tr key={index} className={`${index % 2 == 0 ? 'dark:bg-slate-100/20 dark:text-white bg-slate-100/80' : ''}`}>
                                <td className="relative flex gap-1 py-2 text-xs font-medium text-gray-900 sm:px-6 ps-2 dark:text-white sm:text-sm whitespace-nowrap sm:gap-2">
                                    <span className="my-auto">{aluno.cod_aluno} - {aluno.nome.split(' ')[0] + ' ' + aluno.nome.split(' ').pop()}</span>
                                </td>
                                <td className="py-2 text-xs text-blue-600 sm:px-6 dark:text-white sm:text-sm hover:underline whitespace-nowrap">
                                    {aluno.email}
                                </td>
                                <td className="py-2 text-xs text-gray-500 sm:px-6 dark:text-white sm:text-sm whitespace-nowrap">
                                    {aluno.telefone}
                                </td>
                                <td className="py-2 text-xs font-bold text-yellow-600 sm:px-6 dark:text-white sm:text-sm whitespace-nowrap">
                                    {aluno.company}
                                </td>
                                <td className="py-2 text-xs font-medium text-gray-900 sm:px-6 dark:text-white sm:text-sm whitespace-nowrap">
                                    {aluno.role}
                                </td>
                                <td className="py-2 text-xs font-medium text-gray-900 sm:px-6 dark:text-white sm:text-sm whitespace-nowrap">
                                    {aluno.country && <CountryFlag countryCode={aluno.country} />}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={6} className="py-4 text-center">Nenhum resultado encontrado</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
