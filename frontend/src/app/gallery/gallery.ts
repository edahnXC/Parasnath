import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

interface PhotoItem {
  id: number;
  url: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gallery.html',
  styleUrls: ['./gallery.scss']
})
export class Gallery implements OnInit {
  photos: PhotoItem[] = [];
  selectedPhoto: PhotoItem | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<PhotoItem[]>(`${environment.apiUrl}/api/gallery`).subscribe({
      next: (data) => {
        this.photos = data;
        setTimeout(() => {
          window.dispatchEvent(new CustomEvent('data-loaded'));
        }, 80);
      },
      error: (err) => console.error('Failed to load gallery images', err)
    });
  }

  openLightbox(photo: PhotoItem) {
    this.selectedPhoto = photo;
  }

  closeLightbox() {
    this.selectedPhoto = null;
  }
}
