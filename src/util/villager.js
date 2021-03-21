import PropTypes from "prop-types";

import villagerData from "../data/villagers";
import { groupBy } from "../util/list";

export const villagerShape = PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    species: PropTypes.string,
    personality: PropTypes.string,
    gender: PropTypes.string,
    icon: PropTypes.string,
});
export const VILLAGERS = villagerData;
export const NUM_VILLAGERS = VILLAGERS.length;
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
        const potentialId = (potential.villager && potential.villager.id) || potential.id;
        if(potentialId && !map.has(potentialId)){
            map.set(potentialId, true);
            distinctEncounters.push(VILLAGERS.find(v => v.id === potentialId));
        }
    }
    return distinctEncounters;
}

export function getMissingResidentPersonalities(currentResidents) {
    const residentVillagers = currentResidents.map(r => VILLAGERS.find(v => v.id === r.villager.id));
    const residentVillagersByPersonality = groupBy(residentVillagers, 'personality');
    const residentVillagerPersonalities = Object.keys(residentVillagersByPersonality);
    return AVAILABLE_PERSONALITIES.filter(p => residentVillagerPersonalities.indexOf(p) < 0);
}

export function getMysteryIslandChance(villager, currentResidents=[]) {
    if (!villager || !villager.id) return 0;

    // 0% if already a resident
    if (currentResidents.find(r => r.villager.id === villager.id)) return 0;

    const numSpeciesVillagers = VILLAGERS_BY_SPECIES[villager.species].length;
    const residentVillagers = currentResidents.map(r => VILLAGERS.find(v => v.id === r.villager.id))
    const residentVillagersBySpecies = groupBy(residentVillagers, 'species');
    const numSpeciesResidents = residentVillagersBySpecies[villager.species] ? residentVillagersBySpecies[villager.species].length : 0;
    const numSpeciesAvailable = AVAILABLE_SPECIES.reduce((numSpeciesAvailable, species) => {
        const islandHasAllOfType = residentVillagersBySpecies[species] && residentVillagersBySpecies[species].length / VILLAGERS_BY_SPECIES[species].length === 1;
        return islandHasAllOfType ? numSpeciesAvailable - 1 : numSpeciesAvailable;
    }, NUM_SPECIES);
    return (1 / numSpeciesAvailable) * (1 / (numSpeciesVillagers - numSpeciesResidents));
}

export function getCampsiteChance(villager, currentResidents=[], pastResidents=[], sightings=[]) {
    if (!villager || !villager.id || !villager.personality) return 0;

    // 0% if already a resident
    if (currentResidents.find(r => r.villager.id === villager.id)) return 0;

    // 0% if first pass and already encountered
    const encounters = getDistinctEncounters(currentResidents, pastResidents, sightings.filter(s => s.type === 'campsite'));
    const isFirstCycle = encounters.length <= NUM_VILLAGERS;
    if (isFirstCycle && encounters.find(e => e.id === villager.id)) return 0;

    const availablePool = VILLAGERS.reduce((acc, v) => {
        const hasEncountered = !!encounters.find(e => e.id === v.id);
        if (!isFirstCycle || !hasEncountered) acc.push(v);
        return acc;
    }, []);

    const missingPersonalities = getMissingResidentPersonalities(currentResidents);

    // 1 / AVAILABLE_POOL if no personalities missing
    if (!missingPersonalities.length || missingPersonalities.length === NUM_PERSONALITIES) {
        return (1 / availablePool.length);
    }

    // 50% weight to missing personalities
    const missingPool = availablePool.reduce((acc, v) => {
        if (missingPersonalities.indexOf(v.personality) >= 0) {
            acc.push(v);
        }
        return acc;
    }, []);
    const personalityPoolRoll = missingPersonalities.indexOf(villager.personality) >= 0
        ? 0.5 * (1 / missingPool.length) : 0;
    const availablePoolRoll = 0.5 * (1 / availablePool.length);
    return personalityPoolRoll + availablePoolRoll;
}

export const VILLAGERS_WITH_CHANCE = VILLAGERS.map(v => ({
    ...v,
    baseIslandChance: getMysteryIslandChance(v),
    baseCampsiteChance: getCampsiteChance(v),
}));

export const VILLAGERS_MINIMAL = VILLAGERS.map(v => ({
    id: v.id,
    name: v.name,
}));

export default {
    VILLAGERS,
    VILLAGERS_MINIMAL,
    VILLAGERS_WITH_CHANCE,
    VILLAGERS_BY_SPECIES,
    VILLAGERS_BY_PERSONALITY,
    NUM_SPECIES,
    NUM_PERSONALITIES,
    getMysteryIslandChance,
    getCampsiteChance,
};
