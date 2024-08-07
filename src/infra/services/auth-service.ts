import { GoogleAuthProvider, sendEmailVerification, signInWithEmailAndPassword, signInWithPopup, User } from "firebase/auth";
import {
  auth,
  createUserWithEmailAndPassword,
  db,
  doc,
} from "@/domain/config/firebase";
import { IAluno } from "@/interfaces/aluno/aluno";
import { getDoc, doc as firestoreDoc, Timestamp, setDoc } from "firebase/firestore";
//import { sendNewDeviceEmail, sendWelcomeEmail } from "@/utils/emailService";
import { getCurrentDevice, getCurrentIp } from "@/utils/devie-services";
import { sendNewDeviceEmail } from "@/utils/emailService";
import { AlertUtils } from "@/utils/alert-utils";

export const registerUser = async (user: IAluno): Promise<void> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      user.email,
      user.password
    );

    const userId = userCredential.user.uid;

    await setDoc(doc(db, "admins", userId), {
      displayName: user.nome,
      email: user.email,
      phoneNumber: user.telefone,
      cod_aluno: user.cod_aluno,
      photoURL: user.photo,
      country: user.country,
      role: '',
      address: '',
      company: '',
      tw: '',
      fb: '',
      insta: '',
      in: ''
    });

    await setDoc(doc(db, "hacking", userId), {
      student_email: user.email,
      // phoneNumber: user.telefone,
      cod_aluno: user.cod_aluno,
      photoURL: user.photo,
      name: user.nome,
      country: user.country,
      solved_challenges: 0,
      score: 0,
      createdAt: Timestamp.now(),
    });

    await sendEmailVerification(userCredential.user);

    window.location.href = '/confirm-email'

    console.log("User registered successfully");
    //await sendWelcomeEmail(user.email, user.nome);

    // console.log("User registered successfully");
  } catch (error) {
    console.error("Error registering user", error);
    throw error;
  }
};


export const loginUser = async (
  email: string,
  password: string
): Promise<void> => {
  try {
    // Efetua o login com email e senha
    await signInWithEmailAndPassword(auth, email, password);

    // Verifica se o email está confirmado
    if (!auth.currentUser?.emailVerified) {
      window.location.href = '/confirm-email';
      return;
    }

    // Busca os dados do usuário no Firestore com base no UID
    const userDocRef = firestoreDoc(db, `admins/${auth.currentUser?.uid}`);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      const userData: (User | IAluno) | any = userDocSnap.data();

      // Verifica informações do dispositivo atual
      const currentDevice = getCurrentDevice();
      const currentIp = await getCurrentIp();
      const userId = auth.currentUser?.uid;
      const sessionDocRef = firestoreDoc(db, `sessions/${userId}`);
      const sessionDocSnap = await getDoc(sessionDocRef);

      if (sessionDocSnap.exists()) {
        const sessionData = sessionDocSnap.data();
        if (
          sessionData.device !== currentDevice ||
          sessionData.ip !== currentIp
        ) {
          await sendNewDeviceEmail(
            userData.email,
            userData.displayName,
            currentDevice,
            new Date().toISOString(),
            currentIp
          );
        }
      }

      // Atualiza ou cria um novo documento de sessão
      await setDoc(sessionDocRef, {
        email: userData.email,
        device: currentDevice,
        time: Timestamp.now(),
        ip: currentIp,
      });

      // Redireciona para o dashboard
      window.location.href = '/dashboard';
    } else {
      AlertUtils.error('Conta não cadastrada ou sem permissão de acesso, contacte o admnistrador !')
      console.error("User document not found in Firestore");
    }
  } catch (error) {
    console.error("Error logging in", error);
    throw error;
  }
};


export const loginUserWithGoogle = async (): Promise<void> => {
  try {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
    //console.log("User logged in with Google successfully");

    const currentUser = auth.currentUser;
    if (currentUser) {
      const userId = currentUser.uid;
      const email = currentUser.email;

      // Check if the user exists in the 'hacking' collection
      const hackingDocRef = firestoreDoc(db, `hacking/${userId}`);
      const hackingDocSnap = await getDoc(hackingDocRef);

      if (!hackingDocSnap.exists()) {
        // If 'hacking' document doesn't exist, create it
        await setDoc(doc(db, "hacking", userId), {
          student_email: email,
          name: currentUser.displayName || "",
          photoURL: currentUser.photoURL || "",
          country: "", // You can set country or other fields if available
          solved_challenges: 0,
          score: 0,
          createdAt: Timestamp.now(),
        });
        console.log("Added user to 'hacking' collection");
      }

      // Fetch user data from 'admins' collection
      const userDocRef = firestoreDoc(db, `alunos/${userId}`);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        console.log("User data from 'admins' collection:", userData);
      } else {
        console.error("User document not found in 'admins' collection");
      }
    } else {
      console.error("Current user not found");
    }
  } catch (error) {
    console.error("Error logging in with Google", error);
    throw error;
  }
};
