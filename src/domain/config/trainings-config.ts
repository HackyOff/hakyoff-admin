import { collection, getDocs } from "firebase/firestore";
import { ITBenefits, ITraining } from "../../interfaces/training/training";
import { bg, users } from "../../utils/image-exporter";
import { db } from "./firebase";

export const TrainingsData: ITraining[] = [
  {
    id: '7658867',
    course_code: 542,

    title: "Cybersecurity Essentials Certified",
    description:
      "Os participantes deste treinamento são avaliados em sua compreensão e aplicação dos conceitos críticos de segurança da informação, incluindo proteção de dados, prevenção de ameaças e resposta a incidentes. ",
    trainer: {
      id: 'sadsdc',
      name: "Héber Júlio",
      role: "Instrutor",
      picture: users.user_1,
    },
    cover: bg.bg_card,
    hours: 5,
    price: 0,
    status: "Brevemente",
    students: 0,
    link: "https://www.youtube.com/watch?v=shQEXpUwaIY",
    destaque: true,
    benefits: [
      {
        lab: true,
        exam: true,
        lessons: true,
        material: true,
        support: false
      }
    ],

  },
  {
    id: '43534664',

    course_code: 57877842,
    title: "Hakyoff Certified Penetration Tester",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text",
    trainer: {
      id: 'sdcs',
      name: "Valdemar de Oliveira",
      role: "Instrutor",
      picture: users.user_3,
    },
    cover: bg.bg_card,
    hours: 3,
    price: 20000.0,
    status: "Disponivel",
    students: 0,
    link: "https://www.youtube.com/watch?v=shQEXpUwaIY",
    destaque: true,
    benefits: [
      {
        lab: true,
        exam: true,
        lessons: true,
        material: true,
        support: true,
      }
    ]
  },

];

export const fetchTrainingsData = async (): Promise<ITraining[]> => {
  try {
    const coursesCollection = collection(db, 'courses');
    const coursesSnapshot = await getDocs(coursesCollection);

    // Mapeia os documentos para o tipo ITraining
    const coursesList: ITraining[] = coursesSnapshot.docs.map(doc => {
      const data = doc.data();

      // Mapeia os benefícios
      const benefits: ITBenefits[] = [{
        lab: data.benefits?.lab || false,
        material: data.benefits?.material || false,
        support: data.benefits?.support || false,
        exam: data.benefits?.exam || false,
        lessons: data.benefits?.lessons || false,
      }];

      return {
        id: doc.id,
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
      };
    });

    return coursesList;
  } catch (error) {
    console.error('Erro ao buscar Treinamentos :', error);
    return [];
  }
};
