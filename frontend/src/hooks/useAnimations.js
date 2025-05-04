import { useEffect } from 'react';

// Helper function that can be called outside of React lifecycle
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
    threshold: 0.1
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
        section.classList.add('loaded');
      }, index * 200);
    });

    return () => {
      document.body.classList.remove('loaded');
      sections.forEach(section => section.classList.remove('loaded'));
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
    
    return () => {
      backToTop.removeEventListener('click', () => {});
      window.removeEventListener('scroll', handleScroll);
      backToTop.remove();
    };
  }, []);
};

export const useRouteAnimations = () => {
  useEffect(() => {
    const handleRouteChange = () => {
      // Use the helper function directly instead of the hook
      setTimeout(animateOnScroll, 300);
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