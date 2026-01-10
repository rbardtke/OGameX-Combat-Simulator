// OGame unit definitions with their base stats
const UNITS = {
    // Ships
    202: { name: 'Small Cargo', attack: 5, shield: 10, hull: 400, rapidfire: {}, cost: { metal: 2000, crystal: 2000, deuterium: 0 } },
    203: { name: 'Large Cargo', attack: 5, shield: 25, hull: 1200, rapidfire: {}, cost: { metal: 6000, crystal: 6000, deuterium: 0 } },
    204: { name: 'Light Fighter', attack: 50, shield: 10, hull: 400, rapidfire: {}, cost: { metal: 3000, crystal: 1000, deuterium: 0 } },
    205: { name: 'Heavy Fighter', attack: 150, shield: 25, hull: 1000, rapidfire: { 204: 3, 210: 2 }, cost: { metal: 6000, crystal: 4000, deuterium: 0 } },
    206: { name: 'Cruiser', attack: 400, shield: 50, hull: 2700, rapidfire: { 204: 6, 210: 3, 212: 10 }, cost: { metal: 20000, crystal: 7000, deuterium: 2000 } },
    207: { name: 'Battleship', attack: 1000, shield: 200, hull: 6000, rapidfire: {}, cost: { metal: 45000, crystal: 15000, deuterium: 0 } },
    208: { name: 'Colony Ship', attack: 50, shield: 100, hull: 3000, rapidfire: {}, cost: { metal: 10000, crystal: 20000, deuterium: 10000 } },
    209: { name: 'Recycler', attack: 1, shield: 10, hull: 1600, rapidfire: {}, cost: { metal: 10000, crystal: 6000, deuterium: 2000 } },
    210: { name: 'Espionage Probe', attack: 0.01, shield: 0.01, hull: 100, rapidfire: {}, cost: { metal: 0, crystal: 1000, deuterium: 0 } },
    211: { name: 'Bomber', attack: 1000, shield: 500, hull: 7500, rapidfire: { 401: 20, 402: 20, 403: 10, 404: 5, 405: 10, 406: 10, 407: 2, 408: 2 }, cost: { metal: 50000, crystal: 25000, deuterium: 15000 } },
    213: { name: 'Destroyer', attack: 2000, shield: 500, hull: 11000, rapidfire: { 211: 2, 214: 2, 401: 10, 402: 10, 403: 5, 404: 5 }, cost: { metal: 60000, crystal: 50000, deuterium: 15000 } },
    214: { name: 'Deathstar', attack: 200000, shield: 50000, hull: 900000, rapidfire: { 202: 250, 203: 250, 204: 200, 205: 100, 206: 33, 207: 30, 208: 250, 209: 250, 210: 1250, 211: 25, 212: 1250, 213: 5, 401: 200, 402: 200, 403: 100, 404: 50, 405: 100, 406: 100, 407: 10, 408: 5 }, cost: { metal: 5000000, crystal: 4000000, deuterium: 1000000 } },
    215: { name: 'Battlecruiser', attack: 700, shield: 400, hull: 7000, rapidfire: { 202: 3, 203: 3, 204: 6, 210: 5, 212: 5 }, cost: { metal: 30000, crystal: 40000, deuterium: 15000 } },
    218: { name: 'Reaper', attack: 2800, shield: 700, hull: 14000, rapidfire: { 211: 4, 213: 3 }, cost: { metal: 85000, crystal: 55000, deuterium: 20000 } },
    219: { name: 'Pathfinder', attack: 200, shield: 100, hull: 2300, rapidfire: { 206: 3, 215: 2 }, cost: { metal: 8000, crystal: 15000, deuterium: 8000 } },

    // Defense
    401: { name: 'Rocket Launcher', attack: 80, shield: 20, hull: 200, rapidfire: {}, cost: { metal: 2000, crystal: 0, deuterium: 0 } },
    402: { name: 'Light Laser', attack: 100, shield: 25, hull: 200, rapidfire: {}, cost: { metal: 1500, crystal: 500, deuterium: 0 } },
    403: { name: 'Heavy Laser', attack: 250, shield: 100, hull: 800, rapidfire: {}, cost: { metal: 6000, crystal: 2000, deuterium: 0 } },
    404: { name: 'Gauss Cannon', attack: 1100, shield: 200, hull: 3500, rapidfire: {}, cost: { metal: 20000, crystal: 15000, deuterium: 2000 } },
    405: { name: 'Ion Cannon', attack: 150, shield: 500, hull: 800, rapidfire: {}, cost: { metal: 2000, crystal: 6000, deuterium: 0 } },
    406: { name: 'Plasma Turret', attack: 3000, shield: 300, hull: 10000, rapidfire: {}, cost: { metal: 50000, crystal: 50000, deuterium: 30000 } },
    407: { name: 'Small Shield Dome', attack: 1, shield: 2000, hull: 2000, rapidfire: {}, cost: { metal: 10000, crystal: 10000, deuterium: 0 } },
    408: { name: 'Large Shield Dome', attack: 1, shield: 10000, hull: 10000, rapidfire: {}, cost: { metal: 50000, crystal: 50000, deuterium: 0 } },
};

// Ship base speeds (without technology bonuses)
const SHIP_SPEEDS = {
    202: 5000,    // Small Cargo
    203: 7500,    // Large Cargo
    204: 12500,   // Light Fighter
    205: 10000,   // Heavy Fighter
    206: 15000,   // Cruiser
    207: 10000,   // Battleship
    208: 2500,    // Colony Ship
    209: 2000,    // Recycler
    210: 100000000, // Espionage Probe
    211: 4000,    // Bomber
    213: 5000,    // Destroyer
    214: 100,     // Deathstar
    215: 10000,   // Battlecruiser
    218: 7000,    // Reaper
    219: 12000,   // Pathfinder
};

// Ship drive types: 'combustion', 'impulse', or 'hyperspace'
// Some ships can upgrade their drive at certain tech levels
const SHIP_DRIVES = {
    202: { default: 'combustion', upgrades: [{ level: 5, drive: 'impulse', baseSpeed: 10000 }] },
    203: { default: 'combustion' },
    204: { default: 'combustion' },
    205: { default: 'impulse' },
    206: { default: 'impulse' },
    207: { default: 'hyperspace' },
    208: { default: 'impulse' },
    209: { default: 'combustion', upgrades: [{ level: 17, drive: 'impulse', baseSpeed: 4000 }, { level: 15, drive: 'hyperspace', baseSpeed: 6000 }] },
    210: { default: 'combustion' },
    211: { default: 'impulse', upgrades: [{ level: 8, drive: 'hyperspace', baseSpeed: 5000 }] },
    213: { default: 'hyperspace' },
    214: { default: 'hyperspace' },
    215: { default: 'hyperspace' },
    218: { default: 'impulse', upgrades: [{ level: 4, drive: 'hyperspace' }] },
    219: { default: 'impulse', upgrades: [{ level: 3, drive: 'impulse' }, { level: 3, drive: 'hyperspace' }] }, // Pathfinder: Can use Impulse or Hyperspace at 3+ (Hyperspace wins if both >= 3)
};

// Drive bonus percentages per level
const DRIVE_BONUSES = {
    combustion: 0.10,  // 10% per level
    impulse: 0.20,     // 20% per level
    hyperspace: 0.30,  // 30% per level
};

// Initialize WASM module
let wasmModule = null;
let wasmReady = false;

// Store last simulation result for sharing
let lastBattleResult = null;

// Load WASM using dynamic import for ES6 module format (--target web)
async function initWasm() {
    try {
        // Dynamic import for ES6 module format
        const wasm = await import('./pkg/ogame_combat_wasm.js');

        // Initialize the WASM module
        await wasm.default('pkg/ogame_combat_wasm_bg.wasm');

        wasmModule = wasm;
        wasmReady = true;
        console.log('WASM module loaded successfully');
    } catch (error) {
        console.error('Failed to load WASM module:', error);
        showError('Failed to initialize combat simulator. Error: ' + error.message);
    }
}

// Character class constants
const CHARACTER_CLASSES = {
    NONE: 0,
    COLLECTOR: 1,
    GENERAL: 2,
    DISCOVERER: 3
};

// General class bonus: +2 combat research levels (weapons, shields, armor)
const GENERAL_COMBAT_BONUS = 2;

// Get selected character class for a side
function getCharacterClass(side) {
    const radioName = side === 'attacker' ? 'atkClass' : 'defClass';
    const selected = document.querySelector(`input[name="${radioName}"]:checked`);
    return selected ? parseInt(selected.value) : CHARACTER_CLASSES.NONE;
}

// Apply technology multipliers (10% per level)
function applyTechMultipliers(baseValue, techLevel) {
    return baseValue * (1 + (techLevel * 0.1));
}

// Collect units from input fields
function collectUnits(side) {
    const units = {};
    const prefix = side === 'attacker' ? 'atk' : 'def';

    // Get technology levels
    let weaponsTech = parseInt(document.getElementById(`${prefix}Weapons`).value) || 0;
    let shieldingTech = parseInt(document.getElementById(`${prefix}Shielding`).value) || 0;
    let armourTech = parseInt(document.getElementById(`${prefix}Armour`).value) || 0;

    // Apply General class bonus: +2 to combat research levels
    const characterClass = getCharacterClass(side);
    if (characterClass === CHARACTER_CLASSES.GENERAL) {
        weaponsTech += GENERAL_COMBAT_BONUS;
        shieldingTech += GENERAL_COMBAT_BONUS;
        armourTech += GENERAL_COMBAT_BONUS;
    }

    // Collect all unit inputs
    const inputs = document.querySelectorAll(`.${side}-panel .unit-input`);

    inputs.forEach(input => {
        const amount = parseInt(input.value) || 0;
        if (amount > 0) {
            const unitId = parseInt(input.dataset.unitId);
            const unit = UNITS[unitId];

            if (unit) {
                // Apply technology multipliers to base stats
                const attack = applyTechMultipliers(unit.attack, weaponsTech);
                const shield = applyTechMultipliers(unit.shield, shieldingTech);
                const hull = applyTechMultipliers(unit.hull, armourTech);

                units[unitId] = {
                    unit_id: unitId,
                    amount: amount,
                    attack_power: attack,
                    shield_points: shield,
                    hull_plating: hull,
                    rapidfire: unit.rapidfire
                };
            }
        }
    });

    return units;
}

// Calculate debris field from losses
function calculateDebris(losses, debrisShipPercent = 30, debrisDefensePercent = 0, includeDeuterium = false) {
    let metal = 0;
    let crystal = 0;
    let deuterium = 0;

    for (const [unitId, lossData] of Object.entries(losses)) {
        const unit = UNITS[parseInt(unitId)];
        if (unit && lossData.amount > 0) {
            const isDefense = unitId >= 401;
            const debrisPercent = isDefense ? debrisDefensePercent : debrisShipPercent;

            metal += (unit.cost.metal * lossData.amount * debrisPercent) / 100;
            crystal += (unit.cost.crystal * lossData.amount * debrisPercent) / 100;

            // Only include deuterium if enabled
            if (includeDeuterium) {
                deuterium += (unit.cost.deuterium * lossData.amount * debrisPercent) / 100;
            }
        }
    }

    return {
        metal: Math.floor(metal),
        crystal: Math.floor(crystal),
        deuterium: Math.floor(deuterium),
        total: Math.floor(metal + crystal + deuterium)
    };
}

// Calculate recyclers needed
function calculateRecyclersNeeded(debrisTotal, recyclerCapacity = 20000) {
    return Math.ceil(debrisTotal / recyclerCapacity);
}

// Calculate plunder based on OGame rules
function calculatePlunder(defenderResources, attackerCargoCapacity, attackerWins, plunderPercent = 50) {
    if (!attackerWins) {
        return { metal: 0, crystal: 0, deuterium: 0, total: 0 };
    }

    // Configurable percentage of resources available for plunder
    const plunderRatio = plunderPercent / 100;
    const availableMetal = Math.floor(defenderResources.metal * plunderRatio);
    const availableCrystal = Math.floor(defenderResources.crystal * plunderRatio);
    const availableDeuterium = Math.floor(defenderResources.deuterium * plunderRatio);
    const totalAvailable = availableMetal + availableCrystal + availableDeuterium;

    // If no cargo capacity or no resources, return zero
    if (attackerCargoCapacity === 0 || totalAvailable === 0) {
        return { metal: 0, crystal: 0, deuterium: 0, total: 0 };
    }

    // If cargo can carry all, take all
    if (attackerCargoCapacity >= totalAvailable) {
        return {
            metal: availableMetal,
            crystal: availableCrystal,
            deuterium: availableDeuterium,
            total: totalAvailable
        };
    }

    // Otherwise, distribute proportionally
    const ratio = attackerCargoCapacity / totalAvailable;
    return {
        metal: Math.floor(availableMetal * ratio),
        crystal: Math.floor(availableCrystal * ratio),
        deuterium: Math.floor(availableDeuterium * ratio),
        total: attackerCargoCapacity
    };
}

// Base cargo capacities for each ship type
const CARGO_CAPACITY = {
    202: 5000,    // Small Cargo
    203: 25000,   // Large Cargo
    204: 50,      // Light Fighter
    205: 100,     // Heavy Fighter
    206: 800,     // Cruiser
    207: 1500,    // Battleship
    208: 7500,    // Colony Ship
    209: 20000,   // Recycler
    210: 5,       // Espionage Probe
    211: 500,     // Bomber
    213: 2000,    // Destroyer
    214: 1000000, // Deathstar
    215: 750,     // Battlecruiser
    218: 10000,   // Reaper
    219: 10000    // Pathfinder
};

