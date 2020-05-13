import React from "react";
import { format } from "date-fns";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import Tooltip from "@material-ui/core/Tooltip";

import {
    getMysteryIslandChance,
    // getCampsiteChance,
} from "../util/villager";

import VillagerName from "../components/VillagerName";

const useStyles = makeStyles(theme => ({
    listItemSecondary: {
        color: theme.palette.text.secondary,
        ...theme.typography.caption,
    },
}));

function chanceToString(fraction, base=1000) {
    return `${(Math.round(fraction * 10000) / 100).toFixed(2)}%`;
}

export default function VillagerListItem(props) {
    const {
        villager,
        timestamp,
        currentResidents,
        pastResidents,
        ...otherProps
    } = props;
    const classes = useStyles();
    const baseMysteryIslandString = chanceToString(villager.baseIslandChance);
    const myMysteryIslandString = chanceToString(getMysteryIslandChance(villager.name, currentResidents));
    // const baseCampsiteString = chanceToString(villager.baseIslandChance);
    // const myCampsiteString = chanceToString(getCampsiteChance(villager.name, currentResidents, pastResidents));
    return (
        <ListItem
            button
            component="a"
            href={`https://nookipedia.com/wiki/${villager.name}`}
            target="_blank"
            rel="noopener noreferrer"
            {...otherProps}
        >
            <ListItemAvatar>
                <Avatar alt={villager.name} src={villager.icon} />
            </ListItemAvatar>
            <ListItemText
                primary={(<VillagerName villager={villager} />)}
                secondary={(
                    <>
                        {timestamp ? `${format(timestamp, "h:mm a")} | ` : ''}
                        <Tooltip arrow title={`Base Chance: ${baseMysteryIslandString}`} placement="top">
                            <span>{`NMT: ${myMysteryIslandString}`}</span>
                        </Tooltip>
                        {/*{" | "}
                        <Tooltip arrow title={`Base Chance: ${baseCampsiteString}`} placement="top">
                            <span>{`Campsite: ${myCampsiteString}`}</span>
                        </Tooltip>*/}
                    </>
                )}
                secondaryTypographyProps={{className: classes.listItemSecondary}}
            />
        </ListItem>
    );
};
