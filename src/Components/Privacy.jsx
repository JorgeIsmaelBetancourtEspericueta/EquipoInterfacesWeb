import { useState } from "react"; // Importa useState para manejar el estado del modal.
import "../Style/Modal.css"; // Importa los estilos CSS para el modal.

const PrivacyPolicyModal = () => {
  // Define el estado 'open' para controlar la visibilidad del modal.
  // 'open' es un booleano (true para abierto, false para cerrado).
  const [open, setOpen] = useState(false);

  return (
    // Contenedor principal que centra el botón del modal.
    <div className="flex justify-center mt-4">
      {/* Botón que abre el modal al hacer clic. */}
      <button
        className="open-modal-btn"
        onClick={() => setOpen(true)} // Cambia 'open' a true para mostrar el modal.
      >
        Política de Privacidad
      </button>

      {/* El modal se renderiza condicionalmente si 'open' es true. */}
      {open && (
        // Overlay del modal: al hacer clic aquí, el modal se cierra.
        <div className="modal-overlay" onClick={() => setOpen(false)}>
          {/* Contenido del modal. */}
          {/* 'e.stopPropagation()' evita que un clic dentro del contenido cierre el modal. */}
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal-title">Política de Privacidad</h2>
            <p className="modal-text">
              Tu privacidad es importante para nosotros. Nos comprometemos a proteger tu información personal y a
              utilizarla solo para fines legítimos según nuestra política.
            </p>
            <p className="modal-text">
              Para más información, consulta nuestra página de privacidad completa o contáctanos.
            </p>

            {/* Botón para cerrar el modal desde dentro. */}
            <button
              className="close-modal-btn"
              onClick={() => setOpen(false)} // Cambia 'open' a false para cerrar el modal.
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrivacyPolicyModal;