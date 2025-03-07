import { useState } from "react";
import "../Style/Modal.css"; // Importar el archivo CSS para los estilos

const PrivacyPolicyModal = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex justify-center mt-4">
      {/* Botón para abrir el modal */}
      <button
        className="open-modal-btn"
        onClick={() => setOpen(true)}
      >
        Política de Privacidad
      </button>

      {/* Modal */}
      {open && (
        <div className="modal-overlay" onClick={() => setOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal-title">Política de Privacidad</h2>
            <p className="modal-text">
              Tu privacidad es importante para nosotros. Nos comprometemos a proteger tu información personal y a
              utilizarla solo para fines legítimos según nuestra política.
            </p>
            <p className="modal-text">
              Para más información, consulta nuestra página de privacidad completa o contáctanos.
            </p>

            {/* Botón para cerrar el modal */}
            <button
              className="close-modal-btn"
              onClick={() => setOpen(false)}
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
