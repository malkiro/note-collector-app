import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import './Home.css';
import NavigationBar from '../../components/navigationBar/NavigationBar';


export default function Home() {
  const [greetText, setGreetText] = useState("");
  const currentDate = new Date();

  useEffect(() => {
    let currentHour = currentDate.getHours();
    if(currentHour < 12) setGreetText("Good Morning!")
    else if(currentHour < 18) setGreetText("Good Evening")
    else setGreetText("Good Evening!")
  }, []);

  return (
    <div className="backgoundImage">
      <NavigationBar/>
      <div className="introText">
      <div className='greetings'>
      <h1>Hello {greetText}</h1>
      </div>
      <h2>Welcome to our Learning Material Note Collector App! </h2>
      <h4>Our app is designed to help you easily create, edit, and organize all your notes in one place.</h4>
      <h4>Try it out today and transform the way you manage your notes!</h4>
      <Link className="nav-link home" to={"/addnotes"}><Button variant="success">GET STARTED HERE</Button></Link>
      </div>
    </div>
  )
}


