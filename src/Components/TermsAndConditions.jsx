import  { useState } from "react";
import "../Style/Modal.css"; // Importar el archivo CSS para los estilos

const TermsAndConditionsModal = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex justify-center mt-4">
      {/* Botón para abrir el modal */}
      <button className="open-modal-btn" onClick={() => setOpen(true)}>
        Términos y Condiciones
      </button>

      {/* Modal */}
      {open && (
        <div className="modal-overlay" onClick={() => setOpen(false)}>
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

            {/* Botón para cerrar el modal */}
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
