import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/domain/config/firebase';

export const fetchCertificates = async (email: string | null | undefined) => {
  if (!email) return [];
  
  const certificatesCollectionRef = collection(db, 'certificates');
  const q = query(certificatesCollectionRef, where('studentEmail', '==', email));
  const querySnapshot = await getDocs(q);

  const certificatesData: any[] = [];
  querySnapshot.forEach((doc) => {
    certificatesData.push({ id: doc.id, ...doc.data() });
  });

  return certificatesData;
};
