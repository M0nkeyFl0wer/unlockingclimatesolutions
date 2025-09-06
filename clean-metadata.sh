#!/bin/bash

echo "Cleaning remaining WordPress metadata and API references"

HTML_FILES=(
    "index.html" "aboutus.html" "carbon-accounting.html" "deepdive.html"
    "events.html" "monitoring-reporting-verification.html" 
    "renewable-energy.html" "supply-chain.html" "why-ethereum.html"
)

for file in "${HTML_FILES[@]}"; do
    if [ -f "$file" ]; then
        echo "  Cleaning metadata from $file..."
        
        # Remove WordPress API and metadata links
        sed -i '/rel="https:\/\/api\.w\.org\/"/d' "$file"
        sed -i '/wp-json/d' "$file" 
        sed -i '/xmlrpc\.php/d' "$file"
        sed -i '/rel="EditURI"/d' "$file"
        sed -i '/rel="canonical" href="https:\/\/www\.unlockingclimatesolutions\.com/d' "$file"
        sed -i '/rel=.shortlink. href=.https:\/\/www\.unlockingclimatesolutions\.com/d' "$file"
        sed -i '/oEmbed.*JSON.*href="https:\/\/www\.unlockingclimatesolutions\.com/d' "$file"
        sed -i '/rel="profile" href="https:\/\/gmpg\.org\/xfn\/11"/d' "$file"
        
        # Remove WordPress version and generator meta tags
        sed -i '/name="generator" content="WordPress/d' "$file"
        sed -i '/name="msapplication-TileImage"/d' "$file"
        
        echo "    ✓ Cleaned $file"
    fi
done

echo "✅ WordPress metadata cleanup complete!"