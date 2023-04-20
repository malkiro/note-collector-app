import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin5Fill } from "react-icons/ri";
import Button from 'react-bootstrap/Button';
import { Link, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';
import noteDelete from "../../assets/note-delete.png";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../pages/viewNote/ViewNote.css';
import './MyNotes.css';
import NavigationBar from '../../components/navigationBar/NavigationBar';
import Test from './Test';


export default function MyNotes() {
  // const imgURL = 'http://localhost:8080';

  ///////////////////////
  const [searchText, setSearchText] = useState("");

  const handleSearch = async (event) => {
    const searchText = event.target.value;
    setSearchText(searchText);
    try {
      const response = await axios.get(`http://localhost:8080/search?searchText=${searchText}`);
      setNotes(response.data);
    } catch (error) {
      console.error(error);
    }
  };

//

  const [notes, setNotes] = useState([]);
  const { id } = useParams()

  useEffect(() => {
    loadNotes()
  }, []);

  const loadNotes = async () => {
    const result = await axios.get('http://localhost:8080/notes');
    setNotes(result.data);
  }


  const [note, setNote] = useState({
    title:"",
    description:"",
    file_path: "",
    date:""
  })

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  };


  const deleteNote = async (id) => {
    // Show Swal confirmation dialog for deleting note
    Swal.fire({
      title: 'Are you sure to delete?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      closeOnClickOutside: false,
    }).then((result) => {
      if (result.isConfirmed) {
        // If user confirms, delete the note
        axios.delete(`http://localhost:8080/note/${id}`)
          .then(function (response) {
            // Show success Swal alert after successful deletion
            Swal.fire({
              title: 'Note Deleted Successfully',
              imageUrl: noteDelete,
              closeOnClickOutside: false,
            });
            loadNotes(); // Call the loadNotes function if needed
          })
          .catch(function (error) {
            // Show error Swal alert if deletion fails
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!',
            });
          });
      }
    });
  };


  return (
    <div className="myNotes">
      <NavigationBar/>
      {/* Search Field */}
      <div className="searchField">
        <Form className="d-flex">
          <Form.Control
            type="text"
            placeholder="Search your text here....."
            className="me-2"
            aria-label="Search"
            name="title"
            value={searchText}
        onChange={handleSearch}
          />

          {/* <Button variant="outline-success" onClick={handleSearch}>Search</Button> */}
        </Form>
      </div>

      {/* Note Component */}
      <div className="myNotesBox">
        {
          notes.map((note, index) => (
            <div className="note">
              <h4>{note.title}</h4>
              <p>{note.description}</p>
              {/* {note.file_path ? (
            <img src={`${imgURL}/${note.file_path}`} alt="Note pic" />
          ) : null} */}
              <div className='note-footer'>
                <div className='footer-date'>
                  <span>Date & Time: </span><span> {formatDate(note.date)} </span>
                </div>
                <div className='footer-icons'>
                  <div className='note-foote-icons'>
                 <Link className="nav-link" to={`/viewnote/${note.id}`}><Button className="btnView" variant="primary" type="submit">See More ...</Button></Link>
                  {/* <Button className="btnView" variant="primary" type="submit" onClick={handleShow}>See More ...</Button> */}
                <Link className="nav-link" to={`/editnotes/${note.id}`}><BiEdit size={25} color="#8e05aa" /></Link> {' '}
                    <RiDeleteBin5Fill size={25} color="#8e05aa" onClick={() => deleteNote(note.id)} />
                    {/* <Test show={show} title={note}/> */}
                  </div>
                </div>
                
              </div>
              
            </div>
          ))
        }

{/* {
          notesa.map((note, index) => (
            <div className="note">
              <h4>{note.title}</h4>
              <p>{note.description}</p>
              <div className='note-footer'>
                <div className='footer-date'>
                  <span>Date: </span><span> {note.date} </span>
                </div>
                <div className='footer-icons'>
                  <div className='note-foote-icons'>
                  <Link className="nav-link" to={`/viewnote/${note.id}`}><Button className="btnView" variant="primary" type="submit">See More ...</Button></Link> 
                <Link className="nav-link" to={`/editnotes/${note.id}`}><BiEdit size={25} color="#8e05aa" /></Link> {' '}
                    <RiDeleteBin5Fill size={25} color="#8e05aa" onClick={() => deleteNote(note.id)} />
                  </div>
                </div>
                
              </div>
              
            </div>
          ))
        } */}
      </div>










      {/* <div className='viewNote'>
<Modal
       size="lg"
       show={show}
       onHide={handleClose}
       backdrop="static"
       keyboard={false}
     >
       <Modal.Header className='modelHeader' closeButton>
         <Modal.Title><img src={Logo} alt='Logo' /> {note.title}</Modal.Title>
       </Modal.Header>
       <Modal.Body className='modelBody'>
         <div>{note.description}</div>
       </Modal.Body>
       <Modal.Footer>
         <div className="viewFormDate">
           <span><b>Last Modified: </b>{note.date}</span>
         </div>
         <div className="viewFormButtons">
           <Button variant="secondary" className='btnClose' onClick={handleClose}>Close</Button>
           <Button variant="danger" onClick={() => deleteNote(note.id)}> Delete</Button>
         </div>
       </Modal.Footer>
     </Modal>
   </div> */}
    </div>



  )

}
