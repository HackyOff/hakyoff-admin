import { db } from "@/domain/config/firebase";
import { IHackerScore } from "@/domain/models/score-model";
import { query, collection, orderBy, getDocs } from "firebase/firestore";

export const fetchHackerAndPosition = async (
    email: string,
    setPosition: (value: React.SetStateAction<number | null>) => void,
    setHacker: (value: React.SetStateAction<IHackerScore | null>) => void
) => {
    if (!email) return;

    // Buscar todos os hackers e ordená-los por pontuação
    const q = query(collection(db, 'hacking'), orderBy('score', 'desc'));
    const querySnapshot = await getDocs(q);

    const fetchedHackers: IHackerScore[] = [];
    querySnapshot.forEach((doc) => {
        const hackerData = doc.data();
        fetchedHackers.push({
            cod_aluno: hackerData.cod_aluno,
            country: hackerData.country,
            photoURL: hackerData.photoURL,
            name: hackerData.name,
            score: hackerData.score,
            solved_challenges: hackerData.solved_challenges,
            phoneNumber: hackerData.phoneNumber,
            student_email: hackerData.student_email,
            createdAt: hackerData.createdAt.toDate(),
        });
    });

    // Encontrar o hacker atual e a posição na lista
    const currentHacker = fetchedHackers.find(h => h.student_email === email);
    const hackerPosition = fetchedHackers.findIndex(h => h.student_email === email) + 1; // Posição 1-based

    setHacker(currentHacker || null);
    setPosition(hackerPosition);
};