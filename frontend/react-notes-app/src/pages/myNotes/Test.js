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
import Logo from '../../assets/notes_icon.png';
import Modal from 'react-bootstrap/Modal';

export default function Test(props) {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <div className="myNotes">
      <Modal
        size="lg"
        show={props.show}
        // show={show}
        // onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header className='modelHeader' closeButton>
            <Modal.Title><img src={Logo} alt='Logo' /> {props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body className='modelBody'>
         {/* <div>{note.description}</div> */}
       </Modal.Body>
       <Modal.Footer>
         <div className="viewFormDate">
           {/* <span><b>Last Modified: </b>{note.date}</span> */}
         </div>
         <div className="viewFormButtons">
           <Button variant="secondary" className='btnClose' onClick={handleClose}>Close</Button>
           {/* <Button variant="danger"onClick={() => deleteNote(note.id)}> Delete</Button> */}
         </div>
       </Modal.Footer>
      </Modal>

    </div>



  )

}
