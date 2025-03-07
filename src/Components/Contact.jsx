import React from "react";

const Contact = () => {
  return (
    <div className="contact-page-wrapper">
      <h1 className="primary-heading">¿Tienes una idea innovadora?</h1>
      <h1 className="primary-heading">¡Compártela con nosotros!</h1>
      <p className="contact-text">
        Déjanos tu correo y nos pondremos en contacto contigo.
      </p>
      <div className="contact-form-container">
        <label htmlFor="email" className="sr-only">Correo electrónico</label>
        <input 
          id="email" 
          type="email" 
          placeholder="Ingresa tu correo electrónico" 
          className="contact-input"
        />
        <button className="secondary-button">Enviar</button>
      </div>
    </div>
  );
};

export default Contact;
