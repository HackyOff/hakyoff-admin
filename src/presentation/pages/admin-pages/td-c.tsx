// components/TrainingsDataComponent.tsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; 
import { ITraining } from '@/interfaces/training/training';
import { fetchTrainingsData } from '@/services/training-data-service';

const TrainingsDataComponent: React.FC = () => {
  const [trainingsData, setTrainingsData] = useState<ITraining[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchTrainingsData();
        setTrainingsData(data);
      } catch (error) {
        console.error('Erro ao buscar dados dos treinamentos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div>
      <h1>Lista de Treinamentos</h1>
      {trainingsData.map(training => (
        <div key={training.id}>
          <h2>{training.title} - {training.id}</h2>
          <p>{training.description}</p>
          <p>Instrutor: {training.trainer?.name}</p>
          {/* Adicione mais detalhes conforme necessário */}
          <Link to={`/test/${training.id}`}>Ver Detalhes</Link>
        </div>
      ))}
    </div>
  );
};

export default TrainingsDataComponent;
