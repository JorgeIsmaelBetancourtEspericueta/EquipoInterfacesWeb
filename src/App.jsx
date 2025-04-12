import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import About from "./Components/About";
import Work from "./Components/Work";
import Testimonial from "./Components/Testimonial";
import Contact from "./Components/Contact";
import Footer from "./Components/Footer";
import Login from "./Components/Login";
import Resena from "./Components/Resena";
import Navbar from "./Components/Navbar";
import Carrusel from "./Components/Carrusel";
import ProfileEditor from "./Components/ProfileEditor";
import "./app.css";

function App() {
  return (
    <Router>
      <Navbar /> {/* Mantiene la barra de navegación en todas las páginas */}
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
        <Route path="/login" element={<Login />} />
        <Route path="/Resena/:category?" element={<Resena />} />
        <Route path="/profileEditor" element={<ProfileEditor />} />
        <Route path="/Carrusel" element={<Carrusel />} />{" "}
        {/* Cambiado de component a element */}
      </Routes>
    </Router>
  );
}

export default App;
