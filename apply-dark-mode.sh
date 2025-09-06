#!/bin/bash

# Apply dark mode stylesheet to all HTML pages

echo "Applying dark mode to all HTML pages..."

# List of all HTML files
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
    "index.html?p=285.html"
)

# Function to add dark mode stylesheet link after navigation.css
add_dark_mode() {
    local file=$1
    echo "Processing $file..."
    
    # Check if dark-mode.css is already included
    if grep -q "dark-mode.css" "$file"; then
        echo "  Dark mode already applied to $file"
    else
        # Add dark-mode.css link after navigation.css
        sed -i '/<link rel="stylesheet" href="navigation.css">/a\	<link rel="stylesheet" href="dark-mode.css">' "$file"
        echo "  Added dark mode to $file"
    fi
}

# Apply to all files
for file in "${HTML_FILES[@]}"; do
    if [ -f "$file" ]; then
        add_dark_mode "$file"
    else
        echo "Warning: $file not found"
    fi
done

echo "Dark mode application complete!"