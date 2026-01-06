# Features

Complete list of simulator features and technical details.

## Combat Simulation

**Battle Engine** (Rust WASM):
- ✅ Damage applies to shields first, then hull
- ✅ Shields regenerate fully between rounds
- ✅ Hull integrity <70% has explosion chance
- ✅ Rapidfire system
- ✅ Maximum 6 rounds per battle
- ✅ ~200x faster than PHP implementation

**Multiple Simulations**:
- Run 1-100 simulations per battle (default: 5)
- Results averaged for reliable predictions
- Accounts for RNG variance (rapidfire, explosions, targeting)
- Shows "(0)" for completely destroyed units

**Technologies**:
- Weapons: 10% attack bonus per level
- Shielding: 10% shield bonus per level
- Armour: 10% hull bonus per level
- Drive technologies: See speed calculations below

## Flight Time Calculator

**Distance Calculation**:
```
Same location:     5 units
Different galaxy:  |g1 - g2| × 20000
Different system:  |s1 - s2| × 95 + 2700
Different planet:  |p1 - p2| × 5 + 1000
```

**Speed Bonuses**:
- Combustion Drive: 10% per level
- Impulse Drive: 20% per level
- Hyperspace Drive: 30% per level

**Ship Drive Upgrades**:
| Ship | Default Drive | Base Speed | Upgrade At | New Drive | New Base Speed |
|------|---------------|------------|------------|-----------|----------------|
| Small Cargo | Combustion | 5,000 | Impulse 5 | Impulse | 10,000 |
| Recycler | Combustion | 2,000 | Impulse 17 | Impulse | 4,000 |
| Recycler | Combustion | 2,000 | Hyperspace 15 | Hyperspace | 6,000 |
| Bomber | Impulse | 4,000 | Hyperspace 8 | Hyperspace | 5,000 |

**Universe Speed Settings**:
- War: Attack mission speed multiplier
- Holding: Deployment mission speed multiplier
- Peaceful: Transport/colonize mission speed multiplier

**Flight Time Formula**:
```
Time = max(
  round(
    (35000 / speed_percent × sqrt(distance × 10 / slowest_speed) + 10) / fleet_speed
  ),
  1
)
```

## Results & Calculations

**Debris Field**:
- Ships: 30% (default, configurable)
- Defense: 0% (default, configurable)
- Deuterium: Optional
- Recyclers needed calculation

**Plunder**:
- Resources available: Configurable
- Plunder percentage: 50%, 75%, or 100%
- Cargo capacity calculation
- Total plunder display

**Profit/Loss**:
- Attacker losses (metal + crystal + deuterium)
- Plunder gained
- Debris field total
- Net profit/loss

**Round-by-Round**:
- Ships remaining each round
- Losses per round
- Damage absorbed
- Hits per side

## Supported Units

**Ships** (18 types):
- Small Cargo (202), Large Cargo (203)
- Light Fighter (204), Heavy Fighter (205), Cruiser (206)
- Battleship (207), Battlecruiser (218)
- Bomber (211), Destroyer (213), Deathstar (214)
- Colony Ship (208), Recycler (209)
- Espionage Probe (210), Solar Satellite (212)
- Crawler (217), Reaper (215), Pathfinder (219)

**Defense** (10 types):
- Rocket Launcher (401), Light Laser (402), Heavy Laser (403)
- Gauss Cannon (404), Ion Cannon (405), Plasma Turret (406)
- Small Shield Dome (407), Large Shield Dome (408)
- Anti-Ballistic Missiles (502), Interplanetary Missiles (503)

## User Interface

**4-Column Layout**:
1. **Attacker Panel**: Ships, technologies, coordinates
2. **Defender Panel**: Ships, defense, technologies, coordinates
3. **Settings Panel**: Resources, debris %, simulation runs, flight time, universe settings
4. **Results Panel**: Plunder, debris, profit/loss summary

**Features**:
- Remaining units shown next to input fields: `(150)`
- Destroyed units shown as: `(0)`
- Tabs for each simulation round
- Color-coded results (win/loss/draw)
- Clear All button
- Load Example button

## Python Version

**Feature Parity**:
- ✅ Complete combat engine
- ✅ Multiple simulation runs
- ✅ Flight time calculator
- ✅ Drive technology bonuses
- ✅ Ship drive upgrades
- ✅ Programmatic API
- ✅ No external dependencies

**Usage**:
```python
from combat_simulator import CombatSimulator, FlightTimeCalculator

# Run 10 simulations
simulator = CombatSimulator()
rounds = simulator.simulate_multiple(attacker_units, defender_units, num_runs=10)

# Calculate flight time
calc = FlightTimeCalculator()
time = calc.calculate_flight_time(origin, target, attacker_units, tech_levels)
```

## Performance

**WASM Speed**:
- ~200x faster than PHP
- Handles thousands of units in milliseconds
- Multiple simulations per second

**Browser Extension**:
- 5 runs: <50ms
- 10 runs: <100ms
- 100 runs: ~1 second

## Accuracy

**Based on OGameX**:
- Battle engine: `app/GameObjects/Services/BattleEngine.php`
- Flight time: `app/Services/FleetMissionService.php`
- Distance: `app/Services/CoordinateDistanceCalculator.php`
- Speed bonuses: `app/GameObjects/Services/Properties/SpeedPropertyService.php`

Results match OGameX server calculations (accounting for RNG variance).

## Browser Compatibility

**Supported**:
- ✅ Chrome 57+
- ✅ Firefox 52+
- ✅ Edge 16+
- ✅ Brave, Opera, Vivaldi (Chromium-based)

**Requirements**:
- WebAssembly support
- Modern JavaScript (ES6+)
- Local storage

## Privacy & Security

- ✅ 100% client-side (no data sent to servers)
- ✅ No network requests
- ✅ No permissions required
- ✅ Works offline
- ✅ No analytics or tracking

## Future Enhancements

Possible additions:
- [ ] Character class bonuses (Collector, General, Explorer)
- [ ] Alliance class bonuses
- [ ] ACS (Alliance Combat System) support
- [ ] Moon chance calculation
- [ ] Deuterium consumption calculation
- [ ] Import/export battle configurations
- [ ] Battle history/favorites
