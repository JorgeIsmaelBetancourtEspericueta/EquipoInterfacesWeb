import { useState, useEffect } from "react";
import { FaSearch, FaHeart } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Resena() {
  const { category } = useParams();

  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("Todas");
  const [showModal, setShowModal] = useState(false);
  const [newPlace, setNewPlace] = useState({
    title: "",
    description: "",
    images: [""],
    category: "Local",
    address: "",
    phone: "",
    hours: "",
  });
  const [likedCards, setLikedCards] = useState({});
  const [cards, setCards] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [message, setMessage] = useState("");
  const [editId, setEditId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [placeToDelete, setPlaceToDelete] = useState(null);
  // Estados para horario de apertura y cierre
  const [horaInicio, setHoraInicio] = useState("");
  const [horaFin, setHoraFin] = useState("");

  // OBTENER LUGARES DESDE API GRAPHQL
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
        const lugaresRaw = json.data?.getLugares || [];
        const lugares = lugaresRaw
          .filter((l) => l !== null && typeof l === "object" && l.id)
          .map((l) => ({
            id: l.id,
            title: l.Titulo,
            description: l.Descripcion,
            images: l.UrlImgList || [],
            category: l.categoria,
            address: l.address || "",
            phone: l.phone || "",
            hours: l.hours || "",
          }));
        setCards(lugares);
      } catch (err) {
        console.error("Error al obtener los lugares:", err);
      }
    };

    fetchLugares();
  }, []);

  useEffect(() => {
    if (category && ["Emprendedores", "Local", "Externo"].includes(category)) {
      setFilter(category);
    } else {
      setFilter("Todas");
    }
  }, [category]);

  const handleSearchChange = (e) => setSearchTerm(e.target.value);
  const handleFilterChange = (cat) => setFilter(cat);
  const handleModalToggle = () => setShowModal(!showModal);

  const handleFormChange = (e) => {
    if (e.target.name.startsWith("image-")) {
      const index = parseInt(e.target.name.split("-")[1], 10);
      const newImages = [...newPlace.images];
      newImages[index] = e.target.value;
      setNewPlace({ ...newPlace, images: newImages });
      setPreviewImages(newImages);
    } else {
      setNewPlace({ ...newPlace, [e.target.name]: e.target.value });
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const mutation = editId
      ? `
    mutation UpdateLugar(
      $id: ID!
      $Titulo: String!
      $Descripcion: String!
      $UrlImgList: [String!]!
      $categoria: String!
      $address: String
      $phone: String
      $hours: String
    ) {
      updateLugar(
        id: $id
        Titulo: $Titulo
        Descripcion: $Descripcion
        UrlImgList: $UrlImgList
        categoria: $categoria
        address: $address
        phone: $phone
        hours: $hours
      ) {
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
    `
      : `
      mutation CreateLugar(
        $Titulo: String!
        $Descripcion: String!
        $UrlImgList: [String!]!
        $categoria: String!
        $address: String
        $phone: String
        $hours: String
      ) {
        createLugar(
          Titulo: $Titulo
          Descripcion: $Descripcion
          UrlImgList: $UrlImgList
          categoria: $categoria
          address: $address
          phone: $phone
          hours: $hours
        ) {
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
    `;

    const variables = {
      ...(editId && { id: editId }),
      Titulo: newPlace.title,
      Descripcion: newPlace.description,
      UrlImgList: newPlace.images,
      categoria: newPlace.category,
      address: newPlace.address,
      phone: newPlace.phone,
      hours: newPlace.hours,
    };

    try {
      const res = await fetch("https://api-lugares-ygbm.onrender.com/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: mutation, variables }),
      });

      const json = await res.json();

      if (json.errors) {
        console.error("Errores de GraphQL:", json.errors);
        throw new Error("Error en la petición GraphQL");
      }

      if (editId) {
        const actualizado = json.data.updateLugar;
        setCards(
          cards.map((c) =>
            c.id === editId
              ? {
                  id: actualizado.id,
                  title: actualizado.Titulo,
                  description: actualizado.Descripcion,
                  images: actualizado.UrlImgList,
                  category: actualizado.categoria,
                  address: actualizado.address,
                  phone: actualizado.phone,
                  hours: actualizado.hours,
                }
              : c
          )
        );
      } else {
        const nuevo = json.data.createLugar;
        setCards([
          ...cards,
          {
            id: nuevo.id,
            title: nuevo.Titulo,
            description: nuevo.Descripcion,
            images: nuevo.UrlImgList,
            category: nuevo.categoria,
            address: nuevo.address,
            phone: nuevo.phone,
            hours: nuevo.hours,
          },
        ]);
      }

      setNewPlace({
        title: "",
        description: "",
        images: [""],
        category: "Local",
        address: "",
        phone: "",
        hours: "",
      });
      setPreviewImages([]);
      setShowModal(false);
      setEditId(null);
      setMessage(editId ? "¡Lugar actualizado correctamente!" : "¡Lugar guardado exitosamente!");
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      console.error("Error al guardar:", error);
      setMessage("Error al guardar el lugar.");
    }
  };

  const handleEditLugar = (card) => {
    setNewPlace({
      title: card.title,
      description: card.description,
      images: card.images,
      category: card.category,
      address: card.address,
      phone: card.phone || "",
      hours: card.hours || "",
    });
    setPreviewImages(card.images);
    // Descomponer el horario en apertura y cierre
    const [horaInicioTmp, horaFinTmp] = (card.hours || "").split(" - ");
    setHoraInicio(horaInicioTmp || "");
    setHoraFin(horaFinTmp || "");
    setShowModal(true);
    setEditId(card.id);
  };

  const confirmDeleteLugar = (id) => {
    setPlaceToDelete(id);
    setShowDeleteModal(true);
  };

  const performDeleteLugar = async () => {
    const query = `
      mutation DeleteLugar($id: ID!) {
        deleteLugar(id: $id)
      }
    `;

    try {
      const res = await fetch("https://api-lugares-ygbm.onrender.com/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, variables: { id: placeToDelete } }),
      });

      const json = await res.json();
      if (json.errors) {
        console.error("Error de GraphQL al eliminar:", json.errors);
        return;
      }

      setCards(cards.filter((c) => c.id !== placeToDelete));
      setMessage("¡Lugar eliminado correctamente!");
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      console.error("Error al eliminar:", error);
    }

    setShowDeleteModal(false);
    setPlaceToDelete(null);
  };

  const toggleLike = (id) => {
    setLikedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredCards = cards
    .filter((card) =>
      card.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((card) => filter === "Todas" || card.category === filter);

  return (
    <div className="container py-2">
      <div style={{ marginTop: "6rem" }} className="mb-3 d-flex align-items-center gap-3">
        <input
          type="text"
          className="form-control "
          placeholder="Buscar..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <FaSearch />
      </div>

      <div className="d-flex justify-content-center mb-3">
        <div className="btn-group">
          {["Emprendedores", "Local", "Externo", "Todas"].map((cat) => (
            <button
              key={cat}
              className={`btn btn-outline-primary ${filter === cat ? "active" : ""}`}
              onClick={() => handleFilterChange(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-3">
        <button className="btn btn-success" onClick={handleModalToggle}>
          Añadir Nuevo Lugar
        </button>
      </div>

      {/* MODAL Bootstrap con estilos personalizados */}
      {showModal && (
        <>
          <div
            className="modal-backdrop show"
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              backgroundColor: "rgba(0,0,0,0.5)",
              backdropFilter: "blur(30px)",
              zIndex: 1040
            }}
          ></div>
          <div className="modal show d-block" tabIndex="-1" style={{ zIndex: 1050 }}>
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
              <div className="modal-content" style={{ maxHeight: "90vh", overflowY: "auto" }}>
            <form onSubmit={handleFormSubmit}>
              <div className="modal-header position-relative border-0">
                <h5 className="modal-title">{editId ? "Actualizar lugar" : "Agregar nuevo lugar"}</h5>
                <button
                  type="button"
                  className="btn-close position-absolute"
                  style={{ top: "1rem", right: "-5rem", transform: "scale(1.5)" }}
                  onClick={handleModalToggle}
                  aria-label="Close"
                ></button>
              </div>

              <div className="modal-body pt-0">
                <hr />

                <div className="mb-0">
                  <label className="form-label">Título</label>
                  <input
                    type="text"
                    placeholder="Por favor ingrese el titulo"
                    className="form-control form-control-lg shadow-sm"
                    name="title"
                    value={newPlace.title}
                    onChange={handleFormChange}
                    required
                  />
                </div>

                <div className="mb-1">
                  <label className="form-label">Descripción</label>
                  <textarea
                    className="form-control form-control-lg shadow-sm"
                    name="description"
                    placeholder="Por favor ingrese la descripcion"
                    rows="3"
                    value={newPlace.description}
                    onChange={handleFormChange}
                    required
                  />
                </div>

                <div className="row mb-4">
                  <div className="col-md-6">
                    <label className="form-label">URLs de Imágenes</label>
                    {newPlace.images.map((img, index) => (
                      <div key={index} className="d-flex align-items-center mb-2">
                        <input
                          type="text"
                          className="form-control form-control-lg shadow-sm me-2"
                          placeholder={`Imagen #${index + 1}`}
                          name={`image-${index}`}
                          value={img}
                          onChange={handleFormChange}
                          required
                        />
                        <button
                          type="button"
                          className="btn btn-sm btn-danger px-2 py-1"
                          onClick={() => {
                            const newImages = newPlace.images.filter((_, i) => i !== index);
                            setNewPlace({ ...newPlace, images: newImages });
                            setPreviewImages(newImages);
                          }}
                        >
                          🗑️
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-secondary mb-2 small"
                      onClick={() =>
                        setNewPlace({ ...newPlace, images: [...newPlace.images, ""] })
                      }
                    >
                      Añadir otra imagen
                    </button>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Categoría</label>
                    <select
                      className="form-select form-select-lg shadow-sm"
                      name="category"
                      value={newPlace.category}
                      onChange={handleFormChange}
                    >
                      <option value="Emprendedores">Emprendedores</option>
                      <option value="Local">Local</option>
                      <option value="Externo">Externo</option>
                    </select>
                  </div>
                </div>

                {/* Nuevos campos */}
                <div className="row mb-4">
                  <div className="col-md-6">
                    <label className="form-label">Dirección</label>
                    <input
                      type="text"
                      className="form-control form-control-lg shadow-sm"
                      name="address"
                      value={newPlace.address}
                      onChange={handleFormChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Teléfono</label>
                    <input
                      type="text"
                      className="form-control form-control-lg shadow-sm"
                      name="phone"
                      value={newPlace.phone}
                      onChange={handleFormChange}
                      required
                    />
                  </div>
                </div>

                {/* Horario bonito */}
                <div className="row mb-4">
                  <label className="form-label">Horario</label>
                  <div className="col-md-6">
                    <input
                      type="time"
                      className="form-control form-control-lg shadow-sm"
                      placeholder="Hora de apertura"
                      value={horaInicio}
                      onChange={(e) => {
                        setHoraInicio(e.target.value);
                        setNewPlace({
                          ...newPlace,
                          hours: `${e.target.value} - ${horaFin}`,
                        });
                      }}
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="time"
                      className="form-control form-control-lg shadow-sm"
                      placeholder="Hora de cierre"
                      value={horaFin}
                      onChange={(e) => {
                        setHoraFin(e.target.value);
                        setNewPlace({
                          ...newPlace,
                          hours: `${horaInicio} - ${e.target.value}`,
                        });
                      }}
                    />
                  </div>
                </div>

                {/* Carga de imágenes */}
                <div className="mb-4">
                  <label className="form-label">Cargar imágenes desde tu equipo</label>
                  <input
                    type="file"
                    className="form-control"
                    accept="image/*"
                    multiple
                    onChange={(e) => {
                      const files = Array.from(e.target.files);
                      const urls = files.map((file) => URL.createObjectURL(file));
                      setPreviewImages(urls);
                      setNewPlace({ ...newPlace, images: urls });
                    }}
                  />
                </div>

                {previewImages.length > 0 && (
                  <div className="mb-4 d-flex flex-wrap gap-3">
                    {previewImages.map((src, index) => (
                      <img
                        key={index}
                        src={src}
                        alt={`Preview ${index}`}
                        style={{
                          width: "120px",
                          height: "100px",
                          objectFit: "cover",
                          borderRadius: "0.5rem",
                        }}
                      />
                    ))}
                  </div>
                )}
                <hr />
              </div>

              <div className="modal-footer d-flex justify-content-end gap-2 border-0 pt-0">
                <button type="submit" className="btn btn-warning btn-lg text-white">
                  {editId ? "Actualizar" : "Agregar"}
                </button>
                <button
                  type="button"
                  className="btn btn-outline-warning btn-lg"
                  onClick={handleModalToggle}
                >
                  Cancelar
                </button>
              </div>
            </form>

                
              </div>
            </div>
          </div>
        </>
      )}

      {message && (
        <div className="alert alert-success text-center" role="alert">
          {message}
        </div>
      )}

      {showDeleteModal && (
        <>
          <div className="modal-backdrop show" style={{ zIndex: 1040 }}></div>
          <div className="modal show d-block" style={{ zIndex: 1050 }}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content border-danger">
                <div className="modal-header bg-danger text-white">
                  <h5 className="modal-title">¿Estás seguro?</h5>
                  <button className="btn-close" onClick={() => setShowDeleteModal(false)}></button>
                </div>
                <div className="modal-body text-center">
                  <p className="fw-bold text-danger">⚠️ Esta acción eliminará el lugar permanentemente.</p>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" onClick={() => setShowDeleteModal(false)}>
                    Cancelar
                  </button>
                  <button className="btn btn-danger" onClick={performDeleteLugar}>
                    Sí, eliminar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      <div className="row">
        {filteredCards.map((card) => (
          <div className="col-md-4 mb-4" key={card.id}>
            <div
              className="card h-100 shadow"
              style={{
                transform: "rotate(-4deg)",
                transition: "transform 0.3s ease-in-out",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "rotate(0deg)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "rotate(-4deg)";
              }}
            >
              <img
                src={card.images?.[0] || "https://via.placeholder.com/300x200?text=Sin+imagen"}
                alt={card.title}
                className="card-img-top"
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title">{card.title}</h5>
                <p className="card-text">{card.description}</p>
              </div>
              <div className="card-footer d-flex justify-content-between align-items-center">
                <div
                  className={`text-danger ${likedCards[card.id] ? "fw-bold" : ""}`}
                  style={{ cursor: "pointer", fontSize: "1.2rem" }}
                  onClick={() => toggleLike(card.id)}
                >
                  <FaHeart />
                </div>
                <div className="d-flex align-items-center gap-2">
                  <Link to={`/Carrusel/${card.id}`}>
                    <button className="btn btn-outline-primary btn-sm fw-bold px-3 py-2">
                      Ver más
                    </button>
                  </Link>
                  <button
                    className="btn btn-outline-warning btn-sm px-4 py-2"
                    onClick={() => handleEditLugar(card)}
                    title="Editar"
                  >
                    ✏️
                  </button>
                  <button
                    className="btn btn-outline-danger btn-sm px-4 py-2"
                    onClick={() => confirmDeleteLugar(card.id)}
                    title="Eliminar"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}