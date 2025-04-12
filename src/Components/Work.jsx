import { Link } from "react-router-dom"; // Importa Link
import LogoIttepic from "../Assets/logoIttepic.png";
import estudiante from "../Assets/estudiante.png";
import puesto from "../Assets/puestoCallejero.png";

const Work = () => {
  const workInfoData = [
    {
      image: LogoIttepic,
      title: "Comida en el ITTepic",
      text: "Descubre las opciones de comida dentro del campus con establecimientos confiables y accesibles.",
      link: "/Resena/Local",
    },
    {
      image: estudiante,
      title: "Emprendimientos Estudiantiles",
      text: "Prueba los platillos y snacks preparados por nuestros estudiantes emprendedores. ¡Apóyalos!",
      link: "/Resena/Emprendedores",
    },
    {
      image: puesto,
      title: "Opciones Cercanas",
      text: "¿Quieres algo diferente? Explora restaurantes y puestos de comida cerca del Tec.",
      link: "/Resena/Externo",
    },
  ];

  return (
    <div className="work-section-wrapper">
      <div className="work-section-top">
        <p className="primary-subheading">Categorías</p>
        <h1 className="primary-heading">
          Encuentra lugares por tipo de vendedores
        </h1>
        <p className="primary-text">
          Deja tu opinión y ayuda a la comunidad del Tec a encontrar los mejores
          lugares.
        </p>
      </div>
      <div className="work-section-bottom">
        {workInfoData.map((data) => (
          <Link
            to={data.link}
            className="work-section-info"
            key={data.title}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div className="info-boxes-img-container">
              <img
                src={data.image}
                alt={data.title}
                className="w-[150px] h-[150px] object-cover"
              />
            </div>
            <h2>{data.title}</h2>
            <p>{data.text}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Work;
