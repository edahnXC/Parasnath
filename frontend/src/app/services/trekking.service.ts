import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Waypoint {
  id: number;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  images: string[];
  trekkingRouteId: number;
}

export interface TrekkingRoute {
  id: number;
  name: string;
  difficulty: string; // Easy, Moderate, Difficult
  distance: number;
  duration: string;
  startingPoint: string;
  description: string;
  mainImage: string;
  waypoints: Waypoint[];
  createdAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class TrekkingService {
  private apiUrl = `${environment.apiUrl}/api/trekking-routes`;

  constructor(private http: HttpClient) {}

  getTrekkingRoutes(): Observable<TrekkingRoute[]> {
    return this.http.get<TrekkingRoute[]>(this.apiUrl);
  }

  getTrekkingRoute(id: number): Observable<TrekkingRoute> {
    return this.http.get<TrekkingRoute>(`${this.apiUrl}/${id}`);
  }

  createTrekkingRoute(route: Partial<TrekkingRoute>): Observable<TrekkingRoute> {
    return this.http.post<TrekkingRoute>(this.apiUrl, route);
  }

  updateTrekkingRoute(id: number, route: Partial<TrekkingRoute>): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, route);
  }

  deleteTrekkingRoute(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
