// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { collection, getDocs } from 'firebase/firestore/lite';
import { getAuth } from "firebase/auth";
//import 'firebase/compat/auth'


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAKWhAjUznM5tRTJpAh8NH6rdEpfa5DCj4",
  authDomain: "nysl-58d07.firebaseapp.com",
  projectId: "nysl-58d07",
  storageBucket: "nysl-58d07.appspot.com",
  messagingSenderId: "1049538982332",
  appId: "1:1049538982332:web:12ae428265b051aea57bb9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

/* Configuraciones para firebase <=8 */
//import 'firebase/firestore'
//import 'firebase/auth'
//const db = firebase.firestore() 
//const googleAuthProvider = firebase.auth.GoogleAuthProvider()

const auth = getAuth(app);

export { collection as fbCollection, getDocs as fbGetDocs, auth, app }