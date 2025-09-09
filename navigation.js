// Centralized Navigation System for Unlocking Climate Solutions
// This allows for easy maintenance of navigation across all pages

const NavigationConfig = {
    // Base URL for the site (change this when moving to production)
    baseUrl: '',
    
    // Logo configuration
    logo: {
        src: './wp-content/uploads/2024/02/cropped-elephant-bigger-in-circle.png',
        alt: 'Unlocking Climate Solutions',
        href: 'index.html'
    },
    
    // Main navigation menu items - clean horizontal menu
    menuItems: [
        {
            label: 'Use Cases',
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
    <nav style="background: rgba(0, 0, 0, 0.95); border-bottom: 1px solid rgba(255, 255, 255, 0.1); position: sticky; top: 0; z-index: 1000; padding: 0.5rem 0;">
        <div style="max-width: 1200px; margin: 0 auto; padding: 0 2rem; display: flex; align-items: center; gap: 2rem;">
            
            <!-- Logo -->
            <a href="${NavigationConfig.logo.href}" style="text-decoration: none;">
                <img src="${NavigationConfig.logo.src}" alt="${NavigationConfig.logo.alt}" 
                     style="width: 32px; height: 32px; border-radius: 50%; border: 2px solid rgba(59, 130, 246, 0.5); object-fit: cover; transition: all 0.3s ease;">
            </a>
            
            <!-- Navigation Links -->
            ${NavigationConfig.menuItems.map((item, index) => `
                <div style="position: relative; display: inline-block;"
                     onmouseover="if(this.querySelector('.dropdown-menu')) this.querySelector('.dropdown-menu').style.opacity='1', this.querySelector('.dropdown-menu').style.visibility='visible', this.querySelector('.dropdown-menu').style.transform='translateY(0)'"
                     onmouseleave="if(this.querySelector('.dropdown-menu')) this.querySelector('.dropdown-menu').style.opacity='0', this.querySelector('.dropdown-menu').style.visibility='hidden', this.querySelector('.dropdown-menu').style.transform='translateY(-10px)'">
                    <a href="${item.href}" 
                       style="color: #ffffff; text-decoration: none; font-weight: 500; padding: 0.75rem 1rem; border-radius: 0.25rem; transition: all 0.3s ease; font-family: 'DM Sans', sans-serif; display: inline-block; white-space: nowrap;"
                       onmouseover="this.style.background='rgba(59, 130, 246, 0.1)'; this.style.color='#60a5fa';"
                       onmouseout="this.style.background='transparent'; this.style.color='#ffffff';">
                        ${item.label}${item.hasDropdown ? ' ▼' : ''}
                    </a>
                    ${item.hasDropdown ? `
                    <div class="dropdown-menu" style="position: absolute; top: 100%; left: 0; background: rgba(17, 17, 17, 0.95); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 0.5rem; min-width: 220px; padding: 0.5rem 0; opacity: 0; visibility: hidden; transform: translateY(-10px); transition: all 0.3s ease; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3); z-index: 1001;">
                        ${item.submenu.map((subItem) => `
                        <a href="${subItem.href}" 
                           style="color: #e5e7eb; text-decoration: none; padding: 0.75rem 1rem; display: block; transition: all 0.3s ease; font-size: 0.95rem; white-space: nowrap;"
                           onmouseover="this.style.background='rgba(59, 130, 246, 0.1)'; this.style.color='#60a5fa';"
                           onmouseout="this.style.background='transparent'; this.style.color='#e5e7eb';">
                            ${subItem.label}
                        </a>`).join('')}
                    </div>` : ''}
                </div>
            `).join('')}
            
        </div>
    </nav>
`;
}

// Function to inject navigation into a page
function injectNavigation() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', insertNavigationHTML);
    } else {
        insertNavigationHTML();
    }
}

function insertNavigationHTML() {
    // Find the header container and inject our navigation
    const headerContainer = document.getElementById('thrive-header');
    
    if (headerContainer) {
        // Replace the entire header content with our clean navigation
        headerContainer.innerHTML = generateNavigation();
    } else {
        // Fallback: inject at the very top of body
        const body = document.body;
        if (body) {
            body.insertAdjacentHTML('afterbegin', generateNavigation());
        }
    }
}

// No mobile menu functionality needed for inline styles

// Auto-initialize when script loads
injectNavigation();

// Export for manual use if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { NavigationConfig, generateNavigation, injectNavigation };
}