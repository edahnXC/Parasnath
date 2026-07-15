import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Temple {
  id: number;
  name: string;
  location: string;
  description: string;
  shortDescription: string;
  mainImage: string;
  history: string;
  significance: string;
  architecture: string;
  bestTimeToVisit: string;
  facilities: string;
  images: string[];
  createdAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class TempleService {
  private apiUrl = `${environment.apiUrl}/api/temples`;

  constructor(private http: HttpClient) {}

  getTemples(): Observable<Temple[]> {
    return this.http.get<Temple[]>(this.apiUrl);
  }

  getTemple(id: number): Observable<Temple> {
    return this.http.get<Temple>(`${this.apiUrl}/${id}`);
  }

  createTemple(temple: Partial<Temple>): Observable<Temple> {
    return this.http.post<Temple>(this.apiUrl, temple);
  }

  updateTemple(id: number, temple: Partial<Temple>): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, temple);
  }

  deleteTemple(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
