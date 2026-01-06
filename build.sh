#!/bin/bash

# OGame Combat Simulator - WASM Build Script

set -e

echo "🚀 Building OGame Combat Simulator for WebAssembly..."

# Check if wasm-pack is installed
if ! command -v wasm-pack &> /dev/null; then
    echo "❌ wasm-pack is not installed!"
    echo "📦 Install it with: curl https://rustwasm.github.io/wasm-pack/installer/init.sh -sSf | sh"
    exit 1
fi

# Build the WASM module
echo "⚙️  Compiling Rust to WebAssembly..."
wasm-pack build --target web --out-dir OGameX-CombatSim/pkg --release

echo "✅ Build complete!"
echo ""
echo "📂 Output location: OGameX-CombatSim/pkg/"
echo "🌐 To use: Open OGameX-CombatSim/index.html in your browser"
echo ""
echo "💡 Tip: For development with hot reload, use:"
echo "   cd OGameX-CombatSim && python3 -m http.server 8080"
echo "   Then visit http://localhost:8080"
