import React from "react";
import { matchSorter } from "match-sorter";
import { makeStyles } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

import useVillagers from "../hooks/useVillagers";

const useStyles = makeStyles(theme => ({
    optionIcon: {
        marginRight: "0.5em",
    },
}));

export default function TrackVillager(props) {
    const classes = useStyles();
    const { error, ...otherProps } = props;
    const { allVillagers } = useVillagers();
    const filterOptions = (options, { inputValue }) => matchSorter(
        options,
        inputValue,
        {
            keys: [
                "name",
                "species",
                "personality",
                item => `${item.personality} ${item.species}`,
                item => `${item.species} ${item.personality}`,
            ],
        },
    );
    return (
        <Autocomplete
            id="villager-combobox"
            disableClearable
            autoHighlight
            options={allVillagers}
            getOptionLabel={option => option.name}
            getOptionSelected={(option, value) => option.id === value.id}
            filterOptions={filterOptions}
            renderOption={(option) => (
                <React.Fragment>
                    <img alt="" className={classes.optionIcon} src={option.icon} />
                    {option.name} ({option.personality} {option.species})
                </React.Fragment>
            )}
            renderInput={params => (
                <TextField
                    {...params}
                    label="Villager"
                    variant="outlined"
                    error={!!props.error}
                    helperText={props.error}
                />
            )}
            {...otherProps}
        />
    );
}