// Calculate cargo capacity from surviving ships
// Hyperspace Technology increases cargo capacity by 5% per level
function calculateCargoCapacity(ships, hyperspaceTechLevel = 0) {
    const cargoBonus = 1 + (hyperspaceTechLevel * 0.05); // 5% per level

    let totalCapacity = 0;
    for (const [unitId, unit] of Object.entries(ships)) {
        const baseCapacity = CARGO_CAPACITY[parseInt(unitId)] || 0;
        const adjustedCapacity = Math.floor(baseCapacity * cargoBonus);
        totalCapacity += adjustedCapacity * unit.amount;
    }
    return totalCapacity;
}

// Update remaining units display
function updateRemainingUnits(lastRound) {
    // Clear all remaining displays first
    document.querySelectorAll('.unit-remaining').forEach(el => {
        el.textContent = '';
    });

    // Get all unit IDs from UNITS object
    const allUnitIds = Object.keys(UNITS);

    // Update attacker remaining
    for (const unitId of allUnitIds) {
        const inputEl = document.getElementById(`atk-${unitId}`);
        const remainingEl = document.getElementById(`atk-${unitId}-remaining`);

        if (inputEl && remainingEl) {
            const initialCount = parseInt(inputEl.value) || 0;

            // Only show remaining for units that were initially present
            if (initialCount > 0) {
                const remainingCount = lastRound.attacker_ships[unitId]?.amount || 0;
                remainingEl.textContent = `(${remainingCount.toLocaleString()})`;
            }
        }
    }

    // Update defender remaining
    for (const unitId of allUnitIds) {
        const inputEl = document.getElementById(`def-${unitId}`);
        const remainingEl = document.getElementById(`def-${unitId}-remaining`);

        if (inputEl && remainingEl) {
            const initialCount = parseInt(inputEl.value) || 0;

            // Only show remaining for units that were initially present
            if (initialCount > 0) {
                const remainingCount = lastRound.defender_ships[unitId]?.amount || 0;
                remainingEl.textContent = `(${remainingCount.toLocaleString()})`;
            }
        }
    }
}

// Display battle results
function displayResults(output, numRuns = 1) {
    const results = JSON.parse(output);
    const tabsHeader = document.getElementById('tabsHeader');
    const tabsContent = document.getElementById('tabsContent');
    tabsHeader.innerHTML = '';
    tabsContent.innerHTML = '';

    // Determine winner from the final state or statistics
    const lastRound = results.rounds[results.rounds.length - 1];
    const statistics = results.statistics; // Available when multiple runs
    const attackerSurvived = Object.keys(lastRound.attacker_ships).length > 0;
    const defenderSurvived = Object.keys(lastRound.defender_ships).length > 0;
    const isAveragedFinal = lastRound.is_final_averaged;

    let winner = '';
    let winnerType = 'attacker'; // For styling: 'attacker', 'defender', 'draw'

    if (statistics) {
        // Use statistics for winner display when available
        if (statistics.attackerWinPercent > statistics.defenderWinPercent && statistics.attackerWinPercent > statistics.drawPercent) {
            winner = `🚀 Attacker Wins (${statistics.attackerWinPercent}%)`;
            winnerType = 'attacker';
        } else if (statistics.defenderWinPercent > statistics.attackerWinPercent && statistics.defenderWinPercent > statistics.drawPercent) {
            winner = `🛡️ Defender Wins (${statistics.defenderWinPercent}%)`;
            winnerType = 'defender';
        } else if (statistics.drawPercent > 0 && statistics.drawPercent >= statistics.attackerWinPercent && statistics.drawPercent >= statistics.defenderWinPercent) {
            winner = `⚔️ Draw (${statistics.drawPercent}%)`;
            winnerType = 'draw';
        } else if (statistics.attackerWinPercent === 100) {
            winner = '🚀 Attacker Wins!';
            winnerType = 'attacker';
        } else if (statistics.defenderWinPercent === 100) {
            winner = '🛡️ Defender Wins!';
            winnerType = 'defender';
        } else {
            winner = '📊 Mixed Results';
            winnerType = 'draw';
        }
    } else {
        // Single run - use direct outcome
        if (attackerSurvived && !defenderSurvived) {
            winner = '🚀 Attacker Wins!';
            winnerType = 'attacker';
        } else if (!attackerSurvived && defenderSurvived) {
            winner = '🛡️ Defender Wins!';
            winnerType = 'defender';
        } else if (!attackerSurvived && !defenderSurvived) {
            winner = '💥 Draw - Both Sides Destroyed!';
            winnerType = 'draw';
        } else {
            winner = '⚔️ Draw (6 rounds limit reached)';
            winnerType = 'draw';
        }
    }

    // Add simulation info header with statistics if multiple runs
    if (numRuns > 1 && statistics) {
        const infoDiv = document.createElement('div');
        infoDiv.className = 'simulation-stats';
        infoDiv.innerHTML = `
            <div class="stats-header">📊 Results from ${numRuns} simulations</div>
            <div class="stats-grid">
                <div class="stat-item attacker-stat">
                    <span class="stat-label">Attacker wins</span>
                    <span class="stat-value">${statistics.attackerWinPercent}%</span>
                </div>
                <div class="stat-item defender-stat">
                    <span class="stat-label">Defender wins</span>
                    <span class="stat-value">${statistics.defenderWinPercent}%</span>
                </div>
                <div class="stat-item draw-stat">
                    <span class="stat-label">Draw</span>
                    <span class="stat-value">${statistics.drawPercent}%</span>
                </div>
                <div class="stat-item rounds-stat">
                    <span class="stat-label">Avg. rounds</span>
                    <span class="stat-value">${statistics.averageRounds}</span>
                </div>
            </div>
        `;
        tabsHeader.parentElement.insertBefore(infoDiv, tabsHeader);
    }

    // Helper function to get class name from value
    const getClassName = (classValue) => {
        switch (classValue) {
            case 1: return 'Collector';
            case 2: return 'General';
            case 3: return 'Discoverer';
            default: return 'None';
        }
    };

    // Helper function to get class icon path
    const getClassIcon = (classValue) => {
        switch (classValue) {
            case 1: return 'img/classes/collector.png';
            case 2: return 'img/classes/general.png';
            case 3: return 'img/classes/discoverer.png';
            default: return 'img/classes/none.png';
        }
    };

    // Create Battle Setup tab (before rounds)
    const setupTabButton = document.createElement('button');
    setupTabButton.className = 'tab-button active';
    setupTabButton.textContent = 'Setup';
    setupTabButton.onclick = () => switchTab('setup');
    tabsHeader.appendChild(setupTabButton);

    // Create Setup tab content
    const setupPane = document.createElement('div');
    setupPane.className = 'tab-content active';
    setupPane.id = 'round-setup';

    // Get current form values for technologies and classes
    const atkClass = getCharacterClass('attacker');
    const defClass = getCharacterClass('defender');

    const atkWeapons = parseInt(document.getElementById('atkWeapons')?.value) || 0;
    const atkShielding = parseInt(document.getElementById('atkShielding')?.value) || 0;
    const atkArmour = parseInt(document.getElementById('atkArmour')?.value) || 0;

    const defWeapons = parseInt(document.getElementById('defWeapons')?.value) || 0;
    const defShielding = parseInt(document.getElementById('defShielding')?.value) || 0;
    const defArmour = parseInt(document.getElementById('defArmour')?.value) || 0;

    // Calculate effective tech levels with General bonus
    const atkEffectiveWeapons = atkClass === CHARACTER_CLASSES.GENERAL ? atkWeapons + GENERAL_COMBAT_BONUS : atkWeapons;
    const atkEffectiveShielding = atkClass === CHARACTER_CLASSES.GENERAL ? atkShielding + GENERAL_COMBAT_BONUS : atkShielding;
    const atkEffectiveArmour = atkClass === CHARACTER_CLASSES.GENERAL ? atkArmour + GENERAL_COMBAT_BONUS : atkArmour;

    const defEffectiveWeapons = defClass === CHARACTER_CLASSES.GENERAL ? defWeapons + GENERAL_COMBAT_BONUS : defWeapons;
    const defEffectiveShielding = defClass === CHARACTER_CLASSES.GENERAL ? defShielding + GENERAL_COMBAT_BONUS : defShielding;
    const defEffectiveArmour = defClass === CHARACTER_CLASSES.GENERAL ? defArmour + GENERAL_COMBAT_BONUS : defArmour;

    // Collect initial units from form inputs
    const collectInitialUnits = (prefix) => {
        const units = [];
        // Ships (202-219)
        for (let unitId = 202; unitId <= 219; unitId++) {
            const input = document.getElementById(`${prefix}-${unitId}`);
            if (input) {
                const amount = parseInt(input.value) || 0;
                if (amount > 0) {
                    units.push({ id: unitId, name: UNITS[unitId]?.name || `Unit ${unitId}`, amount });
                }
            }
        }
        // Defense (401-408) - only for defender
        if (prefix === 'def') {
            for (let unitId = 401; unitId <= 408; unitId++) {
                const input = document.getElementById(`${prefix}-${unitId}`);
                if (input) {
                    const amount = parseInt(input.value) || 0;
                    if (amount > 0) {
                        units.push({ id: unitId, name: UNITS[unitId]?.name || `Unit ${unitId}`, amount });
                    }
                }
            }
        }
        return units;
    };

    const atkInitialUnits = collectInitialUnits('atk');
    const defInitialUnits = collectInitialUnits('def');

    let setupHtml = '<div class="round">';
    setupHtml += '<h3>Battle Setup</h3>';
    setupHtml += '<div class="round-stats">';

    // Attacker setup
    setupHtml += '<div class="stat-group">';
    setupHtml += '<h4>🚀 Attacker</h4>';
    setupHtml += '<div class="setup-info">';
    setupHtml += `<div class="class-display"><img src="${getClassIcon(atkClass)}" alt="${getClassName(atkClass)}" class="class-icon-small"> <span>${getClassName(atkClass)}</span></div>`;
    setupHtml += '<div class="tech-display">';
    setupHtml += `<div class="tech-row"><span>Weapons:</span> <span>${atkWeapons}${atkClass === CHARACTER_CLASSES.GENERAL ? ` <span class="bonus">(+${GENERAL_COMBAT_BONUS} = ${atkEffectiveWeapons})</span>` : ''}</span></div>`;
    setupHtml += `<div class="tech-row"><span>Shielding:</span> <span>${atkShielding}${atkClass === CHARACTER_CLASSES.GENERAL ? ` <span class="bonus">(+${GENERAL_COMBAT_BONUS} = ${atkEffectiveShielding})</span>` : ''}</span></div>`;
    setupHtml += `<div class="tech-row"><span>Armour:</span> <span>${atkArmour}${atkClass === CHARACTER_CLASSES.GENERAL ? ` <span class="bonus">(+${GENERAL_COMBAT_BONUS} = ${atkEffectiveArmour})</span>` : ''}</span></div>`;
    setupHtml += '</div>';
    // Initial units
    setupHtml += '<div class="initial-units">';
    setupHtml += '<div class="units-header">Initial Fleet</div>';
    setupHtml += '<div class="unit-list">';
    if (atkInitialUnits.length > 0) {
        for (const unit of atkInitialUnits) {
            setupHtml += `<div class="unit-item">${unit.name}: ${unit.amount.toLocaleString()}</div>`;
        }
    } else {
        setupHtml += '<div class="unit-item" style="opacity: 0.5;">No units</div>';
    }
    setupHtml += '</div>';
    setupHtml += '</div>';
    setupHtml += '</div>';
    setupHtml += '</div>';

    // Defender setup
    setupHtml += '<div class="stat-group">';
    setupHtml += '<h4>🛡️ Defender</h4>';
    setupHtml += '<div class="setup-info">';
    setupHtml += `<div class="class-display"><img src="${getClassIcon(defClass)}" alt="${getClassName(defClass)}" class="class-icon-small"> <span>${getClassName(defClass)}</span></div>`;
    setupHtml += '<div class="tech-display">';
    setupHtml += `<div class="tech-row"><span>Weapons:</span> <span>${defWeapons}${defClass === CHARACTER_CLASSES.GENERAL ? ` <span class="bonus">(+${GENERAL_COMBAT_BONUS} = ${defEffectiveWeapons})</span>` : ''}</span></div>`;
    setupHtml += `<div class="tech-row"><span>Shielding:</span> <span>${defShielding}${defClass === CHARACTER_CLASSES.GENERAL ? ` <span class="bonus">(+${GENERAL_COMBAT_BONUS} = ${defEffectiveShielding})</span>` : ''}</span></div>`;
    setupHtml += `<div class="tech-row"><span>Armour:</span> <span>${defArmour}${defClass === CHARACTER_CLASSES.GENERAL ? ` <span class="bonus">(+${GENERAL_COMBAT_BONUS} = ${defEffectiveArmour})</span>` : ''}</span></div>`;
    setupHtml += '</div>';
    // Initial units
    setupHtml += '<div class="initial-units">';
    setupHtml += '<div class="units-header">Initial Forces</div>';
    setupHtml += '<div class="unit-list">';
    if (defInitialUnits.length > 0) {
        for (const unit of defInitialUnits) {
            setupHtml += `<div class="unit-item">${unit.name}: ${unit.amount.toLocaleString()}</div>`;
        }
    } else {
        setupHtml += '<div class="unit-item" style="opacity: 0.5;">No units</div>';
    }
    setupHtml += '</div>';
    setupHtml += '</div>';
    setupHtml += '</div>';
    setupHtml += '</div>';

    setupHtml += '</div>';
    setupHtml += '</div>';

    setupPane.innerHTML = setupHtml;
    tabsContent.appendChild(setupPane);

    // Create tabs for each round
    results.rounds.forEach((round, index) => {
        // Skip the final averaged round - it will be shown in the End tab
        if (round.is_final_averaged) return;

        // Create tab button
        const tabButton = document.createElement('button');
        tabButton.className = 'tab-button';
        tabButton.textContent = `Round ${index + 1}`;
        tabButton.onclick = () => switchTab(index);
        tabsHeader.appendChild(tabButton);

        // Create tab content
        const tabPane = document.createElement('div');
        tabPane.className = 'tab-content';
        tabPane.id = `round-${index}`;

        let html = '<div class="round">';
        html += `<h3>Round ${index + 1}</h3>`;

        // Add combat statistics (only if available - imported battles may not have these)
        const hasCombatStats = round.hits_attacker > 0 || round.hits_defender > 0;
        if (hasCombatStats) {
            html += `<div class="combat-stats">`;
            html += `<div class="combat-stat-row">`;
            html += `<span>The Attacker fires a total of <strong>${round.hits_attacker.toLocaleString()}</strong> shots with a total strength of <strong>${Math.floor(round.full_strength_attacker).toLocaleString()}</strong>. The defender's shields absorb <strong>${Math.floor(round.absorbed_damage_defender).toLocaleString()}</strong> points of damage.</span>`;
            html += `</div>`;
            html += `<div class="combat-stat-row">`;
            html += `<span>The Defender fires a total of <strong>${round.hits_defender.toLocaleString()}</strong> shots with a total strength of <strong>${Math.floor(round.full_strength_defender).toLocaleString()}</strong>. The attacker's shields absorb <strong>${Math.floor(round.absorbed_damage_attacker).toLocaleString()}</strong> points of damage.</span>`;
            html += `</div>`;
            html += `</div>`;
        } else {
            html += `<div class="combat-stats">`;
            html += `<div class="combat-stat-row" style="font-style: italic; opacity: 0.7;">`;
            html += `<span>📥 Imported battle result - detailed combat statistics not available</span>`;
            html += `</div>`;
            html += `</div>`;
        }

        html += `<div class="round-stats">`;

        // Attacker stats
        html += `<div class="stat-group">`;
        html += `<h4>🚀 Attacker</h4>`;
        html += `<div class="setup-info">`;
        html += `<div class="units-header">Remaining Fleet</div>`;
        html += `<div class="unit-list">`;

        if (Object.keys(round.attacker_ships).length > 0) {
            for (const [unitId, unit] of Object.entries(round.attacker_ships)) {
                const unitName = UNITS[parseInt(unitId)]?.name || `Unit ${unitId}`;
                html += `<div class="unit-item">${unitName}: ${unit.amount.toLocaleString()}</div>`;
            }
        } else {
            html += `<div class="unit-item destroyed">All destroyed</div>`;
        }
        html += `</div>`;

        if (Object.keys(round.attacker_losses_in_round).length > 0) {
            html += `<div class="initial-units">`;
            html += `<div class="units-header" style="color: #fca5a5;">Losses this round</div>`;
            html += `<div class="unit-list">`;
            for (const [unitId, unit] of Object.entries(round.attacker_losses_in_round)) {
                const unitName = UNITS[parseInt(unitId)]?.name || `Unit ${unitId}`;
                html += `<div class="unit-item loss">-${unit.amount.toLocaleString()} ${unitName}</div>`;
            }
            html += `</div>`;
            html += `</div>`;
        }

        html += `</div></div>`;

        // Defender stats
        html += `<div class="stat-group">`;
        html += `<h4>🛡️ Defender</h4>`;
        html += `<div class="setup-info">`;
        html += `<div class="units-header">Remaining Forces</div>`;
        html += `<div class="unit-list">`;

        if (Object.keys(round.defender_ships).length > 0) {
            for (const [unitId, unit] of Object.entries(round.defender_ships)) {
                const unitName = UNITS[parseInt(unitId)]?.name || `Unit ${unitId}`;
                html += `<div class="unit-item">${unitName}: ${unit.amount.toLocaleString()}</div>`;
            }
        } else {
            html += `<div class="unit-item destroyed">All destroyed</div>`;
        }
        html += `</div>`;

        if (Object.keys(round.defender_losses_in_round).length > 0) {
            html += `<div class="initial-units">`;
            html += `<div class="units-header" style="color: #fca5a5;">Losses this round</div>`;
            html += `<div class="unit-list">`;
            for (const [unitId, unit] of Object.entries(round.defender_losses_in_round)) {
                const unitName = UNITS[parseInt(unitId)]?.name || `Unit ${unitId}`;
                html += `<div class="unit-item loss">-${unit.amount.toLocaleString()} ${unitName}</div>`;
            }
            html += `</div>`;
            html += `</div>`;
        }

        html += `</div></div>`;
        html += `</div>`;
        html += `</div>`;

        tabPane.innerHTML = html;
        tabsContent.appendChild(tabPane);
    });

    // Create End tab (after all rounds)
    const endTabButton = document.createElement('button');
    endTabButton.className = 'tab-button';
    endTabButton.textContent = 'End';
    endTabButton.onclick = () => switchTab('end');
    tabsHeader.appendChild(endTabButton);

    // Create End tab content
    const endPane = document.createElement('div');
    endPane.className = 'tab-content';
    endPane.id = 'round-end';

    // Calculate total losses
    const calculateTotalLosses = (initialUnits, remainingShips) => {
        const losses = [];
        for (const unit of initialUnits) {
            const remaining = remainingShips[unit.id]?.amount || 0;
            const lost = unit.amount - remaining;
            if (lost > 0) {
                losses.push({ id: unit.id, name: unit.name, amount: lost });
            }
        }
        return losses;
    };

    const atkLosses = calculateTotalLosses(atkInitialUnits, lastRound.attacker_ships);
    const defLosses = calculateTotalLosses(defInitialUnits, lastRound.defender_ships);

    // Calculate loss values
    const calculateLossValue = (losses) => {
        let metal = 0, crystal = 0, deuterium = 0;
        for (const loss of losses) {
            const unit = UNITS[loss.id];
            if (unit) {
                metal += unit.cost.metal * loss.amount;
                crystal += unit.cost.crystal * loss.amount;
                deuterium += unit.cost.deuterium * loss.amount;
            }
        }
        return { metal, crystal, deuterium, total: metal + crystal + deuterium };
    };

    const atkLossValue = calculateLossValue(atkLosses);
    const defLossValue = calculateLossValue(defLosses);

    let endHtml = '<div class="round">';
    endHtml += '<h3>Battle Summary</h3>';

    // Winner banner - use winnerType for styling
    endHtml += `<div class="end-winner ${winnerType === 'draw' ? 'draw' : (winnerType === 'defender' ? 'defender' : '')}">${winner}</div>`;

    endHtml += '<div class="round-stats">';

    // Attacker end summary
    endHtml += '<div class="stat-group">';
    endHtml += '<h4>🚀 Attacker</h4>';
    endHtml += '<div class="setup-info">';

    // Surviving units
    endHtml += '<div class="units-header" style="color: #4ade80;">Surviving Units</div>';
    endHtml += '<div class="unit-list">';
    if (Object.keys(lastRound.attacker_ships).length > 0) {
        for (const [unitId, unit] of Object.entries(lastRound.attacker_ships)) {
            const unitName = UNITS[parseInt(unitId)]?.name || `Unit ${unitId}`;
            endHtml += `<div class="unit-item">${unitName}: ${unit.amount.toLocaleString()}</div>`;
        }
    } else {
        endHtml += '<div class="unit-item destroyed">All destroyed</div>';
    }
    endHtml += '</div>';

    // Total losses
    endHtml += '<div class="initial-units">';
    endHtml += '<div class="units-header" style="color: #fca5a5;">Total Losses</div>';
    endHtml += '<div class="unit-list">';
    if (atkLosses.length > 0) {
        for (const loss of atkLosses) {
            endHtml += `<div class="unit-item loss">-${loss.amount.toLocaleString()} ${loss.name}</div>`;
        }
        endHtml += `<div class="loss-value">Value: ${atkLossValue.total.toLocaleString()} units</div>`;
    } else {
        endHtml += '<div class="unit-item" style="color: #4ade80;">No losses!</div>';
    }
    endHtml += '</div>';
    endHtml += '</div>';

    endHtml += '</div>';
    endHtml += '</div>';

    // Defender end summary
    endHtml += '<div class="stat-group">';
    endHtml += '<h4>🛡️ Defender</h4>';
    endHtml += '<div class="setup-info">';

    // Surviving units
    endHtml += '<div class="units-header" style="color: #4ade80;">Surviving Units</div>';
    endHtml += '<div class="unit-list">';
    if (Object.keys(lastRound.defender_ships).length > 0) {
        for (const [unitId, unit] of Object.entries(lastRound.defender_ships)) {
            const unitName = UNITS[parseInt(unitId)]?.name || `Unit ${unitId}`;
            endHtml += `<div class="unit-item">${unitName}: ${unit.amount.toLocaleString()}</div>`;
        }
    } else {
        endHtml += '<div class="unit-item destroyed">All destroyed</div>';
    }
    endHtml += '</div>';

    // Total losses
    endHtml += '<div class="initial-units">';
    endHtml += '<div class="units-header" style="color: #fca5a5;">Total Losses</div>';
    endHtml += '<div class="unit-list">';
    if (defLosses.length > 0) {
        for (const loss of defLosses) {
            endHtml += `<div class="unit-item loss">-${loss.amount.toLocaleString()} ${loss.name}</div>`;
        }
        endHtml += `<div class="loss-value">Value: ${defLossValue.total.toLocaleString()} units</div>`;
    } else {
        endHtml += '<div class="unit-item" style="color: #4ade80;">No losses!</div>';
    }
    endHtml += '</div>';
    endHtml += '</div>';

    endHtml += '</div>';
    endHtml += '</div>';

    endHtml += '</div>';
    endHtml += '</div>';

    endPane.innerHTML = endHtml;
    tabsContent.appendChild(endPane);

    // Add winner display after tabs (keep for backward compatibility but hide it since End tab shows it)
    const winnerDiv = document.createElement('div');
    winnerDiv.className = winnerType === 'draw' ? 'winner draw' : 'winner';
    winnerDiv.textContent = winner;
    winnerDiv.style.marginTop = '20px';
    winnerDiv.style.display = 'none'; // Hide since End tab shows winner
    tabsContent.appendChild(winnerDiv);

    // Update remaining units display
    updateRemainingUnits(lastRound);

    // Calculate and display debris, plunder, and profit
    displayDebrisInfo(lastRound, results.rounds.length, statistics);

    document.getElementById('resultSection').style.display = 'block';
    document.getElementById('errorSection').style.display = 'none';
}

