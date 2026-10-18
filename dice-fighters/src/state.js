/* ============ STATE + SAVE ============ */
let state = load() || newState();
let enemy = null;
let playerTimer = 0, enemyTimer = 0;

function save() { try { localStorage.setItem('autobattler-save', JSON.stringify(state)); } catch (e) {} }
function load() {
    try { const s = localStorage.getItem('autobattler-save'); return s ? JSON.parse(s) : null; }
    catch (e) { return null; }
}

/* ============ STATS (this connects inventory to combat) ============ */
function expToNext(level) { return Math.floor(20 * Math.pow(1.35, level - 1)); }

function getStats() {
    const s = { ...BASE };
    s.maxHp += (state.level - 1) * 8;
    s.atk   += (state.level - 1) * 1.5;
    s.def   += (state.level - 1) * 0.5;
    for (const slot of SLOTS) {
        const item = state.equipped[slot];
        if (!item) continue;
        for (const [k, v] of Object.entries(item.stats)) s[k] = (s[k] || 0) + v;
    }
    return s;
}
