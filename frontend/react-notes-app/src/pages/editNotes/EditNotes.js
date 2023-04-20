import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './EditNotes.css';
import Swal from 'sweetalert2';
import noteUpdate from "../../assets/note-update.png";
import { useNavigate } from 'react-router-dom';
import NavigationBar from '../../components/navigationBar/NavigationBar';

export default function EditNotes() {



  /////////


  const imgURL = 'http://localhost:8080';
  const [selectedImage, setSelectedImage] = useState(null);
  let navigate=useNavigate()
    const {id} = useParams()

  const [note, setNote] = useState({
    title: "",
    description: "",
    date: "",
    file_path: ""
});

const {title, description } = note;

const [imgSrc, setImgSrc] = useState(null);


/////////////////////////////

useEffect(() => {
  if (note.file_path) {
    setImgSrc(`${imgURL}/${note.file_path}`);
  }
}, [note.file_path, imgURL]);

const handleImageChange = e => {
  const file = e.target.files[0];
  if (file) {
    const newImgSrc = URL.createObjectURL(file);
    setImgSrc(newImgSrc);
  }
};

const handleRemoveImage = () => {
  setImgSrc(null);
};


//////////////////////////////



const onInputChange=(e)=>{
    setNote({...note, [e.target.name]:e.target.value });
};

useEffect(() => {
    loadEditNote()
}, [])



const onSubmit = async (e)=>{
  e.preventDefault();
  await axios.put(`http://localhost:8080/note/${id}`,note)
  .then(function (response) {
    setNote({
      title: "",
      description: "",
      date: "",
      file_path:""
    });
    Swal.fire({
      title: 'Note Updated Successfully',
      imageUrl:noteUpdate,
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
  navigate("/mynotes")
};

const loadEditNote = async () => {
    const result = await axios.get(`http://localhost:8080/note/${id}`);
    setNote(result.data);
}



  

// const handleRemoveImage = (e) => {
//   // e.preventDefault();
//     setSelectedImage(null);
//   };


  return (
    <div>
      <NavigationBar/>
      <div className="editNotes">
      <div className="editNotesBox">
      <h3>Edit Notes</h3>
      <Form onSubmit={(e) => onSubmit(e)}>
      <Form.Group className="mb-3" controlId="formBasicTitle">
        <Form.Label>Title</Form.Label>
        <Form.Control type="title" placeholder="Note title here...." name="title" value={title} onChange={(e)=>onInputChange(e)}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicContent">
        <Form.Label>Content</Form.Label>
        <Form.Control as="textarea" rows={6} placeholder="Note content here...." name="description" value={description} onChange={(e)=>onInputChange(e)}/>
      </Form.Group>
      {/* {note.file_path ? (
            <img src={`${imgURL}/${note.file_path}`} alt="Note pic" />
          ) : null} */}

{/* <div>
    {imgSrc ? <img src={imgSrc} alt="Note pic" /> : null}
  </div> */}
  {imgSrc ? <img src={imgSrc} alt="Note pic" /> : null}
    <input type="file" accept="image/*" onChange={handleImageChange} />

      {/* <input type="file" accept="image/*" onChange={e => setSelectedImage(e.target.files[0])} /> */}
      <button type="reset" onClick={handleRemoveImage} >Remove Photo</button>
{selectedImage && (
  <div>
    <img src={URL.createObjectURL(selectedImage)} alt="Selected" />
  </div>
)}

      <div className="btnSaveNote">
      <Link className="nav-link" to={"/mynotes"}>
        <Button className="btnGoBack" variant="primary" type="submit">
      Go Back
      </Button>
      </Link>
      <Button variant="primary" type="submit">
      Update Note
      </Button>
      </div>
        
    </Form>
    </div>
    </div>
    </div>
    
  )
}
