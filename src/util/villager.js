import villagerData from "../data/villagers.json";

export const VILLAGERS =
    villagerData &&
    villagerData.feed &&
    villagerData.feed.entry &&
    villagerData.feed.entry.map(v => {
        return {
            name: v.gsx$villager.$t,
            species: v.gsx$species.$t,
            gender: v.gsx$gender.$t,
            personality: v.gsx$personality.$t,
        };
    });

export default VILLAGERS;
