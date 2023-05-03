import React, { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import About from "./components/About";
import Alert from "./components/Alert";
import Home from "./components/Home";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Signup from "./components/Signup";
import NoteState from './context/notes/NoteState';
import ProtectedRoutes from "./components/ProtectedRoutes";

function App() {
  const [alert, setAlert] = useState(null);
 
  

  const showAlert = (message, type) => {
    setAlert({
      message: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };
 
  return (
    <NoteState>
    <div className="App">
      <Navbar />
      <Alert alert={alert}/>
      <div className="container">
        <Routes>
        <Route path="/"  element={<ProtectedRoutes Component={Home} />}></Route>
          <Route path="/about" exact element={<About />}></Route>
          <Route path="/login" exact element={<Login showAlert={showAlert} />}></Route>
          <Route path="/signup" exact element={<Signup showAlert={showAlert} />}></Route>
        </Routes>
      </div>
    </div>
    </NoteState>
  );
}

export default App;
