#!/usr/bin/env python3
"""
OGameX Combat Simulator - Python Version
A complete combat simulator matching the browser extension functionality
"""

import json
import random
import math
from typing import Dict, List, Optional, Tuple
from dataclasses import dataclass, field


# Ship base speeds
SHIP_SPEEDS = {
    202: 5000,      # Small Cargo
    203: 7500,      # Large Cargo
    204: 12500,     # Light Fighter
    205: 10000,     # Heavy Fighter
    206: 15000,     # Cruiser
    207: 10000,     # Battleship
    208: 2500,      # Colony Ship
    209: 2000,      # Recycler
    210: 100000000, # Espionage Probe
    211: 4000,      # Bomber
    213: 5000,      # Destroyer
    214: 100,       # Deathstar
    215: 10000,     # Battlecruiser
    218: 7000,      # Reaper
    219: 12000,     # Pathfinder
}

# Ship drive types and upgrades
SHIP_DRIVES = {
    202: {'default': 'combustion', 'upgrades': [{'level': 5, 'drive': 'impulse', 'baseSpeed': 10000}]},
    203: {'default': 'combustion'},
    204: {'default': 'combustion'},
    205: {'default': 'impulse'},
    206: {'default': 'impulse'},
    207: {'default': 'hyperspace'},
    208: {'default': 'impulse'},
    209: {'default': 'combustion', 'upgrades': [
        {'level': 17, 'drive': 'impulse', 'baseSpeed': 4000},
        {'level': 15, 'drive': 'hyperspace', 'baseSpeed': 6000}
    ]},
    210: {'default': 'combustion'},
    211: {'default': 'impulse', 'upgrades': [{'level': 8, 'drive': 'hyperspace'}]},
    213: {'default': 'hyperspace'},
    214: {'default': 'hyperspace'},
    215: {'default': 'hyperspace'},
    218: {'default': 'impulse', 'upgrades': [{'level': 4, 'drive': 'hyperspace'}]},
    219: {'default': 'impulse', 'upgrades': [{'level': 3, 'drive': 'hyperspace'}]},
}

# Drive bonus percentages per level
DRIVE_BONUSES = {
    'combustion': 0.10,   # 10% per level
    'impulse': 0.20,      # 20% per level
    'hyperspace': 0.30,   # 30% per level
}


@dataclass
class BattleUnitInfo:
    """Battle unit info provided as input"""
    unit_id: int
    amount: int
    attack_power: float
    shield_points: float
    hull_plating: float
    rapidfire: Dict[int, int] = field(default_factory=dict)


@dataclass
class BattleUnitInstance:
    """Individual unit instance during combat"""
    unit_id: int
    current_shield_points: float
    current_hull_plating: float


@dataclass
class BattleUnitCount:
    """Unit count for tracking"""
    unit_id: int
    amount: int


@dataclass
class BattleRound:
    """Battle round statistics"""
    attacker_ships: Dict[int, BattleUnitCount] = field(default_factory=dict)
    defender_ships: Dict[int, BattleUnitCount] = field(default_factory=dict)
    attacker_losses: Dict[int, BattleUnitCount] = field(default_factory=dict)
    defender_losses: Dict[int, BattleUnitCount] = field(default_factory=dict)
    attacker_losses_in_round: Dict[int, BattleUnitCount] = field(default_factory=dict)
    defender_losses_in_round: Dict[int, BattleUnitCount] = field(default_factory=dict)
    absorbed_damage_attacker: float = 0.0
    absorbed_damage_defender: float = 0.0
    full_strength_attacker: float = 0.0
    full_strength_defender: float = 0.0
    hits_attacker: int = 0
    hits_defender: int = 0


