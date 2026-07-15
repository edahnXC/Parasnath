import React, { useState, useEffect } from 'react';
import TrekkingRoute from '../components/TrekkingRoute';
import TrekkingMap from '../components/TrekkingMap';
import '../styles/trekking.scss';

const Trekking = () => {
  const [routes, setRoutes] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState(null);

  useEffect(() => {
    // Fetch trekking routes from backend
    const fetchRoutes = async () => {
      try {
        const response = await fetch('/api/trekking-routes');
        const data = await response.json();
        setRoutes(data);
        if (data.length > 0) setSelectedRoute(data[0]);
      } catch (error) {
        console.error('Error fetching routes:', error);
      }
    };

    fetchRoutes();
  }, []);

  return (
    <div className="trekking-page">
      <h1>Trekking Routes to Parasnath Hill</h1>
      
      <div className="trekking-content">
        <div className="routes-list">
          {routes.map(route => (
            <div 
              key={route.id} 
              className={`route-item ${selectedRoute?.id === route.id ? 'active' : ''}`}
              onClick={() => setSelectedRoute(route)}
            >
              {route.name}
            </div>
          ))}
        </div>
        
        {selectedRoute && (
          <>
            <TrekkingRoute route={selectedRoute} />
            <TrekkingMap route={selectedRoute} />
          </>
        )}
      </div>
    </div>
  );
};

export default Trekking;