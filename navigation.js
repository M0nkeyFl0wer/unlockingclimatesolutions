// Centralized Navigation System for Unlocking Climate Solutions
// This allows for easy maintenance of navigation across all pages

const NavigationConfig = {
    // Base URL for the site (change this when moving to production)
    baseUrl: '',
    
    // Logo configuration
    logo: {
        src: 'https://www.unlockingclimatesolutions.com/wp-content/uploads/2023/10/elephant_that_needed_cropping.png',
        alt: 'Unlocking Climate Solutions',
        href: 'index.html'
    },
    
    // Main navigation menu items
    menuItems: {
        primary: {
            useCases: {
                label: 'Use cases',
                href: '#',
                hasDropdown: true,
                submenu: [
                    {
                        label: 'Supply Chain',
                        href: '#' // No file exists yet
                    },
                    {
                        label: 'Renewable Energy', 
                        href: '#' // No file exists yet
                    },
                    {
                        label: 'Carbon Accounting',
                        href: 'carbon-accounting.html'
                    },
                    {
                        label: 'Monitoring Reporting Verification',
                        href: 'monitoring-reporting-verification.html'
                    }
                ]
            }
        },
        secondary: {
            whyEthereum: {
                label: 'Why Ethereum',
                href: 'why-ethereum.html'
            },
            // Note: Events page is intentionally removed per user request
            aboutUs: {
                label: 'About Us',
                href: '#' // No file exists yet
            },
            deepDive: {
                label: 'Deep Dive', 
                href: 'deepdive.html'
            }
        }
    }
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
                <!-- Primary Menu (Use Cases Dropdown) -->
                <ul id="m-primary" class="tve_w_menu tve_horizontal" data-iid="15">
                    <li class="menu-item menu-item-7 menu-item-has-children lvl-0 tcb-- tve_editable" data-id="7">
                        <a class="menu-item menu-item-7-a menu-item-7 tcb--" href="${NavigationConfig.menuItems.primary.useCases.href}">
                            <span class="tve-disabled-text-inner">${NavigationConfig.menuItems.primary.useCases.label}</span>
                            <span class="tve-item-dropdown-trigger">
                                <svg class="tcb-icon" viewBox="0 0 16 16">
                                    <path d="M8 11L3 6h10z"/>
                                </svg>
                            </span>
                        </a>
                        <ul class="sub-menu menu-item-7-ul tve_editable">
                            ${NavigationConfig.menuItems.primary.useCases.submenu.map((item, index) => `
                            <li class="menu-item menu-item-${9 + index} lvl-1 tve_editable" data-id="${9 + index}">
                                <a href="${item.href}">
                                    <span class="tve-disabled-text-inner">${item.label}</span>
                                </a>
                            </li>`).join('')}
                        </ul>
                    </li>
                </ul>
                
                <!-- Secondary Menu -->
                <ul id="m-secondary" class="tve_w_menu tve_horizontal" data-iid="7">
                    ${Object.values(NavigationConfig.menuItems.secondary).map((item, index) => `
                    <li class="menu-item menu-item-${index + 1} lvl-0 tcb-local-vars-root tve_editable" data-id="${index + 1}">
                        <a href="${item.href}">
                            <span class="tve-disabled-text-inner">${item.label}</span>
                        </a>
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
    // Try multiple methods to find and replace the navigation
    const selectors = [
        '.thrv_widget_menu',  // Direct menu selector
        '#thrive-header .thrv_widget_menu', // Header context
        '.thrive-shortcode-html .thrv_widget_menu', // Shortcode context
        'div[data-css*="178d4c6bb16"]', // Specific data-css attribute
        '.tve-menu-template-light-tmp-first' // Theme class
    ];
    
    let navReplaced = false;
    
    for (const selector of selectors) {
        const existingNav = document.querySelector(selector);
        if (existingNav && !navReplaced) {
            // Create a temporary container to parse the new HTML
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = generateNavigation();
            const newNav = tempDiv.firstElementChild;
            
            // Replace the existing navigation
            existingNav.parentNode.replaceChild(newNav, existingNav);
            navReplaced = true;
            
            // Initialize mobile menu functionality
            initializeMobileMenu();
            break;
        }
    }
    
    // If no navigation was found to replace, try to inject into header
    if (!navReplaced) {
        const headerContainer = document.getElementById('thrive-header') || 
                               document.querySelector('.thrv_header') ||
                               document.querySelector('.thrive-shortcode-html');
        
        if (headerContainer) {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = generateNavigation();
            const newNav = tempDiv.firstElementChild;
            
            // Prepend to header
            headerContainer.insertBefore(newNav, headerContainer.firstChild);
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
            
            // Toggle mobile menu
            const isExpanded = hamWrap.classList.contains('tve-m-expanded');
            
            if (isExpanded) {
                hamWrap.classList.remove('tve-m-expanded');
                trigger.classList.remove('tve-triggered-icon');
                openIcon.style.display = 'block';
                closeIcon.style.display = 'none';
            } else {
                hamWrap.classList.add('tve-m-expanded');
                trigger.classList.add('tve-triggered-icon');
                openIcon.style.display = 'none';
                closeIcon.style.display = 'block';
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