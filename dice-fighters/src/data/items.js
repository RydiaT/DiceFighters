/* ============ DATA (no DOM in here) ============ */


// Item templates. Instances get a unique uid when dropped.
export const ITEMS = {
    rustySword:  { name: 'Rusty Sword',   slot: 'weapon', rarity: 'common',   stats: { atk: 3 }, sell: 2 },
    ironSword:   { name: 'Iron Sword',    slot: 'weapon', rarity: 'uncommon', stats: { atk: 6 }, sell: 2 },
    fangBlade:   { name: 'Fang Blade',    slot: 'weapon', rarity: 'rare',     stats: { atk: 10, speed: 0.1 }, sell: 2 },
    leatherVest: { name: 'Leather Vest',  slot: 'armor',  rarity: 'common',   stats: { def: 2, maxHp: 10 }, sell: 2 },
    chainmail:   { name: 'Chainmail',     slot: 'armor',  rarity: 'uncommon', stats: { def: 5, maxHp: 20 }, sell: 2 },
    bonePlate:   { name: 'Bone Plate',    slot: 'armor',  rarity: 'rare',     stats: { def: 8, maxHp: 35 }, sell: 2 },
    copperRing:  { name: 'Copper Ring',   slot: 'ring',   rarity: 'common',   stats: { crit: 0.03 }, sell: 2 },
    emberRing:   { name: 'Ember Ring',    slot: 'ring',   rarity: 'epic',     stats: { atk: 4, crit: 0.08 }, sell: 2 },
};