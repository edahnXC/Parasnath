import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TempleService, Temple } from '../services/temple.service';

@Component({
  selector: 'app-temples',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './temples.html',
  styleUrls: ['./temples.scss']
})
export class Temples implements OnInit {
  temples: Temple[] = [];
  filteredTemples: Temple[] = [];
  selectedTemple: Temple | null = null;
  
  searchTerm = '';
  loading = true;

  constructor(
    private templeService: TempleService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.templeService.getTemples().subscribe({
      next: (data) => {
        this.temples = data;
        this.filteredTemples = data;
        this.loading = false;
        
        // Listen for query params for direct temple linking
        this.route.queryParams.subscribe(params => {
          const idStr = params['id'];
          if (idStr) {
            const id = parseInt(idStr, 10);
            const found = this.temples.find(t => t.id === id);
            if (found) {
              this.selectedTemple = found;
              // Smooth scroll to top when selecting
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          } else {
            this.selectedTemple = null;
          }
        });

        // Trigger GSAP ScrollTrigger
        setTimeout(() => {
          window.dispatchEvent(new CustomEvent('data-loaded'));
        }, 80);
      },
      error: (err) => {
        console.error('Failed to load temples:', err);
        this.loading = false;
        setTimeout(() => {
          window.dispatchEvent(new CustomEvent('data-loaded'));
        }, 80);
      }
    });
  }

  filterTemples() {
    if (!this.searchTerm.trim()) {
      this.filteredTemples = this.temples;
    } else {
      const term = this.searchTerm.toLowerCase();
      this.filteredTemples = this.temples.filter(t => 
        t.name.toLowerCase().includes(term) ||
        t.location.toLowerCase().includes(term) ||
        t.shortDescription.toLowerCase().includes(term) ||
        t.description.toLowerCase().includes(term) ||
        t.significance.toLowerCase().includes(term)
      );
    }
    // Refresh scroll trigger after updates
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('data-loaded'));
    }, 100);
  }

  viewDetails(temple: Temple) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { id: temple.id },
      queryParamsHandling: 'merge'
    });
  }

  closeDetails() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { id: null },
      queryParamsHandling: 'merge'
    });
  }
}
