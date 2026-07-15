import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

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
  photos: PhotoItem[] = [
    {
      id: 1,
      url: 'https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=800',
      title: 'Sunrise at the Summit',
      description: 'Misty golden sunrise rays hitting the peaks of the Tirthankara shrines.'
    },
    {
      id: 2,
      url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800',
      title: 'Mountain Slopes',
      description: 'Dense forests carpeting the hills on the climb from Madhuban.'
    },
    {
      id: 3,
      url: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?q=80&w=800',
      title: 'Shikharji Temple Domes',
      description: 'White marble domes reaching to the skies under the mountain fog.'
    },
    {
      id: 4,
      url: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=800',
      title: 'Tall Sal Forests',
      description: 'Sal trees lining the paved stone trail.'
    },
    {
      id: 5,
      url: 'https://images.unsplash.com/photo-1515002246390-7bf7e8f87b54?q=80&w=800',
      title: 'Deciduous Vegetation',
      description: 'Close up of rare medicinal ferns growing on mountain slopes.'
    },
    {
      id: 6,
      url: 'https://images.unsplash.com/photo-1602616191538-40d02b26af29?q=80&w=800',
      title: 'Bhomia Baba Stone Carvings',
      description: 'Intricate patterns carved on the ancient stone blocks of the guardian temple.'
    }
  ];

  selectedPhoto: PhotoItem | null = null;

  ngOnInit() {
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('data-loaded'));
    }, 80);
  }

  openLightbox(photo: PhotoItem) {
    this.selectedPhoto = photo;
  }

  closeLightbox() {
    this.selectedPhoto = null;
  }
}
