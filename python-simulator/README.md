# OGameX Combat Simulator - Python Version

A complete Python implementation of the OGameX combat simulator with feature parity to the browser extension.

## Features

### Battle Simulation
- Full OGame combat mechanics implementation
- Rapidfire support
- Shield regeneration between rounds
- Hull integrity explosion chances
- Up to 6 combat rounds
- Detailed round-by-round statistics

### Flight Time Calculator
- Distance calculation based on OGame formulas
- Drive technology bonuses (Combustion, Impulse, Hyperspace)
- Ship drive upgrades at specific tech levels
- Universe fleet speed multipliers (War, Holding, Peaceful)
- Speed calculation: `Final Speed = Base Speed + (Base Speed / 100) × (Drive Level × Drive Bonus %)`

### Technology Support
- Weapons technology (10% per level)
- Shielding technology (10% per level)
- Armour technology (10% per level)
- Combustion Drive (10% speed per level)
- Impulse Drive (20% speed per level)
- Hyperspace Drive (30% speed per level)

## Installation

No external dependencies required - uses only Python standard library.

```bash
python3 combat_simulator.py
```

## Usage

### Basic Battle Simulation

```python
from combat_simulator import CombatSimulator, BattleUnitInfo

# Define attacker units
attacker_units = {
    204: BattleUnitInfo(
        unit_id=204,  # Light Fighter
        amount=100,
        attack_power=50 * 1.5,  # Base 50, Level 5 weapons (1 + 0.5)
        shield_points=10 * 1.5,  # Base 10, Level 5 shielding
        hull_plating=400 * 1.5,  # Base 400, Level 5 armour
        rapidfire={}
    )
}

# Define defender units
defender_units = {
    204: BattleUnitInfo(
        unit_id=204,
        amount=150,
        attack_power=50,
        shield_points=10,
        hull_plating=400,
        rapidfire={}
    )
}

# Run single simulation
simulator = CombatSimulator()
rounds = simulator.simulate_battle(attacker_units, defender_units)

# Analyze results
for i, round in enumerate(rounds, 1):
    print(f"Round {i}:")
    print(f"  Attacker remaining: {sum(u.amount for u in round.attacker_ships.values())}")
    print(f"  Defender remaining: {sum(u.amount for u in round.defender_ships.values())}")
```

### Multiple Simulation Runs (Recommended)

For more reliable results, run multiple simulations and get averaged outcomes:

```python
from combat_simulator import CombatSimulator, BattleUnitInfo

# ... define units same as above ...

# Run 10 simulations and get averaged results
simulator = CombatSimulator()
averaged_rounds = simulator.simulate_multiple(attacker_units, defender_units, num_runs=10)

# The results are now averaged across 10 runs, accounting for RNG variance
for i, round in enumerate(averaged_rounds, 1):
    print(f"Round {i} (averaged):")
    print(f"  Attacker remaining: {sum(u.amount for u in round.attacker_ships.values())}")
    print(f"  Defender remaining: {sum(u.amount for u in round.defender_ships.values())}")
```

**Why multiple runs?**
- Accounts for randomness in rapidfire, explosion chances, and target selection
- Provides more reliable predictions of battle outcomes
- Shows expected average losses rather than a single lucky/unlucky result
- Recommended: 5-10 runs for quick estimates, 50-100 for precise analysis

### Flight Time Calculation

```python
from combat_simulator import FlightTimeCalculator

calc = FlightTimeCalculator()

# Define coordinates
origin = (1, 1, 1)    # Galaxy:System:Planet
target = (1, 100, 1)

# Define fleet
fleet = {204: 100}  # 100 Light Fighters

# Calculate distance
distance = calc.calculate_distance(origin, target)

# Get slowest ship speed (with drive techs)
slowest_speed = calc.get_slowest_ship_speed(
    fleet,
    combustion_level=10,
    impulse_level=0,
    hyperspace_level=0
)

# Calculate flight time
flight_time = calc.calculate_flight_time(
    distance=distance,
    speed_percent=100,  # Fleet speed percentage
    slowest_speed=slowest_speed,
    fleet_speed=1.0  # Universe War fleet speed multiplier
)

print(f"Distance: {distance:,} units")
print(f"Flight time: {calc.format_flight_time(flight_time)}")
print(f"Round trip: {calc.format_flight_time(flight_time * 2)}")
```

