import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA8ZJZsXWrfVwBCldzagRGu_olYBbVjHpc",
  authDomain: "estudiantes-4c956.firebaseapp.com",
  projectId: "estudiantes-4c956",
  storageBucket: "estudiantes-4c956.appspot.com",
  messagingSenderId: "201285036691",
  appId: "1:201285036691:web:4864c943e00172711cfb66"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);