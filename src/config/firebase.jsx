// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBsaX74j7xfflOcInC_byoaS9KKfjiH_U4",
  authDomain: "fir-course-e8ede.firebaseapp.com",
  projectId: "fir-course-e8ede",
  storageBucket: "fir-course-e8ede.appspot.com",
  messagingSenderId: "134815112330",
  appId: "1:134815112330:web:c18d8fdaf7dfe1157c2173",
  measurementId: "G-XT1EDX73E6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const storage = getStorage(app);
export const db = getFirestore(app);
