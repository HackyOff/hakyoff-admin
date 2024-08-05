import { ITrainer } from "../trainer/trainer";


export interface ITraining {
  status: "Brevemente" | "Disponivel";
  course_code: number,
  title: string;
  price: number;
  id?: string,
  hours: number;
  students: number;
  trainer: ITrainer;
  description: string;
  cover: string;
  link: string;
  new?: boolean;
  destaque?: boolean;
  progresso?: number;
  modules?: Module[]; // Adicionar a propriedade modules aqui
  benefits?: ITBenefits[];
  statusPagamento?: 'pendente' | 'aprovado'; // Adicionar statusPagamento aqui
}


export interface ITBenefits {
  lab: boolean
  material: boolean
  lessons: boolean
  exam: boolean
  support: boolean
}




export interface Lesson {
  videoUrl?: string;
  videoFile: any;
  id: string;
  moduleId: string;
  title: string;
  videoLink: string;
}
// Assuming your existing Module interface looks something like this:
export interface Module {
  id: string;
  title: string;
  lessons: Lesson[]; // Assuming Lesson is already defined somewhere
  materials: Material[]; // Define Material type if not already done
}

// Define Material interface if not already defined
export interface Material {
  id: string;
  moduleId: string;
  title: string;
  fileUrl: string;
}