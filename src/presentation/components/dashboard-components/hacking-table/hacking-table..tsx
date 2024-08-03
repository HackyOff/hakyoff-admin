// src/components/TrainingTable.t 
import { IHackerScore } from '@/domain/models/score-model';
import { svgs } from '@/utils/image-exporter';
import { CountryFlag } from '../../country-flag-component/country-flag-component';

interface IHTable {
    data: IHackerScore[]
}

export function HackingTable({ data }: IHTable) {
    return (
        <div className="w-full sm:px-5 sm:py-6  overflow-x-auto dark:bg-slate-100/20  bg-white rounded-lg shadow">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="dark:bg-slate-100/10  bg-gray-50">
                    <tr className='text-sm font-bold'>
                        <th className="sm:px-6 ps-2 sm:py-3 py-1 text-[10px] tracking-wider dark:text-white text-left text-gray-900 uppercase font-bol ">Nome</th>
                        <th className="sm:px-6 sm:py-3 py-1 text-[10px] tracking-wider dark:text-white text-left text-gray-900 uppercase font-bol "><span className='sm:hidden'>Pts</span><span className="hidden sm:block">Pontuação</span></th>
                        <th className="sm:px-6 sm:py-3 py-1 text-[10px] tracking-wider dark:text-white text-left text-gray-900 uppercase font-bol flex gap-1 "><span className='hidden sm:block'>D. </span> Resolvidos</th>
                        <th className="sm:px-6 pe-2 sm:py-3 py-1 text-[10px] tracking-wider dark:text-white text-left text-gray-900 uppercase font-bol ">Badge</th>
                        <th className="sm:px-6 pe-2 sm:py-3 py-1 text-[10px] tracking-wider dark:text-white text-left text-gray-900 uppercase font-bol ">País</th>
                    </tr>
                </thead>
                <tbody className="bg-white dark:bg-slate-100/20 dark:text-white divide-y divide-gray-200">
                    {data.map((data, index: number) => (
                        <tr key={index} className={`${index % 2 == 0 ? 'dark:bg-slate-100/20 dark:text-white bg-slate-100/80' : ''}`}>
                            <td className="sm:px-6 ps-2 dark:text-white py-2 text-xs sm:text-sm font-medium text-gray-900 hacker whitespace-nowrap gap-1 sm:gap-2 flex relative"> <span className="my-auto">{data.name.split(' ')[0] + ' ' + data.name.split(' ').pop()}</span></td>
                            <td className="sm:px-6 dark:text-white py-2 text-xs sm:text-sm font-bold text-yellow-600 whitespace-nowrap">{data.score} Pts</td>
                            <td className="sm:px-6 dark:text-white py-2 text-xs sm:text-sm text-gray-500 hacker whitespace-nowrap">{data.solved_challenges}</td>
                            <td className="sm:px-6 dark:text-white py-2 text-xs sm:text-sm font-bold text-yellow-600 whitespace-nowrap"> <img src={data.score <= 95 ? svgs.tocha_svg : data.score <= 499 ? svgs.bronze_trophy_svg : data.score >= 500 && data.score < 999 ? svgs.silver_trophy_svg : svgs.award_trophy_svg} className='w-7' alt="level status" title='Medalha de reconhecimento perante a comunidade' /></td>
                            <td className="sm:px-6 dark:text-white py-2 text-xs sm:text-sm font-medium text-gray-900 whitespace-nowrap"> {data.country && <CountryFlag countryCode={data.country} />}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}