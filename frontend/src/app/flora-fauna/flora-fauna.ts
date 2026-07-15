import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

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
  ecoItems: EcoItem[] = [
    {
      id: 1,
      type: 'flora',
      name: 'Sal Tree (Shorea robusta)',
      scientificName: 'Shorea robusta',
      description: 'The dominant tree species covering the slopes of Parasnath Hill. Its wood is highly valued for durability, and the forest canopy provides shelter to various bird species.',
      imageUrl: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=600'
    },
    {
      id: 2,
      type: 'flora',
      name: 'Medicinal Herbs',
      scientificName: 'Various Species',
      description: 'The hill is renowned for its diverse collection of rare Ayurvedic herbs. Scholars and botanists visit to study wild species used in traditional medicines.',
      imageUrl: 'https://images.unsplash.com/photo-1515002246390-7bf7e8f87b54?q=80&w=600'
    },
    {
      id: 3,
      type: 'fauna',
      name: 'Wild Boar (Sus scrofa)',
      scientificName: 'Sus scrofa',
      description: 'Commonly found roaming in the dense forest layers of the slopes. They play a key role in the forest ecosystem by turning up the soil during feeding.',
      imageUrl: 'https://images.unsplash.com/photo-1590502593747-42a996133562?q=80&w=600'
    },
    {
      id: 4,
      type: 'fauna',
      name: 'Deciduous Birds',
      scientificName: 'Avifauna',
      description: 'Parasnath is a paradise for birdwatchers, featuring rare species of drongos, hornbills, and thrushes nesting in the tall Sal branches.',
      imageUrl: 'https://images.unsplash.com/photo-1444464666168-49d633b86797?q=80&w=600'
    }
  ];

  selectedType: 'all' | 'flora' | 'fauna' = 'all';
  filteredItems: EcoItem[] = [];

  ngOnInit() {
    this.filterItems('all');
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('data-loaded'));
    }, 80);
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
