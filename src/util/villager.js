import villagerData from "../data/villagers";
import { groupBy } from "../util/list";

export const VILLAGERS = villagerData;

export const VILLAGERS_BY_SPECIES = groupBy(VILLAGERS, 'species');
export const AVAILABLE_SPECIES = Object.keys(VILLAGERS_BY_SPECIES);
export const NUM_SPECIES = AVAILABLE_SPECIES.length;
export const VILLAGERS_BY_PERSONALITY = groupBy(VILLAGERS, 'personality');
export const AVAILABLE_PERSONALITIES = Object.keys(VILLAGERS_BY_PERSONALITY);
export const NUM_PERSONALITIES = AVAILABLE_PERSONALITIES.length;

export function getDistinctEncounters(currentResidents=[], pastResidents=[], sightings=[]) {
    const encounters = currentResidents.concat(pastResidents, sightings);
    const distinctEncounters = [];
    const map = new Map();
    for (const potential of encounters) {
        const pName = potential.name || potential.villager;
        if(pName && !map.has(pName)){
            map.set(pName, true);
            distinctEncounters.push(VILLAGERS.find(v => v.name === pName));
        }
    }
    return distinctEncounters;
}

export function getMissingResidentPersonalities(currentResidents) {
    const currentResidentVillagers = currentResidents.map(r => VILLAGERS.find(v => v.name === r.name));
    const currentResidentVillagersByPersonality = groupBy(currentResidentVillagers, 'personality');
    const currentResidentPersonalities = Object.keys(currentResidentVillagersByPersonality);
    return AVAILABLE_PERSONALITIES.filter(p => currentResidentPersonalities.indexOf(p) < 0);
}

export function getMysteryIslandChance(villagerName, currentResidents=[]) {
    // 0% if already a resident
    if (currentResidents.find(r => r.name === villagerName)) return 0;

    // 0% if villager doesn't exist in our master list
    const villager = VILLAGERS.find(v => v.name === villagerName);
    if (!villager) return 0;

    const numSpeciesVillagers = VILLAGERS_BY_SPECIES[villager.species].length;
    const residentVillagers = currentResidents.map(r => VILLAGERS.find(v => v.name === r.name))
    const residentVillagersBySpecies = groupBy(residentVillagers, 'species')[villager.species];
    const numSpeciesResidents = residentVillagersBySpecies ? residentVillagersBySpecies.length : 0;
    return (1 / NUM_SPECIES) * (1 / (numSpeciesVillagers - numSpeciesResidents));
}

export function getCampsiteChance(villagerName, currentResidents=[], pastResidents=[], sightings=[]) {
    // 0% if already a resident
    if (currentResidents.find(r => r.name === villagerName)) return 0;

    // 0% if first pass and already encountered
    const encounters = getDistinctEncounters(currentResidents, pastResidents, sightings.filter(s => s.location === 'campsite'));
    const isFirstCycle = encounters.length <= VILLAGERS.length;
    if (isFirstCycle && encounters.find(e => e.name === villagerName)) return 0;

    const villager = VILLAGERS.find(v => v.name === villagerName);

    // FIRST ROLL * SECOND ROLL = chance to see a specific villager at a campsite

    // FIRST ROLL:
    // if currentResidentPool is missing this villager's personality: 0.6 / numberOfMissingPersonalities
    // else if currentResidentPool is missing any other personalities: 0.4 / (numberOfPersonalities - numberOfMissingPersonalities)
    // else if no personalities missing from currentResidentPool: 1 / numberOfPersonalities
    let firstRoll = 0;
    const missingPersonalities = getMissingResidentPersonalities(currentResidents);
    if (missingPersonalities.length) {
        const isMissingPersonality = missingPersonalities.indexOf(villager.personality) >= 0;
        firstRoll = isMissingPersonality
            ? 0.585 * (1 / missingPersonalities.length)
            : 0.415 * (1 / (AVAILABLE_PERSONALITIES.length - missingPersonalities.length));
    } else {
        firstRoll = 1 / NUM_PERSONALITIES;
    }

    // SECOND ROLL:
    // if every villger has been encountered: 1 / numberOfPersonalityPool
    // else: 1 / (numberOfPersonalityPool - numberOfPersonalityPoolEncountered)
    const encountersByPersonality = groupBy(encounters, 'personality')[villager.personality];
    const personalityPoolEncountered = isFirstCycle && encountersByPersonality ? encountersByPersonality.length : 0;
    const personalityPool = VILLAGERS_BY_PERSONALITY[villager.personality].length;
    const secondRoll = 1 / (personalityPool - personalityPoolEncountered);

    return firstRoll * secondRoll;
}

export const VILLAGERS_WITH_CHANCE = VILLAGERS.map(v => ({
    ...v,
    baseIslandChance: getMysteryIslandChance(v.name),
    baseCampsiteChance: getCampsiteChance(v.name),
}));

export default {
    VILLAGERS,
    VILLAGERS_WITH_CHANCE,
    VILLAGERS_BY_SPECIES,
    VILLAGERS_BY_PERSONALITY,
    NUM_SPECIES,
    NUM_PERSONALITIES,
    getMysteryIslandChance,
    getCampsiteChance,
};
