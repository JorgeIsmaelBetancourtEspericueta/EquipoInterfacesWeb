// src/components/AlertDialog.js

import React from 'react';
import '../AlertDialog.css'; 
import { RiCloseCircleLine, RiCheckFill, RiInformationLine } from 'react-icons/ri'; 

const AlertDialog = ({ title, message, type, onConfirm }) => {
  let icon;
  let iconColor;
  let buttonText = "OK";
  let buttonBgColor = "#fe9e0d"; // Color por defecto del botón (tu color naranja)

  switch (type) {
    case 'success':
      icon = <RiCheckFill />;
      iconColor = "#4CAF50"; // Verde para éxito
      break;
    case 'error':
      icon = <RiCloseCircleLine />;
      iconColor = "#f44336"; // Rojo para error
      break;
    case 'info':
    default: // Si no se especifica tipo, por defecto es 'info'
      icon = <RiInformationLine />;
      iconColor = "#2196F3"; 
      buttonBgColor = "#2196F3"; 
      break;
  }

  return (
    <div className="alert-overlay">
      <div className="alert-dialog"> {/* Esta es la caja del mensaje en sí */}
        <div className="alert-icon" style={{ color: iconColor }}>
          {icon} {/* Renderiza el icono de React-Icons */}
        </div>
        <h2>{title || "Mensaje"}</h2> {/* Título dinámico o "Mensaje" por defecto */}
        <p>{message}</p> {/* El mensaje que pasamos */}
        <button
          onClick={onConfirm} 
          style={{ backgroundColor: buttonBgColor }}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default AlertDialog;