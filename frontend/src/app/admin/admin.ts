import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { TempleService, Temple } from '../services/temple.service';
import { TrekkingService, TrekkingRoute, Waypoint } from '../services/trekking.service';
import { environment } from '../../environments/environment';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.html',
  styleUrls: ['./admin.scss']
})
export class Admin implements OnInit {
  temples: Temple[] = [];
  routes: TrekkingRoute[] = [];
  activeTab: 'temples' | 'routes' = 'temples';
  loading = true;

  // Modals & States
  showTempleModal = false;
  showRouteModal = false;
  editingTempleId: number | null = null;
  editingRouteId: number | null = null;

  // Temple Form Model
  templeForm: Partial<Temple> = {
    name: '',
    location: '',
    description: '',
    shortDescription: '',
    mainImage: '',
    history: '',
    significance: '',
    architecture: '',
    bestTimeToVisit: '',
    facilities: '',
    images: []
  };

  // Route Form Model
  routeForm: Partial<TrekkingRoute> = {
    name: '',
    difficulty: 'Moderate',
    distance: 0,
    duration: '',
    startingPoint: '',
    description: '',
    mainImage: '',
    waypoints: []
  };

  // Waypoint Helper Model for adding inside routes
  newWaypoint: Partial<Waypoint> = {
    name: '',
    description: '',
    latitude: 24.0,
    longitude: 86.0,
    images: []
  };

  constructor(
    private templeService: TempleService,
    private trekkingService: TrekkingService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.refreshData();
  }

  refreshData() {
    this.loading = true;
    forkJoin({
      temples: this.templeService.getTemples(),
      routes: this.trekkingService.getTrekkingRoutes()
    }).subscribe({
      next: (res) => {
        this.temples = res.temples;
        this.routes = res.routes;
        this.loading = false;
        setTimeout(() => {
          window.dispatchEvent(new CustomEvent('data-loaded'));
        }, 80);
      },
      error: (err) => {
        console.error('Admin loading failed:', err);
        this.loading = false;
        setTimeout(() => {
          window.dispatchEvent(new CustomEvent('data-loaded'));
        }, 80);
      }
    });
  }

  // =============================
  // IMAGE DYNAMIC UPLOAD HELPER
  // =============================
  onImageSelected(event: any, target: 'temple-main' | 'route-main' | 'waypoint') {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    this.http.post<{ imageUrl: string }>(`${environment.apiUrl}/api/upload`, formData).subscribe({
      next: (res) => {
        if (target === 'temple-main') {
          this.templeForm.mainImage = res.imageUrl;
        } else if (target === 'route-main') {
          this.routeForm.mainImage = res.imageUrl;
        } else if (target === 'waypoint') {
          this.newWaypoint.images = [res.imageUrl];
        }
      },
      error: (err) => {
        console.error('Image upload failed:', err);
        alert('Image upload failed! Please verify backend is running.');
      }
    });
  }

  // =============================
  // TEMPLE CRUD HANDLERS
  // =============================
  openAddTemple() {
    this.editingTempleId = null;
    this.templeForm = {
      name: '',
      location: 'Parasnath Hill',
      description: '',
      shortDescription: '',
      mainImage: '',
      history: '',
      significance: '',
      architecture: '',
      bestTimeToVisit: '',
      facilities: '',
      images: []
    };
    this.showTempleModal = true;
  }

  openEditTemple(temple: Temple) {
    this.editingTempleId = temple.id;
    this.templeForm = { ...temple };
    this.showTempleModal = true;
  }

  saveTemple() {
    if (!this.templeForm.name || !this.templeForm.mainImage) return;

    if (this.editingTempleId) {
      this.templeService.updateTemple(this.editingTempleId, this.templeForm).subscribe({
        next: () => {
          this.showTempleModal = false;
          this.refreshData();
        },
        error: (err) => console.error(err)
      });
    } else {
      this.templeService.createTemple(this.templeForm).subscribe({
        next: () => {
          this.showTempleModal = false;
          this.refreshData();
        },
        error: (err) => console.error(err)
      });
    }
  }

  deleteTemple(id: number) {
    if (confirm('Are you sure you want to delete this temple?')) {
      this.templeService.deleteTemple(id).subscribe({
        next: () => this.refreshData(),
        error: (err) => console.error(err)
      });
    }
  }

  // =============================
  // TREKKING ROUTE CRUD HANDLERS
  // =============================
  openAddRoute() {
    this.editingRouteId = null;
    this.routeForm = {
      name: '',
      difficulty: 'Moderate',
      distance: 0,
      duration: '',
      startingPoint: 'Madhuban',
      description: '',
      mainImage: '',
      waypoints: []
    };
    this.showRouteModal = true;
  }

  openEditRoute(route: TrekkingRoute) {
    this.editingRouteId = route.id;
    this.routeForm = { ...route, waypoints: [...route.waypoints] };
    this.showRouteModal = true;
  }

  saveRoute() {
    if (!this.routeForm.name || !this.routeForm.mainImage) return;

    if (this.editingRouteId) {
      this.trekkingService.updateTrekkingRoute(this.editingRouteId, this.routeForm).subscribe({
        next: () => {
          this.showRouteModal = false;
          this.refreshData();
        },
        error: (err) => console.error(err)
      });
    } else {
      this.trekkingService.createTrekkingRoute(this.routeForm).subscribe({
        next: () => {
          this.showRouteModal = false;
          this.refreshData();
        },
        error: (err) => console.error(err)
      });
    }
  }

  deleteRoute(id: number) {
    if (confirm('Are you sure you want to delete this trekking route?')) {
      this.trekkingService.deleteTrekkingRoute(id).subscribe({
        next: () => this.refreshData(),
        error: (err) => console.error(err)
      });
    }
  }

  // Waypoints Builder inside Route Form
  addWaypoint() {
    if (!this.newWaypoint.name) return;
    this.routeForm.waypoints = this.routeForm.waypoints || [];
    this.routeForm.waypoints.push(this.newWaypoint as Waypoint);
    
    // Reset waypoint builder helper
    this.newWaypoint = {
      name: '',
      description: '',
      latitude: 24.0,
      longitude: 86.0,
      images: []
    };
  }

  removeWaypoint(index: number) {
    if (this.routeForm.waypoints) {
      this.routeForm.waypoints.splice(index, 1);
    }
  }
}
