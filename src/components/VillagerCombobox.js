import React from 'react';
import { TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

import villagerData from '../data/villagers.json';

const VILLAGERS = villagerData && villagerData.feed && villagerData.feed.entry && villagerData.feed.entry.map((v) => {
    return {
        name: v.gsx$villager.$t,
        species: v.gsx$species.$t,
        gender: v.gsx$gender.$t,
        personality: v.gsx$personality.$t,
    };
});

export default function TrackVillager(props) {
    return (
        <Autocomplete
            id="villager-combobox"
            disableClearable
            autoHighlight
            options={VILLAGERS.sort((a, b) => -b.species.localeCompare(a.species))}
            getOptionLabel={(option) => option.name}
            groupBy={(option) => option.species}
            style={{ width: '100%' }}
            renderInput={(params) => <TextField {...params} label="Villager" variant="outlined" />}
            {...props}
        />
    );
}
