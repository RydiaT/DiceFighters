/* ============ DATA (no DOM in here) ============ */


// Item templates. Instances get a unique uid when dropped.
export const ITEMS = {
    rustySword:  { name: 'Rusty Sword',   slot: 'weapon', rarity: 'common',   stats: { atk: 3 }, sell: 1 },
    leatherBoots: { name: 'Leather Boots', slot: 'boots', rarity: 'common', stats: { speed: 0.03, def: 1 }, sell: 1},
    leatherGloves: { name: 'Leather Gloves', slot: 'gloves', rarity: 'common', stats: { crit: 0.03, atk: 2 }, sell: 5},
    leatherVest: { name: 'Leather Vest',  slot: 'armor',  rarity: 'common',   stats: { def: 2, maxHp: 10 }, sell: 1 },
    copperRing:  { name: 'Copper Ring',   slot: 'ring',   rarity: 'common',   stats: { crit: 0.03 }, sell: 5 },

    ironSword:   { name: 'Iron Sword',    slot: 'weapon', rarity: 'uncommon', stats: { atk: 6 }, sell: 5 },
    chainmail:   { name: 'Chainmail',     slot: 'armor',  rarity: 'uncommon', stats: { def: 5, maxHp: 20 }, sell: 5 },
    chainBoots: { name: 'Chain Boots', slot: 'boots', rarity: 'uncommon', stats: { speed: 0.02, def: 5 }, sell: 5},

    fangBlade:   { name: 'Fang Blade',    slot: 'weapon', rarity: 'rare',     stats: { atk: 10, speed: 0.1 }, sell: 10 },
    bonePlate:   { name: 'Bone Plate',    slot: 'armor',  rarity: 'rare',     stats: { def: 8, maxHp: 35 }, sell: 10 },

    huntersGloves: { name: 'Hunter\'s Gloves', slot: 'gloves', rarity: 'epic', stats: { crit: 0.05, atk: 4, speed: 0.01 }, sell: 15},
    emberRing:   { name: 'Ember Ring',    slot: 'ring',   rarity: 'epic',     stats: { atk: 4, crit: 0.08 }, sell: 20 },
};