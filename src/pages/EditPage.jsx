import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { db } from '../firebase';

import Form from '../components/Form';

function EditPage() {

    const [inputs, setInputs] = useState({});
    const {id} = useParams();
    const navigate = useNavigate();


    useEffect(() => {

      db.collection('projects')
        .doc(id)
        .onSnapshot(project => setInputs(project.data()));

    },[])
  



  

  const inputHandler = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    //========== HERE THE AXIOS THAT PUSH THE NEW PROJECT

    db.collection('projects')
        .doc(id)
        .update(inputs);

    navigate(`/projectdetails/${id}`)
        
  };

  return (
    <Form inputs={inputs} inputHandler={inputHandler} submitHandler={submitHandler} navigate={navigate}/>
  )
  }
export default EditPage;

// <div>
//     create CreatePage
//     <form onSubmit={submitHandler}>
//     <label className="assignee_label">
//     Project Title
//     <input
//       className="assignee_input"
//       name="title"
//       type="text"
//       value={inputs.title || ""}
//       onChange={inputHandler}
//     />
//   </label>
//   <label className="assignee_label">
//     Description
//     <input
//       className="assignee_input"
//       name="description"
//       type="text"
//       value={inputs.description || ""}
//       onChange={inputHandler}
//     />
//   </label>
//   <label className="assignee_label">
//     image
//     <input
//       className="assignee_input"
//       name="image"
//       type="text"
//       value={inputs.image || ""}
//       onChange={inputHandler}
//     />
//   </label>
//   <label className="assignee_label">
//     Author
//     <input
//       className="assignee_input"
//       name="author"
//       type="text"
//       value={inputs.author || ""}
//       onChange={inputHandler}
//     />
//   </label>
//     <button type="submit" className="primbtn-privaeBtn">Submit Project</button>
//     </form>
