import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private apiUrl = `${environment.apiUrl}/api/config`;
  private config: { googleMapsApiKey: string } | null = null;

  constructor(private http: HttpClient) {}

  async loadConfig(): Promise<void> {
    try {
      this.config = await firstValueFrom(
        this.http.get<{ googleMapsApiKey: string }>(this.apiUrl)
      );
    } catch (error) {
      console.error('Failed to load backend config:', error);
      this.config = { googleMapsApiKey: '' };
    }
  }

  getGoogleMapsApiKey(): string {
    return this.config?.googleMapsApiKey ?? '';
  }
}
