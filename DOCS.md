# Documentation Index

Complete documentation for the OGameX Combat Simulator.

## Quick Links

- **New to the project?** → [README.md](README.md)
- **Installing?** → [GETTING-STARTED.md](GETTING-STARTED.md)
- **What can it do?** → [FEATURES.md](FEATURES.md)
- **Need to sync with OGameX?** → [SYNCING.md](SYNCING.md)
- **User install guide?** → [browser-extension/HOW_TO_INSTALL.md](browser-extension/HOW_TO_INSTALL.md)

---

## All Documentation

### Core Documentation

**[README.md](README.md)**
- Project overview
- Quick start for users and developers
- Key features summary
- Browser support

**[GETTING-STARTED.md](GETTING-STARTED.md)**
- Installation instructions (browser extension & Python)
- Using the simulator
- Development workflow
- Distribution (creating ZIP files)
- Testing and troubleshooting

**[FEATURES.md](FEATURES.md)**
- Complete feature list
- Technical specifications
- Combat mechanics
- Flight time calculations
- Ship drive upgrades
- Python API
- Performance benchmarks

**[SYNCING.md](SYNCING.md)**
- Keep in sync with OGameX
- Manual check script (`./check-ogamex-updates.sh`)
- GitHub Actions automation
- GitLab CI/CD automation
- Notification integrations (Slack, Discord, Email)

### User Guides

**[browser-extension/HOW_TO_INSTALL.md](browser-extension/HOW_TO_INSTALL.md)**
- End-user installation guide
- Chrome/Edge/Firefox instructions
- Troubleshooting

**[python-simulator/README.md](python-simulator/README.md)**
- Python version usage
- API documentation
- Flight time calculator
- Multiple simulation runs
- Examples

---

## Workflow References

### For Users

1. **Get ZIP file**: Ask developer or download from release
2. **Install**: [browser-extension/HOW_TO_INSTALL.md](browser-extension/HOW_TO_INSTALL.md)
3. **Use**: Open extension, load example, simulate battles

### For Developers

1. **Setup**: [GETTING-STARTED.md](GETTING-STARTED.md) → Development
2. **Build**: `./build.sh`
3. **Test**: Load in browser
4. **Package**: `./package.sh --skip-build`
5. **Sync**: [SYNCING.md](SYNCING.md)

---

## Quick Commands

```bash
# Build
./build.sh

# Check OGameX updates
./check-ogamex-updates.sh

# Create distribution ZIP
./package.sh --skip-build

# Run Python version
cd python-simulator && python3 combat_simulator.py
```

---

**Start here**: [README.md](README.md)
