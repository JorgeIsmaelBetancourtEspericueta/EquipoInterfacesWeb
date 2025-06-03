import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Importa componentes de React Router para manejar la navegación.
import React, { useState, useEffect } from "react"; // Importa React, useState para el estado y useEffect para efectos secundarios.
import Home from "./Components/Home"; // Importa el componente Home.
import About from "./Components/About"; // Importa el componente About.
import Work from "./Components/Work"; // Importa el componente Work.
import Testimonial from "./Components/Testimonial"; // Importa el componente Testimonial.
import Footer from "./Components/Footer"; // Importa el componente Footer.
import Login from "./Components/Login"; // Importa el componente Login.
import Resena from "./Components/Resena"; // Importa el componente Resena.
import Navbar from "./Components/Navbar"; // Importa el componente Navbar.
import Carrusel from "./Components/Carrusel"; // Importa el componente Carrusel.
import ProfileEditor from "./Components/ProfileEditor"; // Importa el componente ProfileEditor.
import "./App.css"; // Importa los estilos CSS globales de la aplicación.

function App() {
  // Define el estado 'currentUser' para almacenar la información del usuario logueado.
  // Intenta cargar el usuario desde localStorage al inicio.
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem("currentUser");
      return storedUser ? JSON.parse(storedUser) : null; // Parsea si existe, si no, es null.
    } catch (error) {
      console.error("Error al parsear currentUser de localStorage:", error); // Manejo de errores si el parseo falla.
      return null;
    }
  });

  // Efecto que se ejecuta cada vez que 'currentUser' cambia.
  // Guarda el usuario en localStorage si existe, o lo elimina si es null (sesión cerrada).
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("currentUser");
    }
  }, [currentUser]); // Dependencia del efecto: se ejecuta cuando 'currentUser' cambia.

  // Función para manejar el inicio de sesión: establece el usuario actual.
  const handleLogin = (user) => {
    setCurrentUser(user);
  };

  // Función para manejar el cierre de sesión: establece el usuario actual a null.
  const handleLogout = () => {
    setCurrentUser(null);
  };

  return (
    // Configura React Router para la navegación.
    <Router>
      {/* Barra de navegación, visible en todas las rutas, pasando el usuario actual y la función de logout. */}
      <Navbar currentUser={currentUser} onLogout={handleLogout} />

      {/* Define las rutas de la aplicación. */}
      <Routes>
        {/* Ruta principal ('/'): Muestra una combinación de componentes de la página de inicio. */}
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
        {/* Ruta para reseñas, con un parámetro opcional 'category'. */}
        <Route path="/Resena/:category?" element={<Resena />} />
        {/* Ruta para el editor de perfil. */}
        <Route path="/profileEditor" element={<ProfileEditor />} />
        {/* Ruta para el carrusel, con un parámetro 'id'. */}
        <Route path="/Carrusel/:id" element={<Carrusel />} />
        {/* Ruta para la página de login, pasando la función 'handleLogin'. */}
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
      </Routes>
    </Router>
  );
}

export default App; // Exporta el componente principal de la aplicación.
