
import { db } from '@/domain/config/firebase';
import { doc, setDoc, getDoc, collection, getDocs, query, where, addDoc } from 'firebase/firestore';



interface CertificateData {
    courseId: string;
    courseName: string;
    studentName: string;
    studentEmail: string,
    studentPhoneNumber: string,
    downloadUrl: string;
    generatedAt: string; // Use o formato de data adequado conforme necessário
}


interface ExamData {
    courseId: string;
    courseName: string;
    totalLessons: number;
    studentName: string;
    studentId: string;
    email: string;
    phone: string;
    photoUrl: string;
    requestDate: string; // Use o formato de data adequado conforme necessário
}


export const updateUserProgress = async (userId: string, courseId: string, completedLessons: string[], totalLessons: number) => {
    const userProgressRef = doc(db, `alunos/${userId}/courses/${courseId}`);
    const progresso = totalLessons > 0 ? (completedLessons.length / totalLessons) * 100 : 0;

    //console.log("Firestore Document Reference:", userProgressRef.path);
    //console.log("Data to update:", { completedLessons, progresso });

    await setDoc(userProgressRef, { completedLessons, progresso }, { merge: true });
};

export const loadUserProgress = async (userId: string, courseId: string, setCompletedLessons: (lessons: string[]) => void) => {
    const userProgressRef = doc(db, `alunos/${userId}/courses/${courseId}`);
    const docSnap = await getDoc(userProgressRef);

    if (docSnap.exists()) {
        const data = docSnap.data();
        // console.log("User progress data:", data);
        setCompletedLessons(data.completedLessons || []);
    } else {
        console.log("No such data!");
        setCompletedLessons([]);
    }
};

export const fetchModules = async (courseId: string) => {
    //console.log(courseId);
    const modulesQuery = query(collection(db, 'modules'), where('courseId', '==', courseId));
    const modulesSnapshot = await getDocs(modulesQuery);
    return modulesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
};




// Função para buscar todas as lições de um módulo
export const fetchLessons = async (moduleId: string) => {
    //console.log(moduleId)
    const lessonsQuery = query(collection(db, 'lessons'), where('moduleId', '==', moduleId));
    const lessonsSnapshot = await getDocs(lessonsQuery);
    return lessonsSnapshot.docs.map(doc => doc.data());
};



const saveExamData = async (examData: ExamData): Promise<void> => {
    try {
        const examsCollection = collection(db, 'exams');
        await addDoc(examsCollection, examData);
        console.log('Dados do exame salvos com sucesso no Firestore');
    } catch (error) {
        console.error('Erro ao salvar dados do exame:', error);
        throw new Error('Erro ao salvar dados do exame');
    }
};


const saveCertificateData = async (certificateData: CertificateData): Promise<void> => {
    try {
        const certificatesCollection = collection(db, 'certificates');
        // Use setDoc para sobrescrever os dados se o documento já existir
        await setDoc(doc(certificatesCollection, certificateData.studentEmail), certificateData);
        console.log('Dados do certificado salvos com sucesso no Firestore');
    } catch (error) {
        console.error('Erro ao salvar dados do certificado:', error);
        throw new Error('Erro ao salvar dados do certificado');
    }
};




export { saveExamData, saveCertificateData };