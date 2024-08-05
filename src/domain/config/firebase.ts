// Import the functions you need from the SDKs you need

import "firebase/compat/auth";
import "firebase/compat/storage";
import "firebase/compat/firestore";
import firebase from "firebase/compat/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage";

import { initializeApp } from 'firebase/app';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCmWW_m_rClGZJNUwjseS05f_fIGEl5m5E",
  authDomain: "academy-hakyoff.firebaseapp.com",
  projectId: "academy-hakyoff",
  storageBucket: "academy-hakyoff.appspot.com",
  messagingSenderId: "132565624004",
  appId: "1:132565624004:web:a5abd72b7a9a0b77095591",
  measurementId: "G-DKK6B9J7Z2",
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const dbb = getFirestore(initializeApp(firebaseConfig));

//const storage = firebase.storage();

const auth = getAuth(firebase.initializeApp(firebaseConfig));

const storage = getStorage(firebase.initializeApp(firebaseConfig));

export {
  auth,
  dbb,
  db,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  doc,
  setDoc,
  storage,
};
