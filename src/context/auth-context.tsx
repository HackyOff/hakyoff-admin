import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User, signOut } from 'firebase/auth';
import { updateDoc, collection, query, where, getDocs, doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db, storage } from '../domain/config/firebase';
import { uploadBytes, getDownloadURL, ref } from 'firebase/storage';
import { UserSettings } from '@/presentation/pages/sidebar-pages/settings';
import { AlertUtils } from '@/utils/alert-utils';
import { MAluno } from '@/domain/models/aluno-model';


export interface MMAluno {
  cod_aluno: string;
  displayName: string;
  phoneNumber: string;
  photoURL: string;
  email: string;
}



interface AuthContextProps {
  currentUser: (User & MAluno) | null;
  loading: boolean;
  logout: () => Promise<void>;
  userSettings: UserSettings;
  updateUserSettings: (updatedSettings: Partial<UserSettings>) => void;
  updateProfile: (displayName: string | null, phoneNumber: string | null, photoURL: string | null, photoFile: File | null, address: string | null, company: string | null, role: string | null) => Promise<void>;
}

const AuthContext = createContext<AuthContextProps>({
  userSettings: {
    receiveMarketingEmails: false,
    darkMode: false,
    language: 'pt',
    notifications: true,
  },
  updateUserSettings: () => { },
  currentUser: null,
  loading: true,
  logout: async () => { },
  updateProfile: async () => { }
});

export const AuthProvider: React.FC<React.PropsWithChildren<object>> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<(User & MAluno) | null>(null);
  const [loading, setLoading] = useState(true);
  const [userSettings, setUserSettings] = useState<UserSettings>({
    receiveMarketingEmails: false,
    darkMode: false,
    language: 'en',
    notifications: true,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user && user.emailVerified) {
        try {
          const userRef = collection(db, 'admins');
          const q = query(userRef, where('email', '==', user.email));
          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            const userData = querySnapshot.docs[0].data();
            setCurrentUser({
              ...user,
              cod_aluno: userData.cod_aluno,
              displayName: userData.displayName,
              phoneNumber: userData.phoneNumber,
              photoURL: userData.photoURL,
              email: user.email || '',
              address: userData.address,
              company: userData.company,
              role: userData.role,
              country: userData.country,
              tw: userData.tw,
              fb: userData.fb,
              in: userData.in,
              insta: userData.insta,
            });

            // Carregar as configurações do usuário ao autenticar
            const userSettingsRef = doc(db, 'admins', user.uid, 'settings', 'general');
            const settingsDoc = await getDoc(userSettingsRef);
            if (settingsDoc.exists()) {
              setUserSettings(settingsDoc.data() as UserSettings);
            } else {
              console.log('No settings document found, using default settings.');
              setUserSettings({
                receiveMarketingEmails: false,
                darkMode: false,
                language: 'pt',
                notifications: true,
              });
            }
          } else {
            setCurrentUser(null); // Se o usuário não for encontrado no Firestore, defina como null
          }
        } catch (error) {
          console.error('Erro ao buscar dados do usuário no Firestore:', error);
          setCurrentUser(null); // Fallback para manter currentUser como null em caso de erro
        }
      } else {
        setCurrentUser(null);
      }
      setLoading(false);

      // window.location.href = '/confirm-email'
    });

    return unsubscribe;
  }, []);

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  const updateProfile = async (
    displayName: string | null,
    phoneNumber: string | null,
    photoURL: string | null,
    photoFile: File | null,
    address: string | null,
    company: string | null,
    role: string | null
  ) => {
    if (!currentUser || !currentUser.email) return;

    try {
      let newPhotoURL = photoURL || currentUser.photoURL;

      // Upload da nova imagem para o Firebase Storage, se houver uma nova foto
      if (photoFile) {
        const storageRef = ref(storage, `profiles/${currentUser.uid}/${photoFile.name}`);
        await uploadBytes(storageRef, photoFile);
        newPhotoURL = await getDownloadURL(storageRef);
      }

      // Consultar o documento usando o campo email
      const querySnapshot = await getDocs(query(collection(db, 'admins'), where('email', '==', currentUser.email)));
      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];

        // Atualizar documento com os novos dados
        await updateDoc(userDoc.ref, {
          displayName: displayName || currentUser.displayName,
          phoneNumber: phoneNumber || currentUser.phoneNumber,
          photoURL: newPhotoURL,
          address: address || currentUser.address,
          company: company || currentUser.company,
          role: role || currentUser.role,
        });
      }

      // Atualizar estado local
      setCurrentUser({
        ...currentUser,
        displayName: displayName || currentUser.displayName,
        phoneNumber: phoneNumber || currentUser.phoneNumber,
        photoURL: newPhotoURL,
        address: address || currentUser.address,
        company: company || currentUser.company,
        role: role || currentUser.role,
      });

      AlertUtils.success('Suas informações foram atualizadas com sucesso')

    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      throw error;
    }
  };


  const updateUserSettings = async (updatedSettings: Partial<UserSettings>) => {
    if (!currentUser) return;

    try {
      const userSettingsRef = doc(db, 'admins', currentUser.uid, 'settings', 'general');
      await setDoc(userSettingsRef, { ...userSettings, ...updatedSettings }, { merge: true });
      setUserSettings(prevSettings => ({
        ...prevSettings,
        ...updatedSettings,
      }));

      if (updatedSettings.darkMode) {
        document.body.classList.toggle("dark", updatedSettings.darkMode);
      }

      AlertUtils.success('Suas configurações foram atualizadas com sucesso');
    } catch (error) {
      AlertUtils.error('Erro ao atualizar configurações do usuário');
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ userSettings, updateUserSettings, currentUser, loading, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
