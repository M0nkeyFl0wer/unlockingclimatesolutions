// About Us Page Enhancements
// Adds Elephant Room link and fixes image paths

document.addEventListener('DOMContentLoaded', function() {
    // Only run on About Us page
    if (!window.location.pathname.includes('aboutus') && !document.title.includes('About')) {
        return;
    }

    // Add Elephant Room link to About Us page
    addElephantRoomLink();
    
    // Fix any broken image paths
    fixImagePaths();
});

function addElephantRoomLink() {
    // Look for a good place to add the link - try to find the main content area
    const contentSelectors = [
        '.tve-page-section-in',
        '.section-content', 
        '.main-container',
        'main',
        '.content'
    ];
    
    let contentArea = null;
    for (const selector of contentSelectors) {
        contentArea = document.querySelector(selector);
        if (contentArea) break;
    }
    
    if (!contentArea) {
        // Fallback: add to body
        contentArea = document.body;
    }
    
    // Create the Elephant Room section
    const elephantRoomSection = document.createElement('div');
    elephantRoomSection.innerHTML = `
        <div style="
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 12px;
            padding: 2rem;
            margin: 2rem auto;
            max-width: 800px;
            text-align: center;
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
        ">
            <h3 style="
                color: #06b6d4;
                margin-bottom: 1rem;
                font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
                font-size: 1.5rem;
                font-weight: 600;
            ">
                Our Other Work
            </h3>
            <p style="
                color: #e4e4e7;
                margin-bottom: 1.5rem;
                font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
                line-height: 1.6;
            ">
                Learn more about our broader mission and other projects at Elephant Room, 
                where we work on sustainability, social impact, and technology solutions.
            </p>
            <a href="https://elephantroom.ca" 
               target="_blank" 
               rel="noopener noreferrer"
               style="
                   display: inline-block;
                   background: linear-gradient(135deg, #06b6d4, #3b82f6);
                   color: white;
                   text-decoration: none;
                   padding: 0.75rem 2rem;
                   border-radius: 8px;
                   font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
                   font-weight: 500;
                   transition: all 0.3s ease;
                   box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3);
               "
               onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 10px 20px rgba(6, 182, 212, 0.3)';"
               onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 6px -1px rgba(0, 0, 0, 0.3)';"
            >
                Visit Elephant Room →
            </a>
        </div>
    `;
    
    // Add to the end of the content area
    contentArea.appendChild(elephantRoomSection);
    
    console.log('✅ Added Elephant Room link to About Us page');
}

function fixImagePaths() {
    // Fix background-image URLs in inline styles
    const allElements = document.querySelectorAll('*');
    let fixedCount = 0;
    
    allElements.forEach(element => {
        const style = element.getAttribute('style');
        if (style && style.includes('background-image') && style.includes('unlockingclimatesolutions.com')) {
            const fixedStyle = style.replace(
                /https?:\/\/.*?unlockingclimatesolutions\.com\//g, 
                ''
            );
            element.setAttribute('style', fixedStyle);
            fixedCount++;
        }
    });
    
    // Fix CSS background-image URLs in style tags
    const styleTags = document.querySelectorAll('style');
    styleTags.forEach(styleTag => {
        if (styleTag.textContent.includes('background-image') && styleTag.textContent.includes('unlockingclimatesolutions.com')) {
            const fixedCSS = styleTag.textContent.replace(
                /https?:\/\/.*?unlockingclimatesolutions\.com\//g, 
                ''
            );
            styleTag.textContent = fixedCSS;
            fixedCount++;
        }
    });
    
    // Fix regular img src attributes (just in case)
    const images = document.querySelectorAll('img[src*="unlockingclimatesolutions.com"]');
    images.forEach(img => {
        const newSrc = img.src.replace(/https?:\/\/.*?unlockingclimatesolutions\.com\//, '');
        img.src = newSrc;
        fixedCount++;
    });
    
    if (fixedCount > 0) {
        console.log(`✅ Fixed ${fixedCount} image path references`);
    }
}

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { addElephantRoomLink, fixImagePaths };
}