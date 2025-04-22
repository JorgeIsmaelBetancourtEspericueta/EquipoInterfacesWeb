import { useEffect } from "react";
import "../Login.css";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";

export default function Login() {
  useEffect(() => {
    const container = document.getElementById("container");
    const registerBtn = document.getElementById("register");
    const loginBtn = document.getElementById("login");

    registerBtn.addEventListener("click", () => {
      container.classList.add("active");
    });

    loginBtn.addEventListener("click", () => {
      container.classList.remove("active");
    });

    return () => {
      registerBtn.removeEventListener("click", () => {
        container.classList.add("active");
      });
      loginBtn.removeEventListener("click", () => {
        container.classList.remove("active");
      });
    };
  }, []);

  return (
    <div className="login-page">
      <div className="container" id="container">
        <div className="form-container sign-in">
          <form>
            <h1>Iniciar Sesión</h1>
            <div className="input-container">
              <FaEnvelope className="icon" />
              <input type="email" placeholder="Correo Electrónico" />
            </div>
            <div className="input-container">
              <FaLock className="icon" />
              <input type="password" placeholder="Contraseña" />
            </div>
            <a href="#">¿Olvidaste tu contraseña?</a>
            <button type="submit">Ingresar</button>
          </form>
        </div>

        <div className="form-container sign-up">
          <form>
            <h1>Crear Cuenta</h1>
            <div className="input-container">
              <FaUser className="icon" />
              <input type="text" placeholder="Nombre" />
            </div>
            <div className="input-container">
              <FaEnvelope className="icon" />
              <input type="email" placeholder="Correo Electrónico" />
            </div>
            <div className="input-container">
              <FaLock className="icon" />
              <input type="password" placeholder="Contraseña" />
            </div>
            <button type="submit">Registrarse</button>
          </form>
        </div>

        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-left">
              <h1>¡Bienvenido de nuevo!</h1>
              <p>Si ya tienes una cuenta, inicia sesión aquí.</p>
              <button className="hidden" id="login">Iniciar Sesión</button>
            </div>
            <div className="toggle-panel toggle-right">
              <h1>¡Hola, bienvenid@!</h1>
              <p>Regístrate para acceder a todas las funciones del sitio.</p>
              <button className="hidden" id="register">Registrarse</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
