import { ITBenefits } from '@/interfaces/training/training';
import { icons } from '@/utils/image-exporter';
import React from 'react';  // Importe a interface ITBenefits

interface Props {
    benefits: ITBenefits; // Propriedade que recebe os benefícios
}

export const BenefitsList: React.FC<Props> = ({ benefits }) => {
    return (
        <>
            {Object.entries(benefits).map(([key, value]) => (
                value && (
                    <li key={key} className="flex hacker my-2 gap-2">
                        {/* Aqui você pode adicionar um ícone para cada benefício, de acordo com o nome do campo */}
                        {key === 'lab' && <img src={icons.check_list} className='w-[1.3em]' alt="" />}
                        {key === 'material' && <img src={icons.check_list} className='w-[1.3em]' alt="" />}
                        {key === 'lessons' && <img src={icons.check_list} className='w-[1.3em]' alt="" />}
                        {key === 'exam' && <img src={icons.check_list} className='w-[1.3em]' alt="" />}
                        {key === 'support' && <img src={icons.check_list} className='w-[1.3em]' alt="" />}

                        {/* Exemplo de renderização de texto baseado no nome do campo */}
                        <span className="my-auto">{renderBenefitLabel(key)}</span>
                    </li>
                )
            ))}
        </>
    );
};

// Função para renderizar o texto do benefício com base no nome do campo
const renderBenefitLabel = (key: string): string => {
    switch (key) {
        case 'lab':
            return 'Laboratórios HakyOff';
        case 'material':
            return 'Material de Estudo';
        case 'lessons':
            return 'Acesso às Aulas';
        case 'exam':
            return 'Exame HakyOff';
        case 'support':
            return 'Suporte 24/7';
        default:
            return '';
    }
};
 