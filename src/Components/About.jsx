// Importación de React y recursos (imágenes y un ícono)
import AboutBackground from "../Assets/about-background.png";
import AboutBackgroundImage from "../Assets/about-background-image.png";
import { BsFillPlayCircleFill } from "react-icons/bs";

// Componente funcional que muestra la sección "Acerca de"
const About = () => {
  return (
    // Contenedor principal con id para navegación
    <div className="about-section-container" id="about">
      {/* Imagen de fondo decorativa */}
      <div className="about-background-image-container">
        <img src={AboutBackground} alt="" />
      </div>

      {/* Imagen representativa al lado del texto */}
      <div className="about-section-image-container">
        <img src={AboutBackgroundImage} alt="" />
      </div>

      {/* Contenedor del texto descriptivo */}
      <div className="about-section-text-container">
        <p className="primary-subheading">Misión</p>

        {/* Título principal con una frase llamativa */}
        <h1 className="primary-heading">
          Comer es una necesidad, pero comer de forma inteligente es un arte
        </h1>

        {/* Párrafo informativo sobre la importancia de una buena alimentación */}
        <p className="primary-text">
          Mantener una alimentación saludable es fundamental para el bienestar
          físico y mental. Consumir una dieta equilibrada ayuda a prevenir
          enfermedades y mejorar la calidad de vida. Una nutrición adecuada
          proporciona energía para las actividades diarias; la concentración, el
          rendimiento académico y el bienestar emocional.
        </p>

        {/* Botones de acción: uno para abrir un artículo y otro para ver un video */}
        <div className="about-buttons-container">
          <button
            className="secondary-button"
            onClick={() =>
              window.open(
                "https://www.gob.mx/promosalud/articulos/que-es-la-alimentacion-saludable?idiom=es"
              )
            }
          >
            Aprender más
          </button>

          <button
            className="watch-video-button"
            onClick={() =>
              window.open(
                "https://www.youtube.com/watch?v=z9ov3C7XM3o&ab_channel=VentanillaDeSalud"
              )
            }
          >
            <BsFillPlayCircleFill /> Alimentación Saludable
          </button>
        </div>
      </div>
    </div>
  );
};

export default About; // Exportación del componente para su uso en otras partes de la app
