// Simple mobile menu functionality for standalone site
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle functionality
    const mobileToggle = document.querySelector('.tve-m-trigger');
    const mobileMenu = document.querySelector('.tve-ham-wrap');
    const menuOverlay = document.querySelector('.tcb-menu-overlay');
    
    if (mobileToggle && mobileMenu) {
        mobileToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Toggle classes
            mobileToggle.classList.toggle('tve-triggered-icon');
            mobileMenu.classList.toggle('tve-m-expanded');
            
            // Toggle hamburger/close icon
            const openIcon = mobileToggle.querySelector('.tcb-icon-open');
            const closeIcon = mobileToggle.querySelector('.tcb-icon-close');
            
            if (mobileToggle.classList.contains('tve-triggered-icon')) {
                if (openIcon) openIcon.style.opacity = '0';
                if (closeIcon) closeIcon.style.opacity = '1';
            } else {
                if (openIcon) openIcon.style.opacity = '1';
                if (closeIcon) closeIcon.style.opacity = '0';
            }
        });
    }
    
    // Dropdown functionality
    const dropdownItems = document.querySelectorAll('.menu-item-has-children > a');
    dropdownItems.forEach(function(item) {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const parent = this.parentElement;
            parent.classList.toggle('expand-children');
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (mobileMenu && mobileMenu.classList.contains('tve-m-expanded')) {
            if (!mobileMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
                mobileToggle.classList.remove('tve-triggered-icon');
                mobileMenu.classList.remove('tve-m-expanded');
                
                const openIcon = mobileToggle.querySelector('.tcb-icon-open');
                const closeIcon = mobileToggle.querySelector('.tcb-icon-close');
                if (openIcon) openIcon.style.opacity = '1';
                if (closeIcon) closeIcon.style.opacity = '0';
            }
        }
    });
});