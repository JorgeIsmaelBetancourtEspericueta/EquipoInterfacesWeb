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
} from "@mui/icons-material"; // Iconos de Material UI utilizados en los campos del formulario
import { Link } from "react-router-dom";

export default function ProfileEditor() {
  const [profile, setProfile] = useState(() => {
    const savedProfile = localStorage.getItem("userProfile");
    return savedProfile
      ? JSON.parse(savedProfile)
      : {
        name: "Jesús Ismael",
        email: "jesus@gmail.com",
        phone: "123-456-7890",
        photo: "",
        career: "",
      };
  });
  const [isEditing, setIsEditing] = useState(false); // Controla si se está editando el perfil.
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
  }; //Actualiza los valores del perfil conforme el usuario escribe en los campos del formulario.

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile((prev) => ({ ...prev, photo: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  }; //Carga una imagen local y la convierte a base64 para guardarla en el estado.

  // const handleEditToggle = () => {
  //   if (isEditing) {
  //     // Aquí podrías agregar lógica para guardar en base de datos
  //     console.log("Perfil guardado:", profile);
  //   }
  //   setIsEditing(!isEditing);
  // };

  const handleEditToggle = () => {
    if (isEditing) {
      localStorage.setItem("userProfile", JSON.stringify(profile));
      console.log("Perfil guardado:", profile);
      window.location.reload();
    }
    setIsEditing(!isEditing);
  }; //Guarda los cambios en localStorage y recarga la página al desactivar la edición.

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
          {/* Sección de Información del Usuario */}
          <div className="col-md-8">
            <div className="card-body">
              <div className="mb-3 position-relative text-center">
                <img
                  src={profile.photo || "https://cdn-icons-png.freepik.com/512/4519/4519729.png"}
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
                onClick={handleEditToggle}
              >
                {isEditing ? "Guardar" : "Editar"}
              </button>
            </div>
          </div>

          {/* Sección de Favoritos */}
          <div className="col-md-4 border-start">
            <div className="card-body d-flex flex-column justify-content-center align-items-center">
              <h5 className="text-center text-white mb-3">
                <Favorite className="me-2" /> Mis Favoritos
              </h5>

              {favorites.length === 0 ? (
                <div className="text-center text-white">
                  <Restaurant className="fs-1 mb-3" />
                  <p>No hay lugares cargados</p>
                  <Link to="/resena" className="btn btn-link text-white">
                    Explorar lugares
                  </Link>
                </div>
              ) : (
                <ul className="list-group w-100">
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
