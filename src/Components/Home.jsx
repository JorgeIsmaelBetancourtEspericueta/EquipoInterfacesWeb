// Importa React Router para navegación, imágenes para el banner, el componente Navbar y algunos íconos
import { useNavigate } from "react-router-dom";
import BannerBackground from "../Assets/home-banner-background.png";
import BannerImage from "../Assets/home-banner-image.png";
import Navbar from "./Navbar";
import { FiArrowRight } from "react-icons/fi";
import { GiTigerHead } from "react-icons/gi";

const Home = () => {
  const navigate = useNavigate(); // Hook para manejar la navegación programática

  return (
    <div className="home-container">
      <Navbar /> {/* Barra de navegación en la parte superior */}
      <div className="home-banner-container">
        {/* Imagen de fondo para el banner */}
        <div className="home-bannerImage-container">
          <img src={BannerBackground} alt="Fondo Banner" />
        </div>

        {/* Sección de texto principal con título, descripción y botón */}
        <div className="home-text-section">
          <h1 className="primary-heading">
            Descubre los Mejores Lugares para Comer en el Tec de Tepic
            <GiTigerHead /> {/* Ícono decorativo */}
          </h1>
          <p className="primary-text">
            Encuentra, califica y recomienda los mejores restaurantes y puestos
            de comida dentro y alrededor del Instituto Tecnológico de Tepic.
            ¡Evita sorpresas y elige siempre lo mejor!
          </p>
          {/* Botón que al hacer clic navega a la página de reseñas */}
          <button
            className="secondary-button"
            onClick={() => navigate("/resena")}
          >
            Explorar Lugares <FiArrowRight /> {/* Ícono de flecha */}
          </button>
        </div>

        {/* Imagen ilustrativa del banner */}
        <div className="home-image-section">
          <img src={BannerImage} alt="Imagen Restaurante" />
        </div>
      </div>
    </div>
  );
};

export default Home; // Exporta el componente para usar en otras partes de la app
