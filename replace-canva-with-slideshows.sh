#!/bin/bash

echo "Replacing Canva embeds with local image slideshows"

# Function to replace Canva embed with slideshow
replace_canva_embed() {
    local file=$1
    local slideshow_type=$2
    
    echo "  Processing $file for $slideshow_type slideshow..."
    
    # Create the slideshow HTML with proper styling
    slideshow_html='<div id="'$slideshow_type'-slideshow" class="slideshow-container" data-slideshow="'$slideshow_type'" style="max-width: 100%; margin: 20px auto; background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 8px; padding: 20px;">
        <div style="text-align: center; margin-bottom: 15px; color: var(--text-primary); font-size: 18px; font-weight: bold;">'$(echo $slideshow_type | sed 's/-/ /g' | sed 's/\b\w/\u&/g')' Slideshow</div>
        <div id="'$slideshow_type'-slideshow-content" style="width: 100%; height: 400px; background: var(--bg-primary); border-radius: 6px; display: flex; align-items: center; justify-content: center; color: var(--text-secondary);">
            Loading slideshow...
        </div>
    </div>
    <script src="slideshow.js"></script>
    <script>
        document.addEventListener("DOMContentLoaded", function() {
            if (window.SLIDE_COLLECTIONS && window.SLIDE_COLLECTIONS["'$slideshow_type'"]) {
                new Slideshow("'$slideshow_type'-slideshow-content", window.SLIDE_COLLECTIONS["'$slideshow_type'"]);
            }
        });
    </script>'
    
    # Find and replace Canva iframes/embeds with slideshow
    # Look for Canva iframe patterns and replace them
    if grep -q "canva.com" "$file"; then
        # Create a backup
        cp "$file" "${file}.canva-backup-$(date +%Y%m%d)"
        
        # Replace Canva iframe with slideshow - this is a complex pattern match
        sed -i ':a;N;$!ba;s/<iframe[^>]*canva\.com[^>]*>.*<\/iframe>/'$(echo "$slideshow_html" | sed 's/[\/&]/\\&/g')'/g' "$file"
        
        # Also replace any div containers that might contain Canva embeds
        sed -i ':a;N;$!ba;s/<div[^>]*data-canva-design[^>]*>.*<\/div>/'$(echo "$slideshow_html" | sed 's/[\/&]/\\&/g')'/g' "$file"
        
        echo "    ✓ Replaced Canva embed with $slideshow_type slideshow in $file"
    else
        echo "    - No Canva embeds found in $file"
    fi
}

# Process each file with its corresponding slideshow type
echo "Step 1: Replace Carbon Accounting Canva embed"
if [ -f "carbon-accounting.html" ]; then
    replace_canva_embed "carbon-accounting.html" "carbon-accounting"
fi

echo "Step 2: Replace Supply Chain Canva embed"
if [ -f "supply-chain.html" ]; then
    replace_canva_embed "supply-chain.html" "supply-chain"
fi

echo "Step 3: Replace Monitoring/Reporting/Verification Canva embed"
if [ -f "monitoring-reporting-verification.html" ]; then
    replace_canva_embed "monitoring-reporting-verification.html" "monitoring-reporting-verification"
fi

echo "Step 4: Replace Deep Dive Canva embed"
if [ -f "deepdive.html" ]; then
    replace_canva_embed "deepdive.html" "deepdive"
fi

echo "Step 5: Process Renewable Energy page"
if [ -f "renewable-energy.html" ]; then
    replace_canva_embed "renewable-energy.html" "renewable-energy"
fi

echo "Step 6: Ensure slideshow.js is included in all pages"
for file in carbon-accounting.html supply-chain.html monitoring-reporting-verification.html deepdive.html renewable-energy.html; do
    if [ -f "$file" ] && ! grep -q 'slideshow.js' "$file"; then
        # Add slideshow.js before closing body tag
        sed -i 's|</body>|<script src="slideshow.js"></script>\n</body>|' "$file"
        echo "    ✓ Added slideshow.js to $file"
    fi
done

echo "✅ Canva embed replacement complete!"
echo ""
echo "📊 Slideshow Summary:"
echo "   • Carbon Accounting: 16 slides"
echo "   • Supply Chain: 29 slides" 
echo "   • MRV: 23 slides"
echo "   • Deep Dive: 9 slides"
echo "   • Renewable Energy: Fallback images"