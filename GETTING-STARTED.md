# OGameX Combat Simulator - Getting Started

Quick start guide for users and developers.

## For End Users

### Install as Browser Extension

1. **Download** the latest release ZIP file
2. **Extract** to a permanent folder (e.g., `~/ogamex-simulator/`)
3. **Install**:
   - **Chrome/Edge**: `chrome://extensions/` → Enable Developer Mode → Load unpacked
   - **Firefox**: `about:debugging` → Load Temporary Add-on
4. **Click** the extension icon to open simulator

### Using the Simulator

**Input** (4-column layout):
- **Column 1 (Attacker)**: Ships, technologies, coordinates
- **Column 2 (Defender)**: Ships, defense, technologies, coordinates
- **Column 3 (Settings)**: Resources, debris %, simulation runs, fleet speed
- **Column 4 (Results)**: Battle outcome, plunder, debris, profit/loss

**Features**:
- ✅ Multiple simulation runs (1-100) for averaged results
- ✅ Flight time calculator with drive technology bonuses
- ✅ Universe speed settings (War/Holding/Peaceful)
- ✅ Ship drive upgrades (e.g., Small Cargo switches to Impulse at level 5)
- ✅ Debris and plunder calculations
- ✅ Round-by-round battle breakdown

---

## For Developers

### Quick Setup

```bash
# Clone repository
cd ~/workspace
git clone https://github.com/YOUR_USERNAME/ogamex-combat-simulator.git
cd ogamex-combat-simulator

# Build WASM module
./build.sh

# Load in browser
# Chrome: chrome://extensions/ → Load unpacked → select browser-extension/
```

### Project Structure

```
├── src/lib.rs                    # Rust combat engine (WASM)
├── browser-extension/
│   ├── app.js                    # UI, flight time, unit definitions
│   ├── index.html                # 4-column layout
│   ├── style.css                 # Styling
│   └── pkg/                      # Built WASM files
├── python-simulator/             # Python version (feature parity)
├── build.sh                      # Build WASM
└── package.sh                    # Create distribution packages
```

### Development Workflow

**Edit Rust battle engine**:
```bash
# Edit src/lib.rs
./build.sh
# Reload extension in browser
```

**Edit UI/Flight Time**:
```bash
# Edit browser-extension/app.js or index.html
# Reload extension in browser (no rebuild needed)
```

**Create distribution**:
```bash
./package.sh --skip-build
# Creates .zip files for Chrome/Firefox
```

---

## Distribution

Share the extension with others:

```bash
# Create distribution ZIP
./package.sh --skip-build

# Share the file
# ogamex-combat-simulator-v1.0.0-chrome.zip
```

Users install manually (see [browser-extension/HOW_TO_INSTALL.md](browser-extension/HOW_TO_INSTALL.md))

---

## Keep in Sync with OGameX

### Manual Check (Works Now)

```bash
./check-ogamex-updates.sh
# Checks OGameX for battle engine updates
# Shows what changed and how to update
```

### Automated (GitHub/GitLab CI/CD)

Push to GitHub/GitLab for fully automated daily checks:

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/ogamex-simulator.git
git push -u origin main
```

**Result**:
- Runs daily at 3 AM UTC
- Creates Pull Requests for safe changes
- Creates Issues for critical changes (battle engine, flight formulas)
- Optional: Slack/Discord/Email notifications

**See [SYNCING.md](SYNCING.md) for all options**

---

## Testing

**Load example battle**:
- Click "Load Example" button
- Tests 200 Light Fighters vs 100 Rocket Launchers
- Verify results match OGameX calculations

**Test flight time**:
- Set coordinates: 1:1:1 → 1:100:1
- Add ships (e.g., 100 Light Fighters)
- Set fleet speed: 100%
- Verify flight time displays correctly

---

## Troubleshooting

**WASM not loading**:
- Wait a few seconds after opening extension
- Check `browser-extension/pkg/` folder exists
- Rebuild: `./build.sh`

**Flight time incorrect**:
- Verify drive technology levels
- Check universe speed settings (War/Holding/Peaceful)
- Ensure coordinates are valid (Galaxy 1-9, System 1-499, Planet 1-16)

**Extension disappeared after browser restart (Chrome)**:
- Extension folder was deleted or moved
- Re-install from the same permanent folder

---

## Key Files

| File | Purpose |
|------|---------|
| [README.md](README.md) | Project overview |
| [GETTING-STARTED.md](GETTING-STARTED.md) | This file (quick start) |
| [FEATURES.md](FEATURES.md) | Complete feature list |
| [DISTRIBUTION.md](DISTRIBUTION.md) | How to distribute extension |
| [SYNCING.md](SYNCING.md) | Keep in sync with OGameX |

---

## Quick Commands

```bash
# Build WASM
./build.sh

# Check for OGameX updates
./check-ogamex-updates.sh

# Create distribution packages
./package.sh --skip-build

# Test Python version
cd python-simulator && python3 combat_simulator.py
```

---

## Links

- **OGameX Source**: https://github.com/lanedirt/OGameX
- **Report Issues**: Create issue in your GitHub repo
- **Documentation**: See markdown files in root directory

---

**Ready to start!** Build with `./build.sh` and load in your browser.
