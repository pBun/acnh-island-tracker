import { groupBy } from "../util/list";
import useVillagers from "../hooks/useVillagers";

export default function useVillagerCalc(props) {
    // const { currentResidents, pastResidents } = props || {};
    const { allVillagers, getVillager } = useVillagers();
    const availableSpecies = groupBy(allVillagers, 'species');
    // const availablePersonalities = groupBy(allVillagers, 'personality');
    const getMysteryIslandRate = villagerName => {
        const villager = getVillager(villagerName);
        if (!villager) return 0;
        const numTotalSpecies = availableSpecies && Object.keys(availableSpecies).length;
        const numSpeciesVillagers = villager.species && availableSpecies[villager.species] ? availableSpecies[villager.species].length : 0;
        return Math.round((1 / numTotalSpecies)*(1 / numSpeciesVillagers) * 10000) / 100;
    };
    const getCampsiteRate = villagerName => {
        return 0;
    };
    return {
        getMysteryIslandRate,
        getCampsiteRate,
    };
}
