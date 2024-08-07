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
            <ul className='grid gap-6 grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4'>
                {examRequests.map((examRequest) => (
                    <li key={examRequest.id} className='bg-white py-4 px-6 rounded-lg '>
                        <p className='text-xs flex mb-2 gap-1'><a href={`tel:+244${examRequest.phone}`} className='text-blue-600 hover:underline'>{examRequest.phone}</a> - <a className='text-blue-600 hover:underline' href={`mailto:${examRequest.email}`}>{examRequest.email}</a></p>
                        <strong>Treinamento:</strong> {examRequest.courseName}<br />
                        <strong>Estudante:</strong> {examRequest.studentName}<br />
                        <strong>Data do Pedido:</strong> {DateUtils.formatDateTimeToPTT(new Date(examRequest.requestDate))}<br />
                        {/* Adicione mais detalhes conforme necessário */}

                    </li>
                ))}
            </ul>
        </div>
    );
};

