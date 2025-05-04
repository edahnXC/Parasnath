import React from 'react';
import '../styles/templeCard.scss';

const TempleCard = ({ temple, className, style, onLearnMore }) => {
  return (
    <div className={`temple-card ${className || ''}`} style={style}>
      <div 
        className="temple-image" 
        style={{ backgroundImage: `url(${temple.imagePath})` }}
      ></div>
      <div className="temple-info">
        <h3>{temple.name}</h3>
        <p className="location">{temple.location}</p>
        <p className="description">{temple.shortDescription}</p>
        <button 
          className="learn-more" 
          onClick={() => onLearnMore(temple)}
        >
          Learn More
        </button>
      </div>
    </div>
  );
};

export default TempleCard;