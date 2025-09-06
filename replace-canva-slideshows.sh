#!/bin/bash

# Script to replace Canva embeds with local slideshows
echo "Replacing Canva slideshows with local slideshow components..."

# Map of Canva design IDs to slide collections
declare -A SLIDE_MAPPINGS
SLIDE_MAPPINGS["DAF8E2Iu4ag"]="carbon-accounting"
SLIDE_MAPPINGS["DAFxu3iNlek"]="deepdive"
SLIDE_MAPPINGS["DAFoyAiKpMc"]="supply-chain"
SLIDE_MAPPINGS["DAFo33C9elc"]="supply-chain-2"
SLIDE_MAPPINGS["DAFuGZS2He8"]="supply-chain-3"

# Files with Canva embeds
files=("carbon-accounting.html" "deepdive.html" "monitoring-reporting-verification.html" "renewable-energy.html" "supply-chain.html")

# Create backup
echo "Creating backups..."
for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        cp "$file" "$file.canva-backup"
        echo "✓ Backed up $file"
    fi
done

# Function to create slideshow replacement HTML
create_slideshow_html() {
    local slideshow_id="$1"
    local slideshow_type="$2"
    
    cat << EOF
<div class="thrv_wrapper thrv_custom_html_shortcode">
    <div id="slideshow-$slideshow_id" data-slideshow="$slideshow_type" style="position: relative; width: 100%; height: 0; padding-top: 56.2500%; padding-bottom: 0; box-shadow: 0 2px 8px 0 rgba(63,69,81,0.16); margin-top: 1.6em; margin-bottom: 0.9em; overflow: hidden; border-radius: 8px; will-change: transform;">
        <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); color: #666;">
            <p>Loading slideshow...</p>
        </div>
    </div>
</div>
EOF
}

# Function to replace Canva embeds in a file
replace_canva_embeds() {
    local file="$1"
    echo "Processing $file..."
    
    # Create a temporary file for processing
    local temp_file="${file}.tmp"
    cp "$file" "$temp_file"
    
    local slideshow_counter=1
    
    # For each known Canva design ID, replace with slideshow
    for design_id in "${!SLIDE_MAPPINGS[@]}"; do
        slideshow_type="${SLIDE_MAPPINGS[$design_id]}"
        
        # Check if this design ID exists in the file
        if grep -q "$design_id" "$temp_file"; then
            echo "  → Replacing Canva embed $design_id with local slideshow ($slideshow_type)"
            
            # Create the replacement HTML
            replacement_html=$(create_slideshow_html "$slideshow_counter" "$slideshow_type")
            
            # Use a more targeted replacement approach
            # Replace the entire custom HTML shortcode div that contains this Canva embed
            sed -i "/<div class=\"thrv_wrapper thrv_custom_html_shortcode\"[^>]*>/,/<\/div><\/div>/ {
                /$design_id/,/<\/div><\/div>/ {
                    /<div class=\"thrv_wrapper thrv_custom_html_shortcode\"[^>]*>/ {
                        r /dev/stdin
                        d
                    }
                    /<\/div><\/div>$/ {
                        d
                        b
                    }
                    d
                }
            }" "$temp_file" <<< "$replacement_html"
            
            ((slideshow_counter++))
        fi
    done
    
    # Move the processed file back
    mv "$temp_file" "$file"
    echo "✓ Updated $file"
}

# Add slideshow script to each file
add_slideshow_script() {
    local file="$1"
    
    # Check if slideshow script is already included
    if ! grep -q "slideshow.js" "$file"; then
        # Find the </head> tag and insert the script before it
        sed -i 's|</head>|	<script src="slideshow.js"></script>\n</head>|' "$file"
        echo "  → Added slideshow script to $file"
    fi
}

# Process each file
for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        replace_canva_embeds "$file"
        add_slideshow_script "$file"
    else
        echo "⚠ File $file not found, skipping..."
    fi
done

echo ""
echo "Slideshow replacement completed!"
echo ""
echo "Summary of changes:"
echo "- Replaced Canva iframe embeds with local slideshow components"
echo "- Added slideshow.js script to each page"
echo "- Created backup files with .canva-backup extension"
echo ""
echo "The slideshows will use images from wp-content/uploads/2023/11/"
echo "To customize which images appear in each slideshow, edit the SLIDE_COLLECTIONS in slideshow.js"