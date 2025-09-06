#!/bin/bash

echo "Auditing and fixing missing images..."

# Function to check and fix image references
fix_images_in_file() {
    local file=$1
    echo "Checking $file..."
    
    # Find all image references that return 404
    # Common patterns for missing images
    
    # Replace references to non-existent 2024/11 images with existing ones
    sed -i 's|wp-content/uploads/2024/11/.*\.jpg|wp-content/uploads/2023/11/1.jpg|g' "$file"
    sed -i 's|wp-content/uploads/2024/11/.*\.png|wp-content/uploads/2023/11/Front-pages-of-next-decks.png|g' "$file"
    
    # Fix specific known missing images
    # Replace with farmer data image for relevant pages
    if [[ "$file" == *"carbon-accounting"* ]] || [[ "$file" == *"supply-chain"* ]]; then
        sed -i 's|src="[^"]*" data-src="|src="wp-content/uploads/2023/11/farmer-data-962953374-valentinrussanov-GettyImages.jpg" data-src="|g' "$file"
    fi
    
    # Use landscape images for hero sections
    sed -i 's|<img[^>]*class="tve_image[^"]*"[^>]*src=""[^>]*>|<img class="tve_image" src="wp-content/uploads/2023/11/1.jpg" alt="Climate Solutions">|g' "$file"
    
    echo "  Fixed image references in $file"
}

# List of HTML files to check
HTML_FILES=(
    "index.html"
    "aboutus.html"
    "carbon-accounting.html"
    "deepdive.html"
    "events.html"
    "monitoring-reporting-verification.html"
    "renewable-energy.html"
    "supply-chain.html"
    "why-ethereum.html"
)

# Process each file
for file in "${HTML_FILES[@]}"; do
    if [ -f "$file" ]; then
        fix_images_in_file "$file"
    fi
done

# Create a placeholder image map for Canva embeds
echo "Creating slideshow placeholder for Canva embeds..."

# Find and document all Canva embed locations
echo "Canva embeds found in:"
grep -l "canva.com/design" *.html 2>/dev/null || echo "No Canva embeds found"

echo "Image fixing complete!"