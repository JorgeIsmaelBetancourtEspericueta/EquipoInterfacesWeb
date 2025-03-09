import { useState } from "react";
import { FaSearch, FaHeart } from "react-icons/fa"; 
import "../Resena.css";
import { Link } from "react-router-dom";

export default function Resena() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("Todas");
  const [showModal, setShowModal] = useState(false);
  const [newPlace, setNewPlace] = useState({
    title: "",
  });
  const [likedCards, setLikedCards] = useState({});

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (category) => {
    setFilter(category);
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
    console.log("Nuevo lugar:", newPlace);
    setShowModal(false); // Cerrar la ventana después de enviar
  };

  const toggleLike = (id) => {
    setLikedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const cards = [
    {
      id: 1,
      title: "Título de la Carta 1",
      description: "Una pequeña descripción de la carta. Lorem ipsum dolor sit amet.",
      image: "https://via.placeholder.com/150",
      category: "Local",
    },
    {
      id: 2,
      title: "Título de la Carta 2",
      description: "Otra descripción pequeña de la carta. Con detalles breves.",
      image: "https://via.placeholder.com/150",
      category: "Externo",
    },
    {
      id: 3,
      title: "Título de la Carta 3",
      description: "Más detalles sobre esta carta. Un poco más de información.",
      image: "https://via.placeholder.com/150",
      category: "Emprendedores",
    },
  ];

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
        <button className={filter === "Emprendedores" ? "active" : ""} onClick={() => handleFilterChange("Emprendedores")}>
          Emprendedores
        </button>
        <button className={filter === "Local" ? "active" : ""} onClick={() => handleFilterChange("Local")}>Local</button>
        <button className={filter === "Externo" ? "active" : ""} onClick={() => handleFilterChange("Externo")}>Externo</button>
        <button className={filter === "Todas" ? "active" : ""} onClick={() => handleFilterChange("Todas")}>Todas</button>
      </div>

      <button className="add-new-place-btn" onClick={handleModalToggle}>
        Añadir Nuevo Lugar
      </button>

      {/* Modal para agregar un nuevo lugar con solo un campo */}
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
              <button type="button" onClick={handleModalToggle}>Cerrar</button>
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
  <Link to="/Carrusel">
    <button className="view-more-btn">Ver más</button>
  </Link>
</div>


          </div>
        ))}
      </div>
    </div>
  );
}
