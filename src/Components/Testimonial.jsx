import devWeb from "../Assets/SOFTWARE.png"; // Importa la imagen de la sección "Quiénes somos".
import { AiFillStar } from "react-icons/ai"; // Importa el icono de estrella de la librería react-icons.

const Testimonial = () => {
  return (
    // Contenedor principal de la sección. El 'id="contacto"' podría usarse para navegación.
    <div className="work-section-wrapper" id="contacto">
      {/* Sección superior con el título y subtítulo. */}
      <div className="work-section-top">
        <p className="primary-subheading">¿Quiénes somos?</p>
        <p className="primary-text">
          Somos un equipo de desarrollo web, integrado por alumnos de ISC
        </p>
      </div>
      {/* Sección inferior con la imagen, descripción y estrellas. */}
      <div className="testimonial-section-bottom">
        <img src={devWeb} alt="" /> {/* Muestra la imagen importada. */}
        <p>
          A través de nuestro enfoque en la calidad, la colaboración y la
          creatividad, nos aseguramos de ofrecer proyectos que superen las
          expectativas de nuestros clientes.
        </p>
        {/* Contenedor para las estrellas de valoración. */}
        <div className="testimonials-stars-container">
          <AiFillStar /> {/* Icono de estrella. */}
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
        </div>
        <h2>#CalidadISCTec</h2> {/* Hashtag o eslogan. */}
      </div>
    </div>
  );
};

export default Testimonial; // Exporta el componente para su uso en otras partes de la aplicación.