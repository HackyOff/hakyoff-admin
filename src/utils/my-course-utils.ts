import { db } from '@/domain/config/firebase';
import { fetchTrainingsData } from '@/domain/config/trainings-config';
import { MAluno } from '@/domain/models/aluno-model';
import { ITBenefits, ITraining } from '@/interfaces/training/training';
import { User } from 'firebase/auth';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';

export const fetchMyCourses = async (currentUser: (User & MAluno) | null): Promise<ITraining[]> => {
    if (!currentUser) {
        return [];
    }

    try {
        const coursesCollection = collection(db, "alunos", currentUser.uid, "courses");
        const coursesSnapshot = await getDocs(coursesCollection);

        // Fetch all training data from Firestore
        const allTrainings = await fetchTrainingsData();
        // console.log(allTrainings)

        const coursesDetailsPromises = coursesSnapshot.docs.map(async (doc) => {
            const courseData = doc.data();
            const courseId = doc.id;


            // console.log(courseId)
            // Find the course details in the fetched trainings data
            const courseDetails = allTrainings.find(course => course.id === courseId);

            if (courseDetails) {
                return {
                    ...courseDetails,
                    progresso: courseData.progresso,
                    statusPagamento: courseData.statusPagamento
                };
            } else {
                return null;
            }
        });

        const coursesDetails = await Promise.all(coursesDetailsPromises);
        return coursesDetails.filter(course => course !== null) as ITraining[];
    } catch (error) {
        console.error('Erro ao buscar Treinamentos :', error);
        return [];
    }
};


export async function fetchOneCourseData(setCourse: React.Dispatch<ITraining | null>, id_course: string) {

    try {
        const courseDoc = await getDoc(doc(db, 'courses', id_course ? id_course : ''));
        if (courseDoc.exists()) {
            const data = courseDoc.data();


            // Mapeando os benefícios
            const benefits: ITBenefits[] = [
                {
                    lab: data.benefits?.lab || false,
                    material: data.benefits?.material || false,
                    support: data.benefits?.support || false,
                    exam: data.benefits?.exam || false,
                    lessons: data.benefits?.lessons || false,
                }
            ];

            // Crie um objeto com os dados do Treinamento
            const course = {
                id: courseDoc.id,
                status: data.status,
                course_code: data.course_code,
                title: data.title,
                price: data.price,
                hours: data.hours,
                description: data.description,
                cover: data.coverUrl,
                link: '',
                students: 0,
                trainer: {
                    name: data.trainer.name,
                    picture: data.trainer.picture,
                    role: data.trainer.role,
                    id: data.trainer.id
                },
                benefits: benefits
            } as ITraining;

            setCourse(course);
        } else {
            console.error('Treinamento não encontrado.');
            // Tratar caso o documento não exista
        }
    } catch (error) {
        console.error('Erro ao buscar dados do Treinamento:', error);
        // Tratar o erro aqui
    } finally {
        // setloading(false);
        console.log('Hello user, you were hacked ')
    }
}
