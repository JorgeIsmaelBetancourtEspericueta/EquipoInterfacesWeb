// Componente funcional que muestra una sección de contacto
const Contact = () => {
  return (
    <div className="contact-page-wrapper">
      {" "}
      {/* Contenedor principal */}
      {/* Encabezados motivacionales */}
      <h1 className="primary-heading">¿Tienes una idea innovadora?</h1>
      <h1 className="primary-heading">¡Compártela con nosotros!</h1>
      {/* Texto de invitación */}
      <p className="contact-text">
        Déjanos tu correo y nos pondremos en contacto contigo.
      </p>
      {/* Formulario de contacto */}
      <div className="contact-form-container">
        {/* Etiqueta accesible para lectores de pantalla */}
        <label htmlFor="email" className="sr-only">
          Correo electrónico
        </label>

        {/* Campo de entrada para el correo */}
        <input
          id="email"
          type="email"
          placeholder="Ingresa tu correo electrónico"
          className="contact-input"
        />

        {/* Botón de envío */}
        <button className="secondary-button">Enviar</button>
      </div>
    </div>
  );
};

export default Contact; // Exportación del componente
