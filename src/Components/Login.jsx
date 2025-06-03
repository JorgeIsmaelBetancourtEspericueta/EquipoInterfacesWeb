// Importación de hooks y componentes necesarios
import { useEffect, useState } from "react";
import "../Login.css"; // Importación del archivo de estilos CSS
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa"; // Íconos para los inputs
import { useNavigate } from "react-router-dom"; // Hook para navegar entre rutas
import AlertDialog from './AlertDialog.jsx'; // Componente modal para mostrar mensajes

// Componente principal de Login
export default function Login({ onLogin }) {
  const navigate = useNavigate(); // Hook para redireccionar 

  // Estados del formulario de inicio de sesión
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");

  // Estados del formulario de registro
  const [signUpName, setSignUpName] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");

  // Estado para controlar la visibilidad y contenido del modal de alerta
  const [alertDialog, setAlertDialog] = useState({
    isOpen: false,
    title: "",
    message: "",
    type: "", // success | error | info
    onConfirm: () => {},
  });

  // Carga inicial de usuarios registrados desde localStorage, si no existen, crea dos por defecto
  const [users, setUsers] = useState(() => {
    const storedUsers = localStorage.getItem("registeredUsers");
    return storedUsers
      ? JSON.parse(storedUsers)
      : [
          { email: "jesus@gmail.com", password: "123", name: "Chuyin" },
          { email: "jose@gmail.com", password: "123", name: "jose" },
        ];
  });

  // Guarda los usuarios actualizados en localStorage cada vez que se actualiza el estado `users`
  useEffect(() => {
    localStorage.setItem("registeredUsers", JSON.stringify(users));
  }, [users]);

  // Añade los eventos a los botones de cambio de panel (login/registro)
  useEffect(() => {
    const container = document.getElementById("container");
    const registerBtn = document.getElementById("register");
    const loginBtn = document.getElementById("login");

    // Cambia al panel de registro
    const handleRegisterClick = () => {
      container.classList.add("active");
      setAlertDialog({ ...alertDialog, isOpen: false }); // Cierra el modal si está abierto
    };

    // Cambia al panel de login
    const handleLoginClick = () => {
      container.classList.remove("active");
      setAlertDialog({ ...alertDialog, isOpen: false }); // Cierra el modal si está abierto
    };

    registerBtn.addEventListener("click", handleRegisterClick);
    loginBtn.addEventListener("click", handleLoginClick);

    // Limpieza de eventos al desmontar el componente
    return () => {
      registerBtn.removeEventListener("click", handleRegisterClick);
      loginBtn.removeEventListener("click", handleLoginClick);
    };
  }, [alertDialog]); // alertDialog como dependencia

  // Función para mostrar el modal de alerta
  const showAlertDialog = (title, message, type, callback = () => {}) => {
    setAlertDialog({
      isOpen: true,
      title,
      message,
      type,
      onConfirm: () => {
        setAlertDialog({ ...alertDialog, isOpen: false }); // Cierra el modal
        callback(); 
      },
    });
  };

  // Procesa el formulario de inicio de sesión
  const handleSignInSubmit = (e) => {
    e.preventDefault();

    // Busca usuario que coincida con las credenciales
    const foundUser = users.find(
      (user) => user.email === signInEmail && user.password === signInPassword
    );

    if (foundUser) {
      // Muestra alerta de éxito con callback que guarda datos y redirige
      showAlertDialog(
        "Inicio de Sesión Exitoso",
        `¡Bienvenido de nuevo, ${foundUser.name}!`,
        "success",
        () => {
          localStorage.setItem("isLoggedIn", "true");
          localStorage.setItem("userProfile", JSON.stringify({
            name: foundUser.name,
            email: foundUser.email,
            phone: "123-456-7890",
            photo: "",
            career: ""
          }));
          onLogin(foundUser); // Callback
          navigate("/", { state: { user: foundUser } });
          window.location.reload(); // Fuerza recarga para reflejar sesión
        }
      );
    } else {
      // Muestra error si no coinciden las credenciales
      showAlertDialog(
        "Error de Inicio de Sesión",
        "Credenciales incorrectas. Por favor, inténtalo de nuevo.",
        "error"
      );
    }
  };

  // Procesa el formulario de registro
  const handleSignUpSubmit = (e) => {
    e.preventDefault();

    // Valida que el correo no esté ya registrado
    const emailExists = users.some(user => user.email === signUpEmail);
    if (emailExists) {
      showAlertDialog(
        "Error de Registro",
        "Este correo electrónico ya está registrado. Por favor, utiliza otro o inicia sesión.",
        "error"
      );
      return;
    }

    // Crea nuevo usuario y lo guarda
    const newUser = {
      name: signUpName,
      email: signUpEmail,
      password: signUpPassword,
    };
    setUsers(prevUsers => [...prevUsers, newUser]);

    console.log("Nuevo usuario registrado:", newUser);

    // Alerta de éxito con navegación
    showAlertDialog(
      "Registro Exitoso",
      `¡Gracias por registrarte, ${newUser.name}!`,
      "success",
      () => {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userProfile", JSON.stringify({
          name: newUser.name,
          email: newUser.email,
          phone: "",
          photo: "",
          career: ""
        }));
        onLogin(newUser);
        navigate("/login", { state: { user: newUser } }); 
      }
    );

    // Limpia los campos del formulario
    setSignUpName("");
    setSignUpEmail("");
    setSignUpPassword("");
  };

  // Renderizado del componente
  return (
    <div className="login-page">
      {/* Modal de alerta condicional */}
      {alertDialog.isOpen && (
        <AlertDialog
          title={alertDialog.title}
          message={alertDialog.message}
          type={alertDialog.type}
          onConfirm={alertDialog.onConfirm}
        />
      )}

      {/* Contenedor principal con formularios de login y registro */}
      <div className="container" id="container">

        {/* Formulario de inicio de sesión */}
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

        {/* Formulario de registro */}
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

        {/* Panel lateral de alternancia entre login y registro */}
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
