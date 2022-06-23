import { initializeApp } from "firebase/app";
import { collection, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCgXpcJduiuQu3gDKzY8v_TMmIX9cx8h50",
  authDomain: "web-projects-213ad.firebaseapp.com",
  projectId: "web-projects-213ad",
  storageBucket: "web-projects-213ad.appspot.com",
  messagingSenderId: "748357502127",
  appId: "1:748357502127:web:f3b22c178b1ff6c893c05a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//database reference
const db = getFirestore(app);

//collection refernce
const colRef = collection(db,'todos');
export {colRef,db};