import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Importamos useParams
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../Style/CarouselStyles.css";
import bandera from "../Assets/ubicacion.png";
import lugares from "../data/lugares.json";

function Carrusel() {
  const { id } = useParams(); // Obtenemos el parámetro 'id' de la URL
  const [activeIndex, setActiveIndex] = useState(0);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [rating, setRating] = useState(5);

  // Establecer el activeIndex al cargar el componente si 'id' está presente
  useEffect(() => {
    if (id) {
      const lugarIndex = lugares.findIndex(
        (lugar) => lugar.id === parseInt(id)
      );
      if (lugarIndex !== -1) {
        setActiveIndex(lugarIndex);
      }
    }
  }, [id]);

  const handleAddComment = () => {
    if (newComment.trim() !== "") {
      setComments([...comments, { text: newComment, rating }]);
      setNewComment("");
      setRating(5);
    }
  };

  const handleSlideChange = (index) => {
    setActiveIndex(index);
    setComments([]); // Limpia los comentarios si cambias de lugar
  };

  const lugarActual = lugares[activeIndex];

  return (
    <div className="container mt-4">
      {/* Carrusel */}
      <div
        id="carouselExampleIndicators"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators">
          {lugares.map((_, index) => (
            <button
              key={index}
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to={index}
              className={index === activeIndex ? "active" : ""}
              onClick={() => handleSlideChange(index)} // Cambio aquí
            ></button>
          ))}
        </div>
        <div className="carousel-inner">
          {lugarActual.carrusel.map((imagen, index) => (
            <div
              key={index}
              className={`carousel-item ${index === 0 ? "active" : ""}`}
            >
              <img
                className="d-block w-100"
                src={imagen}
                alt={`Slide ${index + 1}`}
              />
            </div>
          ))}
        </div>

        <a
          className="carousel-control-prev"
          href="#carouselExampleIndicators"
          role="button"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </a>
        <a
          className="carousel-control-next"
          href="#carouselExampleIndicators"
          role="button"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </a>
      </div>

      {/* Contenedor inferior */}
      <div className="content-container mt-4 p-4">
        <div className="row">
          {/* Descripción */}
          <div className="col-md-6 description text-start">
            <div className="image-container mb-3">
              <img
                src={lugarActual.image}
                alt="Imagen del lugar"
                className="img-fluid rounded-circle"
                style={{ width: "150px", height: "150px", objectFit: "cover" }}
              />
            </div>
            <h3>{lugarActual.title}</h3>
            <div className="user-info">
              <div className="row">
                <div className="col-md-6">
                  <p className="icon-text">
                    <img
                      src={bandera}
                      height="40px"
                      width="40px"
                      alt="Ubicación"
                    />
                    <strong>{lugarActual.address}</strong>
                  </p>
                  <p className="icon-text">
                    <img
                      height="40px"
                      width="40px"
                      src="https://img.icons8.com/ios-filled/512/FFFFFF/clock.png"
                      alt="Horario"
                    />
                    <strong>{lugarActual.hours}</strong>
                  </p>
                </div>
                <div className="col-md-6">
                  <p className="icon-text">
                    <img
                      height="40px"
                      width="40px"
                      src="https://img.icons8.com/ios-filled/512/FFFFFF/phone.png"
                      alt="Teléfono"
                    />
                    <strong>{lugarActual.phone}</strong>
                  </p>
                  <p className="icon-text">
                    <img
                      height="40px"
                      width="40px"
                      src="https://img.icons8.com/ios-filled/512/FFFFFF/star.png"
                      alt="Calificación"
                    />
                    <strong>{lugarActual.rating}</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Comentarios */}
          <div className="col-md-6 comments text-start">
            <h3>Comentarios</h3>
            <ul className="list-group">
              {comments.length === 0 ? (
                <li className="list-group-item">No hay comentarios aún.</li>
              ) : (
                comments.map((c, index) => (
                  <li key={index} className="list-group-item comment-item">
                    <div className="d-flex align-items-center">
                      <div className="stars-container d-flex me-2">
                        {[...Array(5)].map((_, i) => (
                          <img
                            key={i}
                            src={
                              i < c.rating
                                ? "https://img.icons8.com/ios-filled/50/FFD700/star.png"
                                : "https://img.icons8.com/ios/50/000000/star.png"
                            }
                            alt="Star"
                            style={{ width: "20px", height: "20px" }}
                          />
                        ))}
                      </div>
                      <img
                        src="https://www.w3schools.com/w3images/avatar2.png"
                        alt="Usuario"
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "50%",
                        }}
                      />
                    </div>
                    <div className="comment-text mt-2 ms-5">{c.text}</div>
                  </li>
                ))
              )}
            </ul>

            <div className="mt-3">
              <input
                type="text"
                className="form-control"
                placeholder="Añadir un comentario..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <div className="mt-2">
                <h5>Calificación:</h5>
                <div className="star-rating">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <img
                      key={num}
                      src={
                        num <= rating
                          ? "https://img.icons8.com/ios-filled/50/FFD700/star.png"
                          : "https://img.icons8.com/ios/50/000000/star.png"
                      }
                      alt="Star"
                      onClick={() => setRating(num)}
                      style={{
                        width: "20px",
                        height: "20px",
                        cursor: "pointer",
                      }}
                    />
                  ))}
                </div>
              </div>
              <button
                className="btn btn-primary mt-2"
                onClick={handleAddComment}
              >
                Enviar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Carrusel;
