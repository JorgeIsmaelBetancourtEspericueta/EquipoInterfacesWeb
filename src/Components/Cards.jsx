import React from 'react';
import '../App.css'; // Importa el archivo CSS
import loma42 from '../Assets/loma_42.jpg';
import cafeTec from '../Assets/CafeteriaTec.jpg';
import kiosko from '../Assets/Kiosko.jpg';

const Cards = () => {
  const cards = [
    {
      imgSrc: kiosko,
      title: 'Kiosko',
      text: 'El kiosco, ubicado cerca de la cafetería, es una opción rápida y accesible para quienes buscan algo ligero entre clases. Con un ambiente relajado, ofrece bocados sabrosos como tacos y sándwiches, preparados al momento. Aunque su menú es más limitado, destaca por su atmósfera acogedora y eficiente',
    },
    {
      imgSrc: cafeTec,
      title: 'Cafeteria del Tecnologico',
      text: 'La cafetería del Tecnológico de Tepic ofrece un ambiente moderno y elegante, ideal para disfrutar de una experiencia gastronómica de alta calidad. Con un menú gourmet que combina platillos clásicos e innovadores, es el lugar perfecto para estudiar o descansar. Su atención personalizada y decoración minimalista crean una atmósfera exclusiva dentro del campus.',
    },
    {
      imgSrc: loma42,
      title: 'Loma 42',
      text: 'Es en el parque «La Loma», el corazón verde de la ciudad de Tepic, donde nace el concepto Loma 42 Tepic, una terraza casual con una exquisita propuesta gastronómica atrevida mezclando sabores locales con tendencias globales.  Su mixología de autor con coctelería innovadora y su buena música hacen de este restaurante la nueva tendencia.',
    },
  ];

  return (
    <div className="cards-container">
      {cards.map((card, index) => (
        <div key={index} className="card">
          <img className="card-image" src={card.imgSrc} alt={card.title} />
          <div className="card-content">
            <h3 className="card-title">{card.title}</h3>
            <p className="card-text">{card.text}</p>
            <button className="btn-ver-mas">Ver más</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cards;