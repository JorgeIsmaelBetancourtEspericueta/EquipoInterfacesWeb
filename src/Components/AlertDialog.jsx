// Importamos React
import React from 'react';

// Importamos el archivo CSS que define los estilos para el modal de alerta
import '../AlertDialog.css';

// Importamos iconos desde la librería react-icons/ri para distintos tipos de mensajes
import { RiCloseCircleLine, RiCheckFill, RiInformationLine } from 'react-icons/ri'; 

// Componente funcional que recibe props para personalizar el modal
const AlertDialog = ({ title, message, type, onConfirm }) => {

  // Definimos variables que luego se usarán para el ícono, color del ícono y botón
  let icon;
  let iconColor;
  let buttonText = "OK"; // Texto del botón por defecto
  let buttonBgColor = "#fe9e0d"; // Color del botón naranja

  // Evaluamos el tipo de mensaje para seleccionar el ícono y los colores correspondientes
  switch (type) {
    case 'success': // Para mensajes de éxito
      icon = <RiCheckFill />;      // Ícono de check
      iconColor = "#4CAF50";       // Verde
      break;
    case 'error': // Para mensajes de error
      icon = <RiCloseCircleLine />; // Ícono de "X"
      iconColor = "#f44336";        // Rojo
      break;
    case 'info': // Para mensajes informativos
    default:     // Si no se especifica un tipo válido, usamos este como valor por defecto
      icon = <RiInformationLine />; // Ícono de información
      iconColor = "#2196F3";        // Azul
      buttonBgColor = "#2196F3";    // Azul para el botón también
      break;
  }

  // Renderizado del componente AlertDialog
  return (
    <div className="alert-overlay"> {/* Fondo semitransparente que oscurece el contenido detrás del modal */}
      <div className="alert-dialog"> {/* Caja del diálogo principal */}
        
        {/* Ícono visual con color dinámico según el tipo de alerta */}
        <div className="alert-icon" style={{ color: iconColor }}>
          {icon}
        </div>

        {/* Título del mensaje, con fallback a "Mensaje" si no se provee */}
        <h2>{title || "Mensaje"}</h2>

        {/* Texto del mensaje que se desea mostrar al usuario */}
        <p>{message}</p>

        {/* Botón que al hacer clic ejecuta la función onConfirm */}
        <button
          onClick={onConfirm} // Cierra el modal o ejecuta lógica adicional
          style={{ backgroundColor: buttonBgColor }} // Color dinámico según el tipo de alerta
        >
          {buttonText} {/* Texto estático "OK", puede cambiarse si se desea más flexibilidad */}
        </button>
      </div>
    </div>
  );
};

// Exportamos el componente para poder usarlo en otros archivos (como Login.jsx)
export default AlertDialog;
