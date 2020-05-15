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
    const getVillager = id => {
        return allVillagers.find(villager => villager.id === id);
    };
    return {
        getVillager,
        allVillagers,
    };
}
