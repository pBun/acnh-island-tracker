import villagerData from "../data/villagers.json";
import { groupBy } from "../util/list";

export const VILLAGERS =
    villagerData &&
    villagerData.feed &&
    villagerData.feed.entry &&
    villagerData.feed.entry.map(v => {
        return {
            id: v.gsx$villager.$t.replace(/[^a-zA-Z0-9-_]/g, "").toLowerCase(),
            name: v.gsx$villager.$t,
            species: v.gsx$species.$t,
            gender: v.gsx$gender.$t,
            personality: v.gsx$personality.$t,
        };
    });

export const VILLAGERS_BY_SPECIES = groupBy(VILLAGERS, 'species');
export const NUM_SPECIES = Object.keys(VILLAGERS_BY_SPECIES).length;
export const VILLAGERS_BY_PERSONALITY = groupBy(VILLAGERS, 'personality');
export const NUM_PERSONALITIES = Object.keys(VILLAGERS_BY_SPECIES).length;

export function getMysteryIslandChance(villagerName, currentResidents=[]) {
    // 0% if already a resident
    if (currentResidents.indexOf(villagerName) > -1) return 0;

    // 0% if villager doesn't exist in our master list
    const villager = VILLAGERS.find(v => v.name === villagerName);
    if (!villager) return 0;

    const numSpeciesVillagers = VILLAGERS_BY_SPECIES[villager.species].length;
    const residentVillagers = currentResidents.map(r => VILLAGERS.find(v => v.name === r.name))
    const residentVillagersBySpecies = groupBy(residentVillagers, 'species')[villager.species];
    const numSpeciesResidents = residentVillagersBySpecies ? residentVillagersBySpecies.length : 0;
    return (1 / NUM_SPECIES) * (1 / (numSpeciesVillagers - numSpeciesResidents));
}

export function getCampsiteChance(villagerName, currentResidents=[], pastResidents=[]) {
    // const villager = VILLAGERS.find(v => v.name === villagerName);
    return 0;
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
