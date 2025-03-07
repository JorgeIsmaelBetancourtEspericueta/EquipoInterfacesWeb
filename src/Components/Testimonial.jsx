import devWeb from "../Assets/SOFTWARE.png";
import { AiFillStar } from "react-icons/ai";

const Testimonial = () => {
  return (
    <div className="work-section-wrapper" id="contacto">
      <div className="work-section-top">
        <p className="primary-subheading">¿Quiénes somos?</p>
        <p className="primary-text">
          Somos un equipo de desarrollo web, integrado por alumnos de ISC
        </p>
      </div>
      <div className="testimonial-section-bottom">
        <img src={devWeb} alt="" />
        <p>
          A través de nuestro enfoque en la calidad, la colaboración y la
          creatividad, nos aseguramos de ofrecer proyectos que superen las
          expectativas de nuestros clientes.
        </p>
        <div className="testimonials-stars-container">
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
        </div>
        <h2>#CalidadISCTec</h2>
      </div>
    </div>
  );
};

export default Testimonial;
