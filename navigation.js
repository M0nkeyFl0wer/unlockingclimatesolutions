// Centralized Navigation System for Unlocking Climate Solutions
// This allows for easy maintenance of navigation across all pages

const NavigationConfig = {
    // Base URL for the site (change this when moving to production)
    baseUrl: '',
    
    // Logo configuration
    logo: {
        src: 'wp-content/uploads/2023/10/elephant_that_needed_cropping.png',
        alt: 'Unlocking Climate Solutions',
        href: 'index.html'
    },
    
    // Main navigation menu items - all in one horizontal menu
    menuItems: [
        {
            label: 'Solutions',
            href: '#',
            hasDropdown: true,
            submenu: [
                {
                    label: 'Carbon Accounting',
                    href: 'carbon-accounting.html'
                },
                {
                    label: 'Renewable Energy', 
                    href: 'renewable-energy.html'
                },
                {
                    label: 'Supply Chain',
                    href: 'supply-chain.html'
                },
                {
                    label: 'Monitoring Reporting Verification',
                    href: 'monitoring-reporting-verification.html'
                }
            ]
        },
        {
            label: 'Why Ethereum',
            href: 'why-ethereum.html'
        },
        {
            label: 'About Us',
            href: 'aboutus.html'
        },
        {
            label: 'Deep Dive',
            href: 'deepdive.html'
        }
    ]
};

// Function to generate the complete navigation HTML
function generateNavigation() {
    return `
    <div class="thrv_wrapper thrv_widget_menu tve-custom-menu-upgrade tve-menu-template-light-tmp-first tve-mobile-side-fullscreen tcb-local-vars-root da-fade tcb-logo-split tve-regular" data-tve-switch-icon="mobile" data-css="tve-u-178d4c6bb16">
        <div class="thrive-shortcode-html thrive-symbol-shortcode">
            <div class="tcb-hamburger-logo">
                <a class="tcb-logo thrv_wrapper tve-dynamic-link" href="${NavigationConfig.logo.href}">
                    <picture>
                        <img src="${NavigationConfig.logo.src}" alt="${NavigationConfig.logo.alt}">
                    </picture>
                </a>
            </div>
            
            <!-- Mobile Menu Trigger -->
            <a class="tve-m-trigger" href="#">
                <div class="thrv_wrapper thrv_icon tcb-icon-open">
                    <svg class="tcb-icon" viewBox="0 0 32 32">
                        <path d="M4 10h24a2 2 0 000-4H4a2 2 0 000 4zM4 18h24a2 2 0 000-4H4a2 2 0 000 4zM4 26h24a2 2 0 000-4H4a2 2 0 000 4z"/>
                    </svg>
                </div>
                <div class="thrv_wrapper thrv_icon tcb-icon-close" style="display: none;">
                    <svg class="tcb-icon" viewBox="0 0 32 32">
                        <path d="M25.313 8.563l-8.563 8.563 8.563 8.563-1.687 1.687-8.563-8.563-8.563 8.563-1.687-1.687 8.563-8.563-8.563-8.563 1.687-1.687 8.563 8.563 8.563-8.563z"/>
                    </svg>
                </div>
            </a>
            
            <div class="tve-ham-wrap">
                <!-- Main Navigation Menu -->
                <ul id="main-menu" class="tve_w_menu tve_horizontal" data-iid="15">
                    ${NavigationConfig.menuItems.map((item, index) => `
                    <li class="menu-item menu-item-${index + 1} ${item.hasDropdown ? 'menu-item-has-children' : ''} lvl-0 tcb-local-vars-root tve_editable" data-id="${index + 1}">
                        <a class="menu-item-${index + 1}-a" href="${item.href}">
                            <span class="tve-disabled-text-inner">${item.label}</span>
                            ${item.hasDropdown ? `
                            <span class="tve-item-dropdown-trigger">
                                <svg class="tcb-icon" viewBox="0 0 16 16">
                                    <path d="M8 11L3 6h10z"/>
                                </svg>
                            </span>` : ''}
                        </a>
                        ${item.hasDropdown ? `
                        <ul class="sub-menu menu-item-${index + 1}-ul tve_editable">
                            ${item.submenu.map((subItem, subIndex) => `
                            <li class="menu-item menu-item-${index + 1}-${subIndex + 1} lvl-1 tve_editable" data-id="${index + 1}-${subIndex + 1}">
                                <a href="${subItem.href}">
                                    <span class="tve-disabled-text-inner">${subItem.label}</span>
                                </a>
                            </li>`).join('')}
                        </ul>` : ''}
                    </li>`).join('')}
                </ul>
            </div>
        </div>
    </div>`;
}