// Switch between round tabs
function switchTab(tabIndex) {
    // Remove active class from all tabs and content
    document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

    const tabButtons = document.querySelectorAll('.tab-button');

    // Handle special tabs
    if (tabIndex === 'setup') {
        tabButtons[0].classList.add('active');
        document.getElementById('round-setup').classList.add('active');
    } else if (tabIndex === 'end') {
        tabButtons[tabButtons.length - 1].classList.add('active');
        document.getElementById('round-end').classList.add('active');
    } else {
        // +1 because Setup tab is first
        tabButtons[tabIndex + 1].classList.add('active');
        document.getElementById(`round-${tabIndex}`).classList.add('active');
    }
}

// Display debris information and battle economics
function displayDebrisInfo(lastRound, totalRounds, statistics = null) {
    // Determine battle outcome
    const attackerSurvived = Object.keys(lastRound.attacker_ships).length > 0;
    const defenderSurvived = Object.keys(lastRound.defender_ships).length > 0;

    let winner = '';
    let outcomeEmoji = '';
    let winnerColor = '#f59e0b'; // Default yellow for draw

    if (statistics) {
        // Use statistics for outcome display
        if (statistics.attackerWinPercent > statistics.defenderWinPercent && statistics.attackerWinPercent > statistics.drawPercent) {
            winner = `Attacker (${statistics.attackerWinPercent}%)`;
            outcomeEmoji = '🚀';
            winnerColor = '#4ade80';
        } else if (statistics.defenderWinPercent > statistics.attackerWinPercent && statistics.defenderWinPercent > statistics.drawPercent) {
            winner = `Defender (${statistics.defenderWinPercent}%)`;
            outcomeEmoji = '🛡️';
            winnerColor = '#fca5a5';
        } else if (statistics.attackerWinPercent === 100) {
            winner = 'Attacker';
            outcomeEmoji = '🚀';
            winnerColor = '#4ade80';
        } else if (statistics.defenderWinPercent === 100) {
            winner = 'Defender';
            outcomeEmoji = '🛡️';
            winnerColor = '#fca5a5';
        } else {
            winner = 'Mixed';
            outcomeEmoji = '📊';
        }
    } else {
        // Single run outcome
        if (attackerSurvived && !defenderSurvived) {
            winner = 'Attacker';
            outcomeEmoji = '🚀';
            winnerColor = '#4ade80';
        } else if (!attackerSurvived && defenderSurvived) {
            winner = 'Defender';
            outcomeEmoji = '🛡️';
            winnerColor = '#fca5a5';
        } else if (!attackerSurvived && !defenderSurvived) {
            winner = 'Draw';
            outcomeEmoji = '💥';
        } else {
            winner = 'Draw (max rounds)';
            outcomeEmoji = '⚔️';
        }
    }

    // Update outcome section
    document.getElementById('battleWinner').textContent = winner;
    document.getElementById('battleWinner').style.color = winnerColor;
    document.getElementById('battleRounds').textContent = statistics ? statistics.averageRounds : totalRounds;
    document.getElementById('outcomeTitle').textContent = `${outcomeEmoji} Battle Outcome`;
    document.getElementById('outcomeSection').style.display = 'block';

    // Get debris percentages from settings
    const debrisShipPercent = parseInt(document.getElementById('debrisShipPercent').value) || 30;
    const debrisDefensePercent = parseInt(document.getElementById('debrisDefensePercent').value) || 0;
    const includeDeuterium = document.getElementById('debrisDeuteriumEnabled').checked;

    // Calculate debris from both attacker and defender losses
    const atkDebris = calculateDebris(lastRound.attacker_losses, debrisShipPercent, debrisDefensePercent, includeDeuterium);
    const defDebris = calculateDebris(lastRound.defender_losses, debrisShipPercent, debrisDefensePercent, includeDeuterium);

    const totalDebris = {
        metal: atkDebris.metal + defDebris.metal,
        crystal: atkDebris.crystal + defDebris.crystal,
        deuterium: atkDebris.deuterium + defDebris.deuterium,
        total: atkDebris.total + defDebris.total
    };

    const recyclersNeeded = calculateRecyclersNeeded(totalDebris.total);

    // Calculate moon chance (1% per 100,000 debris of metal + crystal, max 20%)
    const debrisForMoon = totalDebris.metal + totalDebris.crystal;
    const moonChance = Math.min(20, Math.floor(debrisForMoon / 100000));

    // Update moon chance section
    document.getElementById('moonChance').textContent = moonChance + '%';
    document.getElementById('moonChanceSection').style.display = 'block';

    // Update debris field section
    document.getElementById('debrisMetal').textContent = totalDebris.metal.toLocaleString();
    document.getElementById('debrisCrystal').textContent = totalDebris.crystal.toLocaleString();
    document.getElementById('debrisDeuterium').textContent = totalDebris.deuterium.toLocaleString();
    document.getElementById('debrisTotal').textContent = totalDebris.total.toLocaleString();
    document.getElementById('recyclersNeeded').textContent = recyclersNeeded.toLocaleString();
    document.getElementById('wreckfieldSection').style.display = 'block';

    // Calculate Reaper debris collection (30% of debris)
    const reaperCollection = calculateReaperDebrisCollection(
        lastRound.attacker_ships,
        lastRound.defender_ships,
        totalDebris,
        parseInt(document.getElementById('atkHyperspaceTech')?.value) || 0,
        parseInt(document.getElementById('defHyperspaceTech')?.value) || 0
    );

    // Update Reaper collection section
    displayReaperCollection(reaperCollection, totalDebris);

    // Determine if attacker won
    const attackerWins = Object.keys(lastRound.attacker_ships).length > 0 &&
                         Object.keys(lastRound.defender_ships).length === 0;

    // Calculate plunder if attacker won
    const defenderResources = {
        metal: parseInt(document.getElementById('defenderMetal').value) || 0,
        crystal: parseInt(document.getElementById('defenderCrystal').value) || 0,
        deuterium: parseInt(document.getElementById('defenderDeuterium').value) || 0
    };

    const plunderPercent = parseInt(document.getElementById('plunderPercent').value) || 50;
    const hyperspaceTechLevel = parseInt(document.getElementById('atkHyperspaceTech')?.value) || 0;
    const attackerCargoCapacity = calculateCargoCapacity(lastRound.attacker_ships, hyperspaceTechLevel);
    const plunder = calculatePlunder(defenderResources, attackerCargoCapacity, attackerWins, plunderPercent);

    // Calculate how many cargos would be needed for full plunder
    const plunderRatio = plunderPercent / 100;
    const totalPlunderable = Math.floor(defenderResources.metal * plunderRatio) +
                             Math.floor(defenderResources.crystal * plunderRatio) +
                             Math.floor(defenderResources.deuterium * plunderRatio);

    // Get cargo capacities with hyperspace tech bonus
    const smallCargoCapacity = Math.floor(CARGO_CAPACITY[202] * (1 + hyperspaceTechLevel * 0.05));
    const largeCargoCapacity = Math.floor(CARGO_CAPACITY[203] * (1 + hyperspaceTechLevel * 0.05));

    const smallCargosNeeded = Math.ceil(totalPlunderable / smallCargoCapacity);
    const largeCargosNeeded = Math.ceil(totalPlunderable / largeCargoCapacity);

    // Calculate capture percentage
    let capturePercent = 100;
    if (totalPlunderable > 0) {
        capturePercent = Math.min(100, (attackerCargoCapacity / totalPlunderable) * 100);
    }

    // Update plunder section
    document.getElementById('plunderMetal').textContent = plunder.metal.toLocaleString();
    document.getElementById('plunderCrystal').textContent = plunder.crystal.toLocaleString();
    document.getElementById('plunderDeuterium').textContent = plunder.deuterium.toLocaleString();
    document.getElementById('plunderTotal').textContent = plunder.total.toLocaleString();
    document.getElementById('cargoCapacity').textContent = attackerCargoCapacity.toLocaleString();
    document.getElementById('capturePercent').textContent = capturePercent.toFixed(1) + '%';
    document.getElementById('smallCargosNeeded').textContent = smallCargosNeeded.toLocaleString();
    document.getElementById('largeCargosNeeded').textContent = largeCargosNeeded.toLocaleString();
    document.getElementById('plunderSection').style.display = 'block';

    // Calculate attacker losses value
    let attackerLossValue = 0;
    for (const [unitId, lossData] of Object.entries(lastRound.attacker_losses)) {
        const unit = UNITS[parseInt(unitId)];
        if (unit) {
            attackerLossValue += (unit.cost.metal + unit.cost.crystal + unit.cost.deuterium) * lossData.amount;
        }
    }

    // Calculate total gain (plunder + debris)
    const totalGain = plunder.total + totalDebris.total;
    const netProfit = totalGain - attackerLossValue;

    // Update profit section
    document.getElementById('totalGain').textContent = totalGain.toLocaleString();
    document.getElementById('totalLoss').textContent = attackerLossValue.toLocaleString();
    document.getElementById('netProfit').textContent = netProfit.toLocaleString();
    document.getElementById('netProfit').style.color = netProfit >= 0 ? '#4ade80' : '#fca5a5';
    document.getElementById('profitSection').style.display = 'block';
}

