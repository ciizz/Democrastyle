// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBNKwf2iaK6dToVjvS9nMRv-xLK-qzXfV4",
  authDomain: "democrastyle-a73d2.firebaseapp.com",
  projectId: "democrastyle-a73d2",
  storageBucket: "democrastyle-a73d2.appspot.com",
  messagingSenderId: "32774393359",
  appId: "1:32774393359:web:e2bc3732079662bedd1d7a",
  measurementId: "G-VWPZ054CYF",
};

// Initialize Firebase App and Auth
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;