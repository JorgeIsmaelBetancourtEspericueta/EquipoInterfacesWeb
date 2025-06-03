// Importación de hooks y dependencias necesarias para el componente
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Para obtener el parámetro "id" desde la URL
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../Style/CarouselStyles.css";
import bandera from "../Assets/ubicacion.png";

function Carrusel() {
  const { id } = useParams(); // Extrae el ID del lugar desde la URL
  const [activeIndex, setActiveIndex] = useState(0); // Índice del lugar actual
  const [comments, setComments] = useState([]); // Lista de comentarios del usuario
  const [newComment, setNewComment] = useState(""); // Comentario nuevo a agregar
  const [rating, setRating] = useState(5); // Calificación que se da al lugar
  const [lugares, setLugares] = useState([]); // Lista completa de lugares desde la API
  const [lugarActual, setLugarActual] = useState(null); // Detalles del lugar actualmente mostrado
  const [activeImageIndex, setActiveImageIndex] = useState(0); // Imagen activa dentro del carrusel del lugar

  // Al montar o cuando cambia el ID, se hace la petición para obtener todos los lugares
  useEffect(() => {
    const fetchLugares = async () => {
      try {
        const res = await fetch("https://api-lugares-ygbm.onrender.com/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query: `
              query {
                getLugares {
                  id
                  Titulo
                  Descripcion
                  UrlImgList
                  categoria
                  address
                  phone
                  hours
                }
              }
            `,
          }),
        });

        const json = await res.json();
        const lugaresFromApi = (json.data?.getLugares || [])
          .filter(Boolean)
          .map((lugar) => ({
            id: lugar.id,
            title: lugar.Titulo,
            description: lugar.Descripcion,
            images: lugar.UrlImgList,
            category: lugar.categoria,
            address: lugar.address,
            phone: lugar.phone,
            hours: lugar.hours,
          }));

        setLugares(lugaresFromApi);

        // Si hay un ID en la URL, se muestra ese lugar; si no, se muestra el primero
        if (id) {
          const index = lugaresFromApi.findIndex((l) => l.id === id);
          if (index !== -1) {
            setActiveIndex(index);
            setLugarActual(lugaresFromApi[index]);
            setActiveImageIndex(0);
          }
        } else if (lugaresFromApi.length > 0) {
          setLugarActual(lugaresFromApi[0]);
          setActiveImageIndex(0);
        }
      } catch (error) {
        console.error("Error al cargar los lugares:", error);
      }
    };

    fetchLugares();
  }, [id]);

  // Función para añadir un nuevo comentario con calificación
  const handleAddComment = () => {
    if (newComment.trim() !== "") {
      setComments([...comments, { text: newComment, rating }]);
      setNewComment("");
      setRating(5);
    }
  };

  // Cuando se cambia de lugar manualmente
  const handleSlideChange = (index) => {
    setActiveIndex(index);
    setLugarActual(lugares[index]);
    setComments([]);
    setActiveImageIndex(0);
  };

  // Mostrar mensaje de carga mientras se obtiene el lugar
  if (!lugarActual)
    return <div className="text-center mt-5">Cargando lugar...</div>;

  return (
    <div className="container mt-4">
      {/* Carrusel de imágenes del lugar actual */}
      <div
        id="carouselExampleIndicators"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        {/* Indicadores (puntos) del carrusel */}
        <div className="carousel-indicators">
          {lugarActual.images.map((_, index) => (
            <button
              key={index}
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to={index}
              className={index === activeImageIndex ? "active" : ""}
              onClick={() => setActiveImageIndex(index)}
            ></button>
          ))}
        </div>

        {/* Imágenes dentro del carrusel */}
        <div className="carousel-inner">
          {lugarActual.images.map((img, index) => (
            <div
              key={index}
              className={`carousel-item ${
                index === activeImageIndex ? "active" : ""
              }`}
            >
              <img
                className="d-block w-100"
                src={img}
                alt={`Imagen ${index + 1}`}
              />
            </div>
          ))}
        </div>

        {/* Controles de navegación del carrusel */}
        <button
          className="carousel-control-prev"
          onClick={() =>
            setActiveImageIndex(
              (activeImageIndex - 1 + lugarActual.images.length) %
                lugarActual.images.length
            )
          }
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          onClick={() =>
            setActiveImageIndex(
              (activeImageIndex + 1) % lugarActual.images.length
            )
          }
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* Información del lugar y sección de comentarios */}
      <div className="content-container mt-4 p-4">
        <div className="row">
          {/* Sección de descripción del lugar */}
          <div className="col-md-6 description text-start">
            <div className="image-container mb-3">
              <img
                src={lugarActual.images[0]}
                alt="Imagen destacada"
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

          {/* Sección de comentarios y formulario para añadir uno nuevo */}
          <div className="col-md-6 comments text-start">
            <h3>Comentarios</h3>
            <ul className="list-group">
              {comments.length === 0 ? (
                <li className="list-group-item">No hay comentarios aún.</li>
              ) : (
                comments.map((c, index) => (
                  <li key={index} className="list-group-item comment-item">
                    <div className="d-flex align-items-center">
                      {/* Estrellas según calificación */}
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

            {/* Formulario para añadir comentario */}
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
