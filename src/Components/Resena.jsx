import { useState } from "react";
import "../Resena.css";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Resena() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const cards = [
    {
      id: 1,
      title: "Título de la Carta 1",
      description: "Una pequeña descripción de la carta. Lorem ipsum dolor sit amet.",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      title: "Título de la Carta 2",
      description: "Otra descripción pequeña de la carta. Con detalles breves.",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 3,
      title: "Título de la Carta 3",
      description: "Más detalles sobre esta carta. Un poco más de información.",
      image: "https://via.placeholder.com/150",
    },
  ];

  const filteredCards = cards.filter((card) =>
    card.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="resena-container">
      {/* Barra de búsqueda */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Buscar..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <FaSearch className="search-icon" />
      </div>

      {/* Contenedor de las cartas */}
      <div className="cards-container">
        {filteredCards.map((card) => (
          <div className="card" key={card.id}>
            <img src={card.image} alt={card.title} className="card-image" />
            <h3 className="card-title">{card.title}</h3>
            <p className="card-description">{card.description}</p>
            <Link to="/Carrusel">
              <button className="view-more-btn">Ver más</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}