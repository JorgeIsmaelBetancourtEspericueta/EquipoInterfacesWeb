import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../Style/CarouselStyles.css";
import bandera from "../Assets/ubicacion.png";

<img
  height="40px"
  width="40px"
  src={bandera}
  alt="Ubicación"
  className="icon"
/>;

function Carousel() {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [rating, setRating] = useState(5);

  const handleAddComment = () => {
    if (newComment.trim() !== "") {
      setComments([...comments, { text: newComment, rating }]);
      setNewComment("");
      setRating(5);
    }
  };

  return (
    <div className="container mt-4">
      {/* Carrusel */}
      <div
        id="carouselExampleIndicators"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <ol className="carousel-indicators">
          <li
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="0"
            className="active"
          ></li>
          <li
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="1"
          ></li>
          <li
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="2"
          ></li>
        </ol>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              className="d-block w-100"
              src="https://th.bing.com/th/id/OIP.3kcQIwVH2AgSdNsYsjmOKgHaEK?w=274&h=180&c=7&r=0&o=5&pid=1.7"
              alt="First slide"
            />
          </div>
          <div className="carousel-item">
            <img
              className="d-block w-100"
              src="https://static.wixstatic.com/media/d75652_57fdc5f55357453b9f7b4c90be826791~mv2.png/v1/fill/w_400,h_172,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/L42_Logo_Negro_PNG.png"
              alt="Second slide"
            />
          </div>
          <div className="carousel-item">
            <img
              className="d-block w-100"
              src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/03/f0/91/2f/el-quincho.jpg?w=600&h=-1&s=1"
              alt="Third slide"
            />
          </div>
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
            <h3>Descripción</h3>
            <div className="user-info">
              <div className="row">
                <div className="col-md-6">
                  <p className="icon-text">
                    <img
                      height="40px"
                      width="40px"
                      src={bandera}
                      alt="Ubicación"
                      className="icon"
                    />
                    <strong>Escobedo 199</strong>
                  </p>
                  <p className="icon-text">
                    <img
                      height="40px"
                      width="40px"
                      src="https://img.icons8.com/ios-filled/512/FFFFFF/clock.png"
                      alt="Horario"
                      className="icon"
                    />
                    <strong>9:00 AM - 8:00 PM</strong>
                  </p>
                </div>
                <div className="col-md-6">
                  <p className="icon-text">
                    <img
                      height="40px"
                      width="40px"
                      src="https://img.icons8.com/ios-filled/512/FFFFFF/phone.png"
                      alt="Teléfono"
                      className="icon"
                    />
                    <strong>+52 3891083922</strong>
                  </p>
                  <p className="icon-text">
                    <img
                      height="40px"
                      width="40px"
                      src="https://img.icons8.com/ios-filled/512/FFFFFF/star.png"
                      alt="Calificación"
                      className="icon"
                    />
                    <strong>4.5</strong>
                  </p>
                </div>
              </div>
            </div>
            <button className="btn btn-primary mt-3">Ver Menú</button>
          </div>
          {/* Sección de comentarios */}
          <div className="col-md-6 comments text-start">
            <h3>Comentarios</h3>
            <div className="comments-container">
              <ul className="list-group">
                {comments.length === 0 ? (
                  <li className="list-group-item">No hay comentarios aún.</li>
                ) : (
                  comments.map((c, index) => (
                    <li key={index} className="list-group-item comment-item">
                      {/* Contenedor de estrellas y foto en la misma línea */}
                      <div className="d-flex align-items-center">
                        {/* Contenedor de estrellas */}
                        <div
                          className="stars-container d-flex"
                          style={{ marginRight: "10px" }}
                        >
                          {[...Array(5)].map((_, i) => (
                            <img
                              key={i}
                              src={
                                i < c.rating
                                  ? "https://img.icons8.com/ios-filled/50/FFD700/star.png" // Estrella llena
                                  : "https://img.icons8.com/ios/50/000000/star.png" // Estrella vacía
                              }
                              alt="Star"
                              className="star-icon"
                              style={{ width: "20px", height: "20px" }} // Asegurando que las estrellas tengan un tamaño fijo
                            />
                          ))}
                        </div>
                        {/* Foto del usuario a la derecha */}
                        <img
                          src="https://www.w3schools.com/w3images/avatar2.png" // Imagen falsa de usuario
                          alt="Usuario"
                          className="user-photo"
                          style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "50%",
                          }}
                        />
                      </div>
                      {/* Texto del comentario debajo de las estrellas y foto */}
                      <div
                        className="comment-text mt-2"
                        style={{ marginLeft: "50px" }}
                      >
                        {c.text}
                      </div>
                    </li>
                  ))
                )}
              </ul>
            </div>

            {/* Formulario para agregar comentarios */}
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
                      className="star-icon"
                      style={{ width: "20px", height: "20px" }}
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

export default Carousel;
