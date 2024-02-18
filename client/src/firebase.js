// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_URL,
  authDomain: "mern-gtimmobiliare.firebaseapp.com",
  projectId: "mern-gtimmobiliare",
  storageBucket: "mern-gtimmobiliare.appspot.com",
  messagingSenderId: "773988876930",
  appId: "1:773988876930:web:336bef0324c34c1df56a9b",
  measurementId: "G-697KPXHQWY"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
