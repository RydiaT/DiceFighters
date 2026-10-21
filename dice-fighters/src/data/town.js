
// All quest values are base and intended to be scaled with the menu (dungeon unlocks, though some might scale with level if I feel like it)

/**
 * questId: {label: 'Display Name', flavorText: 'miniLoreNotImportantYet', unlockAt: 'idOfClearedArea', type: 'kill | collect | clear | i want mini dungeons in the future', thing: 'areaId enemyId | itemId | areaId', count: 'baseAmountOfThing', reward: {items: ['item', 'ids'] | gold: 'baseAmt' | exp: 'baseAmt'}}
  */
export const QUESTS = {
    slimeKill: {label: 'Slime Removal', flavorText: 'The slime population has gotten out of control! You should go trim their numbers.', unlockAt: 'crypt', type: 'kill', thing: 'forest slime', count: 20, reward: {exp: 100, gold: 500}}
}

// the idea is that once you clear an area, that areas items become available to buy at a high price. might have to rework some numbers to make it worth it
// i also want features that can be unlocked through the shop or quests. autosell, forging equipment, ect
// clearedAreaId: {items: ['drops', 'of', 'that', 'area'], priceMult: multOfPriceAboveSellValue}
export const SHOP = {
    forest: {items: ['rustySword', 'leatherVest', 'leatherBoots', 'leatherGloves', 'copperRing', 'ironSword', 'chainmail'], priceMult: 10},
    crypt: {items: ['chainBoots', 'fangBlade', 'bonePlate', 'emberRing', 'huntersGloves'], priceMult: 15},
}