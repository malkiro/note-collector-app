import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import './AddNotes.css';
import Swal from 'sweetalert2';
import noteAdd from "../../assets/note-add.png";
import NavigationBar from '../../components/navigationBar/NavigationBar';
import { useRef } from "react";

export default function AddNotes() {
  const [selectedImage, setSelectedImage] = useState(null);

  const clearPhoto = () => {
    setSelectedImage(null);
  }
  

  /////////////////////////////////////

  const [note, setNote] = useState({
    title: "",
    description: "",
    file_path: ""
});



const {title, description } = note;


const formData = new FormData();
formData.append("title", note.title);
formData.append("description", note.description);
formData.append("image", selectedImage);




const onInputChange=(e)=>{
    setNote({...note, [e.target.name]:e.target.value });
};

// const onSubmit = async (e)=>{
//   e.preventDefault();
//   await axios.post("http://localhost:8080/note",note)
//   // navigate("/mynotes")
// };

const onSubmit = async (e)=>{
  e.preventDefault();
  await axios.post("http://localhost:8080/note", formData
  // , {
  // headers: { "Content-Type": "multipart/form-data" },
// }
)
  // await axios.post("http://localhost:8080/note",note)
  .then(function (response) {
    setNote({
      title: "",
      description: "",
      file_path:""
    });
    Swal.fire({
      title: 'Note Added Successfully',
      imageUrl:noteAdd,
      closeOnClickOutside: false,
    }
    )
  })
  .catch(function (error) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong!',
    })
  });
};


const handleClear = () => {
  setNote({
    title: "",
    description: "",
  });
  setSelectedImage(null);
};

const handleRemoveImage = (e) => {
    setSelectedImage(null);
  };


  return (
    <div>
      <NavigationBar/>
      <div className="addNotes">
      <div className="addNotesBox">
      <h3>Add New Notes</h3>
      <Form onSubmit={(e) => onSubmit(e)}>
      <Form.Group className="mb-3" controlId="formBasicTitle">
        <Form.Label>Title</Form.Label>
        <Form.Control type="title" placeholder="Note title here...." name="title" value={title} onChange={(e)=>onInputChange(e)}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicContent">
        <Form.Label>Content</Form.Label>
        <Form.Control as="textarea" rows={4} placeholder="Note content here...." name="description" value={description} onChange={(e)=>onInputChange(e)}/>
      </Form.Group>

      <input type="file" accept="image/*" onChange={e => setSelectedImage(e.target.files[0])} />
      <button type="reset" onClick={handleRemoveImage} >Remove Photo</button>
{selectedImage && (
  <div>
    <p>Selected image:</p>
    <img src={URL.createObjectURL(selectedImage)} alt="Selected" />
  </div>
)}
      {/* {uploadProgress > 0 && <p>Upload progress: {uploadProgress}%</p>} */}
      {/* <img/> */}




      <div className="btnSaveNote">
      <Button className="btnClear" variant="primary" type="reset" onClick={handleClear}>
      Clear Data
      </Button>
      <Button variant="primary" type="submit">
      Save Note
      </Button>
      </div>
        
    </Form>
    </div>
    </div>
    </div>
  )
}
