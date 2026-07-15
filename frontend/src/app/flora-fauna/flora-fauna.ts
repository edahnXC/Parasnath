import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

interface EcoItem {
  id: number;
  type: 'flora' | 'fauna';
  name: string;
  scientificName: string;
  description: string;
  imageUrl: string;
}

@Component({
  selector: 'app-flora-fauna',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './flora-fauna.html',
  styleUrls: ['./flora-fauna.scss']
})
export class FloraFauna implements OnInit {
  ecoItems: EcoItem[] = [];
  selectedType: 'all' | 'flora' | 'fauna' = 'all';
  filteredItems: EcoItem[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<EcoItem[]>(`${environment.apiUrl}/api/eco`).subscribe({
      next: (data) => {
        this.ecoItems = data;
        this.filterItems('all');
      },
      error: (err) => console.error('Failed to load Eco Items', err)
    });
  }

  filterItems(type: 'all' | 'flora' | 'fauna') {
    this.selectedType = type;
    if (type === 'all') {
      this.filteredItems = this.ecoItems;
    } else {
      this.filteredItems = this.ecoItems.filter(item => item.type === type);
    }
    // Refresh ScrollTrigger
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('data-loaded'));
    }, 50);
  }
}
