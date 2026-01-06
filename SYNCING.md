# Syncing with OGameX

How to keep your battle simulator up-to-date with OGameX changes.

## Quick Start

**Manual Check** (works now):
```bash
./check-ogamex-updates.sh
```

**Automated** (push to GitHub):
```bash
git push -u origin main
# Runs daily, creates PRs/issues automatically
```

---

## Option 1: Manual Script (Recommended)

### Usage

```bash
# Check for updates
./check-ogamex-updates.sh

# If updates found, review changes
cd ~/workspace/OGameX
git diff 5993296..abc1234 rust/battle_engine_ffi/src/lib.rs

# Update your code (src/lib.rs or browser-extension/app.js)
# Test: ./build.sh

# Mark as synced
cd ~/workspace/OGameX
git rev-parse HEAD > ../OGameX-battleengine-wasm/.ogamex-last-sync
```

### Schedule Weekly Checks

```bash
crontab -e
# Add: 0 9 * * 1 /home/rouven/workspace/OGameX-battleengine-wasm/check-ogamex-updates.sh
```

---

## Option 2: GitHub Actions (Automated)

### Setup

```bash
cd ~/workspace/OGameX-battleengine-wasm
git init
git add .
git commit -m "Add auto-sync"
git remote add origin https://github.com/YOUR_USERNAME/ogamex-simulator.git
git push -u origin main
```

### What You Get

**Safe Changes** (auto-PR):
- Speed calculation tweaks
- Unit stat updates
- Non-breaking changes
→ Creates Pull Request ready to merge

**Critical Changes** (manual):
- Battle engine logic
- Flight time formulas
- Breaking changes
→ Creates Issue with details + sends notifications

### Add Notifications

**Slack**:
1. Get webhook: https://api.slack.com/messaging/webhooks
2. Add secret: Settings → Secrets → `SLACK_WEBHOOK_URL`

**Discord**:
1. Get webhook: Server Settings → Integrations → Webhooks
2. Add secret: Settings → Secrets → `DISCORD_WEBHOOK_URL`

---

## Option 3: GitLab CI/CD

### Setup

```bash
git remote add origin https://gitlab.com/YOUR_USERNAME/ogamex-simulator.git
git push -u origin main

# Create schedule:
# Project → CI/CD → Schedules → New schedule
# Cron: 0 3 * * *
```

Same features as GitHub Actions.

---

## Files to Monitor

| OGameX File | Impact | Your File |
|-------------|--------|-----------|
| `rust/battle_engine_ffi/` | 🔴 CRITICAL | `src/lib.rs` |
| `FleetMissionService.php` | 🔴 CRITICAL | `browser-extension/app.js` (flight time) |
| `SpeedPropertyService.php` | 🟡 MEDIUM | `browser-extension/app.js` (drives) |
| `UnitObject.php` | 🟡 MEDIUM | `browser-extension/app.js` (units) |

**Note**: OGameX uses a Rust battle engine (`rust/battle_engine_ffi/`), not PHP for combat simulation.

---

## Update Workflow

When changes detected:

1. **Review**: Check what changed (GitHub link provided)
2. **Update**: Edit `src/lib.rs` or `browser-extension/app.js`
3. **Test**: `./build.sh` and test in browser
4. **Mark synced**:
   ```bash
   cd ~/workspace/OGameX
   git rev-parse HEAD > ../OGameX-battleengine-wasm/.ogamex-last-sync
   ```
5. **Deploy**: `./package.sh` to create new distribution

---

## Comparison

| Method | Automation | Notifications | Setup |
|--------|------------|---------------|-------|
| **Manual Script** | Run weekly | None | ✅ Done |
| **GitHub Actions** | Daily | Slack/Discord/Email | 5 min |
| **GitLab CI/CD** | Daily | Slack/Discord/Email | 5 min |

---

## Current Status

- **Last synced**: Commit `5993296` (Jan 5, 2026)
- **Sync marker**: `.ogamex-last-sync`
- **OGameX repo**: ~/workspace/OGameX

---

## Quick Commands

```bash
# Check for updates
./check-ogamex-updates.sh

# View OGameX changes
cd ~/workspace/OGameX
git log --since="1 week ago" -- rust/battle_engine_ffi/

# Compare battle engine
LAST=$(cat ../OGameX-battleengine-wasm/.ogamex-last-sync)
git diff $LAST..HEAD rust/battle_engine_ffi/src/lib.rs

# Mark as synced after updating
git rev-parse HEAD > ../OGameX-battleengine-wasm/.ogamex-last-sync
```

---

## Troubleshooting

**"OGameX repository not found"**:
```bash
git clone https://github.com/lanedirt/OGameX.git ~/workspace/OGameX
```

**Already synced but script shows updates**:
```bash
cd ~/workspace/OGameX
git pull
git rev-parse HEAD > ../OGameX-battleengine-wasm/.ogamex-last-sync
```

---

**Recommended**: Start with manual script, upgrade to GitHub Actions when you want full automation.
