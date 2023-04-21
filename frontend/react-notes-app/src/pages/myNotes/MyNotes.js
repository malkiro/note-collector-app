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



export default function MyNotes() {
  const { id } = useParams()
  const [notes, setNotes] = useState([]);
  const [searchText, setSearchText] = useState("");

  const [note, setNote] = useState({
    title: "",
    description: "",
    file_path: "",
    date: ""
  })

  useEffect(() => {
    loadNotes()
  }, []);

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

  const loadNotes = async () => {
    const result = await axios.get('http://localhost:8080/notes');
    setNotes(result.data);
  }


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
        axios.delete(`http://localhost:8080/note/${id}`)
          .then(function (response) {
            Swal.fire({
              title: 'Note Deleted Successfully',
              imageUrl: noteDelete,
              closeOnClickOutside: false,
            });
            loadNotes();
          })
          .catch(function (error) {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!',
            });
          });
      }
    });
  };


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



  return (
    <div className="myNotes">
      <NavigationBar />
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
      </div>
    </div>
  )
}
