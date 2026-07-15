import { useEffect } from 'react';

const useScrollAnimation = () => {
  useEffect(() => {
    const scrollReveal = () => {
      const sections = document.querySelectorAll('.intro-section, .video-section');
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal');
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1
      });

      sections.forEach(section => {
        observer.observe(section);
      });
    };

    const scrollProgress = () => {
      const progressBar = document.createElement('div');
      progressBar.className = 'scroll-progress';
      document.body.appendChild(progressBar);
      
      window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
      });
    };

    const backToTop = () => {
      const btn = document.createElement('div');
      btn.className = 'floating-btn';
      btn.innerHTML = '↑';
      document.body.appendChild(btn);
      
      btn.addEventListener('click', () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
      
      window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
          btn.classList.add('visible');
        } else {
          btn.classList.remove('visible');
        }
      });
    };

    scrollReveal();
    scrollProgress();
    backToTop();

    // Cleanup function
    return () => {
      const progressBar = document.querySelector('.scroll-progress');
      const floatingBtn = document.querySelector('.floating-btn');
      if (progressBar) progressBar.remove();
      if (floatingBtn) floatingBtn.remove();
    };
  }, []);
};

export default useScrollAnimation;