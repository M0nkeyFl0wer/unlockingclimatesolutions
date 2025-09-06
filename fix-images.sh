#!/bin/bash

# Script to fix broken image URLs from unlockingclimatesolutions.com to local paths
echo "Fixing image URLs in HTML files..."

# List of HTML files to update
files=(
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

# Backup files first
echo "Creating backups..."
for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        cp "$file" "$file.img-backup"
    fi
done

# Fix the URLs - replace the full domain with relative paths
echo "Updating image URLs..."
for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo "Updating $file..."
        # Replace unlockingclimatesolutions.com URLs with relative paths
        sed -i 's|https://www\.unlockingclimatesolutions\.com/wp-content/|wp-content/|g' "$file"
        sed -i 's|https://unlockingclimatesolutions\.com/wp-content/|wp-content/|g' "$file"
        echo "✓ Updated $file"
    else
        echo "⚠ File $file not found, skipping..."
    fi
done

echo ""
echo "Image URL fix completed!"
echo ""
echo "Summary of changes:"
echo "- Replaced https://www.unlockingclimatesolutions.com/wp-content/ with wp-content/"
echo "- Replaced https://unlockingclimatesolutions.com/wp-content/ with wp-content/"
echo "- All images should now load from local wp-content directory"
echo ""
echo "If you need to revert changes, the backup files are available with .img-backup extension"