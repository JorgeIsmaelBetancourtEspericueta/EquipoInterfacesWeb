import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Style/ProfileEditor.css"; // Importar el archivo CSS
import { Person, Email, Phone, School } from "@mui/icons-material"; // Importar los íconos de MUI

export default function ProfileEditor() {
  const [profile, setProfile] = useState({
    name: "Jorge Ismael",
    email: "jorge@example.com",
    phone: "123-456-7890",
    photo: "",
    career: "",
  });
  const [isEditing, setIsEditing] = useState(false);

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
      className="container mt-5 d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh", position: "relative", padding: 0 }}
    >
      {/* Contenedor del formulario */}
      <div className="card profile-card">
        <div className="card-body">
          <div className="mb-3 position-relative">
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

          {/* Fila de formulario con 2 columnas */}
          <div className="row mb-3">
            <div className="col-12 col-md-6 d-flex align-items-center">
              <label className="col-form-label text-white me-2">
                <Person /> {/* Ícono de Persona */}
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
                <Phone /> {/* Ícono de Teléfono */}
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
          </div>

          {/* Fila de formulario con 2 columnas */}
          <div className="row mb-3">
            <div className="col-12 col-md-6 d-flex align-items-center">
              <label className="col-form-label text-white me-2">
                <Email /> {/* Ícono de Correo */}
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

            <div className="col-12 col-md-6 d-flex align-items-center">
              <label className="col-form-label text-white me-2">
                <School /> {/* Ícono de Carrera */}
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
            className="btn profile-btn w-100"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? "Guardar" : "Editar"}
          </button>
        </div>
      </div>
    </div>
  );
}