// Show error
function showError(message) {
    document.getElementById('errorMessage').textContent = message;
    document.getElementById('errorSection').style.display = 'block';
    document.getElementById('resultSection').style.display = 'none';
}

// Show loading overlay
function showLoading(totalUnits, runs = 1) {
    const overlay = document.getElementById('loadingOverlay');
    const loadingText = document.getElementById('loadingText');

    if (runs > 1) {
        loadingText.textContent = `⏳ Running simulation 1/${runs}...`;
    } else if (totalUnits > 1000) {
        loadingText.textContent = `⏳ Simulating battle with ${totalUnits.toLocaleString()} units...`;
    } else {
        loadingText.textContent = '⏳ Simulating battle...';
    }

    overlay.style.display = 'flex';
}

// Update loading progress
function updateLoadingProgress(current, total) {
    const loadingText = document.getElementById('loadingText');
    loadingText.textContent = `⏳ Running simulation ${current}/${total}...`;
}

// Hide loading overlay
function hideLoading() {
    document.getElementById('loadingOverlay').style.display = 'none';
}

// Average multiple simulation results
function averageSimulationResults(allResults) {
    if (allResults.length === 0) return null;
    if (allResults.length === 1) return allResults[0];

    const numRuns = allResults.length;

    // Calculate win/loss/draw statistics
    let attackerWins = 0;
    let defenderWins = 0;
    let draws = 0;
    let totalRoundsSum = 0;

    allResults.forEach(result => {
        const lastRound = result.rounds[result.rounds.length - 1];
        const attackerSurvived = Object.keys(lastRound.attacker_ships).length > 0;
        const defenderSurvived = Object.keys(lastRound.defender_ships).length > 0;

        totalRoundsSum += result.rounds.length;

        if (attackerSurvived && !defenderSurvived) {
            attackerWins++;
        } else if (!attackerSurvived && defenderSurvived) {
            defenderWins++;
        } else {
            draws++;
        }
    });

    // Find the minimum number of rounds across all simulations
    // We show rounds up to minRounds, then add a "final" round with averaged end state
    const minRounds = Math.min(...allResults.map(r => r.rounds.length));
    const maxRounds = Math.max(...allResults.map(r => r.rounds.length));

    // Initialize averaged result structure with statistics
    const averaged = {
        rounds: [],
        statistics: {
            attackerWinPercent: Math.round((attackerWins / numRuns) * 100),
            defenderWinPercent: Math.round((defenderWins / numRuns) * 100),
            drawPercent: Math.round((draws / numRuns) * 100),
            averageRounds: (totalRoundsSum / numRuns).toFixed(1),
            numRuns: numRuns
        }
    };

    // Average each round up to minRounds
    for (let roundIdx = 0; roundIdx < minRounds; roundIdx++) {
        const roundsAtThisIndex = allResults.map(r => r.rounds[roundIdx]);

        const avgRound = {
            attacker_ships: {},
            defender_ships: {},
            attacker_losses: {},
            defender_losses: {},
            attacker_losses_in_round: {},
            defender_losses_in_round: {},
            absorbed_damage_attacker: 0,
            absorbed_damage_defender: 0,
            full_strength_attacker: 0,
            full_strength_defender: 0,
            hits_attacker: 0,
            hits_defender: 0
        };

        // Average scalar values across all runs
        avgRound.absorbed_damage_attacker = roundsAtThisIndex.reduce((sum, r) => sum + r.absorbed_damage_attacker, 0) / numRuns;
        avgRound.absorbed_damage_defender = roundsAtThisIndex.reduce((sum, r) => sum + r.absorbed_damage_defender, 0) / numRuns;
        avgRound.full_strength_attacker = roundsAtThisIndex.reduce((sum, r) => sum + r.full_strength_attacker, 0) / numRuns;
        avgRound.full_strength_defender = roundsAtThisIndex.reduce((sum, r) => sum + r.full_strength_defender, 0) / numRuns;
        avgRound.hits_attacker = Math.round(roundsAtThisIndex.reduce((sum, r) => sum + r.hits_attacker, 0) / numRuns);
        avgRound.hits_defender = Math.round(roundsAtThisIndex.reduce((sum, r) => sum + r.hits_defender, 0) / numRuns);

        // Average unit counts across all runs
        avgRound.attacker_ships = averageUnitCounts(roundsAtThisIndex.map(r => r.attacker_ships), numRuns);
        avgRound.defender_ships = averageUnitCounts(roundsAtThisIndex.map(r => r.defender_ships), numRuns);
        avgRound.attacker_losses = averageUnitCounts(roundsAtThisIndex.map(r => r.attacker_losses), numRuns);
        avgRound.defender_losses = averageUnitCounts(roundsAtThisIndex.map(r => r.defender_losses), numRuns);
        avgRound.attacker_losses_in_round = averageUnitCounts(roundsAtThisIndex.map(r => r.attacker_losses_in_round), numRuns);
        avgRound.defender_losses_in_round = averageUnitCounts(roundsAtThisIndex.map(r => r.defender_losses_in_round), numRuns);

        averaged.rounds.push(avgRound);
    }

    // Always add a final round showing the averaged end state from all simulations
    const finalRounds = allResults.map(r => r.rounds[r.rounds.length - 1]);

    const finalAvgRound = {
        attacker_ships: averageUnitCounts(finalRounds.map(r => r.attacker_ships), numRuns),
        defender_ships: averageUnitCounts(finalRounds.map(r => r.defender_ships), numRuns),
        attacker_losses: averageUnitCounts(finalRounds.map(r => r.attacker_losses), numRuns),
        defender_losses: averageUnitCounts(finalRounds.map(r => r.defender_losses), numRuns),
        attacker_losses_in_round: {},
        defender_losses_in_round: {},
        absorbed_damage_attacker: 0,
        absorbed_damage_defender: 0,
        full_strength_attacker: 0,
        full_strength_defender: 0,
        hits_attacker: 0,
        hits_defender: 0,
        is_final_averaged: true // Mark this as a special averaged final round
    };

    // Only add as separate round if battles had different lengths
    if (maxRounds > minRounds) {
        averaged.rounds.push(finalAvgRound);
    } else {
        // Replace the last round with the final averaged one (same data but marked)
        averaged.rounds[averaged.rounds.length - 1].is_final_averaged = true;
    }

    return averaged;
}

// Average unit counts across multiple results
function averageUnitCounts(unitCountsList, totalRuns) {
    const allUnitIds = new Set();
    unitCountsList.forEach(counts => {
        Object.keys(counts).forEach(id => allUnitIds.add(id));
    });

    const averaged = {};
    for (const unitId of allUnitIds) {
        const amounts = unitCountsList.map(counts => counts[unitId]?.amount || 0);
        // Divide by totalRuns to properly average across all simulations
        const avgAmount = Math.round(amounts.reduce((sum, a) => sum + a, 0) / totalRuns);

        if (avgAmount > 0) {
            averaged[unitId] = {
                unit_id: parseInt(unitId),
                amount: avgAmount
            };
        }
    }

    return averaged;
}

