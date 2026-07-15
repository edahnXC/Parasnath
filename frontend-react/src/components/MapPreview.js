import React, { useEffect, useRef, useState } from 'react';
import '../styles/mapPreview.scss';

const MapPreview = () => {
  const mapRef = useRef(null);
  const [mapError, setMapError] = useState(null);

  useEffect(() => {
    const initMap = () => {
      try {
        if (!window.google || !window.google.maps) {
          throw new Error('Google Maps API not loaded');
        }

        const map = new window.google.maps.Map(mapRef.current, {
          center: { lat: 23.9611, lng: 86.1371 },
          zoom: 13,
          mapTypeId: 'terrain',
          styles: [
            {
              featureType: 'poi',
              elementType: 'labels',
              stylers: [{ visibility: 'off' }]
            }
          ]
        });

        const marker = new window.google.maps.Marker({
          position: { lat: 23.9611, lng: 86.1371 },
          map,
          title: 'Parasnath Hill',
          icon: {
            url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png'
          }
        });

        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <div style="padding: 10px;">
              <h3 style="margin: 0 0 5px 0; color: #2c3e50;">Parasnath Hill</h3>
              <p style="margin: 0; color: #7f8c8d;">Sacred Jain pilgrimage site</p>
            </div>
          `,
        });

        marker.addListener('click', () => {
          infoWindow.open(map, marker);
        });

        // Auto-open info window
        infoWindow.open(map, marker);

      } catch (error) {
        console.error('Map initialization error:', error);
        setMapError('Failed to load map. Please try again later.');
      }
    };

    // Load Google Maps script dynamically if not already loaded
    if (!window.google || !window.google.maps) {
      const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

      if (!apiKey) {
        setMapError('Google Maps API key is missing.');
        return;
      }

      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = initMap;
      script.onerror = () => setMapError('Failed to load Google Maps script.');
      document.head.appendChild(script);
    } else {
      initMap();
    }
  }, []);

  return (
    <section className="map-preview">
      <h2>Location Overview</h2>
      {mapError ? (
        <div className="map-error">
          <p>{mapError}</p>
        </div>
      ) : (
        <div ref={mapRef} className="map-container"></div>
      )}
      <div className="map-legend">
        <p>Explore the sacred landscape of Parasnath Hill</p>
      </div>
    </section>
  );
};

export default MapPreview;
