#!/bin/bash

# Fix About Us page images by converting external URLs to local paths
echo "Fixing About Us page image paths..."

# Backup original
cp aboutus.html aboutus.html.backup-before-image-fix

# Replace all external image URLs with local paths
sed -i 's|https\?://[^/]*unlockingclimatesolutions\.com/||g' aboutus.html
sed -i 's|https\?://www\.unlockingclimatesolutions\.com/||g' aboutus.html
sed -i 's|https\?://unlockclimate\.com/||g' aboutus.html
sed -i 's|https\?://www\.unlockclimate\.com/||g' aboutus.html

echo "Fixed image paths in aboutus.html"
echo "Backup saved as aboutus.html.backup-before-image-fix"