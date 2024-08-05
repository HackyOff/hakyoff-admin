// services/TrainingService.ts
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/domain/config/firebase';
import { ITraining } from '@/interfaces/training/training';

export const fetchTrainingsData = async (): Promise<ITraining[]> => {
    try {
        const querySnapshot = await getDocs(collection(db, 'courses'));
        const data: ITraining[] = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        })) as ITraining[];
        return data;
    } catch (error: any) {
        throw new Error('Erro ao buscar dados dos treinamentos:' + error.message);
    }
};
