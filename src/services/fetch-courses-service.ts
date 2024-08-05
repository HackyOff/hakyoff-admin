import { db } from "@/domain/config/firebase";
import { ITraining } from "@/interfaces/training/training";
import { collection, getDocs } from "firebase/firestore";

export const fetchAllCourses = async (): Promise<ITraining[]> => {
    try { 
        const coursesCollection = collection(db, 'courses');
        const coursesSnapshot = await getDocs(coursesCollection);

        // Mapeia os documentos para o tipo ITraining
        const coursesList: ITraining[] = coursesSnapshot.docs.map(doc => ({
            id: doc.id,
            status: doc.data().status,
            course_code: doc.data().course_code,
            title: doc.data().title,
            price: doc.data().price,
            hours: doc.data().hours,
            description: doc.data().description,
            destaque: doc.data().destaque,
            cover: doc.data().coverUrl,
            link: '',
            students: 0,
            trainer: {
                name: doc.data().trainer.name,
                picture: doc.data().trainer.picture,
                role: doc.data().trainer.role,
                id: doc.data().trainer.id
            }
        }));
        
        return coursesList

    } catch (error) {
        console.error('Erro ao buscar Treinamentos :', error);
        return []
    }
};
