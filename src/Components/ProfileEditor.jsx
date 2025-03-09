import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Style/ProfileEditor.css";
import {
  Person,
  Email,
  Phone,
  School,
  Favorite,
  Restaurant,
} from "@mui/icons-material";
import { Link } from "react-router-dom"; // Asegúrate de tener react-router-dom instalado

export default function ProfileEditor() {
  const [profile, setProfile] = useState({
    name: "Jorge Ismael",
    email: "jorge@example.com",
    phone: "123-456-7890",
    photo: "",
    career: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [favorites, setFavorites] = useState([]);

  const careers = [
    "Arquitectura",
    "Ingeniería Bioquímica",
    "Ingeniería Civil",
    "Ingeniería Eléctrica",
    "Ingeniería en Gestión Empresarial",
    "Ingeniería en Sis. Computacionales",
    "Ingeniería Industrial",
    "Ingeniería Mecatrónica",
    "Ingeniería Química",
    "Licenciatura en Administración",
    "Ingeniería en Gestión Empresarial (No escolarizada)",
    "Maestría en Ciencias en Alimentos",
    "Doctorado en Ciencias en Alimentos",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile((prev) => ({ ...prev, photo: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      className="container-fluid mt-5 d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <div
        className="card profile-card w-75 p-4"
        style={{ maxWidth: "1200px" }}
      >
        <div className="row">
          {/* Sección de información del usuario */}
          <div className="col-md-8">
            <div className="card-body">
              <div className="mb-3 position-relative text-center">
                <img
                  src={profile.photo || "https://via.placeholder.com/150"}
                  alt="Foto de perfil"
                  className="rounded-circle profile-photo"
                />
                {isEditing && (
                  <input
                    type="file"
                    accept="image/*"
                    className="form-control mt-2"
                    onChange={handlePhotoChange}
                  />
                )}
              </div>

              <div className="row mb-3">
                {/* Columna 1: Nombre y Correo */}
                <div className="col-12 col-md-6 d-flex align-items-center">
                  <label className="col-form-label text-white me-2">
                    <Person />
                  </label>
                  <input
                    type="text"
                    className="form-control profile-input"
                    name="name"
                    value={profile.name}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>
                <div className="col-12 col-md-6 d-flex align-items-center">
                  <label className="col-form-label text-white me-2">
                    <Email />
                  </label>
                  <input
                    type="email"
                    className="form-control profile-input"
                    name="email"
                    value={profile.email}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>
              </div>

              <div className="row mb-3">
                {/* Columna 2: Teléfono y Carrera */}
                <div className="col-12 col-md-6 d-flex align-items-center">
                  <label className="col-form-label text-white me-2">
                    <Phone />
                  </label>
                  <input
                    type="text"
                    className="form-control profile-input"
                    name="phone"
                    value={profile.phone}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>
                <div className="col-12 col-md-6 d-flex align-items-center">
                  <label className="col-form-label text-white me-2">
                    <School />
                  </label>
                  <select
                    className="form-select profile-input"
                    name="career"
                    value={profile.career}
                    onChange={handleChange}
                    disabled={!isEditing}
                  >
                    <option value="">Seleccione una carrera</option>
                    {careers.map((career, index) => (
                      <option key={index} value={career}>
                        {career}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                className="btn profile-btn w-auto"
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? "Guardar" : "Editar"}
              </button>
            </div>
          </div>

          {/* Sección de Mis Favoritos */}
          <div className="col-md-4 border-start">
            <div className="card-body d-flex flex-column justify-content-center align-items-center">
              <h5 className="text-center text-white mb-3">
                <Favorite className="me-2" /> Mis Favoritos
              </h5>
              {favorites.length === 0 ? (
                <div className="text-center text-white d-flex flex-column justify-content-center align-items-center">
                  <Restaurant className="fs-1 mb-3" />
                  <p>No hay lugares cargados</p>
                  <Link to="/explorar" className="btn btn-link text-white">
                    Explorar lugares
                  </Link>
                </div>
              ) : (
                <ul className="list-group">
                  {favorites.map((fav, index) => (
                    <li key={index} className="list-group-item">
                      {fav}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
