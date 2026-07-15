import { Component, OnInit, OnDestroy, HostListener, ChangeDetectorRef } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { CommonModule } from '@angular/common';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit, OnDestroy {
  darkMode = true;
  menuOpen = false;
  isScrolled = false;
  currentYear = new Date().getFullYear();

  isRouteLoading = false;
  loadingProgress = 0;
  private progressInterval: any;
  private safetyTimeout: any;

  private revealDone = false;
  private dataLoadedHandler = () => this.onDataLoaded();

  constructor(private router: Router, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    // Theme init
    const saved = localStorage.getItem('theme');
    if (saved === 'light') {
      this.darkMode = false;
      document.body.classList.add('light-mode');
    } else {
      this.darkMode = true;
      document.body.classList.remove('light-mode');
    }

    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.startLoadingProgress();
      } else if (event instanceof NavigationEnd) {
        this.revealDone = false;
        window.scrollTo({ top: 0, behavior: 'instant' });

        if (this.safetyTimeout) {
          clearTimeout(this.safetyTimeout);
        }

        this.completeLoadingProgress();

        // Trigger reveal after a short delay to allow views to render
        this.safetyTimeout = setTimeout(() => {
          if (!this.revealDone) {
            this.onDataLoaded();
          }
        }, 500);
      } else if (event instanceof NavigationCancel || event instanceof NavigationError) {
        this.completeLoadingProgress();
      }
    });

    window.addEventListener('data-loaded', this.dataLoadedHandler);
    this.checkScroll();
  }

  ngOnDestroy() {
    window.removeEventListener('data-loaded', this.dataLoadedHandler);
    if (this.progressInterval) {
      clearInterval(this.progressInterval);
    }
    if (this.safetyTimeout) {
      clearTimeout(this.safetyTimeout);
    }
  }

  private startLoadingProgress() {
    this.isRouteLoading = true;
    this.loadingProgress = 15;
    
    if (this.progressInterval) {
      clearInterval(this.progressInterval);
    }

    this.progressInterval = setInterval(() => {
      if (this.loadingProgress < 85) {
        this.loadingProgress += (90 - this.loadingProgress) * 0.08;
      }
    }, 150);
  }

  private completeLoadingProgress() {
    if (this.progressInterval) {
      clearInterval(this.progressInterval);
    }
    this.loadingProgress = 100;
    setTimeout(() => {
      this.isRouteLoading = false;
      setTimeout(() => {
        this.loadingProgress = 0;
      }, 300);
    }, 250);
  }

  private onDataLoaded() {
    this.completeLoadingProgress();
    if (this.revealDone) return;
    this.revealDone = true;
    this.cdr.detectChanges();
    setTimeout(() => this.initScrollReveal(), 50);
  }

  @HostListener('window:scroll')
  checkScroll() {
    this.isScrolled = window.scrollY > 30;
  }

  toggleTheme() {
    this.darkMode = !this.darkMode;
    document.body.classList.toggle('light-mode', !this.darkMode);
    localStorage.setItem('theme', this.darkMode ? 'dark' : 'light');
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
    document.body.style.overflow = this.menuOpen ? 'hidden' : '';
  }

  closeMenu() {
    this.menuOpen = false;
    document.body.style.overflow = '';
  }

  onOverlayClick(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('mobile-menu')) {
      this.closeMenu();
    }
  }

  @HostListener('document:keydown.escape')
  onEscape() {
    this.closeMenu();
  }

  initScrollReveal() {
    ScrollTrigger.getAll().forEach(t => t.kill());

    const animateEl = (el: HTMLElement, fromVars: any, toVars: any, delay = 0) => {
      const rect = el.getBoundingClientRect();
      const inViewport = rect.top < window.innerHeight;

      if (inViewport) {
        gsap.fromTo(el, fromVars, {
          ...toVars,
          delay,
          duration: toVars.duration ?? 0.8,
          ease: toVars.ease ?? 'power3.out'
        });
      } else {
        gsap.fromTo(el, fromVars, {
          ...toVars,
          delay,
          duration: toVars.duration ?? 0.8,
          ease: toVars.ease ?? 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 92%',
            toggleActions: 'play none none none'
          }
        });
      }
    };

    gsap.utils.toArray<HTMLElement>('.reveal').forEach((el, i) => {
      animateEl(el, { opacity: 0, y: 30 }, { opacity: 1, y: 0 }, i * 0.05);
    });

    gsap.utils.toArray<HTMLElement>('.reveal-left').forEach(el => {
      animateEl(el, { opacity: 0, x: -40 }, { opacity: 1, x: 0 });
    });

    gsap.utils.toArray<HTMLElement>('.reveal-right').forEach(el => {
      animateEl(el, { opacity: 0, x: 40 }, { opacity: 1, x: 0 });
    });

    gsap.utils.toArray<HTMLElement>('.reveal-scale').forEach((el, i) => {
      animateEl(
        el,
        { opacity: 0, scale: 0.92 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: 'power3.out'
        },
        i * 0.06
      );
    });

    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);
  }
}
