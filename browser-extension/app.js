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

// Load WASM without ES6 modules
async function initWasm() {
    try {
        const script = document.createElement('script');
        script.src = 'pkg/ogame_combat_wasm.js';

        script.onload = async function() {
            try {
                if (typeof wasm_bindgen === 'undefined') {
                    throw new Error('wasm_bindgen not found');
                }

                await wasm_bindgen('pkg/ogame_combat_wasm_bg.wasm');
                wasmModule = wasm_bindgen;
                wasmReady = true;
                console.log('WASM module loaded successfully');
            } catch (error) {
                console.error('Failed to initialize WASM:', error);
                showError('Failed to initialize combat simulator: ' + error.message);
            }
        };

        script.onerror = function() {
            showError('Failed to load WASM files. Make sure pkg/ folder exists with built WASM files.');
        };

        document.head.appendChild(script);
    } catch (error) {
        console.error('Failed to load WASM module:', error);
        showError('Failed to initialize combat simulator. Error: ' + error.message);
    }
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
    const weaponsTech = parseInt(document.getElementById(`${prefix}Weapons`).value) || 0;
    const shieldingTech = parseInt(document.getElementById(`${prefix}Shielding`).value) || 0;
    const armourTech = parseInt(document.getElementById(`${prefix}Armour`).value) || 0;

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

// Calculate cargo capacity from surviving ships
function calculateCargoCapacity(ships) {
    // Cargo capacities for each ship type
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

    let totalCapacity = 0;
    for (const [unitId, unit] of Object.entries(ships)) {
        const capacity = CARGO_CAPACITY[parseInt(unitId)] || 0;
        totalCapacity += capacity * unit.amount;
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

    // Determine winner
    const lastRound = results.rounds[results.rounds.length - 1];
    const attackerSurvived = Object.keys(lastRound.attacker_ships).length > 0;
    const defenderSurvived = Object.keys(lastRound.defender_ships).length > 0;

    let winner = '';
    if (attackerSurvived && !defenderSurvived) {
        winner = '🚀 Attacker Wins!';
    } else if (!attackerSurvived && defenderSurvived) {
        winner = '🛡️ Defender Wins!';
    } else if (!attackerSurvived && !defenderSurvived) {
        winner = '💥 Draw - Both Sides Destroyed!';
    } else {
        winner = '⚔️ Battle Continues (6 rounds limit reached)';
    }

    // Add simulation info header if multiple runs
    if (numRuns > 1) {
        const infoDiv = document.createElement('div');
        infoDiv.style.cssText = 'background: rgba(255, 215, 0, 0.1); border: 2px solid rgba(255, 215, 0, 0.3); border-radius: 8px; padding: 10px; margin-bottom: 15px; text-align: center; color: #ffd700;';
        infoDiv.innerHTML = `<strong>📊 Averaged results from ${numRuns} simulation runs</strong>`;
        tabsHeader.parentElement.insertBefore(infoDiv, tabsHeader);
    }

    // Create tabs for each round
    results.rounds.forEach((round, index) => {
        // Create tab button
        const tabButton = document.createElement('button');
        tabButton.className = 'tab-button';
        if (index === 0) tabButton.classList.add('active');
        tabButton.textContent = `Round ${index + 1}`;
        tabButton.onclick = () => switchTab(index);
        tabsHeader.appendChild(tabButton);

        // Create tab content
        const tabPane = document.createElement('div');
        tabPane.className = 'tab-content';
        if (index === 0) tabPane.classList.add('active');
        tabPane.id = `round-${index}`;

        let html = '<div class="round">';
        html += `<h3>Round ${index + 1}</h3>`;

        // Add combat statistics
        html += `<div class="combat-stats">`;
        html += `<div class="combat-stat-row">`;
        html += `<span>The Attacker fires a total of <strong>${round.hits_attacker.toLocaleString()}</strong> shots with a total strength of <strong>${Math.floor(round.full_strength_attacker).toLocaleString()}</strong>. The defender's shields absorb <strong>${Math.floor(round.absorbed_damage_defender).toLocaleString()}</strong> points of damage.</span>`;
        html += `</div>`;
        html += `<div class="combat-stat-row">`;
        html += `<span>The Defender fires a total of <strong>${round.hits_defender.toLocaleString()}</strong> shots with a total strength of <strong>${Math.floor(round.full_strength_defender).toLocaleString()}</strong>. The attacker's shields absorb <strong>${Math.floor(round.absorbed_damage_attacker).toLocaleString()}</strong> points of damage.</span>`;
        html += `</div>`;
        html += `</div>`;

        html += `<div class="round-stats">`;

        // Attacker stats
        html += `<div class="stat-group">`;
        html += `<h4>🚀 Attacker</h4>`;
        html += `<div class="unit-list">`;

        if (Object.keys(round.attacker_ships).length > 0) {
            for (const [unitId, unit] of Object.entries(round.attacker_ships)) {
                const unitName = UNITS[parseInt(unitId)]?.name || `Unit ${unitId}`;
                html += `<div class="unit-item">${unitName}: ${unit.amount.toLocaleString()}</div>`;
            }
        } else {
            html += `<div class="unit-item">All destroyed</div>`;
        }

        if (Object.keys(round.attacker_losses_in_round).length > 0) {
            html += `<div style="margin-top: 10px; color: #fca5a5;">Losses this round:</div>`;
            for (const [unitId, unit] of Object.entries(round.attacker_losses_in_round)) {
                const unitName = UNITS[parseInt(unitId)]?.name || `Unit ${unitId}`;
                html += `<div class="unit-item" style="color: #fca5a5;">-${unit.amount.toLocaleString()} ${unitName}</div>`;
            }
        }

        html += `</div></div>`;

        // Defender stats
        html += `<div class="stat-group">`;
        html += `<h4>🛡️ Defender</h4>`;
        html += `<div class="unit-list">`;

        if (Object.keys(round.defender_ships).length > 0) {
            for (const [unitId, unit] of Object.entries(round.defender_ships)) {
                const unitName = UNITS[parseInt(unitId)]?.name || `Unit ${unitId}`;
                html += `<div class="unit-item">${unitName}: ${unit.amount.toLocaleString()}</div>`;
            }
        } else {
            html += `<div class="unit-item">All destroyed</div>`;
        }

        if (Object.keys(round.defender_losses_in_round).length > 0) {
            html += `<div style="margin-top: 10px; color: #fca5a5;">Losses this round:</div>`;
            for (const [unitId, unit] of Object.entries(round.defender_losses_in_round)) {
                const unitName = UNITS[parseInt(unitId)]?.name || `Unit ${unitId}`;
                html += `<div class="unit-item" style="color: #fca5a5;">-${unit.amount.toLocaleString()} ${unitName}</div>`;
            }
        }

        html += `</div></div>`;
        html += `</div>`;
        html += `</div>`;

        tabPane.innerHTML = html;
        tabsContent.appendChild(tabPane);
    });

    // Add winner display after tabs
    const winnerDiv = document.createElement('div');
    winnerDiv.className = winner.includes('Draw') ? 'winner draw' : 'winner';
    winnerDiv.textContent = winner;
    winnerDiv.style.marginTop = '20px';
    tabsContent.appendChild(winnerDiv);

    // Update remaining units display
    updateRemainingUnits(lastRound);

    // Calculate and display debris, plunder, and profit
    displayDebrisInfo(lastRound, results.rounds.length);

    document.getElementById('resultSection').style.display = 'block';
    document.getElementById('errorSection').style.display = 'none';
}

// Switch between round tabs
function switchTab(tabIndex) {
    // Remove active class from all tabs and content
    document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

    // Add active class to selected tab and content
    document.querySelectorAll('.tab-button')[tabIndex].classList.add('active');
    document.getElementById(`round-${tabIndex}`).classList.add('active');
}

// Display debris information and battle economics
function displayDebrisInfo(lastRound, totalRounds) {
    // Determine battle outcome
    const attackerSurvived = Object.keys(lastRound.attacker_ships).length > 0;
    const defenderSurvived = Object.keys(lastRound.defender_ships).length > 0;

    let winner = '';
    let outcomeEmoji = '';
    if (attackerSurvived && !defenderSurvived) {
        winner = 'Attacker';
        outcomeEmoji = '🚀';
    } else if (!attackerSurvived && defenderSurvived) {
        winner = 'Defender';
        outcomeEmoji = '🛡️';
    } else if (!attackerSurvived && !defenderSurvived) {
        winner = 'Draw';
        outcomeEmoji = '💥';
    } else {
        winner = 'Draw (max rounds)';
        outcomeEmoji = '⚔️';
    }

    // Update outcome section
    document.getElementById('battleWinner').textContent = winner;
    document.getElementById('battleWinner').style.color = attackerSurvived && !defenderSurvived ? '#4ade80' :
                                                          !attackerSurvived && defenderSurvived ? '#fca5a5' : '#f59e0b';
    document.getElementById('battleRounds').textContent = totalRounds;
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

    // Update debris field section
    document.getElementById('debrisMetal').textContent = totalDebris.metal.toLocaleString();
    document.getElementById('debrisCrystal').textContent = totalDebris.crystal.toLocaleString();
    document.getElementById('debrisDeuterium').textContent = totalDebris.deuterium.toLocaleString();
    document.getElementById('debrisTotal').textContent = totalDebris.total.toLocaleString();
    document.getElementById('recyclersNeeded').textContent = recyclersNeeded.toLocaleString();
    document.getElementById('wreckfieldSection').style.display = 'block';

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
    const attackerCargoCapacity = calculateCargoCapacity(lastRound.attacker_ships);
    const plunder = calculatePlunder(defenderResources, attackerCargoCapacity, attackerWins, plunderPercent);

    // Update plunder section
    document.getElementById('plunderMetal').textContent = plunder.metal.toLocaleString();
    document.getElementById('plunderCrystal').textContent = plunder.crystal.toLocaleString();
    document.getElementById('plunderDeuterium').textContent = plunder.deuterium.toLocaleString();
    document.getElementById('plunderTotal').textContent = plunder.total.toLocaleString();
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
    const maxRounds = Math.max(...allResults.map(r => r.rounds.length));

    // Initialize averaged result structure
    const averaged = {
        rounds: []
    };

    // Average each round
    for (let roundIdx = 0; roundIdx < maxRounds; roundIdx++) {
        const roundsAtThisIndex = allResults
            .filter(r => r.rounds[roundIdx])
            .map(r => r.rounds[roundIdx]);

        if (roundsAtThisIndex.length === 0) continue;

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

        // Average scalar values
        avgRound.absorbed_damage_attacker = roundsAtThisIndex.reduce((sum, r) => sum + r.absorbed_damage_attacker, 0) / roundsAtThisIndex.length;
        avgRound.absorbed_damage_defender = roundsAtThisIndex.reduce((sum, r) => sum + r.absorbed_damage_defender, 0) / roundsAtThisIndex.length;
        avgRound.full_strength_attacker = roundsAtThisIndex.reduce((sum, r) => sum + r.full_strength_attacker, 0) / roundsAtThisIndex.length;
        avgRound.full_strength_defender = roundsAtThisIndex.reduce((sum, r) => sum + r.full_strength_defender, 0) / roundsAtThisIndex.length;
        avgRound.hits_attacker = Math.round(roundsAtThisIndex.reduce((sum, r) => sum + r.hits_attacker, 0) / roundsAtThisIndex.length);
        avgRound.hits_defender = Math.round(roundsAtThisIndex.reduce((sum, r) => sum + r.hits_defender, 0) / roundsAtThisIndex.length);

        // Average unit counts
        avgRound.attacker_ships = averageUnitCounts(roundsAtThisIndex.map(r => r.attacker_ships));
        avgRound.defender_ships = averageUnitCounts(roundsAtThisIndex.map(r => r.defender_ships));
        avgRound.attacker_losses = averageUnitCounts(roundsAtThisIndex.map(r => r.attacker_losses));
        avgRound.defender_losses = averageUnitCounts(roundsAtThisIndex.map(r => r.defender_losses));
        avgRound.attacker_losses_in_round = averageUnitCounts(roundsAtThisIndex.map(r => r.attacker_losses_in_round));
        avgRound.defender_losses_in_round = averageUnitCounts(roundsAtThisIndex.map(r => r.defender_losses_in_round));

        averaged.rounds.push(avgRound);
    }

    return averaged;
}

// Average unit counts across multiple results
function averageUnitCounts(unitCountsList) {
    const allUnitIds = new Set();
    unitCountsList.forEach(counts => {
        Object.keys(counts).forEach(id => allUnitIds.add(id));
    });

    const averaged = {};
    for (const unitId of allUnitIds) {
        const amounts = unitCountsList.map(counts => counts[unitId]?.amount || 0);
        const avgAmount = Math.round(amounts.reduce((sum, a) => sum + a, 0) / amounts.length);

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
});
