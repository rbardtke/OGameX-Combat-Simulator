#!/bin/bash
# Create simple icon placeholders using ImageMagick
# If ImageMagick is not installed, we'll create text-based SVGs

if command -v convert &> /dev/null; then
    # Use ImageMagick
    convert -size 16x16 xc:blue -fill white -pointsize 10 -gravity center -annotate +0+0 "O" icon16.png
    convert -size 48x48 xc:blue -fill white -pointsize 30 -gravity center -annotate +0+0 "O" icon48.png
    convert -size 128x128 xc:blue -fill white -pointsize 80 -gravity center -annotate +0+0 "O" icon128.png
else
    # Create SVG-based PNGs manually - just create SVG files
    echo '<svg width="16" height="16" xmlns="http://www.w3.org/2000/svg"><rect width="16" height="16" fill="#1e3c72"/><text x="8" y="12" font-size="12" fill="white" text-anchor="middle">⚔</text></svg>' > icon16.svg
    echo '<svg width="48" height="48" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" fill="#1e3c72"/><text x="24" y="36" font-size="32" fill="white" text-anchor="middle">⚔</text></svg>' > icon48.svg
    echo '<svg width="128" height="128" xmlns="http://www.w3.org/2000/svg"><rect width="128" height="128" fill="#1e3c72"/><text x="64" y="96" font-size="80" fill="white" text-anchor="middle">⚔</text></svg>' > icon128.svg
fi