class CombatSimulator:
    """OGame combat simulator"""

    def __init__(self):
        self.rounds: List[BattleRound] = []

    def simulate_battle(self, attacker_units: Dict[int, BattleUnitInfo],
                       defender_units: Dict[int, BattleUnitInfo]) -> List[BattleRound]:
        """Simulate battle and return results"""
        self.rounds = []

        # Create individual ship instances
        attackers = self._expand_units(attacker_units)
        defenders = self._expand_units(defender_units)

        # Fight up to 6 rounds
        for _ in range(6):
            if not attackers or not defenders:
                break

            battle_round = BattleRound()

            # Process combat
            self._process_combat(attackers, defenders, battle_round,
                               attacker_units, defender_units, True)
            self._process_combat(defenders, attackers, battle_round,
                               defender_units, attacker_units, False)

            # Cleanup round
            self._cleanup_round(battle_round, attackers, defenders,
                              attacker_units, defender_units)

            # Update round statistics
            battle_round.attacker_ships = self._compress_units(attackers)
            battle_round.defender_ships = self._compress_units(defenders)

            # Calculate accumulated losses
            self._calculate_losses(battle_round, attacker_units, defender_units)

            self.rounds.append(battle_round)

        return self.rounds

    def simulate_multiple(self, attacker_units: Dict[int, BattleUnitInfo],
                         defender_units: Dict[int, BattleUnitInfo],
                         num_runs: int = 5) -> List[BattleRound]:
        """Run multiple simulations and return averaged results"""
        if num_runs < 1:
            num_runs = 1

        if num_runs == 1:
            return self.simulate_battle(attacker_units, defender_units)

        all_results = []
        for i in range(num_runs):
            rounds = self.simulate_battle(attacker_units, defender_units)
            all_results.append(rounds)
            if (i + 1) % 10 == 0:
                print(f"Completed {i + 1}/{num_runs} simulations...", end='\r')

        if num_runs > 10:
            print()  # New line after progress

        return self._average_results(all_results)

    def _average_results(self, all_results: List[List[BattleRound]]) -> List[BattleRound]:
        """Average multiple simulation results"""
        if not all_results:
            return []

        if len(all_results) == 1:
            return all_results[0]

        max_rounds = max(len(rounds) for rounds in all_results)
        averaged_rounds = []

        for round_idx in range(max_rounds):
            # Get all rounds at this index
            rounds_at_idx = [
                result[round_idx] for result in all_results
                if round_idx < len(result)
            ]

            if not rounds_at_idx:
                continue

            # Average the round data
            avg_round = BattleRound()

            # Average scalar values
            avg_round.absorbed_damage_attacker = sum(r.absorbed_damage_attacker for r in rounds_at_idx) / len(rounds_at_idx)
            avg_round.absorbed_damage_defender = sum(r.absorbed_damage_defender for r in rounds_at_idx) / len(rounds_at_idx)
            avg_round.full_strength_attacker = sum(r.full_strength_attacker for r in rounds_at_idx) / len(rounds_at_idx)
            avg_round.full_strength_defender = sum(r.full_strength_defender for r in rounds_at_idx) / len(rounds_at_idx)
            avg_round.hits_attacker = round(sum(r.hits_attacker for r in rounds_at_idx) / len(rounds_at_idx))
            avg_round.hits_defender = round(sum(r.hits_defender for r in rounds_at_idx) / len(rounds_at_idx))

            # Average unit counts
            avg_round.attacker_ships = self._average_unit_counts([r.attacker_ships for r in rounds_at_idx])
            avg_round.defender_ships = self._average_unit_counts([r.defender_ships for r in rounds_at_idx])
            avg_round.attacker_losses = self._average_unit_counts([r.attacker_losses for r in rounds_at_idx])
            avg_round.defender_losses = self._average_unit_counts([r.defender_losses for r in rounds_at_idx])
            avg_round.attacker_losses_in_round = self._average_unit_counts([r.attacker_losses_in_round for r in rounds_at_idx])
            avg_round.defender_losses_in_round = self._average_unit_counts([r.defender_losses_in_round for r in rounds_at_idx])

            averaged_rounds.append(avg_round)

        return averaged_rounds

    def _average_unit_counts(self, unit_count_lists: List[Dict[int, BattleUnitCount]]) -> Dict[int, BattleUnitCount]:
        """Average unit counts across multiple results"""
        all_unit_ids = set()
        for counts in unit_count_lists:
            all_unit_ids.update(counts.keys())

        averaged = {}
        for unit_id in all_unit_ids:
            amounts = [counts.get(unit_id, BattleUnitCount(unit_id, 0)).amount for counts in unit_count_lists]
            avg_amount = round(sum(amounts) / len(amounts))

            if avg_amount > 0:
                averaged[unit_id] = BattleUnitCount(unit_id, avg_amount)

        return averaged

    def _expand_units(self, units: Dict[int, BattleUnitInfo]) -> List[BattleUnitInstance]:
        """Expand unit info into individual instances"""
        expanded = []
        for unit in units.values():
            for _ in range(unit.amount):
                expanded.append(BattleUnitInstance(
                    unit_id=unit.unit_id,
                    current_shield_points=unit.shield_points,
                    current_hull_plating=unit.hull_plating
                ))
        return expanded

    def _compress_units(self, units: List[BattleUnitInstance]) -> Dict[int, BattleUnitCount]:
        """Compress individual instances into counts"""
        counts = {}
        for unit in units:
            if unit.unit_id not in counts:
                counts[unit.unit_id] = BattleUnitCount(unit.unit_id, 0)
            counts[unit.unit_id].amount += 1
        return counts

    def _process_combat(self, attackers: List[BattleUnitInstance],
                       defenders: List[BattleUnitInstance],
                       battle_round: BattleRound,
                       attacker_metadata: Dict[int, BattleUnitInfo],
                       defender_metadata: Dict[int, BattleUnitInfo],
                       is_attacker: bool):
        """Process combat phase"""
        for attacker in attackers:
            continue_attacking = True

            attacker_meta = attacker_metadata[attacker.unit_id]
            damage = attacker_meta.attack_power

            while continue_attacking:
                continue_attacking = False

                # Select random target
                target_idx = random.randint(0, len(defenders) - 1)
                target = defenders[target_idx]

                target_meta = defender_metadata[target.unit_id]

                # Check if damage is less than 1% of shield
                if damage < (0.01 * target_meta.shield_points):
                    continue

                # Apply damage to shields first, then hull
                shield_absorption = 0.0
                if target.current_shield_points > 0.0:
                    if damage <= target.current_shield_points:
                        shield_absorption = damage
                        target.current_shield_points -= damage
                    else:
                        shield_absorption = target.current_shield_points
                        target.current_hull_plating -= damage - target.current_shield_points
                        target.current_shield_points = 0.0
                else:
                    target.current_hull_plating -= damage

                # Hull integrity explosion check
                if target.current_hull_plating / target_meta.hull_plating < 0.7:
                    explosion_chance = 100.0 - ((target.current_hull_plating / target_meta.hull_plating) * 100.0)
                    roll = random.randint(0, 100)
                    if roll < explosion_chance:
                        target.current_hull_plating = 0.0
                        target.current_shield_points = 0.0

                # Update round statistics
                if is_attacker:
                    battle_round.hits_attacker += 1
                    battle_round.full_strength_attacker += damage
                    battle_round.absorbed_damage_defender += shield_absorption
                else:
                    battle_round.hits_defender += 1
                    battle_round.full_strength_defender += damage
                    battle_round.absorbed_damage_attacker += shield_absorption

                # Check rapidfire
                if target.unit_id in attacker_meta.rapidfire:
                    rapidfire_amount = attacker_meta.rapidfire[target.unit_id]
                    chance = 100.0 / rapidfire_amount
                    rounded_chance = math.floor(chance * 100.0) / 100.0
                    rapidfire_chance = 100.0 - rounded_chance

                    roll = random.uniform(0.0, 100.0)
                    continue_attacking = roll <= rapidfire_chance

    def _cleanup_round(self, battle_round: BattleRound,
                      attackers: List[BattleUnitInstance],
                      defenders: List[BattleUnitInstance],
                      attacker_metadata: Dict[int, BattleUnitInfo],
                      defender_metadata: Dict[int, BattleUnitInfo]):
        """Clean up round - remove destroyed units and regenerate shields"""
        # Cleanup attackers
        i = 0
        while i < len(attackers):
            unit = attackers[i]
            if unit.current_hull_plating <= 0.0:
                if unit.unit_id not in battle_round.attacker_losses_in_round:
                    battle_round.attacker_losses_in_round[unit.unit_id] = BattleUnitCount(unit.unit_id, 0)
                battle_round.attacker_losses_in_round[unit.unit_id].amount += 1
                attackers.pop(i)
            else:
                # Regenerate shields
                unit.current_shield_points = attacker_metadata[unit.unit_id].shield_points
                i += 1

        # Cleanup defenders
        i = 0
        while i < len(defenders):
            unit = defenders[i]
            if unit.current_hull_plating <= 0.0:
                if unit.unit_id not in battle_round.defender_losses_in_round:
                    battle_round.defender_losses_in_round[unit.unit_id] = BattleUnitCount(unit.unit_id, 0)
                battle_round.defender_losses_in_round[unit.unit_id].amount += 1
                defenders.pop(i)
            else:
                # Regenerate shields
                unit.current_shield_points = defender_metadata[unit.unit_id].shield_points
                i += 1

    def _calculate_losses(self, battle_round: BattleRound,
                         initial_attacker: Dict[int, BattleUnitInfo],
                         initial_defender: Dict[int, BattleUnitInfo]):
        """Calculate total losses"""
        # Attacker losses
        for unit in initial_attacker.values():
            initial_count = unit.amount
            current_count = battle_round.attacker_ships.get(unit.unit_id, BattleUnitCount(unit.unit_id, 0)).amount

            if current_count < initial_count:
                loss_amount = initial_count - current_count
                battle_round.attacker_losses[unit.unit_id] = BattleUnitCount(unit.unit_id, loss_amount)

        # Defender losses
        for unit in initial_defender.values():
            initial_count = unit.amount
            current_count = battle_round.defender_ships.get(unit.unit_id, BattleUnitCount(unit.unit_id, 0)).amount

            if current_count < initial_count:
                loss_amount = initial_count - current_count
                battle_round.defender_losses[unit.unit_id] = BattleUnitCount(unit.unit_id, loss_amount)


