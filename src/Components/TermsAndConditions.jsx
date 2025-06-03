import { useState } from "react"; // Importa useState para manejar el estado del modal.
import "../Style/Modal.css"; // Importa los estilos CSS para el modal.

const TermsAndConditionsModal = () => {
  // Define el estado 'open' para controlar la visibilidad del modal.
  const [open, setOpen] = useState(false);

  return (
    // Contenedor principal que centra el botón del modal.
    <div className="flex justify-center mt-4">
      {/* Botón que abre el modal al hacer clic. */}
      <button className="open-modal-btn" onClick={() => setOpen(true)}>
        Términos y Condiciones
      </button>

      {/* El modal se renderiza condicionalmente si 'open' es true. */}
      {open && (
        // Overlay del modal: al hacer clic aquí, el modal se cierra.
        <div className="modal-overlay" onClick={() => setOpen(false)}>
          {/* Contenido del modal. */}
          {/* 'e.stopPropagation()' evita que un clic dentro del contenido cierre el modal. */}
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal-title">Términos y Condiciones</h2>
            <p className="modal-text">
              Al utilizar este sitio web, te comprometes a actuar con honestidad
              y transparencia en todas tus interacciones. Te comprometes a
              expresar tus opiniones de manera respetuosa y adecuada, fomentando
              un ambiente de colaboración y entendimiento. Asimismo, garantizas
              que la información que proporcionas es veraz y bien intencionada
              Nos reservamos el derecho de modificar estos términos en cualquier
              momento, por lo que te recomendamos revisar esta sección
              periódicamente.
            </p>
            <p className="modal-text">
              Nos reservamos el derecho de modificar estos términos en cualquier
              momento, por lo que te recomendamos revisar esta sección
              periódicamente. Si no estás de acuerdo con estos términos, por
              favor, abstente de usar este sitio.
            </p>

            {/* Botón para cerrar el modal desde dentro. */}
            <button className="close-modal-btn" onClick={() => setOpen(false)}>
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TermsAndConditionsModal;