// Simulate battle
async function simulateBattle() {
    if (!wasmReady) {
        showError('WASM module not loaded yet. Please wait a moment and try again.');
        return;
    }

    const attackerUnits = collectUnits('attacker');
    const defenderUnits = collectUnits('defender');

    if (Object.keys(attackerUnits).length === 0) {
        showError('Please enter at least one attacker unit.');
        return;
    }

    if (Object.keys(defenderUnits).length === 0) {
        showError('Please enter at least one defender unit.');
        return;
    }

    const input = {
        attacker_units: attackerUnits,
        defender_units: defenderUnits
    };

    // Calculate total units
    const totalUnits = Object.values(attackerUnits).reduce((sum, u) => sum + u.amount, 0) +
                       Object.values(defenderUnits).reduce((sum, u) => sum + u.amount, 0);

    // Get number of simulation runs
    const simulationRuns = Math.max(1, Math.min(100, parseInt(document.getElementById('simulationRuns').value) || 5));

    // Show loading overlay
    showLoading(totalUnits, simulationRuns);

    try {
        // Small delay to let UI update before WASM blocks
        await new Promise(resolve => setTimeout(resolve, 50));

        const inputJson = JSON.stringify(input);
        const allResults = [];
        const startTime = performance.now();

        // Run multiple simulations
        for (let i = 0; i < simulationRuns; i++) {
            const outputJson = wasmModule.simulate_battle(inputJson);
            const result = JSON.parse(outputJson);
            allResults.push(result);

            // Update loading progress
            if (simulationRuns > 1) {
                updateLoadingProgress(i + 1, simulationRuns);
            }

            // Small delay to keep UI responsive for large runs
            if (i < simulationRuns - 1 && simulationRuns > 5) {
                await new Promise(resolve => setTimeout(resolve, 10));
            }
        }

        const endTime = performance.now();
        console.log(`${simulationRuns} battle simulation(s) took ${(endTime - startTime).toFixed(2)}ms for ${totalUnits} units`);

        // Average the results
        const averagedResult = averageSimulationResults(allResults);

        // Store result for sharing
        lastBattleResult = {
            result: averagedResult,
            runs: simulationRuns
        };

        // Hide loading and show results
        hideLoading();
        displayResults(JSON.stringify(averagedResult), simulationRuns);
    } catch (error) {
        console.error('Battle simulation error:', error);
        hideLoading();
        showError('Error during battle simulation: ' + error.message);
    }
}

// Load example
function loadExample() {
    // Set technologies
    document.getElementById('atkWeapons').value = 10;
    document.getElementById('atkShielding').value = 10;
    document.getElementById('atkArmour').value = 10;

    document.getElementById('defWeapons').value = 10;
    document.getElementById('defShielding').value = 10;
    document.getElementById('defArmour').value = 10;

    // Set attacker units
    document.getElementById('atk-204').value = 200; // Light Fighter
    document.getElementById('atk-205').value = 100; // Heavy Fighter
    document.getElementById('atk-206').value = 75;  // Cruiser
    document.getElementById('atk-207').value = 50;  // Battleship
    document.getElementById('atk-215').value = 25;  // Battlecruiser

    // Set defender units
    document.getElementById('def-204').value = 150; // Light Fighter
    document.getElementById('def-205').value = 80;  // Heavy Fighter
    document.getElementById('def-206').value = 60;  // Cruiser
    document.getElementById('def-401').value = 500; // Rocket Launcher
    document.getElementById('def-402').value = 300; // Light Laser
    document.getElementById('def-403').value = 150; // Heavy Laser
    document.getElementById('def-404').value = 75;  // Gauss Cannon
    document.getElementById('def-406').value = 25;  // Plasma Turret

    // Set defender resources
    document.getElementById('defenderMetal').value = 500000;
    document.getElementById('defenderCrystal').value = 300000;
    document.getElementById('defenderDeuterium').value = 100000;

    // Update flight time with example fleet
    updateFlightTime();
}

// Clear all
function clearAll() {
    // Clear all number inputs except debris percentages and flight time coordinates
    document.querySelectorAll('input[type="number"]:not(#debrisShipPercent):not(#debrisDefensePercent):not(.coord-input):not(#fleetSpeedPercent)').forEach(input => {
        input.value = 0;
    });

    // Reset character class selections to "None"
    const atkNone = document.querySelector('input[name="atkClass"][value="0"]');
    const defNone = document.querySelector('input[name="defClass"][value="0"]');
    if (atkNone) atkNone.checked = true;
    if (defNone) defNone.checked = true;

    // Reset debris settings to defaults
    document.getElementById('debrisShipPercent').value = 30;
    document.getElementById('debrisDefensePercent').value = 0;
    document.getElementById('debrisDeuteriumEnabled').checked = false;

    // Reset flight time calculator
    document.getElementById('originGalaxy').value = 1;
    document.getElementById('originSystem').value = 1;
    document.getElementById('originPlanet').value = 1;
    document.getElementById('targetGalaxy').value = 1;
    document.getElementById('targetSystem').value = 100;
    document.getElementById('targetPlanet').value = 1;
    document.getElementById('fleetSpeedPercent').value = 100;
    document.getElementById('flightTimeResult').style.display = 'none';

    // Clear remaining units display
    document.querySelectorAll('.unit-remaining').forEach(el => {
        el.textContent = '';
    });

    // Hide all result sections
    document.getElementById('resultSection').style.display = 'none';
    document.getElementById('errorSection').style.display = 'none';
    document.getElementById('outcomeSection').style.display = 'none';
    document.getElementById('plunderSection').style.display = 'none';
    document.getElementById('wreckfieldSection').style.display = 'none';
    document.getElementById('profitSection').style.display = 'none';

    // Clear stored battle result
    lastBattleResult = null;
}

// ============================================
// Flight Time Calculator Functions
// ============================================

/**
 * Calculate distance between two coordinates based on OGame formula
 */
function calculateDistance(origin, target) {
    const og = origin.galaxy;
    const os = origin.system;
    const op = origin.planet;
    const tg = target.galaxy;
    const ts = target.system;
    const tp = target.planet;

    // Same location
    if (og === tg && os === ts && op === tp) {
        return 5;
    }

    // Different galaxies
    if (og !== tg) {
        return Math.abs(og - tg) * 20000;
    }

    // Different systems (same galaxy)
    if (os !== ts) {
        const deltaSystem = Math.abs(os - ts);
        return deltaSystem * 95 + 2700;
    }

    // Different planets (same galaxy, same system)
    if (op !== tp) {
        return Math.abs(op - tp) * 5 + 1000;
    }

    return 5;
}

/**
 * Calculate flight time based on OGame formula
 * Formula: max(round((35000 / speed_percent * sqrt(distance * 10 / slowest_speed) + 10) / fleet_speed), 1)
 */
function calculateFlightTime(distance, speedPercent, slowestSpeed, fleetSpeed = 1.0) {
    // OGame formula
    const time = Math.max(
        Math.round(
            (35000 / speedPercent * Math.sqrt(distance * 10 / slowestSpeed) + 10) / fleetSpeed
        ),
        1
    );

    return time; // Returns time in seconds
}

/**
 * Format time in seconds to HH:MM:SS format (matching base design)
 */
function formatFlightTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    // Pad with zeros to ensure HH:MM:SS format
    const hh = String(hours).padStart(2, '0');
    const mm = String(minutes).padStart(2, '0');
    const ss = String(secs).padStart(2, '0');

    return `${hh}:${mm}:${ss}`;
}

/**
 * Calculate ship speed with drive technology bonuses
 */
function calculateShipSpeed(unitId) {
    const baseSpeed = SHIP_SPEEDS[unitId];
    if (!baseSpeed) return 0;

    // Get drive technology levels
    const combustionLevel = parseInt(document.getElementById('atkCombustion')?.value) || 0;
    const impulseLevel = parseInt(document.getElementById('atkImpulse')?.value) || 0;
    const hyperspaceDriveLevel = parseInt(document.getElementById('atkHyperspace')?.value) || 0;

    const driveConfig = SHIP_DRIVES[unitId];
    if (!driveConfig) return baseSpeed;

    // Determine which drive the ship uses and its effective base speed
    let activeDrive = driveConfig.default;
    let effectiveBaseSpeed = baseSpeed;

    // Check for drive upgrades (last match wins, matching OGameX logic)
    if (driveConfig.upgrades) {
        for (const upgrade of driveConfig.upgrades) {
            let upgradeLevel = 0;
            if (upgrade.drive === 'combustion') upgradeLevel = combustionLevel;
            else if (upgrade.drive === 'impulse') upgradeLevel = impulseLevel;
            else if (upgrade.drive === 'hyperspace') upgradeLevel = hyperspaceDriveLevel;

            // If we meet the threshold, this upgrade applies (later upgrades override earlier ones)
            if (upgradeLevel >= upgrade.level) {
                activeDrive = upgrade.drive;
                if (upgrade.baseSpeed !== undefined) {
                    effectiveBaseSpeed = upgrade.baseSpeed;
                }
            }
        }
    }

    // Get the drive level for the active drive
    let driveLevel = 0;
    if (activeDrive === 'combustion') driveLevel = combustionLevel;
    else if (activeDrive === 'impulse') driveLevel = impulseLevel;
    else if (activeDrive === 'hyperspace') driveLevel = hyperspaceDriveLevel;

    // Calculate speed bonus
    const bonusPercentage = DRIVE_BONUSES[activeDrive] || 0;
    const speedBonus = Math.floor((effectiveBaseSpeed * driveLevel * bonusPercentage));

    return effectiveBaseSpeed + speedBonus;
}

/**
 * Get the slowest ship speed from attacker fleet (with drive bonuses applied)
 */
function getSlowestShipSpeed() {
    let slowestSpeed = Infinity;
    let foundAnyShip = false;

    // Check all attacker units
    for (let unitId = 202; unitId <= 219; unitId++) {
        const input = document.getElementById(`atk-${unitId}`);
        if (input) {
            const amount = parseInt(input.value) || 0;
            if (amount > 0 && SHIP_SPEEDS[unitId]) {
                foundAnyShip = true;
                const shipSpeed = calculateShipSpeed(unitId);
                slowestSpeed = Math.min(slowestSpeed, shipSpeed);
            }
        }
    }

    // If no ships found, return a default speed
    if (!foundAnyShip) {
        return 10000; // Default speed
    }

    return slowestSpeed;
}

/**
 * Update flight time display
 */
function updateFlightTime() {
    // Get coordinates
    const origin = {
        galaxy: parseInt(document.getElementById('originGalaxy').value) || 1,
        system: parseInt(document.getElementById('originSystem').value) || 1,
        planet: parseInt(document.getElementById('originPlanet').value) || 1
    };

    const target = {
        galaxy: parseInt(document.getElementById('targetGalaxy').value) || 1,
        system: parseInt(document.getElementById('targetSystem').value) || 1,
        planet: parseInt(document.getElementById('targetPlanet').value) || 1
    };

    const speedPercent = parseInt(document.getElementById('fleetSpeedPercent').value) || 100;

    // Validate coordinates
    if (origin.galaxy < 1 || origin.galaxy > 9 ||
        target.galaxy < 1 || target.galaxy > 9 ||
        origin.system < 1 || origin.system > 499 ||
        target.system < 1 || target.system > 499 ||
        origin.planet < 1 || origin.planet > 16 ||
        target.planet < 1 || target.planet > 16 ||
        speedPercent < 1 || speedPercent > 100) {
        // Hide result if invalid
        document.getElementById('flightTimeResult').style.display = 'none';
        return;
    }

    // Calculate distance
    const distance = calculateDistance(origin, target);

    // Get slowest ship speed from attacker fleet
    const slowestSpeed = getSlowestShipSpeed();

    // Get fleet speed multiplier (war missions for combat simulator)
    const fleetSpeed = parseFloat(document.getElementById('fleetSpeedWar')?.value) || 1.0;

    // Convert speed percent from 1-100 range to OGame's 1-10 range (100% = 10, 50% = 5, 10% = 1)
    const speedPercentOGame = speedPercent / 10;

    // Calculate flight time (one way)
    const flightTimeSeconds = calculateFlightTime(distance, speedPercentOGame, slowestSpeed, fleetSpeed);
    const roundTripSeconds = flightTimeSeconds * 2;

    // Display results
    const displayDiv = document.getElementById('flightTimeDisplay');
    displayDiv.innerHTML = `
        <div class="flight-time-row">
            <span>Distance:</span>
            <strong>${distance.toLocaleString()} units</strong>
        </div>
        <div class="flight-time-row">
            <span>Slowest Ship Speed:</span>
            <strong>${slowestSpeed.toLocaleString()}</strong>
        </div>
        <div class="flight-time-row">
            <span>One Way:</span>
            <strong>${formatFlightTime(flightTimeSeconds)}</strong>
        </div>
        <div class="flight-time-row">
            <span>Round Trip:</span>
            <strong>${formatFlightTime(roundTripSeconds)}</strong>
        </div>
    `;

    document.getElementById('flightTimeResult').style.display = 'block';
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('simulateBtn').addEventListener('click', simulateBattle);
    document.getElementById('clearBtn').addEventListener('click', clearAll);
    document.getElementById('exampleBtn').addEventListener('click', loadExample);

    // Flight time calculator event listeners
    const flightTimeInputs = [
        'originGalaxy', 'originSystem', 'originPlanet',
        'targetGalaxy', 'targetSystem', 'targetPlanet',
        'fleetSpeedPercent',
        'atkCombustion', 'atkImpulse', 'atkHyperspace',  // Drive technologies
        'fleetSpeedWar'  // Universe fleet speed
    ];

    flightTimeInputs.forEach(id => {
        const input = document.getElementById(id);
        if (input) {
            input.addEventListener('input', updateFlightTime);
            input.addEventListener('change', updateFlightTime);
        }
    });

    // Also update flight time when attacker units change (slowest ship matters)
    for (let unitId = 202; unitId <= 219; unitId++) {
        const input = document.getElementById(`atk-${unitId}`);
        if (input) {
            input.addEventListener('input', updateFlightTime);
            input.addEventListener('change', updateFlightTime);
        }
    }

    // Initialize WASM on page load
    initWasm();

    // Calculate flight time on initial load with default coordinates
    updateFlightTime();

    // IPM Simulation event listeners
    document.getElementById('ipmSimBtn').addEventListener('click', openIpmModal);
    document.getElementById('ipmModalClose').addEventListener('click', closeIpmModal);
    document.getElementById('ipmSimulateBtn').addEventListener('click', simulateIpmAttack);
    document.getElementById('ipmApplyBtn').addEventListener('click', applyIpmResults);
    document.getElementById('ipmResetBtn').addEventListener('click', resetIpmModal);

    // Close modal when clicking outside
    document.getElementById('ipmModal').addEventListener('click', function(e) {
        if (e.target === this) closeIpmModal();
    });

    // Share functionality event listeners
    document.getElementById('generateShareBtn').addEventListener('click', generateShareCode);
    document.getElementById('importShareBtn').addEventListener('click', importShareCode);
    document.getElementById('copyShareBtn').addEventListener('click', copyShareCode);

    // Make share input editable when clicking on it
    document.getElementById('shareCode').addEventListener('click', function() {
        this.readOnly = false;
        this.select();
    });

    // Check URL for share code on load
    checkUrlForShareCode();
});

