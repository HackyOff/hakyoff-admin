import { CountryFlag } from '../../country-flag-component/country-flag-component';
import { IAluno } from '@/interfaces/aluno/aluno';

interface IHTable {
    data: IAluno[]
}

export function HackingTable({ data }: IHTable) {
    return (
        <div className="w-full sm:px-5 sm:py-6 overflow-x-auto dark:bg-slate-100/20 bg-white rounded-lg shadow">
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
                <tbody className="bg-white dark:bg-slate-100/20 dark:text-white divide-y divide-gray-200">
                    {data.map((aluno, index: number) => (
                        <tr key={index} className={`${index % 2 == 0 ? 'dark:bg-slate-100/20 dark:text-white bg-slate-100/80' : ''}`}>

                            <td className="sm:px-6 ps-2 dark:text-white py-2 text-xs sm:text-sm font-medium text-gray-900 whitespace-nowrap gap-1 sm:gap-2 flex relative">
                                <span className="my-auto"> {aluno.cod_aluno} - {aluno.nome.split(' ')[0] + ' ' + aluno.nome.split(' ').pop()}</span>
                            </td>
                            <td className="sm:px-6 dark:text-white py-2 text-xs sm:text-sm text-blue-600 hover:underline whitespace-nowrap">
                                {aluno.email}
                            </td>
                            <td className="sm:px-6 dark:text-white py-2 text-xs sm:text-sm text-gray-500 whitespace-nowrap">
                                {aluno.telefone}
                            </td>
                            <td className="sm:px-6 dark:text-white py-2 text-xs sm:text-sm font-bold text-yellow-600 whitespace-nowrap">
                                {aluno.company}
                            </td>
                            <td className="sm:px-6 dark:text-white py-2 text-xs sm:text-sm font-medium text-gray-900 whitespace-nowrap">
                                {aluno.role}
                            </td>
                            <td className="sm:px-6 dark:text-white py-2 text-xs sm:text-sm font-medium text-gray-900 whitespace-nowrap">
                                {aluno.country && <CountryFlag countryCode={aluno.country} />}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
