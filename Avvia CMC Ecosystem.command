#!/bin/bash
# CMC Digital Ecosystem — Launcher (doppio click per avviare)

cd "$(dirname "$0")"

echo ""
echo "  ╔══════════════════════════════════════╗"
echo "  ║   CMC Digital Ecosystem — Mockup     ║"
echo "  ║   Think Next S.r.l. — Aprile 2026    ║"
echo "  ╚══════════════════════════════════════╝"
echo ""

# Check node
if ! command -v node &> /dev/null; then
  if [ -x /usr/local/bin/node ]; then
    export PATH="/usr/local/bin:$PATH"
  else
    echo "  [!] Node.js non trovato. Installalo da https://nodejs.org"
    echo "  Premi un tasto per chiudere..."
    read -n 1
    exit 1
  fi
fi

echo "  Node $(node -v) — npm $(npm -v)"
echo ""

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
  echo "  Installazione dipendenze..."
  npm install
  echo ""
fi

echo "  Avvio server di sviluppo..."
echo "  Apri il browser su: http://localhost:5173"
echo ""

# Open browser automatically after a short delay
(sleep 2 && open http://localhost:5173) &

npm run dev