// ============================================
// IPM Simulation Functions
// ============================================

// Defense structure values (hull/10 for armor calculation)
const DEFENSE_STRUCTURES = {
    401: { name: 'Rocket Launcher', structure: 2000, cost: { metal: 2000, crystal: 0 } },
    402: { name: 'Light Laser', structure: 2000, cost: { metal: 1500, crystal: 500 } },
    403: { name: 'Heavy Laser', structure: 8000, cost: { metal: 6000, crystal: 2000 } },
    404: { name: 'Gauss Cannon', structure: 35000, cost: { metal: 20000, crystal: 15000 } },
    405: { name: 'Ion Cannon', structure: 8000, cost: { metal: 2000, crystal: 6000 } },
    406: { name: 'Plasma Turret', structure: 100000, cost: { metal: 50000, crystal: 50000 } },
    407: { name: 'Small Shield Dome', structure: 20000, cost: { metal: 10000, crystal: 10000 } },
    408: { name: 'Large Shield Dome', structure: 100000, cost: { metal: 50000, crystal: 50000 } }
};

// IPM base damage
const IPM_BASE_DAMAGE = 12000;

// Store last simulation results for applying
let lastIpmResults = null;

/**
 * Open IPM simulation modal and copy defender's defense values
 */
function openIpmModal() {
    // Copy current defense values from main form
    for (let unitId = 401; unitId <= 408; unitId++) {
        const mainInput = document.getElementById(`def-${unitId}`);
        const ipmInput = document.getElementById(`ipm-def-${unitId}`);
        if (mainInput && ipmInput) {
            ipmInput.value = mainInput.value || 0;
        }
    }

    // Display armor tech from defender (read-only)
    const defArmour = parseInt(document.getElementById('defArmour')?.value) || 0;
    document.getElementById('ipmArmourTechDisplay').textContent = defArmour;

    // Display weapons tech from attacker (read-only)
    const atkWeapons = parseInt(document.getElementById('atkWeapons')?.value) || 0;
    document.getElementById('ipmWeaponsTechDisplay').textContent = atkWeapons;

    // Clear previous results
    document.getElementById('ipmResults').style.display = 'none';
    document.getElementById('ipmApplyBtn').style.display = 'none';
    clearIpmRemainingDisplays();

    // Show modal
    document.getElementById('ipmModal').style.display = 'flex';
}

/**
 * Close IPM simulation modal
 */
function closeIpmModal() {
    document.getElementById('ipmModal').style.display = 'none';
}

/**
 * Reset IPM modal to initial state
 */
function resetIpmModal() {
    // Reset inputs
    document.getElementById('ipmCount').value = 10;
    document.getElementById('ipmAbm').value = 0;
    document.getElementById('ipmTarget').value = '0';

    // Copy defense values again from main form
    for (let unitId = 401; unitId <= 408; unitId++) {
        const mainInput = document.getElementById(`def-${unitId}`);
        const ipmInput = document.getElementById(`ipm-def-${unitId}`);
        if (mainInput && ipmInput) {
            ipmInput.value = mainInput.value || 0;
        }
    }

    // Clear results
    document.getElementById('ipmResults').style.display = 'none';
    document.getElementById('ipmApplyBtn').style.display = 'none';
    clearIpmRemainingDisplays();
    lastIpmResults = null;
}

/**
 * Clear IPM remaining displays
 */
function clearIpmRemainingDisplays() {
    for (let unitId = 401; unitId <= 408; unitId++) {
        const remaining = document.getElementById(`ipm-remaining-${unitId}`);
        if (remaining) remaining.textContent = '';
    }
}

/**
 * Get defense sorted by targeting priority
 */
function getDefenseSortedByPriority(defenses, targetPriority) {
    const defenseList = [];

    for (const [unitId, count] of Object.entries(defenses)) {
        if (count > 0) {
            const def = DEFENSE_STRUCTURES[unitId];
            if (def) {
                defenseList.push({
                    unitId: parseInt(unitId),
                    count: count,
                    name: def.name,
                    structure: def.structure,
                    cost: def.cost.metal + def.cost.crystal
                });
            }
        }
    }

    // Sort based on priority
    if (targetPriority === 0) {
        // Cheapest first
        defenseList.sort((a, b) => a.cost - b.cost);
    } else if (targetPriority === 1) {
        // Most expensive first
        defenseList.sort((a, b) => b.cost - a.cost);
    } else {
        // Specific target first, then cheapest
        defenseList.sort((a, b) => {
            if (a.unitId === targetPriority) return -1;
            if (b.unitId === targetPriority) return 1;
            return a.cost - b.cost;
        });
    }

    return defenseList;
}

/**
 * Simulate IPM attack
 */
function simulateIpmAttack() {
    // Get attack parameters
    const missileCount = parseInt(document.getElementById('ipmCount').value) || 0;
    const weaponsTech = parseInt(document.getElementById('atkWeapons')?.value) || 0;
    const targetPriority = parseInt(document.getElementById('ipmTarget').value);

    // Get defense parameters
    const abmCount = parseInt(document.getElementById('ipmAbm').value) || 0;
    const armourTech = parseInt(document.getElementById('defArmour')?.value) || 0;

    // Get current defense counts
    const defenses = {};
    for (let unitId = 401; unitId <= 408; unitId++) {
        const input = document.getElementById(`ipm-def-${unitId}`);
        defenses[unitId] = parseInt(input?.value) || 0;
    }

    // Calculate interception
    const missilesIntercepted = Math.min(missileCount, abmCount);
    const missilesHit = missileCount - missilesIntercepted;

    // Calculate total damage
    // Formula: missiles × 12,000 × (1 + 0.1 × weapons_tech)
    const totalDamage = missilesHit * IPM_BASE_DAMAGE * (1 + 0.1 * weaponsTech);

    // Sort defenses by priority
    const sortedDefenses = getDefenseSortedByPriority(defenses, targetPriority);

    // Apply damage to defenses
    let remainingDamage = totalDamage;
    const destroyed = {};
    const remaining = { ...defenses };

    for (const defense of sortedDefenses) {
        if (remainingDamage <= 0) break;
        if (remaining[defense.unitId] <= 0) continue;

        // Calculate armor: structure × (1 + 0.1 × armor_tech) / 10
        const armor = defense.structure * (1 + 0.1 * armourTech) / 10;

        // Calculate how many can be destroyed
        const maxDestroyable = Math.floor(remainingDamage / armor);
        const actualDestroyed = Math.min(maxDestroyable, remaining[defense.unitId]);

        if (actualDestroyed > 0) {
            destroyed[defense.unitId] = actualDestroyed;
            remaining[defense.unitId] -= actualDestroyed;
            remainingDamage -= actualDestroyed * armor;
        }
    }

    const damageUsed = totalDamage - remainingDamage;

    // Store results for applying later
    lastIpmResults = {
        remaining: remaining,
        destroyed: destroyed,
        abmUsed: missilesIntercepted
    };

    // Display results
    displayIpmResults({
        missilesSent: missileCount,
        missilesIntercepted: missilesIntercepted,
        missilesHit: missilesHit,
        totalDamage: totalDamage,
        damageUsed: damageUsed,
        destroyed: destroyed,
        remaining: remaining,
        defenses: defenses
    });
}

/**
 * Display IPM simulation results
 */
function displayIpmResults(results) {
    // Update summary stats
    document.getElementById('ipmMissilesSent').textContent = results.missilesSent.toLocaleString();
    document.getElementById('ipmMissilesIntercepted').textContent = results.missilesIntercepted.toLocaleString();
    document.getElementById('ipmMissilesHit').textContent = results.missilesHit.toLocaleString();
    document.getElementById('ipmTotalDamage').textContent = Math.floor(results.totalDamage).toLocaleString();
    document.getElementById('ipmDamageUsed').textContent = Math.floor(results.damageUsed).toLocaleString();

    // Update remaining displays
    for (let unitId = 401; unitId <= 408; unitId++) {
        const remainingEl = document.getElementById(`ipm-remaining-${unitId}`);
        if (remainingEl) {
            const before = results.defenses[unitId] || 0;
            const after = results.remaining[unitId] || 0;
            const lost = before - after;

            if (before > 0) {
                if (lost > 0) {
                    remainingEl.textContent = `→ ${after.toLocaleString()} (-${lost.toLocaleString()})`;
                    remainingEl.style.color = '#fca5a5';
                } else {
                    remainingEl.textContent = `→ ${after.toLocaleString()}`;
                    remainingEl.style.color = '#4ade80';
                }
            } else {
                remainingEl.textContent = '';
            }
        }
    }

    // Build destroyed list
    const destroyedList = document.getElementById('ipmDestroyedList');
    let html = '<h4>Destroyed Units:</h4>';

    let hasDestroyed = false;
    for (const [unitId, count] of Object.entries(results.destroyed)) {
        if (count > 0) {
            hasDestroyed = true;
            const name = DEFENSE_STRUCTURES[unitId]?.name || `Defense ${unitId}`;
            html += `<div class="ipm-destroyed-item">-${count.toLocaleString()} ${name}</div>`;
        }
    }

    if (!hasDestroyed) {
        html += '<div class="ipm-destroyed-item">No units destroyed</div>';
    }

    destroyedList.innerHTML = html;

    // Show results section and apply button
    document.getElementById('ipmResults').style.display = 'block';
    document.getElementById('ipmApplyBtn').style.display = 'inline-block';
}

/**
 * Apply IPM results to defender's defense in main form
 */
function applyIpmResults() {
    if (!lastIpmResults) return;

    // Update main form defense values
    for (let unitId = 401; unitId <= 408; unitId++) {
        const mainInput = document.getElementById(`def-${unitId}`);
        if (mainInput) {
            mainInput.value = lastIpmResults.remaining[unitId] || 0;
        }
    }

    // Close modal
    closeIpmModal();
}

// ============================================
// Reaper Debris Collection Functions
// ============================================

const REAPER_UNIT_ID = 218;
const REAPER_COLLECTION_PERCENT = 0.30; // 30% of debris

/**
 * Calculate Reaper debris collection for both attacker and defender
 * Reapers collect 30% of debris, limited by their cargo capacity
 * Attacker collects first, defender collects from remaining
 */
function calculateReaperDebrisCollection(attackerShips, defenderShips, totalDebris, atkHyperspaceTech, defHyperspaceTech) {
    const result = {
        attacker: null,
        defender: null,
        remainingDebris: { ...totalDebris }
    };

    // Get surviving Reaper counts
    const atkReaperCount = attackerShips[REAPER_UNIT_ID]?.amount || 0;
    const defReaperCount = defenderShips[REAPER_UNIT_ID]?.amount || 0;

    // Attacker Reapers collect first
    if (atkReaperCount > 0) {
        const atkCargoBonus = 1 + (atkHyperspaceTech * 0.05);
        const atkReaperCapacity = Math.floor(CARGO_CAPACITY[REAPER_UNIT_ID] * atkCargoBonus) * atkReaperCount;

        result.attacker = collectDebris(result.remainingDebris, atkReaperCapacity, atkReaperCount, atkReaperCapacity);

        // Reduce remaining debris
        result.remainingDebris.metal -= result.attacker.metal;
        result.remainingDebris.crystal -= result.attacker.crystal;
        result.remainingDebris.deuterium -= result.attacker.deuterium;
        result.remainingDebris.total -= result.attacker.total;
    }

    // Defender Reapers collect from remaining
    if (defReaperCount > 0) {
        const defCargoBonus = 1 + (defHyperspaceTech * 0.05);
        const defReaperCapacity = Math.floor(CARGO_CAPACITY[REAPER_UNIT_ID] * defCargoBonus) * defReaperCount;

        result.defender = collectDebris(result.remainingDebris, defReaperCapacity, defReaperCount, defReaperCapacity);

        // Reduce remaining debris
        result.remainingDebris.metal -= result.defender.metal;
        result.remainingDebris.crystal -= result.defender.crystal;
        result.remainingDebris.deuterium -= result.defender.deuterium;
        result.remainingDebris.total -= result.defender.total;
    }

    return result;
}

/**
 * Collect debris based on 30% limit and cargo capacity
 * Returns the actual collected amounts
 */
