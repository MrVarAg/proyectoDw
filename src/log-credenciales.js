// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDxtl-eWW9OEeLjuYu3kuolXtjy1iEUc4s",
  authDomain: "appweb-c29d7.firebaseapp.com",
  projectId: "appweb-c29d7",
  storageBucket: "appweb-c29d7.appspot.com",
  messagingSenderId: "148862482106",
  appId: "1:148862482106:web:6bbcebaf5fb6a058db7483",
  measurementId: "G-7CCW3K4184"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);
export default appFirebase
