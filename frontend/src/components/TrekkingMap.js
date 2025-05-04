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
          libraries: ["marker"],
        });

        const { Map } = await loader.importLibrary('maps');
        const { AdvancedMarkerElement } = await loader.importLibrary('marker');
        const { Polyline } = await loader.importLibrary('geometry');

        const map = new Map(mapRef.current, {
          center: route.waypoints[0].coordinates,
          zoom: 14,
          mapId: 'TERRAIN_MAP',
        });

        // Create polyline
        new Polyline({
          path: route.waypoints.map(wp => wp.coordinates),
          map,
          strokeColor: '#4a6b2a',
          strokeOpacity: 1.0,
          strokeWeight: 4,
        });

        // Add advanced markers
        route.waypoints.forEach(wp => {
          new AdvancedMarkerElement({
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