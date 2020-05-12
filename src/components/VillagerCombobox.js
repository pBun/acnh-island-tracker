import React from "react";
import { TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

import useVillagers from "../hooks/useVillagers";

export default function TrackVillager(props) {
    const { error, ...otherProps } = props;
    const { allVillagers } = useVillagers();
    return (
        <Autocomplete
            id="villager-combobox"
            disableClearable
            autoHighlight
            options={allVillagers.sort((a, b) => -b.species.localeCompare(a.species))}
            getOptionLabel={option => option.name}
            groupBy={option => option.species}
            getOptionSelected={(option, value) => option.id === value.id}
            renderInput={params => (
                <TextField {...params} label="Villager" variant="outlined" error={!!props.error} helperText={props.error} />
            )}
            {...otherProps}
        />
    );
}
