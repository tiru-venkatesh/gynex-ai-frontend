import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

/* 🔹 Firebase Config */
const firebaseConfig = {
  apiKey: "AIzaSyDLzM1jwvZgzt4kbvAWipP8XdkvhekLPlY",
  authDomain: "gynex-ai.firebaseapp.com",
  projectId: "gynex-ai",
  storageBucket: "gynex-ai.firebasestorage.app",
  messagingSenderId: "99424892901",
  appId: "1:99424892901:web:916a19f9079daf1e27610c",
  measurementId: "G-BL42Q4Y01Y"
};

/* 🔹 Initialize App */
export const app = initializeApp(firebaseConfig);

/* 🔹 Providers */
export const googleProvider = new GoogleAuthProvider();

/* 🔹 Services */
export const auth = getAuth(app);
export const db = getFirestore(app);
