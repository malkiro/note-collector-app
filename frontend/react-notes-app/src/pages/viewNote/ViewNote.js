import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './ViewNote.css'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Logo from '../../assets/notes_icon.png';
import NavigationBar from '../../components/navigationBar/NavigationBar';
import { IoMdDownload } from "react-icons/io";

function ViewNote() {
  const { id } = useParams()
  const imgURL = 'http://localhost:8080/noteapi/download';

  const [note, setNote] = useState({
    title: "",
    description: "",
    date: ""
  })

  useEffect(() => {
    loadNote();
  }, [])

  const downloadImage = (url) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = url.split('/').pop();
    link.target = '_blank'; // Add target="_blank" to open in new tab
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const loadNote = async () => {
    const result = await axios.get(`http://localhost:8080/noteapi/note/${id}`);
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
      <NavigationBar />
      <Card className='viewNote'>
        <Card.Header><img src={Logo} alt='Logo' /> {note.title}</Card.Header>
        <Card.Body>
          <Card.Text>
            <div className='descriptionSec'>{note.description}</div>
            <div className='imageSec'>
              {note.file_path && (
                <>
                  <img src={`${imgURL}/${note.file_path}`} alt="Note pic" />
                  <div>
                    <button className='btnImageDownload' onClick={() => downloadImage(`${imgURL}/${note.file_path}`)}>
                      <IoMdDownload size={20} color="#8e05aa" />
                      Download Image
                    </button>
                  </div>
                </>
              )}
            </div>
          </Card.Text>
          <Link className="nav-link" to={`/mynotes`}><Button variant="primary">Go Back to My Notes</Button></Link>
        </Card.Body>
        <Card.Footer className="text-muted">Added Date & Time: {formattedDate}</Card.Footer>
      </Card>
    </div>
  );
}

export default ViewNote;