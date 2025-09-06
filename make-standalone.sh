#!/bin/bash

echo "Making site fully standalone - removing WordPress dependencies"

# Create directories for local assets if they don't exist
mkdir -p wp-content/uploads/2024/02
mkdir -p wp-content/uploads/2024/11
mkdir -p wp-includes/css/dist/block-library
mkdir -p wp-includes/js/jquery
mkdir -p wp-includes/js/dist

echo "Step 1: Download WordPress-hosted images"

# Download key images that are referenced but may not exist locally
IMAGES_TO_DOWNLOAD=(
    "https://www.unlockingclimatesolutions.com/wp-content/uploads/2024/02/cropped-elephant-bigger-in-circle.png"
    "https://www.unlockingclimatesolutions.com/wp-content/uploads/2023/10/elephant_that_needed_cropping.png"
    "https://www.unlockingclimatesolutions.com/wp-content/uploads/2024/02/wind-turbines-and-a-sunset.mp4"
)

for url in "${IMAGES_TO_DOWNLOAD[@]}"; do
    filename=$(basename "$url")
    local_path="wp-content/uploads/2024/02/$filename"
    
    if [ ! -f "$local_path" ]; then
        echo "  Downloading $filename..."
        curl -L -o "$local_path" "$url" 2>/dev/null || echo "    Failed to download $url"
    else
        echo "  $filename already exists locally"
    fi
done

echo "Step 2: Find all external WordPress URLs in HTML files"
echo "External WordPress references found:"
grep -r "unlockingclimatesolutions.com" *.html | grep -v "backup" | head -10

echo "Step 3: Find all wp-includes references"
grep -r "wp-includes" *.html | grep -v "backup" | head -5

echo "Step 4: Create local CSS/JS stubs for essential files"

# Create minimal local versions of WordPress files
cat > wp-includes/css/dist/block-library/style.min.css << 'EOF'
/* Minimal block library styles for standalone site */
.wp-block-group { margin-bottom: 1.5em; }
.wp-block-paragraph { margin-bottom: 1em; }
EOF

cat > wp-includes/js/jquery/jquery.min.js << 'EOF'
/* jQuery stub - using modern browser APIs instead */
window.jQuery = window.$ = {
    ready: function(fn) { 
        if (document.readyState !== 'loading') fn();
        else document.addEventListener('DOMContentLoaded', fn);
    },
    fn: { ready: function(fn) { this.ready(fn); } }
};
EOF

echo "Setup complete! Now run the URL replacement script."