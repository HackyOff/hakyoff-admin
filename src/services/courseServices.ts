
// services/CourseService.ts 
import { db } from '@/domain/config/firebase';
import { ITraining, Lesson, Material } from '@/interfaces/training/training';

export const fetchCourseDetails = async (id: string) => {
    try {
        const courseDocRef = db.collection('courses').doc(id);
        const courseDoc = await courseDocRef.get();

        if (!courseDoc.exists) {
            throw new Error('Documento do Treinamento não encontrado.');
        }

        const course = courseDoc.data() as ITraining;

        const lessonsCollectionRef = db.collection('lessons').where('courseId', '==', id);
        const lessonsSnapshot = await lessonsCollectionRef.get();
        const lessons = lessonsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Lesson[];

        const materialsCollectionRef = db.collection('materials').where('courseId', '==', id);
        const materialsSnapshot = await materialsCollectionRef.get();
        const materials = materialsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Material[];

        return { course, lessons, materials };
    } catch (error: any) {
        throw new Error('Erro ao buscar detalhes do Treinamento:' + error.message);
    }
};
