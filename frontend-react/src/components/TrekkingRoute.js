// src/components/TrekkingRoute.js
import React from 'react';
import { FaMountain, FaRoute, FaClock, FaWalking } from 'react-icons/fa';
import '../styles/trekkingRoute.scss';

const TrekkingRoute = ({ route }) => {
  return (
    <div className="trekking-route-details">
      <h2>{route.name}</h2>
      <div className="route-info">
        <div className="info-item">
          <FaRoute className="icon" />
          <span>Distance: {route.distance} km</span>
        </div>
        <div className="info-item">
          <FaClock className="icon" />
          <span>Duration: {route.duration} hours</span>
        </div>
        <div className="info-item">
          <FaWalking className="icon" />
          <span>Difficulty: {route.difficulty}</span>
        </div>
        <div className="info-item">
          <FaMountain className="icon" />
          <span>Elevation: {route.elevation} meters</span>
        </div>
      </div>
      <div className="route-description">
        <h3>Route Description</h3>
        <p>{route.description}</p>
      </div>
    </div>
  );
};

export default TrekkingRoute;