function collectDebris(debris, cargoCapacity, reaperCount, totalCapacity) {
    // Calculate 30% of debris that can be collected
    const maxMetal = Math.floor(debris.metal * REAPER_COLLECTION_PERCENT);
    const maxCrystal = Math.floor(debris.crystal * REAPER_COLLECTION_PERCENT);
    const maxDeuterium = Math.floor(debris.deuterium * REAPER_COLLECTION_PERCENT);
    const maxTotal = maxMetal + maxCrystal + maxDeuterium;

    let collectedMetal, collectedCrystal, collectedDeuterium;

    if (maxTotal <= cargoCapacity) {
        // Can collect all 30%
        collectedMetal = maxMetal;
        collectedCrystal = maxCrystal;
        collectedDeuterium = maxDeuterium;
    } else {
        // Distribute limited capacity fairly among resource types
        const distribution = distributeLoot(maxMetal, maxCrystal, maxDeuterium, cargoCapacity);
        collectedMetal = distribution.metal;
        collectedCrystal = distribution.crystal;
        collectedDeuterium = distribution.deuterium;
    }

    return {
        reaperCount: reaperCount,
        capacity: totalCapacity,
        metal: collectedMetal,
        crystal: collectedCrystal,
        deuterium: collectedDeuterium,
        total: collectedMetal + collectedCrystal + collectedDeuterium
    };
}

/**
 * Distribute limited cargo capacity fairly among resources
 * Mimics OGameX LootService::distributeLoot
 */
function distributeLoot(metal, crystal, deuterium, capacity) {
    const resources = [
        { type: 'metal', amount: metal },
        { type: 'crystal', amount: crystal },
        { type: 'deuterium', amount: deuterium }
    ];

    const result = { metal: 0, crystal: 0, deuterium: 0 };
    let remainingCapacity = capacity;

    // First pass: give each resource up to 1/3 of capacity
    const perResource = Math.floor(capacity / 3);
    for (const res of resources) {
        const allocated = Math.min(res.amount, perResource);
        result[res.type] = allocated;
        remainingCapacity -= allocated;
    }

    // Second pass: distribute remaining capacity to resources that need more
    for (const res of resources) {
        if (remainingCapacity <= 0) break;
        const canTakeMore = res.amount - result[res.type];
        if (canTakeMore > 0) {
            const additional = Math.min(canTakeMore, remainingCapacity);
            result[res.type] += additional;
            remainingCapacity -= additional;
        }
    }

    return result;
}

/**
 * Display Reaper collection results in the UI
 */
function displayReaperCollection(reaperCollection, totalDebris) {
    const reaperSection = document.getElementById('reaperSection');
    const attackerSection = document.getElementById('attackerReaperCollection');
    const defenderSection = document.getElementById('defenderReaperCollection');

    // Hide all sections initially
    reaperSection.style.display = 'none';
    attackerSection.style.display = 'none';
    defenderSection.style.display = 'none';

    const hasAttackerReapers = reaperCollection.attacker !== null;
    const hasDefenderReapers = reaperCollection.defender !== null;

    if (!hasAttackerReapers && !hasDefenderReapers) {
        return; // No Reapers, don't show section
    }

    reaperSection.style.display = 'block';

    if (hasAttackerReapers) {
        attackerSection.style.display = 'block';
        document.getElementById('atkReaperCount').textContent = reaperCollection.attacker.reaperCount.toLocaleString();
        document.getElementById('atkReaperCapacity').textContent = reaperCollection.attacker.capacity.toLocaleString();
        document.getElementById('atkReaperMetal').textContent = reaperCollection.attacker.metal.toLocaleString();
        document.getElementById('atkReaperCrystal').textContent = reaperCollection.attacker.crystal.toLocaleString();
        document.getElementById('atkReaperDeuterium').textContent = reaperCollection.attacker.deuterium.toLocaleString();
        document.getElementById('atkReaperTotal').textContent = reaperCollection.attacker.total.toLocaleString();
    }

    if (hasDefenderReapers) {
        defenderSection.style.display = 'block';
        document.getElementById('defReaperCount').textContent = reaperCollection.defender.reaperCount.toLocaleString();
        document.getElementById('defReaperCapacity').textContent = reaperCollection.defender.capacity.toLocaleString();
        document.getElementById('defReaperMetal').textContent = reaperCollection.defender.metal.toLocaleString();
        document.getElementById('defReaperCrystal').textContent = reaperCollection.defender.crystal.toLocaleString();
        document.getElementById('defReaperDeuterium').textContent = reaperCollection.defender.deuterium.toLocaleString();
        document.getElementById('defReaperTotal').textContent = reaperCollection.defender.total.toLocaleString();
    }

    // Update remaining debris
    document.getElementById('remainingDebris').textContent = reaperCollection.remainingDebris.total.toLocaleString();
}

// ============================================
// Share Functions (Versioned Schema)
// ============================================

// Current share schema version - increment when structure changes
const SHARE_SCHEMA_VERSION = 1;

/**
 * Collect all form data into a shareable object
 * Only includes non-zero/non-default values for compact encoding
 */
function collectShareData() {
    const data = {
        v: SHARE_SCHEMA_VERSION,
        atk: { t: {}, u: {} },
        def: { t: {}, u: {}, r: {} },
        s: {},
        ft: {}  // Flight time settings
    };

    // Attacker character class (only non-zero)
    const atkClass = getCharacterClass('attacker');
    if (atkClass > 0) data.atk.cl = atkClass;

    // Attacker technologies (only non-zero)
    const atkTechs = {
        w: parseInt(document.getElementById('atkWeapons').value) || 0,
        s: parseInt(document.getElementById('atkShielding').value) || 0,
        a: parseInt(document.getElementById('atkArmour').value) || 0,
        c: parseInt(document.getElementById('atkCombustion').value) || 0,
        i: parseInt(document.getElementById('atkImpulse').value) || 0,
        h: parseInt(document.getElementById('atkHyperspace').value) || 0,
        ht: parseInt(document.getElementById('atkHyperspaceTech')?.value) || 0
    };
    for (const [key, val] of Object.entries(atkTechs)) {
        if (val > 0) data.atk.t[key] = val;
    }

    // Attacker units (only non-zero)
    for (let unitId = 202; unitId <= 219; unitId++) {
        const input = document.getElementById(`atk-${unitId}`);
        if (input) {
            const amount = parseInt(input.value) || 0;
            if (amount > 0) data.atk.u[unitId] = amount;
        }
    }

    // Defender character class (only non-zero)
    const defClass = getCharacterClass('defender');
    if (defClass > 0) data.def.cl = defClass;

    // Defender technologies (only non-zero)
    const defTechs = {
        w: parseInt(document.getElementById('defWeapons').value) || 0,
        s: parseInt(document.getElementById('defShielding').value) || 0,
        a: parseInt(document.getElementById('defArmour').value) || 0,
        c: parseInt(document.getElementById('defCombustion').value) || 0,
        i: parseInt(document.getElementById('defImpulse').value) || 0,
        h: parseInt(document.getElementById('defHyperspace').value) || 0,
        ht: parseInt(document.getElementById('defHyperspaceTech')?.value) || 0
    };
    for (const [key, val] of Object.entries(defTechs)) {
        if (val > 0) data.def.t[key] = val;
    }

    // Defender units - ships (only non-zero)
    for (let unitId = 202; unitId <= 219; unitId++) {
        const input = document.getElementById(`def-${unitId}`);
        if (input) {
            const amount = parseInt(input.value) || 0;
            if (amount > 0) data.def.u[unitId] = amount;
        }
    }

    // Defender units - defense (only non-zero)
    for (let unitId = 401; unitId <= 408; unitId++) {
        const input = document.getElementById(`def-${unitId}`);
        if (input) {
            const amount = parseInt(input.value) || 0;
            if (amount > 0) data.def.u[unitId] = amount;
        }
    }

    // Defender resources (only non-zero)
    const defResources = {
        m: parseInt(document.getElementById('defenderMetal')?.value) || 0,
        c: parseInt(document.getElementById('defenderCrystal')?.value) || 0,
        d: parseInt(document.getElementById('defenderDeuterium')?.value) || 0
    };
    for (const [key, val] of Object.entries(defResources)) {
        if (val > 0) data.def.r[key] = val;
    }

    // Simulation settings (only non-default)
    const runs = parseInt(document.getElementById('simulationRuns')?.value) || 5;
    if (runs !== 5) data.s.n = runs;

    const plunderPercent = parseInt(document.getElementById('plunderPercent')?.value) || 50;
    if (plunderPercent !== 50) data.s.p = plunderPercent;

    const debrisShip = parseInt(document.getElementById('debrisShipPercent')?.value) || 30;
    if (debrisShip !== 30) data.s.ds = debrisShip;

    const debrisDef = parseInt(document.getElementById('debrisDefensePercent')?.value) || 0;
    if (debrisDef !== 0) data.s.dd = debrisDef;

    const debrisDeutEnabled = document.getElementById('debrisDeuteriumEnabled')?.checked || false;
    if (debrisDeutEnabled) data.s.de = 1;

    // Flight time coordinates (only non-default)
    const ftSettings = {
        og: parseInt(document.getElementById('originGalaxy')?.value) || 1,
        os: parseInt(document.getElementById('originSystem')?.value) || 1,
        op: parseInt(document.getElementById('originPlanet')?.value) || 1,
        tg: parseInt(document.getElementById('targetGalaxy')?.value) || 1,
        ts: parseInt(document.getElementById('targetSystem')?.value) || 100,
        tp: parseInt(document.getElementById('targetPlanet')?.value) || 1,
        sp: parseInt(document.getElementById('fleetSpeedPercent')?.value) || 100
    };
    // Only include if different from defaults
    if (ftSettings.og !== 1) data.ft.og = ftSettings.og;
    if (ftSettings.os !== 1) data.ft.os = ftSettings.os;
    if (ftSettings.op !== 1) data.ft.op = ftSettings.op;
    if (ftSettings.tg !== 1) data.ft.tg = ftSettings.tg;
    if (ftSettings.ts !== 100) data.ft.ts = ftSettings.ts;
    if (ftSettings.tp !== 1) data.ft.tp = ftSettings.tp;
    if (ftSettings.sp !== 100) data.ft.sp = ftSettings.sp;

    // Universe fleet speed settings (only non-default)
    const universeSettings = {
        fsw: parseFloat(document.getElementById('fleetSpeedWar')?.value) || 1,
        fsh: parseFloat(document.getElementById('fleetSpeedHolding')?.value) || 1,
        fsp: parseFloat(document.getElementById('fleetSpeedPeaceful')?.value) || 1
    };
    if (universeSettings.fsw !== 1) data.ft.fsw = universeSettings.fsw;
    if (universeSettings.fsh !== 1) data.ft.fsh = universeSettings.fsh;
    if (universeSettings.fsp !== 1) data.ft.fsp = universeSettings.fsp;

    // Include battle results if available
    if (lastBattleResult) {
        data.br = compressBattleResult(lastBattleResult);
    }

    // Clean up empty objects
    if (Object.keys(data.atk.t).length === 0) delete data.atk.t;
    if (Object.keys(data.atk.u).length === 0) delete data.atk.u;
    if (Object.keys(data.atk).length === 0) delete data.atk;
    if (Object.keys(data.def.t).length === 0) delete data.def.t;
    if (Object.keys(data.def.u).length === 0) delete data.def.u;
    if (Object.keys(data.def.r).length === 0) delete data.def.r;
    if (Object.keys(data.def).length === 0) delete data.def;
    if (Object.keys(data.s).length === 0) delete data.s;
    if (Object.keys(data.ft).length === 0) delete data.ft;

    return data;
}

/**
 * Compress battle result to minimal format for sharing
 * Includes all rounds with combat statistics
 */
function compressBattleResult(battleData) {
    const result = battleData.result;

    const compressed = {
        n: battleData.runs,  // number of simulation runs
        w: result.winner,  // winner: "attacker", "defender", or "draw"
        rds: []  // rounds array
    };

    // Compress each round
    for (const round of result.rounds) {
        const compressedRound = {
            // Combat statistics (abbreviated keys)
            ha: round.hits_attacker,  // hits attacker
            hd: round.hits_defender,  // hits defender
            sa: Math.floor(round.full_strength_attacker),  // strength attacker
            sd: Math.floor(round.full_strength_defender),  // strength defender
            aa: Math.floor(round.absorbed_damage_attacker),  // absorbed attacker
            ad: Math.floor(round.absorbed_damage_defender),  // absorbed defender
        };

        // Attacker ships (only non-zero)
        compressedRound.as = {};
        for (const [unitId, unit] of Object.entries(round.attacker_ships)) {
            if (unit.amount > 0) {
                compressedRound.as[unitId] = unit.amount;
            }
        }

        // Defender ships (only non-zero)
        compressedRound.ds = {};
        for (const [unitId, unit] of Object.entries(round.defender_ships)) {
            if (unit.amount > 0) {
                compressedRound.ds[unitId] = unit.amount;
            }
        }

        // Attacker losses in round (only non-zero)
        compressedRound.alr = {};
        if (round.attacker_losses_in_round) {
            for (const [unitId, unit] of Object.entries(round.attacker_losses_in_round)) {
                if (unit.amount > 0) {
                    compressedRound.alr[unitId] = unit.amount;
                }
            }
        }

        // Defender losses in round (only non-zero)
        compressedRound.dlr = {};
        if (round.defender_losses_in_round) {
            for (const [unitId, unit] of Object.entries(round.defender_losses_in_round)) {
                if (unit.amount > 0) {
                    compressedRound.dlr[unitId] = unit.amount;
                }
            }
        }

        // Clean up empty objects
        if (Object.keys(compressedRound.as).length === 0) delete compressedRound.as;
        if (Object.keys(compressedRound.ds).length === 0) delete compressedRound.ds;
        if (Object.keys(compressedRound.alr).length === 0) delete compressedRound.alr;
        if (Object.keys(compressedRound.dlr).length === 0) delete compressedRound.dlr;

        compressed.rds.push(compressedRound);
    }

    // Also store total losses from last round for backward compatibility
    const lastRound = result.rounds[result.rounds.length - 1];
    compressed.al = {};
    for (const [unitId, loss] of Object.entries(lastRound.attacker_losses)) {
        if (loss.amount > 0) {
            compressed.al[unitId] = loss.amount;
        }
    }
    compressed.dl = {};
    for (const [unitId, loss] of Object.entries(lastRound.defender_losses)) {
        if (loss.amount > 0) {
            compressed.dl[unitId] = loss.amount;
        }
    }

    if (Object.keys(compressed.al).length === 0) delete compressed.al;
    if (Object.keys(compressed.dl).length === 0) delete compressed.dl;

    return compressed;
}

