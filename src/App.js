import "./App.css";
import { addDoc, getDocs,deleteDoc,doc } from "firebase/firestore";
import {colRef,db} from "./firebaseConfig";
import { useEffect, useState } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [update,setUpdate] = useState(false);
  const [updateID,setUpdateID] = useState('');

  //Get all todos
  const getAll = async () => {
    try {
      const snapshot = await getDocs(colRef);
      let all = [];
      snapshot.docs.forEach((doc) => {
        all.push({ ...doc.data(), id: doc.id });
      });
      setTodos(all);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getAll();
  });

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleContent = (e) => {
    setContent(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!update){
      try {
        await addDoc(colRef, {
          title,content
        });
        // console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }else{

    }
    
  };
  const handleDelete = async (e)=>{
    const id = e.target.id; 
    try{
      const docRef = doc(db,'todos',id);
      await deleteDoc(docRef);
    }catch(err){
      console.error(err);
    }

  }
  const handleUpdate = async(e)=>{
    setUpdateID(e.target.id);
    setUpdate(true);
  }
  return (
    <div className="app">
      <div className="todos">
        {todos.map((todo) => (
          <div className="todo" key={todo.id}>
            <h2>{todo.title}</h2>
            <p>{todo.content} </p>
            <div className="buttons">
              <button id={todo.id} onClick={handleDelete}>Delete</button>
              <button id={todo.id} onClick={handleUpdate}>Update</button>
            </div>
          </div>
        ))}
      </div>
      <form className="new" onSubmit={handleSubmit} id="new">
        <input
          type="text"
          placeholder="Enter title..."
          value={title}
          onChange={handleTitle}
          required
        />
        <textarea
          placeholder="Enter content here..."
          value={content}
          onChange={handleContent}
          required
        />
        <button type="submit">{update?"Update":"Add"} TODO</button>
      </form>
    </div>
  );
}

export default App;
