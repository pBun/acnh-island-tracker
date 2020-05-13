import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useNameStyles = makeStyles(theme => ({
    name: {
        verticalAlign: "middle",
    },
    meta: {
        color: theme.palette.text.secondary,
        verticalAlign: "middle",
        ...theme.typography.caption,
    },
}));

export default function VillagerName({villager}) {
    const classes = useNameStyles();
    return (
        <>
            <span className={classes.name}>{villager.name}</span>
            {" "}
            <span className={classes.meta}>{`(${villager.personality} ${villager.species})`}</span>
        </>
    );
};
