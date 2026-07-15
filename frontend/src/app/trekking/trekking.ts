import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrekkingService, TrekkingRoute, Waypoint } from '../services/trekking.service';
import { ConfigService } from '../services/config.service';

@Component({
  selector: 'app-trekking',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trekking.html',
  styleUrls: ['./trekking.scss']
})
export class Trekking implements OnInit, OnDestroy {
  @ViewChild('mapContainer', { static: false }) mapContainer!: ElementRef;
  
  routes: TrekkingRoute[] = [];
  selectedRoute: TrekkingRoute | null = null;
  selectedWaypoint: Waypoint | null = null;
  
  loading = true;
  mapError: string | null = null;
  private map: any = null;
  private markers: any[] = [];
  private polyline: any = null;

  constructor(
    private trekkingService: TrekkingService,
    private configService: ConfigService
  ) {}

  ngOnInit() {
    this.trekkingService.getTrekkingRoutes().subscribe({
      next: (data) => {
        this.routes = data;
        if (data.length > 0) {
          this.selectedRoute = data[0];
          this.selectedWaypoint = data[0].waypoints[0] ?? null;
          
          // Allow DOM to settle before loading map scripts
          setTimeout(() => this.loadMapScript(), 150);
        }
        this.loading = false;
        setTimeout(() => {
          window.dispatchEvent(new CustomEvent('data-loaded'));
        }, 80);
      },
      error: (err) => {
        console.error('Failed to load trekking routes:', err);
        this.loading = false;
        setTimeout(() => {
          window.dispatchEvent(new CustomEvent('data-loaded'));
        }, 80);
      }
    });
  }

  ngOnDestroy() {
    this.clearMapObjects();
  }

  selectRoute(route: TrekkingRoute) {
    this.selectedRoute = route;
    this.selectedWaypoint = route.waypoints[0] ?? null;
    setTimeout(() => this.initGoogleMap(), 50);
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('data-loaded'));
    }, 50);
  }

  selectWaypoint(wp: Waypoint) {
    this.selectedWaypoint = wp;
    if (this.map && (window as any).google) {
      this.map.panTo({ lat: wp.latitude, lng: wp.longitude });
      this.map.setZoom(15);
    }
  }

  private loadMapScript() {
    if ((window as any).google && (window as any).google.maps) {
      this.initGoogleMap();
      return;
    }

    const apiKey = this.configService.getGoogleMapsApiKey();
    if (!apiKey) {
      this.mapError = 'Google Maps API key is missing. Key must be configured on the backend environment variables.';
      return;
    }

    const scriptId = 'google-maps-script';
    if (document.getElementById(scriptId)) return;

    const script = document.createElement('script');
    script.id = scriptId;
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=geometry`;
    script.async = true;
    script.defer = true;
    script.onload = () => this.initGoogleMap();
    script.onerror = () => {
      this.mapError = 'Failed to load Google Maps script. Please verify internet access and API key configuration.';
    };
    document.head.appendChild(script);
  }

  private initGoogleMap() {
    if (!this.selectedRoute || !this.selectedRoute.waypoints.length || !this.mapContainer) return;
    
    const google = (window as any).google;
    if (!google || !google.maps) {
      this.mapError = 'Google Maps library could not be loaded.';
      return;
    }

    try {
      this.clearMapObjects();
      this.mapError = null;

      const firstWp = this.selectedRoute.waypoints[0];
      const mapOptions = {
        center: { lat: firstWp.latitude, lng: firstWp.longitude },
        zoom: 13,
        mapTypeId: 'terrain',
        styles: [
          {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }]
          }
        ]
      };

      this.map = new google.maps.Map(this.mapContainer.nativeElement, mapOptions);

      // Create polyline path coordinates
      const pathCoordinates = this.selectedRoute.waypoints.map(wp => ({
        lat: wp.latitude,
        lng: wp.longitude
      }));

      this.polyline = new google.maps.Polyline({
        path: pathCoordinates,
        geodesic: true,
        strokeColor: '#0d9488',
        strokeOpacity: 0.9,
        strokeWeight: 4,
        map: this.map
      });

      const bounds = new google.maps.LatLngBounds();
      
      this.selectedRoute.waypoints.forEach((wp, index) => {
        const position = { lat: wp.latitude, lng: wp.longitude };
        bounds.extend(position);

        const marker = new google.maps.Marker({
          position: position,
          map: this.map,
          title: wp.name,
          label: (index + 1).toString(),
          animation: google.maps.Animation.DROP
        });

        const infoWindow = new google.maps.InfoWindow({
          content: `<div style="color:#1f2937;font-family:sans-serif;padding:4px;max-width:180px;">
                      <h4 style="margin:0 0 4px 0;font-size:13px;font-weight:700;">${wp.name}</h4>
                      <p style="margin:0;font-size:11px;line-height:1.4;color:#4b5563;">${wp.description}</p>
                    </div>`
        });

        marker.addListener('click', () => {
          infoWindow.open(this.map, marker);
          this.selectWaypoint(wp);
        });

        this.markers.push(marker);
      });

      if (this.selectedRoute.waypoints.length > 1) {
        this.map.fitBounds(bounds);
      }

    } catch (err) {
      console.error('Error initializing google maps:', err);
      this.mapError = 'Failed to construct map layout.';
    }
  }

  private clearMapObjects() {
    this.markers.forEach(m => m.setMap(null));
    this.markers = [];
    if (this.polyline) {
      this.polyline.setMap(null);
      this.polyline = null;
    }
    this.map = null;
  }
}
