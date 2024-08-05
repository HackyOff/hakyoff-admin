export interface ITicket {
  id: string;
  title: string;
  student_email: string,
  code: number,
  student_name: string,
  content: string;
  status: "Não Respondido" | "Pendente" | "Resolvido"; // Definir tipos para o status
  createdAt: Date;
}
