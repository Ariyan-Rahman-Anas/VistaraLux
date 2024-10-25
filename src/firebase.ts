import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    // apiKey: "AIzaSyAwuPVTvA_pFc2xlfXS_o58xMC9dbhsLSA",
    authDomain: "VistaraLux.firebaseapp.com",
    projectId: "VistaraLux",
    storageBucket: "VistaraLux.appspot.com",
    messagingSenderId: "140908629439",
    appId: import.meta.env.VITE_FIREBASE_APP_ID
    // appId: "1:140908629439:web:7d43f583a9c9df9795650a"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)