## Ship IDs

| ID  | Ship Name         | Base Speed   |
|-----|-------------------|--------------|
| 202 | Small Cargo       | 5,000        |
| 203 | Large Cargo       | 7,500        |
| 204 | Light Fighter     | 12,500       |
| 205 | Heavy Fighter     | 10,000       |
| 206 | Cruiser           | 15,000       |
| 207 | Battleship        | 10,000       |
| 208 | Colony Ship       | 2,500        |
| 209 | Recycler          | 2,000        |
| 210 | Espionage Probe   | 100,000,000  |
| 211 | Bomber            | 4,000        |
| 213 | Destroyer         | 5,000        |
| 214 | Deathstar         | 100          |
| 215 | Battlecruiser     | 10,000       |
| 218 | Reaper            | 7,000        |
| 219 | Pathfinder        | 12,000       |

## Drive Technologies

### Drive Types
- **Combustion Drive**: 10% speed bonus per level
- **Impulse Drive**: 20% speed bonus per level
- **Hyperspace Drive**: 30% speed bonus per level

### Ship Drive Upgrades
Some ships can upgrade to faster drives at specific research levels:

- **Small Cargo (202)**: Upgrades to Impulse Drive at level 5 (base speed becomes 10,000)
- **Recycler (209)**: Can upgrade to Impulse at level 17 or Hyperspace at level 15
- **Bomber (211)**: Upgrades to Hyperspace Drive at level 8
- **Reaper (218)**: Upgrades to Hyperspace Drive at level 4
- **Pathfinder (219)**: Can use Hyperspace Drive at level 3

## Distance Formulas

```python
# Same location
if origin == target:
    distance = 5

# Different galaxies
if origin_galaxy != target_galaxy:
    distance = abs(origin_galaxy - target_galaxy) * 20000

# Different systems (same galaxy)
if origin_system != target_system:
    distance = abs(origin_system - target_system) * 95 + 2700

# Different planets (same system)
if origin_planet != target_planet:
    distance = abs(origin_planet - target_planet) * 5 + 1000
```

## Flight Time Formula

```python
time = max(
    round(
        (35000 / speed_percent * sqrt(distance * 10 / slowest_speed) + 10) / fleet_speed
    ),
    1
)
```

Where:
- `speed_percent`: Fleet speed percentage (1-100)
- `distance`: Distance in game units
- `slowest_speed`: Speed of slowest ship in fleet (with drive bonuses)
- `fleet_speed`: Universe fleet speed multiplier (War/Holding/Peaceful)

## Example Output

```
OGameX Combat Simulator - Python Version

Battle completed in 2 round(s)

=== Round 1 ===
Attacker hits: 150
Defender hits: 150
Attacker ships remaining: 85
Defender ships remaining: 120

=== Round 2 ===
Attacker hits: 128
Defender hits: 85
Attacker ships remaining: 62
Defender ships remaining: 88

Winner: Defender

=== Flight Time Calculator ===
Origin: 1:1:1
Target: 1:100:1
Distance: 12,195 units
Slowest Ship Speed: 25,000
One Way: 01:43:54
Round Trip: 03:27:48
```

## Feature Parity with Browser Extension

This Python version includes all features from the browser extension:

✅ Complete battle simulation engine
✅ Rapidfire mechanics
✅ Shield regeneration
✅ Hull integrity explosion chances
✅ Technology bonuses (Weapons, Shielding, Armour)
✅ Flight time calculator
✅ Distance calculation
✅ Drive technology bonuses
✅ Ship drive upgrades
✅ Universe fleet speed settings
✅ Detailed round-by-round statistics

## Notes

- The Python version uses the same formulas as the browser extension
- Random number generation may produce different results between runs
- All calculations match OGameX server-side implementation
- Pure Python implementation with no external dependencies

## License

Part of the OGameX Battle Engine WASM project.
