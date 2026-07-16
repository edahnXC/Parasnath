import { Component, OnInit, OnDestroy, ViewChild, ElementRef, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { TrekkingService, TrekkingRoute, Waypoint } from '../services/trekking.service';

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
  private L: any = null;

  constructor(
    private trekkingService: TrekkingService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    this.trekkingService.getTrekkingRoutes().subscribe({
      next: (data) => {
        this.routes = data;
        if (data.length > 0) {
          this.selectedRoute = data[0];
          this.selectedWaypoint = data[0].waypoints[0] ?? null;
          
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
    setTimeout(() => this.initLeafletMap(), 50);
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('data-loaded'));
    }, 50);
  }

  selectWaypoint(wp: Waypoint) {
    this.selectedWaypoint = wp;
    if (this.map) {
      this.map.flyTo([wp.latitude, wp.longitude], 15);
    }
  }

  private async loadMapScript() {
    if (!isPlatformBrowser(this.platformId)) return;

    try {
      const leaflet = await import('leaflet');
      this.L = leaflet.default ? leaflet.default : leaflet;

      // Fix default Leaflet icon paths
      const iconRetinaUrl = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png';
      const iconUrl = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png';
      const shadowUrl = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png';
      
      const iconDefault = this.L.icon({
        iconRetinaUrl,
        iconUrl,
        shadowUrl,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        tooltipAnchor: [16, -28],
        shadowSize: [41, 41]
      });
      this.L.Marker.prototype.options.icon = iconDefault;

      this.initLeafletMap();
    } catch (err) {
      console.error('Failed to load Leaflet:', err);
      this.mapError = 'Failed to load Map library.';
    }
  }

  private initLeafletMap() {
    if (!this.selectedRoute || !this.selectedRoute.waypoints.length || !this.mapContainer || !this.L) return;
    
    try {
      this.clearMapObjects();
      this.mapError = null;

      const firstWp = this.selectedRoute.waypoints[0];

      this.map = this.L.map(this.mapContainer.nativeElement, {
        center: [firstWp.latitude, firstWp.longitude],
        zoom: 13
      });

      this.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.map);

      // Create polyline path coordinates
      const pathCoordinates = this.selectedRoute.waypoints.map(wp => [wp.latitude, wp.longitude]);

      this.polyline = this.L.polyline(pathCoordinates, {
        color: '#0d9488',
        weight: 4,
        opacity: 0.9
      }).addTo(this.map);

      const bounds = this.L.latLngBounds();
      
      this.selectedRoute.waypoints.forEach((wp, index) => {
        const position = [wp.latitude, wp.longitude];
        bounds.extend(position);

        const marker = this.L.marker(position, { title: wp.name }).addTo(this.map);
        
        const popupContent = `<div style="color:#1f2937;font-family:sans-serif;padding:4px;max-width:180px;">
                                <h4 style="margin:0 0 4px 0;font-size:13px;font-weight:700;">${index + 1}. ${wp.name}</h4>
                                <p style="margin:0;font-size:11px;line-height:1.4;color:#4b5563;">${wp.description}</p>
                              </div>`;
        
        marker.bindPopup(popupContent);
        
        marker.on('click', () => {
          this.selectWaypoint(wp);
        });

        this.markers.push(marker);
      });

      if (this.selectedRoute.waypoints.length > 1) {
        this.map.fitBounds(bounds, { padding: [30, 30] });
      }

    } catch (err) {
      console.error('Error initializing Leaflet map:', err);
      this.mapError = 'Failed to construct map layout.';
    }
  }

  private clearMapObjects() {
    if (this.map) {
      this.map.remove();
      this.map = null;
    }
    this.markers = [];
    this.polyline = null;
  }
}
