// En Login.jsx

import { useEffect, useState } from "react"; // Importa hooks de React para manejar el estado y efectos secundarios.
import "../Login.css"; // Importa los estilos CSS específicos para el componente de Login.
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa"; // Importa iconos de Font Awesome para los campos de entrada.
import { useNavigate } from "react-router-dom"; // Importa useNavigate para la navegación programática.
import AlertDialog from "./AlertDialog.jsx"; // Importa el componente AlertDialog para mostrar mensajes modales.

export default function Login({ onLogin }) {
  // Define el componente Login, recibe 'onLogin' como prop.
  const navigate = useNavigate(); // Hook para obtener la función de navegación.

  // Estados para los campos del formulario de inicio de sesión.
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");

  // Estados para los campos del formulario de registro.
  const [signUpName, setSignUpName] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");

  // Estado para controlar la visibilidad y el contenido del modal AlertDialog.
  const [alertDialog, setAlertDialog] = useState({
    isOpen: false, // Controla si el modal está visible.
    title: "", // Título del modal.
    message: "", // Mensaje del modal.
    type: "", // Tipo de mensaje ('success', 'error', 'info') para estilizar.
    onConfirm: () => {}, // Función que se ejecuta al presionar OK en el modal.
  });

  // Estado para almacenar los usuarios registrados.
  // Inicializa con datos de localStorage o con usuarios predefinidos si no hay nada guardado.
  const [users, setUsers] = useState(() => {
    const storedUsers = localStorage.getItem("registeredUsers");
    return storedUsers
      ? JSON.parse(storedUsers)
      : [
          { email: "jesus@gmail.com", password: "123", name: "Chuyin" },
          { email: "admin@example.com", password: "adminpass", name: "Admin" },
        ];
  });

  // Efecto para guardar la lista de usuarios en localStorage cada vez que 'users' cambia.
  useEffect(() => {
    localStorage.setItem("registeredUsers", JSON.stringify(users));
  }, [users]);

  // Efecto para manejar la lógica de alternar entre paneles de "Iniciar Sesión" y "Registrarse".
  useEffect(() => {
    const container = document.getElementById("container"); // Obtiene el elemento contenedor principal.
    const registerBtn = document.getElementById("register"); // Botón de registro.
    const loginBtn = document.getElementById("login"); // Botón de inicio de sesión.

    // Función para manejar el clic en el botón de registro.
    const handleRegisterClick = () => {
      container.classList.add("active"); // Añade la clase 'active' para mostrar el panel de registro.
      setAlertDialog({ ...alertDialog, isOpen: false }); // Cierra cualquier modal abierto.
    };

    // Función para manejar el clic en el botón de inicio de sesión.
    const handleLoginClick = () => {
      container.classList.remove("active"); // Remueve la clase 'active' para mostrar el panel de inicio de sesión.
      setAlertDialog({ ...alertDialog, isOpen: false }); // Cierra cualquier modal abierto.
    };

    // Añade event listeners a los botones.
    registerBtn.addEventListener("click", handleRegisterClick);
    loginBtn.addEventListener("click", handleLoginClick);

    // Función de limpieza para remover los event listeners cuando el componente se desmonte.
    return () => {
      registerBtn.removeEventListener("click", handleRegisterClick);
      loginBtn.removeEventListener("click", handleLoginClick);
    };
  }, [alertDialog]); // 'alertDialog' es una dependencia para que se cierre el modal si el panel cambia.

  // Función para mostrar el modal de AlertDialog.
  const showAlertDialog = (title, message, type, callback = () => {}) => {
    setAlertDialog({
      isOpen: true,
      title,
      message,
      type,
      onConfirm: () => {
        setAlertDialog({ ...alertDialog, isOpen: false }); // Cierra el modal al confirmar.
        callback(); // Ejecuta la función de callback pasada (ej. navegación).
      },
    });
  };

  // Manejador del envío del formulario de inicio de sesión.
  const handleSignInSubmit = (e) => {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario.
    // Busca un usuario con las credenciales proporcionadas.
    const foundUser = users.find(
      (user) => user.email === signInEmail && user.password === signInPassword
    );

    if (foundUser) {
      // Si el usuario es encontrado, muestra un mensaje de éxito y realiza las acciones de login.
      showAlertDialog(
        "Inicio de Sesión Exitoso",
        `¡Bienvenido de nuevo, ${foundUser.name}!`,
        "success",
        () => {
          // Callback que se ejecuta al confirmar el éxito.
          localStorage.setItem("isLoggedIn", "true"); // Marca al usuario como logueado en localStorage.
          localStorage.setItem(
            "userProfile",
            JSON.stringify({
              // Guarda el perfil del usuario.
              name: foundUser.name,
              email: foundUser.email,
              phone: "123-456-7890", // Ejemplo de dato, se puede actualizar.
              photo: "", // Ejemplo de dato.
              career: "", // Ejemplo de dato.
            })
          );
          onLogin(foundUser); // Llama a la función 'onLogin' pasada por props.
          navigate("/", { state: { user: foundUser } }); // Navega a la página principal.
          window.location.reload(); // Recarga la página para asegurar la actualización de la UI.
        }
      );
    } else {
      // Si las credenciales son incorrectas, muestra un mensaje de error.
      showAlertDialog(
        "Error de Inicio de Sesión",
        "Credenciales incorrectas. Por favor, inténtalo de nuevo.",
        "error"
      );
    }
  };

  // Manejador del envío del formulario de registro.
  const handleSignUpSubmit = (e) => {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario.

    // Verifica si el correo electrónico ya está registrado.
    const emailExists = users.some((user) => user.email === signUpEmail);
    if (emailExists) {
      showAlertDialog(
        "Error de Registro",
        "Este correo electrónico ya está registrado. Por favor, utiliza otro o inicia sesión.",
        "error"
      );
      return; // Detiene la ejecución si el email ya existe.
    }

    // Crea un nuevo objeto de usuario.
    const newUser = {
      name: signUpName,
      email: signUpEmail,
      password: signUpPassword,
    };

    // Actualiza el estado de 'users' añadiendo el nuevo usuario.
    setUsers((prevUsers) => [...prevUsers, newUser]);

    console.log("Nuevo usuario registrado:", newUser); // Muestra el nuevo usuario en consola.

    // Muestra un mensaje de registro exitoso y realiza acciones de login automático/redirección.
    showAlertDialog(
      "Registro Exitoso",
      `¡Gracias por registrarte, ${newUser.name}!`,
      "success",
      () => {
        // Callback que se ejecuta al confirmar el éxito del registro.
        localStorage.setItem("isLoggedIn", "true"); // Marca como logueado.
        localStorage.setItem(
          "userProfile",
          JSON.stringify({
            // Guarda el perfil del nuevo usuario.
            name: newUser.name,
            email: newUser.email,
            phone: "",
            photo: "",
            career: "",
          })
        );
        onLogin(newUser); // Llama a la función 'onLogin'.
        navigate("/login", { state: { user: newUser } }); // Navega a la página de login (o podrías ir a la principal).
      }
    );

    // Limpia los campos del formulario de registro.
    setSignUpName("");
    setSignUpEmail("");
    setSignUpPassword("");
  };

  return (
    <div className="login-page">
      {/* Renderiza el componente AlertDialog si 'isOpen' es true. */}
      {alertDialog.isOpen && (
        <AlertDialog
          title={alertDialog.title}
          message={alertDialog.message}
          type={alertDialog.type}
          onConfirm={alertDialog.onConfirm}
        />
      )}

      {/* Contenedor principal para el formulario de login/registro. */}
      <div className="container" id="container">
        {/* Formulario de inicio de sesión. */}
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

        {/* Formulario de registro. */}
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

        {/* Panel de alternancia entre login y registro. */}
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
