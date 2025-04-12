import { useState, useEffect } from "react";
import { FaSearch, FaHeart } from "react-icons/fa";
import { Link, useParams } from "react-router-dom"; // ← import useParams
import "../Resena.css";
import lugaresData from "../data/lugares.json";

export default function Resena() {
  const { category } = useParams(); // ← obtener categoría desde URL

  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("Todas");
  const [showModal, setShowModal] = useState(false);
  const [newPlace, setNewPlace] = useState({ title: "" });
  const [likedCards, setLikedCards] = useState({});
  const [cards, setCards] = useState([]);

  useEffect(() => {
    setCards(lugaresData);
  }, []);

  useEffect(() => {
    // Validar y aplicar categoría desde la URL
    if (category && ["Emprendedores", "Local", "Externo"].includes(category)) {
      setFilter(category);
    } else {
      setFilter("Todas");
    }
  }, [category]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (cat) => {
    setFilter(cat);
  };

  const handleModalToggle = () => {
    setShowModal(!showModal);
  };

  const handleFormChange = (e) => {
    setNewPlace({
      ...newPlace,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const nuevo = {
      id: cards.length + 1,
      title: newPlace.title,
      description: "Descripción por defecto.",
      image: "https://via.placeholder.com/150",
      category: "Local",
    };
    setCards([...cards, nuevo]);
    setNewPlace({ title: "" });
    setShowModal(false);
  };

  const toggleLike = (id) => {
    setLikedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const filteredCards = cards
    .filter((card) =>
      card.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((card) => filter === "Todas" || card.category === filter);

  return (
    <div className="resena-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Buscar..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <FaSearch className="search-icon" />
      </div>

      <div className="filter-buttons">
        {["Emprendedores", "Local", "Externo", "Todas"].map((cat) => (
          <button
            key={cat}
            className={filter === cat ? "active" : ""}
            onClick={() => handleFilterChange(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <button className="add-new-place-btn" onClick={handleModalToggle}>
        Añadir Nuevo Lugar
      </button>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>¡Advertencia!</h2>
            <p>Para añadir un lugar, primero ingrese el título.</p>
            <form onSubmit={handleFormSubmit}>
              <div>
                <label htmlFor="title">Título</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={newPlace.title}
                  onChange={handleFormChange}
                  required
                />
              </div>
              <button type="submit">Agregar</button>
              <button type="button" onClick={handleModalToggle}>
                Cerrar
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="cards-container">
        {filteredCards.map((card) => (
          <div className="card" key={card.id}>
            <img src={card.image} alt={card.title} className="card-image" />
            <h3 className="card-title">{card.title}</h3>
            <p className="card-description">{card.description}</p>
            <div className="card-actions">
              <div
                className={`like-icon ${likedCards[card.id] ? "liked" : ""}`}
                onClick={() => toggleLike(card.id)}
              >
                <FaHeart className="heart-icon" />
              </div>
              <Link to={`/Carrusel/${card.id}`}>
                <button className="view-more-btn">Ver más</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
