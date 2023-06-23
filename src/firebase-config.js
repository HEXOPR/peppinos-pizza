// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore"
import {getAuth} from "@firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAuNWPfjzmk_cOxdg1Qe9oVvXKELOr9oks",
    authDomain: "walter-glovo.firebaseapp.com",
    projectId: "walter-glovo",
    storageBucket: "walter-glovo.appspot.com",
    messagingSenderId: "691288364537",
    appId: "1:691288364537:web:6b4213d7494e430fa2d928"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app)