// Zones. hp/atk/def are base values; stage scaling is applied in spawnEnemy().
// art: path to the image you will add later. Missing files show a placeholder.
export const ZONES = {
    forest: {
        name: 'Mossy Forest',
        enemies: [
            { name: 'Slime',  art: '/slime.webp',  hp: 20, atk: 3, def: 0, exp: 6,  gold: 2, speed: 0.8 },
            { name: 'Wolf',   art: '/wolf.webp',   hp: 30, atk: 6, def: 1, exp: 10, gold: 4, speed: 1.3 },
            { name: 'Bandit', art: '/bandit.webp', hp: 40, atk: 7, def: 3, exp: 14, gold: 8, speed: 1.0 },
        ],
        boss: { name: 'Forest Warden', art: '/warden.webp', hp: 150, atk: 12, def: 5, exp: 60, gold: 40, speed: 0.9 , isBoss: true},
        drops: [ ['rustySword', 8], ['leatherVest', 8], ['copperRing', 5], ['ironSword', 3], ['chainmail', 3] ],
        next: "crypt",
    },
    crypt: {
        name: 'Sunken Crypt',
        enemies: [
            { name: 'Skeleton', art: '/skeleton.webp', hp: 45, atk: 9,  def: 5, exp: 20, gold: 8,  speed: 0.8 },
            { name: 'Ghoul',    art: '/ghoul.webp',    hp: 60, atk: 12, def: 4, exp: 26, gold: 12, speed: 1.0 },
        ],
        boss: { name: 'Bone King', art: '/boneking.webp', hp: 320, atk: 20, def: 10, exp: 140, gold: 90, speed: 0.8, isBoss: true },
        drops: [ ['ironSword', 6], ['chainmail', 6], ['fangBlade', 3], ['bonePlate', 3], ['emberRing', 1] ],
    },
};

