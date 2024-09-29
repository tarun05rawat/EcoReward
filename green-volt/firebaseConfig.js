// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA4YB1MJ6wUKFFoJuG4fLQk7-RZIc7-YOQ",
  authDomain: "green-volt-48d72.firebaseapp.com",
  projectId: "green-volt-48d72",
  storageBucket: "green-volt-48d72.appspot.com",
  messagingSenderId: "1035486770526",
  appId: "1:1035486770526:web:af1ffad613b08689e74bcf",
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
