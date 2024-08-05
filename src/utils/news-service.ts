import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { sendEmailNoReply2 } from './email-noreply';
import { INews } from './news-data-uils';
import { newsEmailTemplate } from './templates/newsletter-template';



// Função para enviar e-mail de notícia
export const sendNewsEmail = async (to: string, title: string, content: string, cover: string, idNews: string) => {
    const html = newsEmailTemplate(title, content, cover, idNews);
    await sendEmailNoReply2(to, `Temos uma Novidade para Sí  -NewsLetter HakyOff`, html);
};

// Função para buscar alunos com notificações ativadas e enviar e-mails
export const notifyStudents = async (title: string, content: string, cover: string, idNews: string) => {
    const studentsCollection = firebase.firestore().collection('admins');
    const snapshot = await studentsCollection.get();

    console.log(`Found ${snapshot.docs.length} students`);

    const studentsWithNotifications = snapshot.docs.filter(async (doc) => {
        const settingsSnapshot = await doc.ref.collection('settings').doc('general').get();
        const notificationsEnabled = settingsSnapshot.get('notifications') === true;
        console.log(`Student ${doc.id} notifications: ${notificationsEnabled}`);
        return notificationsEnabled;
    });

    const filteredStudents = await Promise.all(studentsWithNotifications);

    console.log(`Students with notifications enabled: ${filteredStudents.length}`);

    for (const student of filteredStudents) {
        const studentEmail = student.get('email');
        console.log(`Queueing email to ${studentEmail}`);
        setTimeout(async () => {
            await sendNewsEmail(studentEmail, title, content, cover, idNews);
            console.log(`Email sent to ${studentEmail}`);
        }, 0); // Use a timeout of 0 to move the task to the event loop
    }
};

// Função para adicionar notícia e notificar alunos
export const addNewsAndNotify = async (news: INews) => {
    try {
        const newsCollection = firebase.firestore().collection('news');
        await newsCollection.add(news);
        console.log('News added successfully');
        await notifyStudents(news.title, news.content, news.cover, news?.id ? news?.id : '');
    } catch (error) {
        console.error('Erro ao adicionar notícia e notificar alunos:', error);
    }
};
