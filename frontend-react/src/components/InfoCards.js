import React from 'react';
import { FaMountain, FaPlaceOfWorship, FaTree, FaHiking } from 'react-icons/fa';
import '../styles/infoCards.scss';

const InfoCards = () => {
  const cards = [
    {
      icon: <FaMountain />,
      title: "Highest Peak",
      description: "Parasnath Hill stands at 1,365 meters (4,479 ft) above sea level."
    },
    {
      icon: <FaPlaceOfWorship />,
      title: "Sacred Temples",
      description: "Home to several ancient Jain temples and shrines."
    },
    {
      icon: <FaTree />,
      title: "Rich Biodiversity",
      description: "Hosts diverse flora and fauna in its forests."
    },
    {
      icon: <FaHiking />,
      title: "Trekking Routes",
      description: "Multiple trails with varying difficulty levels."
    }
  ];

  return (
    <div className="info-cards">
      {cards.map((card, index) => (
        <div key={index} className="info-card">
          <div className="card-icon">{card.icon}</div>
          <h3>{card.title}</h3>
          <p>{card.description}</p>
        </div>
      ))}
    </div>
  );
};

export default InfoCards;