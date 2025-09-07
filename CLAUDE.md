# Climate Solutions Website - Project Documentation

## Project Overview
This project is migrating a WordPress/Thrive theme-based climate solutions website to a standalone GitHub Pages site. The goal is to eliminate external dependencies and create a fully self-contained website hosted on GitHub.

## Key Requirements

### GitHub Management
- All commits should include both user account and Claude as contributors
- Use this format for commits:
  ```
  Co-Authored-By: Claude <noreply@anthropic.com>
  ```

### Technical Challenges
The site originated from WordPress with complex plugin architecture:
- **Thrive Theme**: Heavy use of inline CSS and complex styling systems
- **Minified CSS**: Large blocks of compressed CSS that are difficult to debug
- **Background Images**: Extensive use of CSS background-image properties instead of standard <img> tags
- **Complex JavaScript**: Multiple JS files for navigation, slideshows, and interactions
- **External Dependencies**: Originally relied on WordPress CDNs and external image sources

### Current Issues
1. **CSS Display Problems**: Background-image containers often have zero height or are hidden
2. **Slideshow Functionality**: JavaScript slideshows not displaying properly
3. **Image Path Dependencies**: Converting from WordPress wp-content structure to GitHub-friendly paths
4. **Navigation Complexity**: Modern styling attempts have broken navigation functionality
5. **Minified Code**: Difficult to debug and modify compressed CSS/JS

### Project Goals
- **Full GitHub Hosting**: Everything self-contained, no external dependencies
- **Preserve Content**: All carefully written copy and chosen images must be maintained
- **Security**: Maintain email collection security improvements
- **Performance**: Clean up unnecessary WordPress bloat while preserving functionality
- **Maintainability**: Replace minified code with readable, debuggable versions where possible

### File Structure
- `wp-content/uploads/`: Contains all images downloaded from original site
- `*.html`: Main pages (aboutus.html, why-ethereum.html, etc.)
- `navigation.js`: Handles menu functionality
- `slideshow.js`: Manages image slideshows
- `secure-email-collection.js`: Security-hardened email forms
- Various CSS files for styling and fixes

### Development Commands
- Test locally: Open HTML files in browser or use local server
- Lint/Check: No specific commands identified yet - user should provide if needed

### Critical Notes
- **NEVER rewrite user content**: Always preserve original copy and images
- **WordPress Legacy**: Expect CSS/JS complexity due to WordPress/plugin origins
- **Image Handling**: Most images use background-image CSS properties, not <img> tags
- **Path Conversion**: Replace unlockingclimatesolutions.com URLs with local GitHub paths

### Current Priority
Fix CSS display issues preventing images and slideshows from appearing correctly while maintaining all original content and functionality.