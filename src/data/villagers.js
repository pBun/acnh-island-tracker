const toSlug = require("../util/toSlug");
const villagerData = require("../data/villagersRaw.json");

module.exports =
    villagerData &&
    villagerData.feed &&
    villagerData.feed.entry &&
    villagerData.feed.entry.map(v => {
        return {
            id: toSlug(v.gsx$villager.$t),
            name: v.gsx$villager.$t,
            species: v.gsx$species.$t,
            gender: v.gsx$gender.$t,
            personality: v.gsx$personality.$t,
        };
    });
