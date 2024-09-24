// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAqQVdI7xr6dtndh42YWusK92DxUWqXcHA",
  authDomain: "pixels-4e213.firebaseapp.com",
  projectId: "pixels-4e213",
  storageBucket: "pixels-4e213.appspot.com",
  messagingSenderId: "904875292487",
  appId: "1:904875292487:web:493864e57659d90f837e62",
  measurementId: "G-EGCLENLP38"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firestore 인스턴스를 생성
const db = getFirestore(app);

export { db };