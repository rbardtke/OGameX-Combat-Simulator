#!/bin/bash
set -e

echo "=================================="
echo "OGameX Combat Simulator - Packager"
echo "=================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if we're in the right directory
if [ ! -f "Cargo.toml" ]; then
    echo -e "${RED}Error: Run this script from the OGameX-battleengine-wasm root directory${NC}"
    exit 1
fi

# Build WASM module
echo -e "${YELLOW}Step 1/4: Building WASM module...${NC}"
if [ "$1" = "--skip-build" ]; then
    echo "  Skipping build (using existing WASM files)..."
    if [ ! -d "browser-extension/pkg" ]; then
        echo -e "${RED}Error: browser-extension/pkg/ not found. Run './build.sh' first.${NC}"
        exit 1
    fi
else
    # Check for wasm-pack only if we're building
    if ! command -v wasm-pack &> /dev/null; then
        echo -e "${RED}Error: wasm-pack is not installed${NC}"
        echo ""
        echo "Install wasm-pack with:"
        echo "  curl https://rustwasm.github.io/wasm-pack/installer/init.sh -sSf | sh"
        echo ""
        echo "Or if you already built the WASM module with './build.sh', you can skip building"
        echo "and use the '--skip-build' flag:"
        echo "  ./package.sh --skip-build"
        exit 1
    fi

    wasm-pack build --target web --out-dir browser-extension/pkg --release

    if [ $? -ne 0 ]; then
        echo -e "${RED}Build failed!${NC}"
        exit 1
    fi
fi

echo -e "${GREEN}✓ WASM module built successfully${NC}"
echo ""

# Get version from manifest
echo -e "${YELLOW}Step 2/4: Reading version from manifest...${NC}"
VERSION=$(grep -o '"version": "[^"]*' browser-extension/manifest.json | grep -o '[^"]*$')
echo -e "${GREEN}✓ Version: ${VERSION}${NC}"
echo ""

# Create distribution packages
echo -e "${YELLOW}Step 3/4: Creating distribution packages...${NC}"

cd browser-extension

# Chrome/Edge package (Manifest V2)
echo "  → Creating Chrome/Edge package (Manifest V2)..."
zip -q -r "../ogamex-combat-simulator-v${VERSION}-chrome.zip" . \
    -x "*.git*" -x "*node_modules*" -x "*.DS_Store" -x "manifest-v3.json"

# Chrome/Edge package (Manifest V3 - future)
echo "  → Creating Chrome/Edge package (Manifest V3)..."
cp manifest.json manifest-v2-backup.json
cp manifest-v3.json manifest.json
zip -q -r "../ogamex-combat-simulator-v${VERSION}-chrome-v3.zip" . \
    -x "*.git*" -x "*node_modules*" -x "*.DS_Store" -x "manifest-v2-backup.json" -x "manifest-v3.json"
mv manifest-v2-backup.json manifest.json

# Firefox package (Manifest V2)
echo "  → Creating Firefox package..."
zip -q -r "../ogamex-combat-simulator-v${VERSION}-firefox.zip" . \
    -x "*.git*" -x "*node_modules*" -x "*.DS_Store" -x "manifest-v3.json"

cd ..

echo -e "${GREEN}✓ Packages created successfully${NC}"
echo ""

# Summary
echo -e "${YELLOW}Step 4/4: Summary${NC}"
echo ""
echo "Created distribution packages:"
echo "  📦 ogamex-combat-simulator-v${VERSION}-chrome.zip (Chrome/Edge - Manifest V2)"
echo "  📦 ogamex-combat-simulator-v${VERSION}-chrome-v3.zip (Chrome/Edge - Manifest V3)"
echo "  📦 ogamex-combat-simulator-v${VERSION}-firefox.zip (Firefox)"
echo ""

# Show package sizes
echo "Package sizes:"
ls -lh ogamex-combat-simulator-v${VERSION}-*.zip | awk '{printf "  %s: %s\n", $9, $5}'
echo ""

echo -e "${GREEN}=================================="
echo "✓ Packaging complete!"
echo "==================================${NC}"
echo ""
echo "Next steps:"
echo "  1. Test the extension by loading the browser-extension/ folder"
echo "  2. Upload to Chrome Web Store: ogamex-combat-simulator-v${VERSION}-chrome.zip"
echo "  3. Upload to Firefox Add-ons: ogamex-combat-simulator-v${VERSION}-firefox.zip"
echo "  4. See DISTRIBUTION.md for detailed distribution instructions"
echo ""
