// src/services/ticketService.ts
import { addDoc, collection, deleteDoc, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { db } from '../domain/config/firebase';
import { ITicket } from '../domain/models/ticket-model';
import { AlertUtils } from '@/utils/alert-utils';
import { RANDOM_CODE } from '@/domain/config/navbar-config';

export const fetchTickets = async (email: string): Promise<ITicket[]> => {
    const q = query(collection(db, 'tickets'), where('student_email', '==', email));
    const querySnapshot = await getDocs(q);

    const fetchedTickets: ITicket[] = [];
    querySnapshot.forEach((doc) => {
        const ticketData = doc.data();
        fetchedTickets.push({
            id: doc.id,
            title: ticketData.title,
            content: ticketData.content,
            status: ticketData.status,
            code: ticketData.code,
            student_email: ticketData.student_email,
            student_name: ticketData.student_name,
            createdAt: ticketData.createdAt.toDate(),
        });
    });

    return fetchedTickets;
};

export const createTicket = async (title: string, email: string | undefined, displayName: string | undefined, content: string) => {
    await addDoc(collection(db, 'tickets'), {
        title: title,
        student_email: email,
        student_name: displayName,
        code: RANDOM_CODE,
        content: content,
        status: 'Não Respondido',
        createdAt: new Date(),
    });
};

export const deleteTicket = async (id: string) => {
    await deleteDoc(doc(db, 'tickets', id));
};



export const fetchAllTickets = async (): Promise<ITicket[]> => {
    const q = query(collection(db, 'tickets'));
    const querySnapshot = await getDocs(q);

    const fetchedTickets: ITicket[] = [];
    querySnapshot.forEach((doc) => {
        const ticketData = doc.data();
        fetchedTickets.push({
            id: doc.id,
            title: ticketData.title,
            content: ticketData.content,
            status: ticketData.status,
            code: ticketData.code,
            student_email: ticketData.student_email,
            student_name: ticketData.student_name,
            createdAt: ticketData.createdAt.toDate(),
        });
    });

    return fetchedTickets;
};


export const updateTicketStatus = async (ticketId: string, status: string) => {
    try {
        const ticketDoc = doc(db, "tickets", ticketId);
        await updateDoc(ticketDoc, {
            status: status
        });
        console.log("Status do ticket atualizado com sucesso!");
        AlertUtils.success('Notificação enviada com sucesso!')
    } catch (e: any) {
        console.error("Erro ao atualizar status do ticket: ", e);
        AlertUtils.success("Erro ao atualizar status do ticket: " + e);

    }
};
