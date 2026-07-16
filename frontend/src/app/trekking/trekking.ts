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

      // We are embedding Base64 image URIs instead of linking to UNPKG
      // because Edge Tracking Prevention automatically blocks UNPKG and breaks the map.
      const iconRetinaUrl = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAA+CAMAAABCpsQ+AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAflBMVEXAwMB6enq2trZXV1fIyMjS0tLR0dHNzc3Jycny8vL////u7u7Ozs6+vr6oqKiysrLCwsKnp6e/v7/X19ejo6PZ2dnh4eHt7e3o6Ojq6uqxsbHi4uLV1dXPz8+pqanq6ur19fX4+Pjh4eHj4+P29vb6+vr8/Pz9/f339/f5+flB4h35AAAAn0lEQVRIx+3VQQ7CIBQFQEFAVJT3v1aC/x80q4kTt84wG2d+X8B/QAAECBAgQIAAAQIECBAgQIAAAQIECBAg8L+ATsDPwJ6A/wF4BHgFvAL+BRwKOBQwC/gXMCvgV8Cz4L/AZ4F3gX+BdwE7Ak4FOAGnAgwFGAowFGAowFCAoQBDAU4FOAGnAnYE3gXeBT4L/BZ4FjwLeBa8C/wMeAX4AFy6D/iH7X7nAAAAAElFTkSuQmCC';
      const iconUrl = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAApCAYAAADAk4LOAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAo0lEQVRYx+2XMQrCQBBFf8WkSBG8gOQW3sLCxsJT2NjZW6Sxt4l4A9s06RXS5N+E2U02uBAM+fDx8+YPy7IsS1QkM82W63k4n3E7HHA5HHE9n3E5n3E7HHE7HHE5n3E5n7E5HHE7HHE5n3E5n7E5HHE7HHE5n3E5n7E5nHE7HHE5n3E5n7E5nHE7HHE5n3E5n7E5nHE7HHE5n3E5n7E5nHE7HHE5n8e7D5L4W9yCAAAAAElFTkSuQmCC';
      const shadowUrl = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACkAAAApCAYAAACoYAD2AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAi0lEQVRYx+3VQQ6AIAwEwEBQVP7/Vsn+hwY1cWLSmZ01O9v+AvgPIECAAAECBAgQIECAAAECBAgQIECAwF8CpYBSQClQDvQK7AruCu4K7gruCu4K7goeC/4LPAveBd4F3gXeBd4F3gXeBd4F3gWcCDgRcCLgRMCJgBMBJwJOBJwIOBFwIuC7wLOAPwAN0T5p3u2rLQAAAABJRU5ErkJggg==';
      
      const iconDefault = this.L.icon({
        iconUrl,
        iconRetinaUrl,
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

      // Ensure the map resizes correctly if the container was hidden or flex layout changed
      setTimeout(() => {
        if (this.map) {
          this.map.invalidateSize();
          
          // Fit bounds AFTER the size is recalculated to avoid the rectangle rendering bug
          if (this.selectedRoute!.waypoints.length > 1) {
            this.map.fitBounds(bounds, { padding: [30, 30] });
          }
        }
      }, 100);

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
