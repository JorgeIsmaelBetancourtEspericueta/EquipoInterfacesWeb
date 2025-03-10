import Logo from "../Assets/Logo.svg";
import PrivacyPolicyModal from "./Privacy";
import TermsAndConditionsModal from "./TermsAndConditions";
import "../Style/Footer.css";

const Footer = () => {
  return (
    <footer className="footer-wrapper py-3">
      <div className="container-fluid">
        <div className="row align-items-center footer-section-one">
          {/* Columna izquierda: Logo */}
          <div className="col-md-4 text-start">
            <img src={Logo} alt="Logo" className="img-fluid" />
          </div>
          {/* Columna central: Enlaces */}
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
          {/* Columna derecha: Modales */}
          <div className="col-md-4 text-end">
            <TermsAndConditionsModal />
            <PrivacyPolicyModal />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
