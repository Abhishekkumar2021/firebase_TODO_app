import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyB0tbZkNasC8QE2ES6Bs405IZhHLYI4V34",
  authDomain: "focused-catfish-353920.firebaseapp.com",
  projectId: "focused-catfish-353920",
  storageBucket: "focused-catfish-353920.appspot.com",
  messagingSenderId: "271212160291",
  appId: "1:271212160291:web:7dc652d1cb3fb0b1901896"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;