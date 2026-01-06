# How to Install OGameX Combat Simulator

Manual installation guide for end users.

## Chrome / Edge / Brave (Chromium-based browsers)

1. Download the extension ZIP file
2. Extract to a **permanent folder** (e.g., `~/ogamex-simulator/`)
   - ⚠️ Don't delete this folder - the browser reads from it
3. Open Chrome: `chrome://extensions/` (or Edge: `edge://extensions/`)
4. Enable **"Developer mode"** (toggle in top-right corner)
5. Click **"Load unpacked"**
6. Select the extracted folder
7. Done! Extension is installed

**Using the Extension**:
- Click extension icon (puzzle piece) in toolbar
- Find "OGameX Combat Simulator" and click it
- Simulator opens in new window

---

## Firefox

**Temporary Installation** (until Firefox restart):

1. Download and extract the ZIP file
2. Open Firefox: `about:debugging`
3. Click **"This Firefox"**
4. Click **"Load Temporary Add-on"**
5. Navigate to folder and select `manifest.json`
6. Extension installed (until restart)

**Note**: Firefox removes temporary extensions on restart. You'll need to reload it each time.

---

## Troubleshooting

**"WASM module not loaded yet"**
- Wait a few seconds after opening extension
- Reload the extension page

**"Failed to initialize combat simulator"**
- Verify `pkg/` directory exists in the extension folder
- Check browser console (F12) for errors
- Reload the extension

**Extension disappeared after browser restart (Chrome/Edge)**
- Extension folder was deleted or moved
- Re-install from the same permanent folder
- Keep folder in a stable location (not Downloads, not Temp)

**Developer Mode warning (Chrome)**
- Normal for manually installed extensions
- Can be dismissed safely
- Doesn't affect functionality

---

## For Developers

**Build from source**:
```bash
cd ~/workspace/OGameX-battleengine-wasm
./build.sh
```

**Create distribution ZIP**:
```bash
./package.sh --skip-build
# Creates ogamex-combat-simulator-v1.0.0-chrome.zip
```

**Test changes**:
- Edit code
- Rebuild if needed (`./build.sh` for Rust changes)
- Reload extension in browser (`chrome://extensions/` → Reload button)
