import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue, off } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyC38Y_5jJNByLSoA9lV_8nW_f5uzCMlJR4",
    authDomain: "speech-to-text-7a4d9.firebaseapp.com",
    projectId: "speech-to-text-7a4d9",
    storageBucket: "speech-to-text-7a4d9.firebasestorage.app",
    messagingSenderId: "193680485071",
    appId: "1:193680485071:web:42a60da58b128cba6165ba",
    measurementId: "G-JNEXDY48E2"
  };

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db, ref, set, onValue, off };
