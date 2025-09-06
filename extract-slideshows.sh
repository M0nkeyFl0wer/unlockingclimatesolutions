#!/bin/bash

echo "Extracting slideshow images and organizing by topic"

# Create directories for each slideshow
mkdir -p wp-content/uploads/slideshows/carbon-accounting
mkdir -p wp-content/uploads/slideshows/supply-chain  
mkdir -p wp-content/uploads/slideshows/monitoring-reporting-verification
mkdir -p wp-content/uploads/slideshows/deepdive

echo "Step 1: Extract Carbon Accounting slideshow"
if [ -f "On-Chain Carbon Acounting.zip" ]; then
    unzip -j "On-Chain Carbon Acounting.zip" "*.jpg" "*.jpeg" "*.png" -d wp-content/uploads/slideshows/carbon-accounting/ 2>/dev/null
    echo "  ✓ Extracted Carbon Accounting images"
fi

echo "Step 2: Extract Supply Chain slideshow"  
if [ -f "Scaling from one company to another.zip" ]; then
    unzip -j "Scaling from one company to another.zip" "*.jpg" "*.jpeg" "*.png" -d wp-content/uploads/slideshows/supply-chain/ 2>/dev/null
    echo "  ✓ Extracted Supply Chain images"
fi

echo "Step 3: Extract Monitoring/Reporting/Verification slideshow"
if [ -f "Measuring, Reporting and Verifying .zip" ]; then
    unzip -j "Measuring, Reporting and Verifying .zip" "*.jpg" "*.jpeg" "*.png" -d wp-content/uploads/slideshows/monitoring-reporting-verification/ 2>/dev/null
    echo "  ✓ Extracted MRV images"
fi

echo "Step 4: Extract Deep Dive slideshow"
if [ -f "Blockchain-Enabled Climate Solutions for Policy Makers.zip" ]; then
    unzip -j "Blockchain-Enabled Climate Solutions for Policy Makers.zip" "*.jpg" "*.jpeg" "*.png" -d wp-content/uploads/slideshows/deepdive/ 2>/dev/null
    echo "  ✓ Extracted Deep Dive images"
fi

echo "Step 5: Count extracted images"
for dir in wp-content/uploads/slideshows/*/; do
    if [ -d "$dir" ]; then
        count=$(find "$dir" -name "*.jpg" -o -name "*.jpeg" -o -name "*.png" | wc -l)
        echo "  $(basename "$dir"): $count images"
    fi
done

echo "✅ Slideshow extraction complete!"