class FlightTimeCalculator:
    """Calculate flight times between coordinates"""

    @staticmethod
    def calculate_distance(origin: Tuple[int, int, int], target: Tuple[int, int, int]) -> int:
        """Calculate distance between two coordinates"""
        og, os, op = origin
        tg, ts, tp = target

        # Same location
        if og == tg and os == ts and op == tp:
            return 5

        # Different galaxies
        if og != tg:
            return abs(og - tg) * 20000

        # Different systems
        if os != ts:
            return abs(os - ts) * 95 + 2700

        # Different planets
        if op != tp:
            return abs(op - tp) * 5 + 1000

        return 0

    @staticmethod
    def calculate_ship_speed(unit_id: int, combustion_level: int,
                           impulse_level: int, hyperspace_level: int) -> int:
        """Calculate ship speed with drive technology bonuses"""
        base_speed = SHIP_SPEEDS.get(unit_id, 0)
        if not base_speed:
            return 0

        drive_config = SHIP_DRIVES.get(unit_id)
        if not drive_config:
            return base_speed

        # Determine active drive and effective base speed
        active_drive = drive_config['default']
        effective_base_speed = base_speed

        # Check for drive upgrades
        if 'upgrades' in drive_config:
            sorted_upgrades = sorted(drive_config['upgrades'],
                                    key=lambda x: x['level'], reverse=True)

            for upgrade in sorted_upgrades:
                upgrade_level = 0
                if upgrade['drive'] == 'impulse':
                    upgrade_level = impulse_level
                elif upgrade['drive'] == 'hyperspace':
                    upgrade_level = hyperspace_level

                if upgrade_level >= upgrade['level']:
                    active_drive = upgrade['drive']
                    if 'baseSpeed' in upgrade:
                        effective_base_speed = upgrade['baseSpeed']
                    break

        # Get drive level for active drive
        drive_level = 0
        if active_drive == 'combustion':
            drive_level = combustion_level
        elif active_drive == 'impulse':
            drive_level = impulse_level
        elif active_drive == 'hyperspace':
            drive_level = hyperspace_level

        # Calculate speed bonus
        bonus_percentage = DRIVE_BONUSES.get(active_drive, 0)
        speed_bonus = (effective_base_speed / 100) * (drive_level * bonus_percentage * 100)

        return int(effective_base_speed + speed_bonus)

    @staticmethod
    def get_slowest_ship_speed(fleet: Dict[int, int], combustion_level: int,
                              impulse_level: int, hyperspace_level: int) -> int:
        """Get slowest ship speed from fleet"""
        slowest_speed = float('inf')
        found_any_ship = False

        for unit_id, amount in fleet.items():
            if amount > 0 and unit_id in SHIP_SPEEDS:
                found_any_ship = True
                ship_speed = FlightTimeCalculator.calculate_ship_speed(
                    unit_id, combustion_level, impulse_level, hyperspace_level
                )
                slowest_speed = min(slowest_speed, ship_speed)

        if not found_any_ship:
            return 10000  # Default speed

        return slowest_speed

    @staticmethod
    def calculate_flight_time(distance: int, speed_percent: int,
                            slowest_speed: int, fleet_speed: float) -> int:
        """Calculate flight time in seconds"""
        if distance == 0 or slowest_speed == 0:
            return 0

        time = (35000 / speed_percent * math.sqrt(distance * 10 / slowest_speed) + 10) / fleet_speed
        return max(int(round(time)), 1)

    @staticmethod
    def format_flight_time(seconds: int) -> str:
        """Format seconds to readable time"""
        hours = seconds // 3600
        minutes = (seconds % 3600) // 60
        secs = seconds % 60
        return f"{hours:02d}h {minutes:02d}m {secs:02d}s"


