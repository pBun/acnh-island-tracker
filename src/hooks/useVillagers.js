import useVillagerIcons from "../hooks/useVillagerIcons";

import { VILLAGERS_WITH_CHANCE } from "../util/villager";

export default function useVillagers() {
    const villagerIcons = useVillagerIcons();
    const allVillagers = VILLAGERS_WITH_CHANCE.map(villager => {
        return {
            ...villager,
            icon: villagerIcons[villager.id],
        };
    });
    const getVillager = villagerName => {
        return allVillagers.find(villager => villager.name === villagerName);
    };
    return {
        getVillager,
        allVillagers,
    };
}
