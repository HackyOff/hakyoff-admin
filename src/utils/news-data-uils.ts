

// componentenews.ts
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore'; 


export interface INews {
    id?: string;
    news_code: number;
    title: string;
    short_desc: string;
    content: string;
    cover: string;
    date: Date;
    new?: boolean
}
export const NewsData = async () => {
    try {

        const newsCollection = firebase.firestore().collection('news');
        const snapshot = await newsCollection.get();
        const newsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as INews[];
        return newsData;
    } catch (error) {
        console.error('Erro ao buscar notícias do Firestore:', error);
        return [];
    }
};

 