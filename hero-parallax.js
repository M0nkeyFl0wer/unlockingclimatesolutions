// Hero Parallax Effect JavaScript
// Handles parallax scrolling effects for hero sections

(function() {
    'use strict';
    
    document.addEventListener('DOMContentLoaded', function() {
        // Check if user prefers reduced motion
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        if (prefersReducedMotion) {
            return; // Skip parallax effects for accessibility
        }
        
        // Find hero sections with background images
        const heroSections = document.querySelectorAll('[data-css*="background-image"], .tve-page-section-out');
        
        if (heroSections.length === 0) {
            return; // No hero sections found
        }
        
        // Parallax scroll handler
        function handleParallaxScroll() {
            const scrollTop = window.pageYOffset;
            
            heroSections.forEach((section, index) => {
                const rect = section.getBoundingClientRect();
                const sectionTop = rect.top + scrollTop;
                const sectionHeight = rect.height;
                
                // Only apply parallax to sections in viewport
                if (scrollTop + window.innerHeight > sectionTop && scrollTop < sectionTop + sectionHeight) {
                    const parallaxSpeed = 0.5; // Adjust speed as needed
                    const yPos = -(scrollTop - sectionTop) * parallaxSpeed;
                    
                    if (section.style.backgroundImage) {
                        section.style.backgroundPosition = `center ${yPos}px`;
                    }
                }
            });
        }
        
        // Throttled scroll handler for better performance
        let ticking = false;
        function requestTick() {
            if (!ticking) {
                requestAnimationFrame(handleParallaxScroll);
                ticking = true;
                setTimeout(() => {
                    ticking = false;
                }, 16); // ~60fps
            }
        }
        
        // Add scroll event listener
        window.addEventListener('scroll', requestTick, { passive: true });
        
        // Initial call
        handleParallaxScroll();
    });
})();