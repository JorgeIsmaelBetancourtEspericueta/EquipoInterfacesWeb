import { useEffect } from "react";
import { useForm } from "react-hook-form"; //Importamos esto para hacer algunas validaciones
import "../Login.css";
import { registerRequest } from "../api/auth.js";

export default function Login() {
  const { register, handleSubmit } = useForm();

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

    // Limpieza de eventos al desmontar el componente
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
            <input type="email" placeholder="Correo Electrónico" />
            <input type="password" placeholder="Contraseña" />
            <a href="#">¿Olvidaste tu contraseña?</a>
            <button type="submit">Ingresar</button>
          </form>
        </div>

        <div className="form-container sign-up">
          <form
            onSubmit={handleSubmit(async (values) => {
              console.log(values);
              const res = await registerRequest(values);
              console.log(res);
            })}
          >
            <h1>Crear Cuenta</h1>
            <input
              type="text"
              {...register("username", { required: true })}
              placeholder="Nombre"
            />
            <input
              type="email"
              {...register("email", { required: true })}
              placeholder="Correo Electrónico"
            />
            <input
              type="password"
              {...register("password", { required: true })}
              placeholder="Contraseña"
            />
            <button type="submit">Registrarse</button>
          </form>
        </div>

        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-left">
              <h1>¡Bienvenido de nuevo!</h1>
              <p>Si ya tienes una cuenta, inicia sesión aquí.</p>
              <button class="hidden" id="login">
                Iniciar Sesión
              </button>
            </div>
            <div className="toggle-panel toggle-right">
              <h1>¡Hola, bienvenid@!</h1>
              <p>Regístrate para acceder a todas las funciones del sitio.</p>
              <button class="hidden" id="register">
                Registrarse
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
