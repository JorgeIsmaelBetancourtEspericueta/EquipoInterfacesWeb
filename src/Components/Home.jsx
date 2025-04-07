import { useNavigate } from "react-router-dom";
import BannerBackground from "../Assets/home-banner-background.png";
import BannerImage from "../Assets/home-banner-image.png";
import Navbar from "./Navbar";
import { FiArrowRight } from "react-icons/fi";
import { GiTigerHead } from "react-icons/gi";

const Home = () => {
  const navigate = useNavigate(); // Hook para navegación

  return (
    <div className="home-container">
      <Navbar />
      <div className="home-banner-container">
        <div className="home-bannerImage-container">
          <img src={BannerBackground} alt="Fondo Banner" />
        </div>
        <div className="home-text-section">
          <h1 className="primary-heading">
            Descubre los Mejores Lugares para Comer en el Tec de Tepic
            <GiTigerHead />
          </h1>
          <p className="primary-text">
            Encuentra, califica y recomienda los mejores restaurantes y puestos
            de comida dentro y alrededor del Instituto Tecnológico de Tepic.
            ¡Evita sorpresas y elige siempre lo mejor!
          </p>
          <button
            className="secondary-button"
            onClick={() => navigate("/resena")}
          >
            Explorar Lugares <FiArrowRight />
          </button>
        </div>
        <div className="home-image-section">
          <img src={BannerImage} alt="Imagen Restaurante" />
        </div>
      </div>
    </div>
  );
};

export default Home;
