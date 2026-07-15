import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TempleService, Temple } from '../services/temple.service';
import { TrekkingService, TrekkingRoute } from '../services/trekking.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class Home implements OnInit {
  featuredTemples: Temple[] = [];
  featuredRoutes: TrekkingRoute[] = [];
  loading = true;

  constructor(
    private templeService: TempleService,
    private trekkingService: TrekkingService
  ) {}

  ngOnInit() {
    forkJoin({
      temples: this.templeService.getTemples(),
      routes: this.trekkingService.getTrekkingRoutes()
    }).subscribe({
      next: (res) => {
        this.featuredTemples = res.temples.slice(0, 3);
        this.featuredRoutes = res.routes.slice(0, 1);
        this.loading = false;
        
        // Notify parent App component that data has finished loading so it triggers GSAP ScrollTrigger
        setTimeout(() => {
          window.dispatchEvent(new CustomEvent('data-loaded'));
        }, 100);
      },
      error: (err) => {
        console.error('Failed to load home page data:', err);
        this.loading = false;
        setTimeout(() => {
          window.dispatchEvent(new CustomEvent('data-loaded'));
        }, 100);
      }
    });
  }
}
