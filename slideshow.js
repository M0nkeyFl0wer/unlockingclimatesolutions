// Simple Slideshow Component for Climate Solutions Site
class Slideshow {
    constructor(containerId, images) {
        this.container = document.getElementById(containerId);
        this.images = images;
        this.currentSlide = 0;
        this.init();
    }

    init() {
        if (!this.container) return;
        
        this.container.innerHTML = `
            <div class="slideshow-wrapper" style="position: relative; width: 100%; height: 0; padding-top: 56.25%; background: #f0f0f0; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px 0 rgba(63,69,81,0.16);">
                <div class="slideshow-container" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;">
                    <img class="slide-image" src="${this.images[0]}" style="width: 100%; height: 100%; object-fit: cover; display: block;" alt="Slide ${this.currentSlide + 1}" loading="lazy">
                    
                    <div class="slide-controls" style="position: absolute; bottom: 20px; left: 50%; transform: translateX(-50%); display: flex; align-items: center; gap: 15px; background: rgba(0,0,0,0.7); padding: 10px 15px; border-radius: 25px;">
                        <button class="prev-btn" style="background: none; border: none; color: white; font-size: 18px; cursor: pointer; padding: 5px; line-height: 1; border-radius: 50%; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center;" title="Previous slide">‹</button>
                        
                        <div class="slide-indicators" style="display: flex; gap: 8px; align-items: center;">
                            ${this.images.map((_, index) => 
                                `<span class="indicator ${index === 0 ? 'active' : ''}" data-slide="${index}" style="width: 8px; height: 8px; border-radius: 50%; background: ${index === 0 ? 'white' : 'rgba(255,255,255,0.5)'}; cursor: pointer; transition: background 0.3s ease;"></span>`
                            ).join('')}
                        </div>
                        
                        <span class="slide-counter" style="color: white; font-size: 14px; min-width: 40px; text-align: center;">1/${this.images.length}</span>
                        
                        <button class="next-btn" style="background: none; border: none; color: white; font-size: 18px; cursor: pointer; padding: 5px; line-height: 1; border-radius: 50%; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center;" title="Next slide">›</button>
                    </div>
                </div>
            </div>
        `;

        this.bindEvents();
    }

    bindEvents() {
        const prevBtn = this.container.querySelector('.prev-btn');
        const nextBtn = this.container.querySelector('.next-btn');
        const indicators = this.container.querySelectorAll('.indicator');

        prevBtn.addEventListener('click', () => this.prevSlide());
        nextBtn.addEventListener('click', () => this.nextSlide());

        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goToSlide(index));
        });

        // Keyboard navigation
        this.container.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prevSlide();
            if (e.key === 'ArrowRight') this.nextSlide();
        });

        // Auto-advance slides every 10 seconds (optional)
        this.autoAdvance = setInterval(() => this.nextSlide(), 10000);
        
        // Pause auto-advance on hover
        this.container.addEventListener('mouseenter', () => clearInterval(this.autoAdvance));
        this.container.addEventListener('mouseleave', () => {
            this.autoAdvance = setInterval(() => this.nextSlide(), 10000);
        });
    }

    updateSlide() {
        const image = this.container.querySelector('.slide-image');
        const counter = this.container.querySelector('.slide-counter');
        const indicators = this.container.querySelectorAll('.indicator');

        image.src = this.images[this.currentSlide];
        image.alt = `Slide ${this.currentSlide + 1}`;
        counter.textContent = `${this.currentSlide + 1}/${this.images.length}`;

        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.currentSlide);
            indicator.style.background = index === this.currentSlide ? 'white' : 'rgba(255,255,255,0.5)';
        });
    }

    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.images.length;
        this.updateSlide();
    }

    prevSlide() {
        this.currentSlide = (this.currentSlide - 1 + this.images.length) % this.images.length;
        this.updateSlide();
    }

    goToSlide(index) {
        this.currentSlide = index;
        this.updateSlide();
    }
}

// Predefined slide collections for different presentations
const SLIDE_COLLECTIONS = {
    'carbon-accounting': [
        'wp-content/uploads/2023/11/1.jpg',
        'wp-content/uploads/2023/11/2.jpg'
    ],
    'supply-chain': [
        'wp-content/uploads/2023/11/4-1.jpg',
        'wp-content/uploads/2023/11/5.jpg'
    ],
    'renewable-energy': [
        'wp-content/uploads/2023/11/1.jpg',
        'wp-content/uploads/2023/11/2.jpg',
        'wp-content/uploads/2023/11/4-1.jpg'
    ],
    'monitoring': [
        'wp-content/uploads/2023/11/5.jpg',
        'wp-content/uploads/2023/11/1.jpg'
    ],
    'deepdive': [
        'wp-content/uploads/2023/11/2.jpg',
        'wp-content/uploads/2023/11/4-1.jpg',
        'wp-content/uploads/2023/11/5.jpg'
    ]
};

// Function to initialize slideshows on page load
function initializeSlideshows() {
    // Check which page we're on and initialize appropriate slideshows
    const currentPage = window.location.pathname.split('/').pop().replace('.html', '');
    
    // Find slideshow containers and initialize them
    document.querySelectorAll('[data-slideshow]').forEach((container, index) => {
        const slideshowType = container.getAttribute('data-slideshow') || currentPage || 'carbon-accounting';
        const slides = SLIDE_COLLECTIONS[slideshowType] || SLIDE_COLLECTIONS['carbon-accounting'];
        
        new Slideshow(container.id || `slideshow-${index}`, slides);
    });
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeSlideshows);
} else {
    initializeSlideshows();
}