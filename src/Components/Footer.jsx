// Se importan los recursos necesarios: logo, modales (términos y privacidad) y estilos del pie de página
import Logo from "../Assets/Logo.svg";
import PrivacyPolicyModal from "./Privacy";
import TermsAndConditionsModal from "./TermsAndConditions";
import "../Style/Footer.css";

// Componente funcional Footer
const Footer = () => {
  return (
    <footer className="footer-wrapper py-3">
      <div className="container-fluid">
        <div className="row align-items-center footer-section-one">
          {/* El pie de página se divide en tres columnas usando Bootstrap:
              1. Columna izquierda: muestra el logo institucional
              2. Columna central: contiene enlaces útiles (ITTepic, SII, NEXO) que se abren en nueva pestaña
              3. Columna derecha: incluye componentes que despliegan los modales de Términos y Privacidad */}

          <div className="col-md-4 text-start">
            <img src={Logo} alt="Logo" className="img-fluid" />
          </div>

          <div className="col-md-4 text-center footer-section-columns">
            <a
              href="https://www.tepic.tecnm.mx/"
              className="footer-link mx-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              ITTepic
            </a>
            <a
              href="https://sii.tepic.tecnm.mx/sistema/"
              className="footer-link mx-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              SII
            </a>
            <a
              href="https://nexo.tepic.tecnm.mx/"
              className="footer-link mx-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              NEXO
            </a>
          </div>

          <div className="col-md-4 text-end">
            <TermsAndConditionsModal />
            <PrivacyPolicyModal />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; // Exporta el componente para poder utilizarlo en otras partes del proyecto