// Function to inject navigation into a page
function injectNavigation() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            setTimeout(insertNavigationHTML, 100); // Small delay to ensure everything is loaded
        });
    } else {
        insertNavigationHTML();
    }
}

function insertNavigationHTML() {
    // For this specific site, we need to find the header container and inject our navigation
    const headerContainer = document.getElementById('thrive-header');
    
    if (headerContainer) {
        // Clear any existing navigation content
        const existingNav = headerContainer.querySelector('.thrive-shortcode-html');
        if (existingNav) {
            // Replace the entire content
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = generateNavigation();
            const newNav = tempDiv.firstElementChild;
            
            existingNav.innerHTML = '';
            existingNav.appendChild(newNav);
            
            // Initialize mobile menu functionality
            initializeMobileMenu();
        } else {
            // Create new navigation if none exists
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = generateNavigation();
            const newNav = tempDiv.firstElementChild;
            
            headerContainer.innerHTML = '';
            headerContainer.appendChild(newNav);
            initializeMobileMenu();
        }
    } else {
        // Fallback: inject at the very top of body
        const body = document.body;
        if (body) {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = generateNavigation();
            const newNav = tempDiv.firstElementChild;
            
            body.insertBefore(newNav, body.firstChild);
            initializeMobileMenu();
        }
    }
}

// Mobile menu functionality
function initializeMobileMenu() {
    const trigger = document.querySelector('.tve-m-trigger');
    const hamWrap = document.querySelector('.tve-ham-wrap');
    const openIcon = document.querySelector('.tcb-icon-open');
    const closeIcon = document.querySelector('.tcb-icon-close');
    
    if (trigger && hamWrap) {
        trigger.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Toggle mobile menu
            const isExpanded = hamWrap.classList.contains('tve-m-expanded');
            
            if (isExpanded) {
                hamWrap.classList.remove('tve-m-expanded');
                trigger.classList.remove('tve-triggered-icon');
                openIcon.style.display = 'block';
                closeIcon.style.display = 'none';
                document.body.style.overflow = ''; // Re-enable scrolling
            } else {
                hamWrap.classList.add('tve-m-expanded');
                trigger.classList.add('tve-triggered-icon');
                openIcon.style.display = 'none';
                closeIcon.style.display = 'block';
                document.body.style.overflow = 'hidden'; // Prevent body scroll when menu is open
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (hamWrap.classList.contains('tve-m-expanded')) {
                if (!hamWrap.contains(e.target) && !trigger.contains(e.target)) {
                    hamWrap.classList.remove('tve-m-expanded');
                    trigger.classList.remove('tve-triggered-icon');
                    openIcon.style.display = 'block';
                    closeIcon.style.display = 'none';
                    document.body.style.overflow = '';
                }
            }
        });
        
        // Handle ESC key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && hamWrap.classList.contains('tve-m-expanded')) {
                hamWrap.classList.remove('tve-m-expanded');
                trigger.classList.remove('tve-triggered-icon');
                openIcon.style.display = 'block';
                closeIcon.style.display = 'none';
                document.body.style.overflow = '';
            }
        });
    }
    
    // Handle dropdown menus
    const dropdownItems = document.querySelectorAll('.menu-item-has-children');
    dropdownItems.forEach(item => {
        const link = item.querySelector('a');
        const submenu = item.querySelector('.sub-menu');
        
        if (link && submenu) {
            // Desktop hover behavior
            item.addEventListener('mouseenter', function() {
                if (window.innerWidth > 767) {
                    submenu.style.visibility = 'visible';
                    submenu.style.display = 'block';
                }
            });
            
            item.addEventListener('mouseleave', function() {
                if (window.innerWidth > 767) {
                    submenu.style.visibility = 'hidden';
                    submenu.style.display = 'none';
                }
            });
            
            // Mobile click behavior
            link.addEventListener('click', function(e) {
                if (window.innerWidth <= 767) {
                    e.preventDefault();
                    const isExpanded = item.classList.contains('expand-children');
                    
                    // Close other dropdowns
                    dropdownItems.forEach(otherItem => {
                        if (otherItem !== item) {
                            otherItem.classList.remove('expand-children');
                        }
                    });
                    
                    // Toggle current dropdown
                    if (isExpanded) {
                        item.classList.remove('expand-children');
                    } else {
                        item.classList.add('expand-children');
                    }
                }
            });
        }
    });
}

// Auto-initialize when script loads
injectNavigation();

// Export for manual use if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { NavigationConfig, generateNavigation, injectNavigation };
}