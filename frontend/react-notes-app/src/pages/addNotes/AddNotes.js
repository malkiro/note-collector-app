import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import './AddNotes.css';
import Swal from 'sweetalert2';
import noteAdd from "../../assets/note-add.png";
import NavigationBar from '../../components/navigationBar/NavigationBar';

export default function AddNotes() {
  const [note, setNote] = useState({
    title: "",
    description: "",
    file_path: ""
  });

  const { title, description } = note;
  const [selectedImage, setSelectedImage] = useState(null);

  const formData = new FormData();
  formData.append("title", note.title);
  formData.append("description", note.description);
  formData.append("image", selectedImage);


  const onInputChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };


  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8080/noteapi/note", formData)
      .then(function (response) {
        setNote({
          title: "",
          description: "",
        });
        setSelectedImage(null);
        document.getElementById("input-file").value = "";
        Swal.fire({
          title: 'Note Added Successfully',
          imageUrl: noteAdd,
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
    document.getElementById("input-file").value = "";
  };


  const handleRemoveImage = (e) => {
    setSelectedImage(null);
    document.getElementById("input-file").value = "";
  };

  return (
    <div>
      <NavigationBar />
      <div className="addNotes">
        <div className="addNotesBox">
          <h3>Add New Notes</h3>
          <Form onSubmit={(e) => onSubmit(e)}>
            <Form.Group className="mb-3" controlId="formBasicTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control type="title" placeholder="Note title here...." name="title" value={title} onChange={(e) => onInputChange(e)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicContent">
              <Form.Label>Content <small className='limitText'>[ {description.length}/255 characters ]</small> </Form.Label>
              <Form.Control as="textarea" rows={4} placeholder="Note content here...." name="description" value={description}
                onChange={(e) => onInputChange(e)}
                maxLength={255}
              />
            </Form.Group>

            <Form.Label>Photo</Form.Label>
            <div className='imageSection'>
              <div className='imageSectionButtons'>
                <input className='imageChooseButton' id="input-file" type="file" accept="image/*" onChange={e => setSelectedImage(e.target.files[0])} />
                {selectedImage && (
                  <button className='imageResetButton' type="reset" onClick={handleRemoveImage} >Remove Photo</button>
                )}
              </div>
              {selectedImage && (
                <div>
                  <img className='imageBlock' src={URL.createObjectURL(selectedImage)} alt="Selected" />
                </div>
              )}
            </div>
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
