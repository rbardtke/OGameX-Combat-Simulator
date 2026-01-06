# OGame Combat Simulator - Browser Extension

## Installation

### Chrome / Edge / Brave

1. Open browser and go to: `chrome://extensions/`
2. Enable "Developer mode" (toggle in top-right)
3. Click "Load unpacked"
4. Select this folder (`browser-extension/`)
5. Done! Click the extension icon ⚔️ in your toolbar

### Firefox

1. Open browser and go to: `about:debugging#/runtime/this-firefox`
2. Click "Load Temporary Add-on"
3. Navigate to this folder and select `manifest.json`
4. Done! Click the extension icon ⚔️ in your toolbar

**Note:** Uses Manifest V2 for maximum compatibility with both Chrome and Firefox.

### Opera / Other Chromium Browsers

Same as Chrome instructions above.

## Usage

1. Click the extension icon in your browser toolbar
2. A new tab will open with the combat simulator
3. Enter attacker and defender units
4. Click "Simulate Battle"
5. View results!

The simulator opens in a full browser tab for maximum space and comfort.

## Features

- ✅ **No CORS issues** - Works perfectly offline
- ✅ **No server needed** - Extension runs locally
- ✅ **Fast** - Rust/WASM powered (handles 100K+ units)
- ✅ **Private** - Everything stays in your browser
- ✅ **Portable** - Take it anywhere

## Performance

The simulator can handle:
- **< 10K units**: Instant results (< 100ms)
- **10K - 100K units**: Fast (100ms - 2s)
- **100K - 1M units**: Acceptable (2s - 30s) - Shows loading indicator
- **> 1M units**: Slow (30s+) - Browser may show "page unresponsive" warning

**Tip**: If simulating very large battles (> 500K units), the browser may warn that the page is slow. Click "Wait" - the simulation will complete.

## Distribution

To share with others, just zip this folder:
```bash
zip -r ogame-combat-extension.zip browser-extension/
```

Recipients can follow the installation instructions above.

## File Structure

```
browser-extension/
├── manifest.json       # Extension configuration
├── background.js       # Opens tab when icon clicked
├── index.html          # Main interface (opens in tab)
├── app.js              # JavaScript logic
├── style.css           # Styling
├── pkg/                # WASM files
│   └── *.wasm
├── icon*.png           # Extension icons
└── README.md           # This file
```

## Troubleshooting

**"WASM module not loaded yet":**
1. **Reload the extension:**
   - Chrome: Go to `chrome://extensions/`, find the extension, click the reload icon 🔄
   - Firefox: Go to `about:debugging`, click "Reload" on the extension
2. **Check browser console:**
   - Right-click the extension popup → "Inspect" or "Inspect Element"
   - Look for errors in the console
3. **Verify files:**
   - Make sure `pkg/ogame_combat_wasm_bg.wasm` exists
   - Make sure `pkg/ogame_combat_wasm.js` exists

**Extension not loading:**
- Make sure you selected the entire `browser-extension/` folder
- Check that `manifest.json` is in the root of the selected folder
- Try restarting the browser

**Popup doesn't open:**
- Check for errors in browser console (F12)
- Try removing and re-adding the extension
- Make sure you're using Chrome 88+ or Firefox 78+

**Icons not showing:**
- Icons are auto-generated PNG files
- Should work in all browsers
- If missing, the extension will still work fine

## Publishing (Optional)

To publish to Chrome/Firefox stores:

### Chrome Web Store
1. Create developer account ($5 one-time fee)
2. Zip the extension folder
3. Upload to Chrome Web Store
4. Fill out listing details

### Firefox Add-ons
1. Create developer account (free)
2. Zip the extension folder
3. Upload to addons.mozilla.org
4. Fill out listing details

---

**Enjoy your standalone OGame Combat Simulator!** ⚔️
