import "./App.css";
import { collection, addDoc } from "firebase/firestore";
import db from "./firebaseConfig";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    const addData = async () => {
      try {
        const docRef = await addDoc(collection(db, "todos"), {
          title: "Random TODO",
          content: "This is a random todo",
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    };
    addData();
  });

  return (
    <div className="app">
      <h1>Hello</h1>
    </div>
  );
}

export default App;
