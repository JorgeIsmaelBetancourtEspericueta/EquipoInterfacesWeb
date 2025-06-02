// En Login.jsx

import { useEffect, useState } from "react";
import "../Login.css"; // Esto está bien si Login.css está en src/
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import AlertDialog from './AlertDialog.jsx';
export default function Login({ onLogin }) {
  const navigate = useNavigate();

  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [signUpName, setSignUpName] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");

  // Estado para controlar la visibilidad y el contenido del modal AlertDialog
  const [alertDialog, setAlertDialog] = useState({
    isOpen: false, // Controla si el modal está visible
    title: "",     // Título del modal
    message: "",   // Mensaje del modal
    type: "",      // Tipo de mensaje ('success', 'error', 'info') para iconos/colores
    onConfirm: () => {}, // Función que se ejecuta cuando el usuario presiona OK
  });

  const [users, setUsers] = useState(() => {
    const storedUsers = localStorage.getItem("registeredUsers");
    return storedUsers ? JSON.parse(storedUsers) : [
      { email: "jesus@gmail.com", password: "123", name: "Chuyin" },
      { email: "admin@example.com", password: "adminpass", name: "Admin" },
    ];
  });

  useEffect(() => {
    localStorage.setItem("registeredUsers", JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    const container = document.getElementById("container");
    const registerBtn = document.getElementById("register");
    const loginBtn = document.getElementById("login");

    const handleRegisterClick = () => {
      container.classList.add("active");
      // Asegura que el modal se cierre si el usuario cambia de panel
      setAlertDialog({ ...alertDialog, isOpen: false });
    };

    const handleLoginClick = () => {
      container.classList.remove("active");
      // Asegura que el modal se cierre si el usuario cambia de panel
      setAlertDialog({ ...alertDialog, isOpen: false });
    };

    registerBtn.addEventListener("click", handleRegisterClick);
    loginBtn.addEventListener("click", handleLoginClick);

    return () => {
      registerBtn.removeEventListener("click", handleRegisterClick);
      loginBtn.removeEventListener("click", handleLoginClick);
    };
  }, [alertDialog]); // Dependencia necesaria sialertDialog se usa en los callbacks

  // Función para mostrar el AlertDialog
  const showAlertDialog = (title, message, type, callback = () => {}) => {
    setAlertDialog({
      isOpen: true,
      title,
      message,
      type,
      onConfirm: () => {
        setAlertDialog({ ...alertDialog, isOpen: false }); // Cierra el modal
        callback(); // Ejecuta cualquier acción de seguimiento (como la navegación)
      },
    });
  };

  const handleSignInSubmit = (e) => {
    e.preventDefault();
    const foundUser = users.find(
      (user) => user.email === signInEmail && user.password === signInPassword
    );

    if (foundUser) {
      showAlertDialog(
        "Inicio de Sesión Exitoso",
        `¡Bienvenido de nuevo, ${foundUser.name}!`,
        "success",
        () => { // Callback que se ejecuta cuando el usuario presiona OK
          onLogin(foundUser);
          navigate("/", { state: { user: foundUser } });
        }
      );
    } else {
      showAlertDialog(
        "Error de Inicio de Sesión",
        "Credenciales incorrectas. Por favor, inténtalo de nuevo.",
        "error"
      );
    }
  };

  const handleSignUpSubmit = (e) => {
    e.preventDefault();

    const emailExists = users.some(user => user.email === signUpEmail);
    if (emailExists) {
      showAlertDialog(
        "Error de Registro",
        "Este correo electrónico ya está registrado. Por favor, utiliza otro o inicia sesión.",
        "error"
      );
      return;
    }

    const newUser = {
      name: signUpName,
      email: signUpEmail,
      password: signUpPassword,
    };

    setUsers(prevUsers => [...prevUsers, newUser]);

    console.log("Nuevo usuario registrado:", newUser);

    showAlertDialog(
      "Registro Exitoso",
      `¡Gracias por registrarte, ${newUser.name}!`,
      "success",
      () => { // Callback que se ejecuta cuando el usuario presiona OK
        onLogin(newUser);
        // Podrías redirigir a la página principal o mantener en el login para que el usuario inicie sesión
        navigate("/login", { state: { user: newUser } });
      }
    );

    setSignUpName("");
    setSignUpEmail("");
    setSignUpPassword("");
  };

  return (
    <div className="login-page">
      {/* <--- Aquí se renderiza el componente AlertDialog como un modal --- > */}
      {alertDialog.isOpen && (
        <AlertDialog
          title={alertDialog.title}
          message={alertDialog.message}
          type={alertDialog.type}
          onConfirm={alertDialog.onConfirm}
        />
      )}

      <div className="container" id="container">
        <div className="form-container sign-in">
          <form onSubmit={handleSignInSubmit}>
            <h1>Iniciar Sesión</h1>
            <div className="input-container">
              <FaEnvelope className="icon" />
              <input
                type="email"
                placeholder="Correo Electrónico"
                value={signInEmail}
                onChange={(e) => setSignInEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-container">
              <FaLock className="icon" />
              <input
                type="password"
                placeholder="Contraseña"
                value={signInPassword}
                onChange={(e) => setSignInPassword(e.target.value)}
                required
              />
            </div>
            <a href="#">¿Olvidaste tu contraseña?</a>
            <button type="submit">Ingresar</button>
          </form>
        </div>

        <div className="form-container sign-up">
          <form onSubmit={handleSignUpSubmit}>
            <h1>Crear Cuenta</h1>
            <div className="input-container">
              <FaUser className="icon" />
              <input
                type="text"
                placeholder="Nombre"
                value={signUpName}
                onChange={(e) => setSignUpName(e.target.value)}
                required
              />
            </div>
            <div className="input-container">
              <FaEnvelope className="icon" />
              <input
                type="email"
                placeholder="Correo Electrónico"
                value={signUpEmail}
                onChange={(e) => setSignUpEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-container">
              <FaLock className="icon" />
              <input
                type="password"
                placeholder="Contraseña"
                value={signUpPassword}
                onChange={(e) => setSignUpPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit">Registrarse</button>
          </form>
        </div>

        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-left">
              <h1>¡Bienvenido de nuevo!</h1>
              <p>Si ya tienes una cuenta, inicia sesión aquí.</p>
              <button className="hidden" id="login">
                Iniciar Sesión
              </button>
            </div>
            <div className="toggle-panel toggle-right">
              <h1>¡Hola, bienvenid@!</h1>
              <p>Regístrate para acceder a todas las funciones del sitio.</p>
              <button className="hidden" id="register">
                Registrarse
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}