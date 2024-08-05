import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/domain/config/firebase';
import { DateUtils } from '@/utils/dateutils';

export const ExamRequestsList: React.FC = () => {
    const [examRequests, setExamRequests] = useState<any[]>([]); // Defina o tipo apropriado para ExamData se possível

    useEffect(() => {
        const fetchExamRequests = async () => {
            try {
                const examsCollectionRef = collection(db, 'exams');
                const querySnapshot = await getDocs(examsCollectionRef);

                const examRequestsData: any[] = [];
                querySnapshot.forEach((doc) => {
                    examRequestsData.push({ id: doc.id, ...doc.data() });
                });

                setExamRequests(examRequestsData);
            } catch (error) {
                console.error('Erro ao buscar pedidos de exames:', error);
            }
        };

        fetchExamRequests();
    }, []); // Executa apenas uma vez ao montar o componente

    return (
        <div>
            <br />

            <h2 className='text-2xl font-bold'>Pedidos de Exames</h2>
            <br />
            <ul className='grid grid-cols-2'>
                {examRequests.map((examRequest) => (
                    <li key={examRequest.id} className='bg-slate-100 py-4 px-6 rounded-lg'>
                        <strong>Treinamento:</strong> {examRequest.courseName}<br />
                        <strong>Estudante:</strong> {examRequest.studentName}<br />
                        <strong>Data do Pedido:</strong> {DateUtils.formatDateTimeToPTT(new Date(examRequest.requestDate))}<br />
                        {/* Adicione mais detalhes conforme necessário */}
                        <hr />
                    </li>
                ))}
            </ul>
        </div>
    );
};

