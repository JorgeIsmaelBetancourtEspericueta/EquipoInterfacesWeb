import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from 'react'; 
import Home from "./Components/Home";
import About from "./Components/About";
import Work from "./Components/Work";
import Testimonial from "./Components/Testimonial";
import Footer from "./Components/Footer";
import Login from "./Components/Login";
import Resena from "./Components/Resena";
import Navbar from "./Components/Navbar";
import Carrusel from "./Components/Carrusel";
import ProfileEditor from "./Components/ProfileEditor";
import "./App.css";

function App() {
const [currentUser, setCurrentUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem("currentUser");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Error al parsear currentUser de localStorage:", error);
      return null;
    }
  });

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("currentUser"); 
    }
  }, [currentUser]);

  const handleLogin = (user) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    
  };


  return (
    <Router>
      <Navbar currentUser={currentUser} onLogout={handleLogout} />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Home />
              <Work />
              <About />
              <Testimonial />
              <Footer />
            </>
          }
        />
        <Route path="/Resena/:category?" element={<Resena />} />
        <Route path="/profileEditor" element={<ProfileEditor />} />
        <Route path="/Carrusel/:id" element={<Carrusel />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />

        {/* Cambiado de component a element */}
      </Routes>
    </Router>
  );
}

export default App;
