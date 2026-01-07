# OGameX Combat Simulator

High-performance OGame combat simulator with Rust/WASM engine and Python implementation.

## Features

- ⚡ **Blazing Fast**: Rust-powered WASM engine (~200x faster than PHP)
- 🔒 **100% Private**: All calculations client-side, works offline
- 🎲 **Reliable**: Multiple simulation runs (1-100) with averaged results
- 🚀 **Flight Time**: Built-in calculator with drive bonuses and universe speeds
- 📊 **Complete**: Plunder, debris, profit/loss calculations
- 🎯 **Accurate**: Based on OGameX formulas

## Quick Start

### Users

![Screenshot of a OgameX Combat Simulator.](/assets/OGameX-Combat-Simulator.png)

**Browser Extension**:
1. Download latest release ZIP
2. Extract to permanent folder
3. Load in browser: `chrome://extensions/` → Load unpacked

**Python**:
```bash
cd python-simulator && python3 combat_simulator.py
```

### Developers

```bash
# Build
./build.sh

# Create distribution packages
./package.sh --skip-build

# Check for OGameX updates
./check-ogamex-updates.sh
```

## Documentation

| File | Purpose |
|------|---------|
| **[GETTING-STARTED.md](GETTING-STARTED.md)** | Installation & usage guide |
| **[FEATURES.md](FEATURES.md)** | Complete feature list & technical details |
| **[SYNCING.md](SYNCING.md)** | Keep in sync with OGameX |
| **[browser-extension/HOW_TO_INSTALL.md](browser-extension/HOW_TO_INSTALL.md)** | User installation instructions |

## Project Structure

```
├── src/lib.rs                 # Rust WASM combat engine
├── browser-extension/         # Browser extension
│   ├── app.js                 # UI, flight time, units
│   ├── index.html             # 4-column layout
│   └── pkg/                   # Built WASM files
├── python-simulator/          # Python version
├── build.sh                   # Build WASM
├── package.sh                 # Create distributions
└── check-ogamex-updates.sh    # Check for OGameX updates
```

## Supported Units

**Ships**: Small/Large Cargo, Light/Heavy Fighter, Cruiser, Battleship, Battlecruiser, Bomber, Destroyer, Deathstar, Colony Ship, Recycler, Espionage Probe, Solar Satellite, Crawler, Reaper, Pathfinder

**Defense**: Rocket Launcher, Light/Heavy Laser, Gauss Cannon, Ion Cannon, Plasma Turret, Small/Large Shield Dome, Anti-Ballistic/Interplanetary Missiles

## Technologies

- **Weapons/Shielding/Armour**: 10% per level
- **Drives**: Combustion (10%), Impulse (20%), Hyperspace (30%) per level
- **Ship Upgrades**: Small Cargo gets Impulse at level 5 (speed 10k), Bomber gets Hyperspace at level 8 (speed 5k), Recycler has two upgrades

## Combat Mechanics

- Shields absorb damage first, then hull
- Shields regenerate between rounds
- Hull <70% = explosion chance
- Rapidfire system
- Maximum 6 rounds

## Browser Support

✅ Chrome 57+, Firefox 52+, Edge 16+, Safari 11+

## Roadmap

Planned features (not yet implemented):

- [ ] Alliance Combat System (ACS) support
- [ ] Multiple waves support
- [ ] API Key integration (OGameX)
- [ ] Tactical retreat
- [ ] Share function
- [ ] Geologist support
- [ ] Character classes (Collector, General, Discoverer)

## Based On

[OGameX](https://github.com/lanedirt/OGameX) - Open-source OGame redesign clone, powered by the latest PHP Laravel framework 

## License

OGameX Combat Simulator is open-source software licensed under the MIT license. See the LICENSE file for more details.

---

**Get Started**: See [GETTING-STARTED.md](GETTING-STARTED.md)
