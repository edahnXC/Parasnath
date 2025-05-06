// src/components/MapPreview.js
import React, { useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import '../styles/mapPreview.scss';

const MapPreview = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

    if (!apiKey) {
      console.error("Google Maps API key is missing");
      return;
    }

    const loader = new Loader({
      apiKey,
      version: "weekly",
      libraries: ["places"],
    });

    loader.load().then(() => {
      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: 24.0209, lng: 86.2076 },
        zoom: 12,
        mapTypeId: 'terrain',
      });

      const marker = new window.google.maps.Marker({
        position: { lat: 24.0209, lng: 86.2076 },
        map,
        title: 'Parasnath Hill',
      });

      const infoWindow = new window.google.maps.InfoWindow({
        content: '<h3>Parasnath Hill</h3><p>Sacred Jain pilgrimage site</p>',
      });

      marker.addListener('click', () => infoWindow.open(map, marker));
    });
  }, []);

  return (
    <section className="map-preview">
      <h2>Location Overview</h2>
      <div ref={mapRef} className="map-container"></div>
      <div className="map-legend">
        <p>Explore the sacred landscape of Parasnath Hill</p>
      </div>
    </section>
  );
};

export default MapPreview;
