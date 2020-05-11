import useVillagerIcons from "../hooks/useVillagerIcons";

import { VILLAGERS } from "../util/villager";

export default function useVillagers() {
    const villagerIcons = useVillagerIcons();
    const allVillagers = VILLAGERS.map(villager => {
        const id = villager.name.replace(/[^a-zA-Z0-9-_]/g, "").toLowerCase();
        return {
            name: villager.name,
            personality: villager.personality,
            species: villager.species,
            gender: villager.gender,
            icon: villagerIcons[id],
            id,
        };
    });
    console.log(villagerIcons, allVillagers[0].icon);
    const getVillager = villagerName => {
        return allVillagers.find(villager => villager.name === villagerName);
    };
    return {
        getVillager,
        allVillagers,
    };
}
