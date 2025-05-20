// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBTXsWfFV0xj5WrdlUfXFxtzPwmQnoTyp8",
  authDomain: "practica-login-2627a.firebaseapp.com",
  projectId: "practica-login-2627a",
  storageBucket: "practica-login-2627a.firebasestorage.app",
  messagingSenderId: "518530719792",
  appId: "1:518530719792:web:6ff0af8dde94a21a4c4df5",
  measurementId: "G-9L8TD19N9W",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
