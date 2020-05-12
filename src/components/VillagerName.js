import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useNameStyles = makeStyles(theme => ({
    meta: {
        color: theme.palette.text.secondary,
        ...theme.typography.caption,
    },
}));

export default function VillagerName({villager}) {
    const classes = useNameStyles();
    return (
        <>
            <span>{villager.name}</span>
            {" "}
            <span className={classes.meta}>{`(${villager.personality} ${villager.species})`}</span>
        </>
    );
};
