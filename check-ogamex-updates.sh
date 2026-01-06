#!/bin/bash

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# OGameX GitHub repository
OGAMEX_REPO="lanedirt/OGameX"
OGAMEX_BRANCH="main"
SYNC_FILE=".ogamex-last-sync"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "=================================="
echo "OGameX Update Checker"
echo "=================================="
echo ""

# Check for required tools
if ! command -v curl &> /dev/null; then
    echo -e "${RED}Error: curl is required but not installed${NC}"
    exit 1
fi

if ! command -v jq &> /dev/null; then
    echo -e "${YELLOW}Warning: jq not installed, using basic parsing${NC}"
    USE_JQ=false
else
    USE_JQ=true
fi

echo "Checking upstream: github.com/$OGAMEX_REPO"
echo ""

# Fetch latest commit from GitHub API
echo "Fetching latest commit from GitHub..."
API_RESPONSE=$(curl -s "https://api.github.com/repos/$OGAMEX_REPO/commits/$OGAMEX_BRANCH")

if [ $? -ne 0 ]; then
    echo -e "${RED}Failed to fetch from GitHub API. Check your internet connection.${NC}"
    exit 1
fi

# Parse latest commit SHA
if [ "$USE_JQ" = true ]; then
    LATEST=$(echo "$API_RESPONSE" | jq -r '.sha' 2>/dev/null)
    LATEST_MSG=$(echo "$API_RESPONSE" | jq -r '.commit.message' 2>/dev/null | head -1)
    LATEST_DATE=$(echo "$API_RESPONSE" | jq -r '.commit.author.date' 2>/dev/null)
else
    LATEST=$(echo "$API_RESPONSE" | grep -o '"sha": "[^"]*' | head -1 | cut -d'"' -f4)
    LATEST_MSG=$(echo "$API_RESPONSE" | grep -o '"message": "[^"]*' | head -1 | cut -d'"' -f4)
    LATEST_DATE=""
fi

if [ -z "$LATEST" ] || [ "$LATEST" = "null" ]; then
    echo -e "${RED}Failed to parse GitHub API response${NC}"
    echo "Response: $API_RESPONSE"
    exit 1
fi

# Get last synced commit
CURRENT=$(cat "$SCRIPT_DIR/$SYNC_FILE" 2>/dev/null || echo "")

if [ -z "$CURRENT" ]; then
    echo -e "${YELLOW}No sync history found. Initializing...${NC}"
    echo "$LATEST" > "$SCRIPT_DIR/$SYNC_FILE"
    echo -e "${GREEN}Initialized sync marker to latest commit: ${LATEST:0:7}${NC}"
    echo ""
    echo "Run this script again to check for updates."
    exit 0
fi

echo -e "Last synced:  ${BLUE}${CURRENT:0:7}${NC}"
echo -e "Latest upstream: ${BLUE}${LATEST:0:7}${NC} - $LATEST_MSG"
echo ""

if [ "$CURRENT" = "$LATEST" ]; then
    echo -e "${GREEN}✓ Already up to date with OGameX${NC}"
    echo ""
    echo "Your battle simulator is synchronized with the latest OGameX version."
    exit 0
fi

# Updates found!
echo -e "${YELLOW}🔄 OGameX has updates!${NC}"
echo ""

# Fetch list of changed files using GitHub compare API
echo "Fetching changed files..."
COMPARE_RESPONSE=$(curl -s "https://api.github.com/repos/$OGAMEX_REPO/compare/${CURRENT}...${LATEST}")

if [ "$USE_JQ" = true ]; then
    CHANGED_FILES=$(echo "$COMPARE_RESPONSE" | jq -r '.files[].filename' 2>/dev/null)
    COMMIT_COUNT=$(echo "$COMPARE_RESPONSE" | jq -r '.total_commits' 2>/dev/null)
else
    CHANGED_FILES=$(echo "$COMPARE_RESPONSE" | grep -o '"filename": "[^"]*' | cut -d'"' -f4)
    COMMIT_COUNT="unknown"
fi

echo -e "New commits: ${YELLOW}$COMMIT_COUNT${NC}"
echo ""

# Check battle engine files specifically
echo "Checking battle-related files for changes..."
echo ""

# Check Rust battle engine (primary source)
RUST_ENGINE_CHANGED=$(echo "$CHANGED_FILES" | grep -E "rust/battle_engine|rust/.*ffi" || true)

# Check PHP files (secondary, for flight time and speed calculations)
FLEET_CHANGED=$(echo "$CHANGED_FILES" | grep -E "FleetMissionService|CoordinateDistanceCalculator" || true)
SPEED_CHANGED=$(echo "$CHANGED_FILES" | grep -E "SpeedPropertyService" || true)
UNITS_CHANGED=$(echo "$CHANGED_FILES" | grep -E "UnitObject|Models/Units/" || true)

# Report changes
if [ ! -z "$RUST_ENGINE_CHANGED" ]; then
    echo -e "${RED}⚠️  CRITICAL: Rust Battle Engine changed!${NC}"
    echo "   Files:"
    echo "$RUST_ENGINE_CHANGED" | sed 's/^/      /'
    echo "   → Update required in: src/lib.rs (your WASM battle engine)"
    echo ""
fi

if [ ! -z "$FLEET_CHANGED" ]; then
    echo -e "${RED}⚠️  CRITICAL: Fleet/Distance calculation changed!${NC}"
    echo "   Files:"
    echo "$FLEET_CHANGED" | sed 's/^/      /'
    echo "   → Update required in: browser-extension/app.js (flight time calculator)"
    echo ""
fi

if [ ! -z "$SPEED_CHANGED" ]; then
    echo -e "${YELLOW}⚠️  WARNING: Speed calculation changed!${NC}"
    echo "   Files:"
    echo "$SPEED_CHANGED" | sed 's/^/      /'
    echo "   → Update required in: browser-extension/app.js (drive bonuses)"
    echo ""
fi

if [ ! -z "$UNITS_CHANGED" ]; then
    echo -e "${YELLOW}⚠️  WARNING: Unit definitions changed!${NC}"
    echo "   Files:"
    echo "$UNITS_CHANGED" | sed 's/^/      /'
    echo "   → Update required in: browser-extension/app.js (UNITS constant)"
    echo ""
fi

# Show all battle-related changed files
BATTLE_FILES=$(echo "$CHANGED_FILES" | grep -E "rust/battle|FleetMission|SpeedProperty|UnitObject|Units/" || true)
if [ ! -z "$BATTLE_FILES" ]; then
    echo "All battle-related changed files:"
    echo "$BATTLE_FILES" | sed 's/^/  /'
    echo ""
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📋 Next Steps:"
echo ""
echo "1. View changes on GitHub:"
echo "   https://github.com/$OGAMEX_REPO/compare/${CURRENT:0:7}...${LATEST:0:7}"
echo ""
echo "2. Review the Rust battle engine changes:"
echo "   https://github.com/$OGAMEX_REPO/compare/${CURRENT:0:7}...${LATEST:0:7}#diff-rust"
echo ""
echo "3. Update your simulator code accordingly:"
echo "   - Battle engine: src/lib.rs"
echo "   - Flight time/drives: browser-extension/app.js"
echo ""
echo "4. Test the changes:"
echo "   ./build.sh"
echo ""
echo "5. Mark as synced after updating:"
echo "   echo '$LATEST' > $SCRIPT_DIR/$SYNC_FILE"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
