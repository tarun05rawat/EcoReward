import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

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
const db = getFirestore(app);

// Add points to Firestore
export const updatePointsInFirestore = async (userAddress, points) => {
    try {
        await setDoc(doc(db, 'users', userAddress), { points }, { merge: true });
        console.log('Points updated in Firestore for user:', userAddress);
    } catch (error) {
        console.error('Error updating Firestore:', error);
    }
};