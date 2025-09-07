#!/bin/bash

# Comprehensive WordPress cleanup script for GitHub Pages
echo "Starting comprehensive WordPress cleanup..."

# List of HTML files to clean
html_files=(
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

# Backup original files first
echo "Creating backups..."
for file in "${html_files[@]}"; do
    if [ -f "$file" ]; then
        cp "$file" "${file}.backup-cleanup"
        echo "Backed up $file"
    fi
done

# Remove WordPress plugin CSS references
echo "Removing WordPress plugin CSS references..."
for file in "${html_files[@]}"; do
    if [ -f "$file" ]; then
        # Remove plugin CSS links
        sed -i "/wp-content\/plugins.*\.css/d" "$file"
        echo "Cleaned CSS references from $file"
    fi
done

# Remove WordPress plugin JavaScript references
echo "Removing WordPress plugin JavaScript references..."
for file in "${html_files[@]}"; do
    if [ -f "$file" ]; then
        # Remove plugin JS script tags
        sed -i "/wp-content\/plugins.*\.js/d" "$file"
        echo "Cleaned JS references from $file"
    fi
done

# Remove WordPress admin AJAX references
echo "Removing WordPress admin AJAX references..."
for file in "${html_files[@]}"; do
    if [ -f "$file" ]; then
        # Remove admin-ajax.php references
        sed -i "/wp-admin\/admin-ajax\.php/d" "$file"
        echo "Cleaned AJAX references from $file"
    fi
done

# Remove WordPress feed and JSON references
echo "Removing WordPress feed references..."
for file in "${html_files[@]}"; do
    if [ -f "$file" ]; then
        # Remove feed links
        sed -i "/\/feed\//d" "$file"
        sed -i "/wp-json/d" "$file"
        echo "Cleaned feed references from $file"
    fi
done

# Remove Gravatar references and replace with local fallback
echo "Removing external Gravatar references..."
for file in "${html_files[@]}"; do
    if [ -f "$file" ]; then
        # Replace gravatar URLs with local fallback
        sed -i "s|https://secure\.gravatar\.com/avatar/[^)]*|wp-content/uploads/2024/02/cropped-elephant-bigger-in-circle.png|g" "$file"
        echo "Cleaned Gravatar references from $file"
    fi
done

# Remove WordPress theme references
echo "Removing WordPress theme references..."
for file in "${html_files[@]}"; do
    if [ -f "$file" ]; then
        # Remove theme class references that aren't needed
        sed -i "s/wp-theme-thrive-theme//g" "$file"
        sed -i "s/page-template-default//g" "$file" 
        sed -i "s/wp-singular//g" "$file"
        echo "Cleaned theme references from $file"
    fi
done

# Clean up specific problematic WordPress variables
echo "Cleaning WordPress-specific variables..."
for file in "${html_files[@]}"; do
    if [ -f "$file" ]; then
        # Remove ThriveLeads configurations that reference WordPress
        sed -i '/TL_Const.*wp-admin/,/})} \/\*\]\]\> \*\//d' "$file"
        echo "Cleaned WordPress variables from $file"
    fi
done

# Remove unused WordPress directories from HTML references
echo "Cleaning up unused directory references..."
for file in "${html_files[@]}"; do
    if [ -f "$file" ]; then
        # Remove references to WordPress directories we don't need
        sed -i "/wp-includes/d" "$file"
        sed -i "/wp-admin/d" "$file"
        echo "Cleaned directory references from $file"
    fi
done

echo "WordPress cleanup complete!"
echo "Backup files created with .backup-cleanup extension"
echo "You can restore any file with: mv filename.backup-cleanup filename"