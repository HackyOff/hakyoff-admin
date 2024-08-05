import { db } from "@/domain/config/firebase";
import { IAluno } from "@/interfaces/aluno/aluno";
import { query, collection, orderBy, getDocs } from "firebase/firestore";

export const fetchAlunosAll = async (
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setAlunos: React.Dispatch<React.SetStateAction<IAluno[]>>
) => {
    setLoading(true);

    const q = query(
        collection(db, 'alunos'),
        orderBy('displayName', 'desc')
    );

    try {
        const querySnapshot = await getDocs(q);

        const fetchedAlunos: IAluno[] = [];
        querySnapshot.forEach((doc) => {
            const alunoData = doc.data();
            fetchedAlunos.push({
                nome: alunoData.displayName,
                email: alunoData.email,
                telefone: alunoData.phoneNumber,
                password: alunoData.password,
                cod_aluno: alunoData.cod_aluno,
                photo: alunoData.photo,
                country: alunoData.country,
                company: alunoData.company,
                role: alunoData.role,
                address: alunoData.address
            });
        });

        setAlunos(fetchedAlunos);
    } catch (error) {
        console.error("Error fetching alunos: ", error);
    } finally {
        setLoading(false);
    }
};