def main():
    """Example usage"""
    print("OGameX Combat Simulator - Python Version\n")

    # Example battle setup
    attacker_units = {
        204: BattleUnitInfo(
            unit_id=204,
            amount=100,
            attack_power=50 * 2.0,  # Level 10 weapons
            shield_points=10 * 2.0,  # Level 10 shielding
            hull_plating=400 * 2.0,  # Level 10 armour
            rapidfire={}
        ),
        206: BattleUnitInfo(
            unit_id=206,
            amount=50,
            attack_power=400 * 2.0,
            shield_points=50 * 2.0,
            hull_plating=2700 * 2.0,
            rapidfire={204: 3, 210: 5}
        )
    }

    defender_units = {
        204: BattleUnitInfo(
            unit_id=204,
            amount=150,
            attack_power=50 * 2.0,
            shield_points=10 * 2.0,
            hull_plating=400 * 2.0,
            rapidfire={}
        )
    }

    # Run multiple simulations for averaged results
    simulator = CombatSimulator()
    num_runs = 5
    print(f"Running {num_runs} simulations for averaged results...\n")
    rounds = simulator.simulate_multiple(attacker_units, defender_units, num_runs)

    # Display results
    print(f"📊 Averaged results from {num_runs} simulation runs")
    print(f"Battle completed in {len(rounds)} round(s)\n")

    for i, battle_round in enumerate(rounds, 1):
        print(f"=== Round {i} ===")
        print(f"Attacker hits: {battle_round.hits_attacker}")
        print(f"Defender hits: {battle_round.hits_defender}")
        print(f"Attacker ships remaining: {sum(u.amount for u in battle_round.attacker_ships.values())}")
        print(f"Defender ships remaining: {sum(u.amount for u in battle_round.defender_ships.values())}")
        print()

    # Determine winner
    final_round = rounds[-1]
    attacker_remaining = sum(u.amount for u in final_round.attacker_ships.values())
    defender_remaining = sum(u.amount for u in final_round.defender_ships.values())

    if attacker_remaining > 0 and defender_remaining == 0:
        print("Winner: Attacker")
    elif defender_remaining > 0 and attacker_remaining == 0:
        print("Winner: Defender")
    else:
        print("Result: Draw")

    # Flight time example
    print("\n=== Flight Time Calculator ===")
    origin = (1, 1, 1)
    target = (1, 100, 1)

    fleet = {204: 100}  # 100 Light Fighters

    calc = FlightTimeCalculator()
    distance = calc.calculate_distance(origin, target)
    slowest_speed = calc.get_slowest_ship_speed(fleet, 10, 0, 0)  # Combustion 10
    flight_time = calc.calculate_flight_time(distance, 100, slowest_speed, 1.0)

    print(f"Origin: {origin[0]}:{origin[1]}:{origin[2]}")
    print(f"Target: {target[0]}:{target[1]}:{target[2]}")
    print(f"Distance: {distance:,} units")
    print(f"Slowest Ship Speed: {slowest_speed:,}")
    print(f"One Way: {calc.format_flight_time(flight_time)}")
    print(f"Round Trip: {calc.format_flight_time(flight_time * 2)}")


if __name__ == "__main__":
    main()
