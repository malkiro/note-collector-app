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
  // const [selectedImage, setSelectedImage] = useState(null);
  let navigate=useNavigate()
    const {id} = useParams()

  const [note, setNote] = useState({
    title: "",
    description: "",
    date: "",
});

const {title, description } = note;

// const [imgSrc, setImgSrc] = useState(null);
// const [file, setFile] = useState(null);

/////////////////////////////

useEffect(() => {
  if (note.file_path) {
    setImgSrc(`${imgURL}/${note.file_path}`);
  }
}, [note.file_path, imgURL]);

// useEffect(() => {
//     const noteId = 1; // set the note ID to retrieve from the server
//     axios.get(`http://localhost:8080/notes/${noteId}`)
//       .then(res => {
//         setImgSrc(`${imgURL}/${note.file_path}`);
//       })
//       .catch(err => console.error(err));
//   }, [note.file_path, imgURL]);

// const handleImageChange = e => {
//   const file = e.target.files[0];
//   if (file) {
//     const newImgSrc = URL.createObjectURL(file);
//     setImgSrc(newImgSrc);
//   }
// };

  

const [imgSrc, setImgSrc] = useState('');
  const [imgFile, setImgFile] = useState(null);
  // const [imgURL, setImgURL] = useState('http://localhost:8080');



  const handleImageChange = (event) => {
    setImgFile(event.target.files[0]);
    setImgSrc(URL.createObjectURL(event.target.files[0]));
  };





const handleRemoveImage = () => {
  setImgFile(null);
  setImgSrc(null);
};


//////////////////////////////



const onInputChange=(e)=>{
    setNote({...note, [e.target.name]:e.target.value });
};

useEffect(() => {
    loadEditNote()
}, [])


// const formData = new FormData();
// formData.append("title", note.title);
// formData.append("description", note.description);
// formData.append("image", imgFile);

const onSubmit = async (e)=>{
  e.preventDefault();
  try {
    const formData = new FormData();
    if (note.title) formData.append('title', note.title);
    if (note.description) formData.append('description', note.description);
    if (note.image) formData.append('image', note.image);
    if (imgFile) formData.append('image', imgFile);

    const res = await axios.put(`http://localhost:8080/note/${id}`, formData)
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
  } catch (err) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong!',
    })
  }
  // // await axios.put(`http://localhost:8080/note/${id}`,note)
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
    
    <Form.Label>Photo</Form.Label>
      <div className='imageSection'>
      <div className='imageSectionButtons'>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {/* <button className='imageResetButton' type="reset" onClick={handleRemoveImage} >Remove Photo</button> */}
      </div>
  <div>
  {imgSrc ? <img src={imgSrc} alt="Note pic" /> : null}
  </div>   

      </div>

      {/* <input type="file" accept="image/*" onChange={e => setSelectedImage(e.target.files[0])} /> */}
      {/* <button type="reset" onClick={handleRemoveImage} >Remove Photo</button> */}
{/* {selectedImage && (
  <div>
    <img src={URL.createObjectURL(selectedImage)} alt="Selected" />
  </div>
)} */}

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