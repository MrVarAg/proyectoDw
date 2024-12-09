// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

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
const auth = getAuth(appFirebase);

export { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword };
export default appFirebase;