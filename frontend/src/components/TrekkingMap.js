// src/components/TrekkingMap.js
import React, { useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import '../styles/trekkingMap.scss';

const TrekkingMap = ({ route }) => {
  const mapRef = useRef(null);
  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

  useEffect(() => {
    if (!route?.waypoints?.length || !apiKey) return;

    const initMap = async () => {
      try {
        const loader = new Loader({
          apiKey,
          version: "weekly",
          libraries: ["geometry"],
        });

        await loader.load();

        const map = new window.google.maps.Map(mapRef.current, {
          center: route.waypoints[0].coordinates,
          zoom: 14,
          mapTypeId: 'terrain',
        });

        // Create polyline path
        const path = route.waypoints.map(wp => wp.coordinates);

        new window.google.maps.Polyline({
          path,
          map,
          strokeColor: '#4a6b2a',
          strokeOpacity: 1.0,
          strokeWeight: 4,
        });

        // Add markers
        route.waypoints.forEach(wp => {
          new window.google.maps.Marker({
            position: wp.coordinates,
            map,
            title: wp.name,
          });
        });

      } catch (error) {
        console.error('Google Maps initialization error:', error);
      }
    };

    initMap();
  }, [route, apiKey]);

  return (
    <div className="trekking-map">
      <h3>Route Map</h3>
      <div ref={mapRef} className="map-container"></div>
    </div>
  );
};

export default TrekkingMap;
