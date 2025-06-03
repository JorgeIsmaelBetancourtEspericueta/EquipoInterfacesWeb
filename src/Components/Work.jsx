import { Link } from "react-router-dom"; // Importa el componente Link de React Router para la navegación.
import LogoIttepic from "../Assets/logoIttepic.png"; // Importa la imagen del logo del ITTepic.
import estudiante from "../Assets/estudiante.png"; // Importa la imagen de un estudiante.
import puesto from "../Assets/puestoCallejero.png"; // Importa la imagen de un puesto callejero.

const Work = () => {
  // Define un array de objetos con la información de las categorías de comida.
  const workInfoData = [
    {
      image: LogoIttepic, // Imagen para la categoría "Comida en el ITTepic".
      title: "Comida en el ITTepic", // Título de la categoría.
      text: "Descubre las opciones de comida dentro del campus con establecimientos confiables y accesibles.", // Descripción.
      link: "/Resena/Local", // Ruta a la que navegará el enlace.
    },
    {
      image: estudiante, // Imagen para la categoría "Emprendimientos Estudiantiles".
      title: "Emprendimientos Estudiantiles",
      text: "Prueba los platillos y snacks preparados por nuestros estudiantes emprendedores. ¡Apóyalos!",
      link: "/Resena/Emprendedores",
    },
    {
      image: puesto, // Imagen para la categoría "Opciones Cercanas".
      title: "Opciones Cercanas",
      text: "¿Quieres algo diferente? Explora restaurantes y puestos de comida cerca del Tec.",
      link: "/Resena/Externo",
    },
  ];

  return (
    // Contenedor principal de la sección "Work".
    <div className="work-section-wrapper">
      {/* Sección superior con el título principal y subtítulo. */}
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
      {/* Sección inferior donde se muestran las tarjetas de categoría. */}
      <div className="work-section-bottom">
        {/* Mapea 'workInfoData' para crear una tarjeta por cada elemento. */}
        {workInfoData.map((data) => (
          // Cada tarjeta es un Link que lleva a la ruta especificada en 'data.link'.
          <Link
            to={data.link}
            className="work-section-info" // Clase CSS para estilizar la tarjeta.
            key={data.title} // 'key' única para cada elemento mapeado, importante para React.
            style={{ textDecoration: "none", color: "inherit" }} // Estilos inline para quitar el subrayado del link y mantener el color del texto.
          >
            {/* Contenedor de la imagen de la tarjeta. */}
            <div className="info-boxes-img-container">
              <img
                src={data.image} // Fuente de la imagen.
                alt={data.title} // Texto alternativo para la imagen.
                className="w-[150px] h-[150px] object-cover" // Clases de Tailwind CSS para el tamaño y ajuste de la imagen.
              />
            </div>
            <h2>{data.title}</h2> {/* Título de la tarjeta. */}
            <p>{data.text}</p> {/* Texto descriptivo de la tarjeta. */}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Work; // Exporta el componente para ser usado en otras partes de la aplicación.
