import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './ViewNote.css'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Logo from '../../assets/notes_icon.png';
import NavigationBar from '../../components/navigationBar/NavigationBar';

function ViewNote() {
  const imgURL = 'http://localhost:8080';

    const [note, setNote] = useState({
        title:"",
        description:"",
        date:""
      })

      const {id} = useParams()
    
      useEffect(()=>{
        loadNote();
      }, [])
    
      const loadNote = async () => {
        const result = await axios.get(`http://localhost:8080/note/${id}`);
        setNote(result.data);
      }

      // Convert the date string to a Date object
  const date = new Date(note.date);

  // Format the date using toLocaleString()
  const formattedDate = date.toLocaleString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  return (
    <div>
      <NavigationBar/>
    <Card className='viewNote'>
      <Card.Header><img src={Logo} alt='Logo' /> {note.title}</Card.Header>
      <Card.Body>
        <Card.Text>
          {note.description}
          {note.file_path ? (
            <img src={`${imgURL}/${note.file_path}`} alt="Note pic" />
          ) : null}
        </Card.Text>
        {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
        <Link className="nav-link" to={`/mynotes`}><Button variant="primary">Go Back to My Notes</Button></Link>
      </Card.Body>
      <Card.Footer className="text-muted">Added Date & Time: {formattedDate}</Card.Footer>
    </Card>
    </div>
  );
}

export default ViewNote;