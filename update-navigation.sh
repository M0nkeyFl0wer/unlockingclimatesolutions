#!/bin/bash

# Script to update all HTML files with the new navigation system
echo "Updating navigation system across all HTML pages..."

# List of HTML files to update
files=(
    "index.html"
    "carbon-accounting.html"
    "monitoring-reporting-verification.html"
    "deepdive.html"
)

# Navigation includes to add
nav_includes='
	<!-- Mobile Responsive Viewport -->
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
	
	<!-- Centralized Navigation System -->
	<link rel="stylesheet" href="navigation.css">
	<script src="navigation.js"></script>'

for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo "Updating $file..."
        
        # Create backup
        cp "$file" "$file.backup"
        
        # Remove any existing viewport meta tag first
        sed -i '/<meta name="viewport"/d' "$file"
        
        # Find the </head> tag and insert navigation includes before it
        sed -i "s|</head>|$nav_includes\n\n</head>|g" "$file"
        
        echo "✓ Updated $file"
    else
        echo "⚠ File $file not found, skipping..."
    fi
done

echo "Navigation system update completed!"
echo ""
echo "Summary of changes:"
echo "- Added navigation.css and navigation.js includes to all pages"
echo "- Events page has been removed from navigation (in navigation.js config)"
echo "- Why Ethereum page has been added to navigation"
echo "- Navigation is now centrally managed and maintainable"
echo ""
echo "To make navigation changes in the future:"
echo "1. Edit NavigationConfig in navigation.js"
echo "2. Changes will automatically apply to all pages"