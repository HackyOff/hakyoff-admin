import { db } from "@/domain/config/firebase";
import { IHackerScore } from "@/domain/models/score-model";
import { query, collection, orderBy, where, getDocs } from "firebase/firestore";

export const fetchHackersAll = async (
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setHackers: React.Dispatch<React.SetStateAction<IHackerScore[]>>
) => {

    setLoading(true);

    const q = query(
        collection(db, 'hacking'),
        where('score', '>=', 50),
        orderBy('score', 'desc')
    );

    try {
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

        setHackers(fetchedHackers);
    } catch (error) {
        console.error("Error fetching hackers: ", error);
    } finally {
        setLoading(false);
    }
};
