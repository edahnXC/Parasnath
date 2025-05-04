import React from 'react';
import '../styles/templeDetails.scss';

const TempleDetails = ({ temple, onClose }) => {
  return (
    <div className="temple-details">
      <button className="close-button" onClick={onClose}>
        &times;
      </button>
      
      <div className="temple-details-header">
        <h2>{temple.name}</h2>
        <p className="location">{temple.location}</p>
      </div>
      
      <div className="temple-details-content">
        <div className="temple-image">
          <img src={temple.imagePath} alt={temple.name} />
        </div>
        
        <div className="temple-info">
          <div className="info-section">
            <h3>Description</h3>
            <p>{temple.description}</p>
          </div>
          
          <div className="info-section">
            <h3>Significance</h3>
            <p>{temple.significance}</p>
          </div>
          
          <div className="info-section">
            <h3>Architecture</h3>
            <p>{temple.architecture}</p>
          </div>
          
          <div className="info-grid">
            <div className="info-item">
              <h4>Best Time to Visit</h4>
              <p>{temple.bestTimeToVisit}</p>
            </div>
            
            <div className="info-item">
              <h4>Facilities</h4>
              <p>{temple.facilities}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TempleDetails;