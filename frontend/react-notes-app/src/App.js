import { Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import AddNotes from './pages/addNotes/AddNotes';
import MyNotes from './pages/myNotes/MyNotes';
import './App.css';
import Login from './pages/login/Login';
import EditNotes from './pages/editNotes/EditNotes';
import ViewNote from './pages/viewNote/ViewNote';
import SignUp from './pages/signUp/SignUp';
// import Test from './pages/myNotes/Test';


function App() {
  return (
    <div className="App">
        
        <Routes>
          <Route exact path='/' element={<Login/>}></Route>
          {/* <Route exact path='/' element={<Test/>}></Route> */}
          <Route exact path='/save' element={<SignUp/>}></Route>
          <Route exact path='/home' element={<Home/>}></Route>
          <Route exact path='/addnotes' element={<AddNotes/>}></Route>
          <Route exact path='/mynotes' element={<MyNotes/>}></Route>
          <Route exact path='/editnotes/:id' element={<EditNotes/>}></Route>
          <Route exact path='/viewnote/:id' element={<ViewNote/>}></Route> 
        </Routes>
    </div>
  );
}

export default App;

