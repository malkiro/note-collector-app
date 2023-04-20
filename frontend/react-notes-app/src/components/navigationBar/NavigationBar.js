import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import {AiFillHome} from "react-icons/ai";
import {BsPlusLg} from "react-icons/bs";
import {MdNoteAlt} from "react-icons/md";
import HeaderLogo from '../../assets/notes_icon.png';
import { Link } from 'react-router-dom';
import './NavigationBar.css';

export default function NavigationBar() {
  const currentDate = new Date();
  const day = currentDate.toLocaleDateString('defualt', {weekday: 'long'});
  const month = currentDate.toLocaleDateString('defualt', {month: 'long'});
  const date = `${day}, ${month} ${currentDate.getDate()}, ${currentDate.getFullYear()}`;


  return (
    <div>
         <Navbar bg="dark" variant="dark" expand="lg">
      <Container fluid>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
        <Navbar.Brand>
        <img src={HeaderLogo} 
        alt="Header_Logo" 
        width={'30px'} 
        style={{marginRight:'5px'}}/>
           {' '}
           <span>Learning Material Note Collector</span>
          </Navbar.Brand>

          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Link className="nav-link" to={"/home"}>
            <span className='flex align-center justify-center'>
            <AiFillHome size = {17} />
            </span>
             Home
            </Link>

            <Link className="nav-link" to={"/addnotes"}>
            <span className='flex align-center justify-center'>
              <BsPlusLg size = {17} />
            </span>
             Add Notes
            </Link>

            <Link className="nav-link" to={"/mynotes"}>
            <span className='flex align-center justify-center'>
              <MdNoteAlt size = {17} />
            </span>
              My Notes
            </Link>
          </Nav>
          <div className="headerRightWrapper">
      <div className='date'>
        <span className='text-uppercase fs-13 fw-4'>{date}</span>
      </div>
      <div className='logout'>
      <Link className="nav-link" to={"/"}><Button variant="outline-success">LOGOUT</Button></Link>
      </div>
      </div>
        </Navbar.Collapse> 
      </Container>
    </Navbar>
    </div>
  )
}
