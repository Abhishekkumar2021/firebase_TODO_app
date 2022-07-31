import React, { useEffect, useState } from "react";
import "./App.css";
import { addDoc, getDocs, doc, updateDoc } from "firebase/firestore";
import { db,colRef } from "./firebaseConfig";

function App() {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [tags, setTags] = useState("");
  const [ques, setQues] = useState([]);
  const handleLink = (e) => {
    setLink(e.target.value);
  };
  const handleTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleTags = (e) => {
    setTags(e.target.value);
  };
  const getAll = async () => {
    try {
      const snapshot = await getDocs(colRef);
      let all = [];
      snapshot.docs.forEach((doc) => {
        all.push({ ...doc.data(), id: doc.id });
      });
      setQues(all);
    } catch (err) {
      console.log(err.message);
    }
  };
  const toggleDone = async (id)=>{
    const ref = doc(db,'questions',id);
    await updateDoc(ref,{
      done:true
    })
    getAll();
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    let arr = tags.split(",");
    try {
      await addDoc(colRef, {
        title,
        link,
        tags:arr,
        done:false
      });
      getAll()
      // console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  useEffect(() => {
    getAll();
  },[ ]);
  return (
    <div className="app">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={handleTitle}
          placeholder="Enter title of the question..."
        />
        <input
          type="text"
          value={link}
          onChange={handleLink}
          placeholder="Link to the question..."
        />
        <input
          type="text"
          value={tags}
          onChange={handleTags}
          placeholder="Enter comma seperated tags..."
        />
        <button type="submit">Add problem</button>
      </form>
      <div className="questions">
        {ques.map((q,i)=>(
          <div className="que" key = {q.id}>
            <span className="num">{i}</span>
            <h1>{q.title}</h1>
            <a href={q.link} alt="question link">{q.link}</a>
            <div className="tags">{q.tags.map((t,idx)=>(
              <span key={idx}>{t}</span>
            ))}</div>
            <div onClick={()=>toggleDone(q.id)} className={q.done?"solved":"unsolved"}>{q.done?"Solved":"Unsolved"}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

// function App() {
//   const [todos, setTodos] = useState([]);
//   const [title, setTitle] = useState('');
//   const [content, setContent] = useState('');
//   const [update,setUpdate] = useState(false);
//   const [updateID,setUpdateID] = useState('');

//   //Get all todos
//   const getAll = async () => {
//     try {
//       const snapshot = await getDocs(colRef);
//       let all = [];
//       snapshot.docs.forEach((doc) => {
//         all.push({ ...doc.data(), id: doc.id });
//       });
//       setTodos(all);
//     } catch (err) {
//       console.log(err.message);
//     }
//   };

//   useEffect(() => {
//     getAll();
//   });

//   const handleTitle = (e) => {
//     setTitle(e.target.value);
//   };
//   const handleContent = (e) => {
//     setContent(e.target.value);
//   };
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if(!update){
//       try {
//         await addDoc(colRef, {
//           title,content
//         });
//         // console.log("Document written with ID: ", docRef.id);
//       } catch (e) {
//         console.error("Error adding document: ", e);
//       }
//     }else{

//     }

//   };
//   const handleDelete = async (e)=>{
//     const id = e.target.id;
//     try{
//       const docRef = doc(db,'todos',id);
//       await deleteDoc(docRef);
//     }catch(err){
//       console.error(err);
//     }

//   }
//   const handleUpdate = async(e)=>{
//     setUpdateID(e.target.id);
//     setUpdate(true);
//   }
//   return (
//     <div className="app">
//       <div className="todos">
//         {todos.map((todo) => (
//           <div className="todo" key={todo.id}>
//             <h2>{todo.title}</h2>
//             <p>{todo.content} </p>
//             <div className="buttons">
//               <button id={todo.id} onClick={handleDelete}>Delete</button>
//               <button id={todo.id} onClick={handleUpdate}>Update</button>
//             </div>
//           </div>
//         ))}
//       </div>
//       <form className="new" onSubmit={handleSubmit} id="new">
//         <input
//           type="text"
//           placeholder="Enter title..."
//           value={title}
//           onChange={handleTitle}
//           required
//         />
//         <textarea
//           placeholder="Enter content here..."
//           value={content}
//           onChange={handleContent}
//           required
//         />
//         <button type="submit">{update?"Update":"Add"} TODO</button>
//       </form>
//     </div>
//   );
// }

// export default App;
