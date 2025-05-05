import { useEffect } from 'react';

const animateOnScroll = () => {
  const elements = document.querySelectorAll('.reveal');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-active');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  elements.forEach(element => {
    observer.observe(element);
  });
};

export const useScrollAnimation = () => {
  useEffect(() => {
    animateOnScroll();
    
    return () => {
      const elements = document.querySelectorAll('.reveal');
      elements.forEach(el => el.classList.remove('reveal-active'));
    };
  }, []);
};

export const usePageLoadAnimation = () => {
  useEffect(() => {
    document.body.classList.add('loaded');
    
    const sections = document.querySelectorAll('section, .page');
    sections.forEach((section, index) => {
      setTimeout(() => {
        section.style.transition = `opacity 0.6s ease-out ${index * 0.1}s, transform 0.6s ease-out ${index * 0.1}s`;
        section.classList.add('loaded');
      }, 50);
    });

    return () => {
      document.body.classList.remove('loaded');
      sections.forEach(section => {
        section.style.transition = '';
        section.classList.remove('loaded');
      });
    };
  }, []);
};

export const useBackToTop = () => {
  useEffect(() => {
    const backToTop = document.createElement('div');
    backToTop.className = 'back-to-top';
    backToTop.innerHTML = '↑';
    document.body.appendChild(backToTop);
    
    const handleScroll = () => {
      if (window.pageYOffset > 300) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    };
    
    backToTop.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initialize
    
    return () => {
      backToTop.removeEventListener('click', () => {});
      window.removeEventListener('scroll', handleScroll);
      if (backToTop.parentNode) {
        backToTop.parentNode.removeChild(backToTop);
      }
    };
  }, []);
};

export const useRouteAnimations = () => {
  useEffect(() => {
    const handleRouteChange = () => {
      setTimeout(() => {
        animateOnScroll();
      }, 300);
    };

    // Store original pushState
    const originalPushState = window.history.pushState;
    
    // Override pushState
    window.history.pushState = function() {
      originalPushState.apply(this, arguments);
      handleRouteChange();
    };

    // Handle popstate
    window.addEventListener('popstate', handleRouteChange);
    
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
      window.history.pushState = originalPushState;
    };
  }, []);
};

export const useAllAnimations = () => {
  usePageLoadAnimation();
  useScrollAnimation();
  useBackToTop();
  useRouteAnimations();
};