/**
 * Decompress battle result from share format back to full format
 */
function decompressBattleResult(compressed) {
    // Check if this is the new format with full rounds data
    if (compressed.rds && compressed.rds.length > 0) {
        const rounds = [];

        for (const compRound of compressed.rds) {
            // Reconstruct attacker ships
            const attackerShips = {};
            if (compRound.as) {
                for (const [unitId, amount] of Object.entries(compRound.as)) {
                    attackerShips[unitId] = { amount: amount };
                }
            }

            // Reconstruct defender ships
            const defenderShips = {};
            if (compRound.ds) {
                for (const [unitId, amount] of Object.entries(compRound.ds)) {
                    defenderShips[unitId] = { amount: amount };
                }
            }

            // Reconstruct attacker losses in round
            const attackerLossesInRound = {};
            if (compRound.alr) {
                for (const [unitId, amount] of Object.entries(compRound.alr)) {
                    attackerLossesInRound[unitId] = { amount: amount };
                }
            }

            // Reconstruct defender losses in round
            const defenderLossesInRound = {};
            if (compRound.dlr) {
                for (const [unitId, amount] of Object.entries(compRound.dlr)) {
                    defenderLossesInRound[unitId] = { amount: amount };
                }
            }

            rounds.push({
                attacker_ships: attackerShips,
                defender_ships: defenderShips,
                attacker_losses: {},  // Will be populated for last round
                defender_losses: {},  // Will be populated for last round
                attacker_losses_in_round: attackerLossesInRound,
                defender_losses_in_round: defenderLossesInRound,
                hits_attacker: compRound.ha || 0,
                hits_defender: compRound.hd || 0,
                full_strength_attacker: compRound.sa || 0,
                full_strength_defender: compRound.sd || 0,
                absorbed_damage_attacker: compRound.aa || 0,
                absorbed_damage_defender: compRound.ad || 0
            });
        }

        // Add total losses to last round
        const lastRound = rounds[rounds.length - 1];
        if (compressed.al) {
            for (const [unitId, amount] of Object.entries(compressed.al)) {
                lastRound.attacker_losses[unitId] = { amount: amount };
            }
        }
        if (compressed.dl) {
            for (const [unitId, amount] of Object.entries(compressed.dl)) {
                lastRound.defender_losses[unitId] = { amount: amount };
            }
        }

        return {
            result: {
                rounds: rounds,
                winner: compressed.w
            },
            runs: compressed.n
        };
    }

    // Legacy format support (old share codes without rounds data)
    const attackerShips = {};
    if (compressed.as) {
        for (const [unitId, amount] of Object.entries(compressed.as)) {
            attackerShips[unitId] = { amount: amount };
        }
    }

    const defenderShips = {};
    if (compressed.ds) {
        for (const [unitId, amount] of Object.entries(compressed.ds)) {
            defenderShips[unitId] = { amount: amount };
        }
    }

    const attackerLosses = {};
    if (compressed.al) {
        for (const [unitId, amount] of Object.entries(compressed.al)) {
            attackerLosses[unitId] = { amount: amount };
        }
    }

    const defenderLosses = {};
    if (compressed.dl) {
        for (const [unitId, amount] of Object.entries(compressed.dl)) {
            defenderLosses[unitId] = { amount: amount };
        }
    }

    const lastRound = {
        attacker_ships: attackerShips,
        defender_ships: defenderShips,
        attacker_losses: attackerLosses,
        defender_losses: defenderLosses,
        attacker_losses_in_round: {},
        defender_losses_in_round: {},
        hits_attacker: 0,
        hits_defender: 0,
        full_strength_attacker: 0,
        full_strength_defender: 0,
        absorbed_damage_attacker: 0,
        absorbed_damage_defender: 0
    };

    return {
        result: {
            rounds: [lastRound],
            winner: compressed.w
        },
        runs: compressed.n
    };
}

/**
 * Apply share data to the form
 * Handles backward/forward compatibility
 */
function applyShareData(data) {
    // Handle version differences (future-proofing)
    const version = data.v || 1;

    // Clear all inputs first
    clearAll();

    // Apply attacker character class
    if (data.atk?.cl) {
        const radio = document.querySelector(`input[name="atkClass"][value="${data.atk.cl}"]`);
        if (radio) radio.checked = true;
    }

    // Apply attacker technologies
    if (data.atk?.t) {
        if (data.atk.t.w) document.getElementById('atkWeapons').value = data.atk.t.w;
        if (data.atk.t.s) document.getElementById('atkShielding').value = data.atk.t.s;
        if (data.atk.t.a) document.getElementById('atkArmour').value = data.atk.t.a;
        if (data.atk.t.c) document.getElementById('atkCombustion').value = data.atk.t.c;
        if (data.atk.t.i) document.getElementById('atkImpulse').value = data.atk.t.i;
        if (data.atk.t.h) document.getElementById('atkHyperspace').value = data.atk.t.h;
        if (data.atk.t.ht) {
            const htInput = document.getElementById('atkHyperspaceTech');
            if (htInput) htInput.value = data.atk.t.ht;
        }
    }

    // Apply attacker units
    if (data.atk?.u) {
        for (const [unitId, amount] of Object.entries(data.atk.u)) {
            const input = document.getElementById(`atk-${unitId}`);
            if (input) input.value = amount;
        }
    }

    // Apply defender character class
    if (data.def?.cl) {
        const radio = document.querySelector(`input[name="defClass"][value="${data.def.cl}"]`);
        if (radio) radio.checked = true;
    }

    // Apply defender technologies
    if (data.def?.t) {
        if (data.def.t.w) document.getElementById('defWeapons').value = data.def.t.w;
        if (data.def.t.s) document.getElementById('defShielding').value = data.def.t.s;
        if (data.def.t.a) document.getElementById('defArmour').value = data.def.t.a;
        if (data.def.t.c) document.getElementById('defCombustion').value = data.def.t.c;
        if (data.def.t.i) document.getElementById('defImpulse').value = data.def.t.i;
        if (data.def.t.h) document.getElementById('defHyperspace').value = data.def.t.h;
        if (data.def.t.ht) {
            const htInput = document.getElementById('defHyperspaceTech');
            if (htInput) htInput.value = data.def.t.ht;
        }
    }

    // Apply defender units (ships and defense)
    if (data.def?.u) {
        for (const [unitId, amount] of Object.entries(data.def.u)) {
            const input = document.getElementById(`def-${unitId}`);
            if (input) input.value = amount;
        }
    }

    // Apply defender resources
    if (data.def?.r) {
        if (data.def.r.m) {
            const input = document.getElementById('defenderMetal');
            if (input) input.value = data.def.r.m;
        }
        if (data.def.r.c) {
            const input = document.getElementById('defenderCrystal');
            if (input) input.value = data.def.r.c;
        }
        if (data.def.r.d) {
            const input = document.getElementById('defenderDeuterium');
            if (input) input.value = data.def.r.d;
        }
    }

    // Apply simulation settings
    if (data.s) {
        if (data.s.n) {
            const input = document.getElementById('simulationRuns');
            if (input) input.value = data.s.n;
        }
        if (data.s.p) {
            const input = document.getElementById('plunderPercent');
            if (input) input.value = data.s.p;
        }
        if (data.s.ds !== undefined) {
            const input = document.getElementById('debrisShipPercent');
            if (input) input.value = data.s.ds;
        }
        if (data.s.dd !== undefined) {
            const input = document.getElementById('debrisDefensePercent');
            if (input) input.value = data.s.dd;
        }
        if (data.s.de) {
            const input = document.getElementById('debrisDeuteriumEnabled');
            if (input) input.checked = true;
        }
    }

    // Apply flight time settings
    if (data.ft) {
        if (data.ft.og) document.getElementById('originGalaxy').value = data.ft.og;
        if (data.ft.os) document.getElementById('originSystem').value = data.ft.os;
        if (data.ft.op) document.getElementById('originPlanet').value = data.ft.op;
        if (data.ft.tg) document.getElementById('targetGalaxy').value = data.ft.tg;
        if (data.ft.ts) document.getElementById('targetSystem').value = data.ft.ts;
        if (data.ft.tp) document.getElementById('targetPlanet').value = data.ft.tp;
        if (data.ft.sp) document.getElementById('fleetSpeedPercent').value = data.ft.sp;
        // Universe fleet speed settings
        if (data.ft.fsw) document.getElementById('fleetSpeedWar').value = data.ft.fsw;
        if (data.ft.fsh) document.getElementById('fleetSpeedHolding').value = data.ft.fsh;
        if (data.ft.fsp) document.getElementById('fleetSpeedPeaceful').value = data.ft.fsp;
        // Backward compatibility: old 'fs' key maps to fleetSpeedWar
        if (data.ft.fs && !data.ft.fsw) document.getElementById('fleetSpeedWar').value = data.ft.fs;
    }

    // Update flight time display
    updateFlightTime();

    // Apply battle results if included
    if (data.br) {
        const battleData = decompressBattleResult(data.br);
        lastBattleResult = battleData;
        displayResults(JSON.stringify(battleData.result), battleData.runs);
    }
}

/**
 * Generate a share code from current form state
 */
function generateShareCode() {
    try {
        const data = collectShareData();
        const json = JSON.stringify(data);

        // Use LZ-String compression if available, otherwise fallback to base64
        let code;
        if (typeof LZString !== 'undefined') {
            code = LZString.compressToEncodedURIComponent(json);
        } else {
            // Fallback to base64 (larger but works without library)
            code = btoa(unescape(encodeURIComponent(json)));
        }

        const shareInput = document.getElementById('shareCode');
        shareInput.value = code;
        shareInput.readOnly = true;

        // Show appropriate status message
        const hasResults = data.br !== undefined;
        const statusMsg = hasResults
            ? 'Share code generated with battle results! Click Copy to copy.'
            : 'Share code generated (setup only). Click Copy to copy.';
        showShareStatus(statusMsg, 'success');
    } catch (error) {
        console.error('Failed to generate share code:', error);
        showShareStatus('Failed to generate share code: ' + error.message, 'error');
    }
}

/**
 * Import a share code and apply to form
 */
function importShareCode() {
    const shareInput = document.getElementById('shareCode');
    const code = shareInput.value.trim();

    if (!code) {
        showShareStatus('Please paste a share code first', 'error');
        return;
    }

    try {
        let json;

        // Try LZ-String decompression first
        if (typeof LZString !== 'undefined') {
            json = LZString.decompressFromEncodedURIComponent(code);
        }

        // If that fails or returns null, try base64
        if (!json) {
            try {
                json = decodeURIComponent(escape(atob(code)));
            } catch (e) {
                throw new Error('Invalid share code format');
            }
        }

        const data = JSON.parse(json);

        // Validate it has a version number (basic structure check)
        if (!data.v) {
            throw new Error('Invalid share code: missing version');
        }

        applyShareData(data);

        // Show appropriate status message
        const hasResults = data.br !== undefined;
        const statusMsg = hasResults
            ? 'Imported battle setup with results!'
            : 'Battle setup imported successfully!';
        showShareStatus(statusMsg, 'success');
    } catch (error) {
        console.error('Failed to import share code:', error);
        showShareStatus('Failed to import: ' + error.message, 'error');
    }
}

/**
 * Copy share code to clipboard
 */
function copyShareCode() {
    const shareInput = document.getElementById('shareCode');
    const code = shareInput.value;

    if (!code) {
        showShareStatus('Generate a share code first', 'error');
        return;
    }

    navigator.clipboard.writeText(code).then(() => {
        showShareStatus('Copied to clipboard!', 'success');
    }).catch(err => {
        // Fallback for older browsers
        shareInput.select();
        document.execCommand('copy');
        showShareStatus('Copied to clipboard!', 'success');
    });
}

/**
 * Show status message in share section
 */
function showShareStatus(message, type) {
    const statusEl = document.getElementById('shareStatus');
    statusEl.textContent = message;
    statusEl.className = 'share-status ' + type;

    // Auto-hide after 5 seconds
    setTimeout(() => {
        statusEl.className = 'share-status';
    }, 5000);
}

/**
 * Check URL for share code parameter on page load
 */
function checkUrlForShareCode() {
    const urlParams = new URLSearchParams(window.location.search);
    const shareCode = urlParams.get('share');

    if (shareCode) {
        document.getElementById('shareCode').value = shareCode;
        // Small delay to ensure DOM is ready
        setTimeout(() => {
            importShareCode();
        }, 100);
    }
}
