import React from "react";
import { Link } from "gatsby";
import { format } from "date-fns";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import Tooltip from "@material-ui/core/Tooltip";

import NmtIcon from "../components/icons/Nmt";
import CampsiteIcon from "../components/icons/Campsite";

import {
    getMysteryIslandChance,
    getCampsiteChance,
} from "../util/villager";
import { percentToString } from "../util/text";

import VillagerName from "../components/VillagerName";

const useStyles = makeStyles(theme => ({
    listItemSecondary: {
        color: theme.palette.text.secondary,
        ...theme.typography.caption,
    },
    inlineIcon: {
        verticalAlign: "middle",
        width: "0.8em",
        marginTop: "-0.1em",
    },
}));

export default function VillagerListItem(props) {
    const {
        villager,
        timestamp,
        type,
        currentResidents,
        pastResidents,
        sightings,
        ...otherProps
    } = props;
    const classes = useStyles();
    const baseMysteryIslandString = percentToString(villager.baseIslandChance);
    const myMysteryIslandString = percentToString(getMysteryIslandChance(villager.name, currentResidents));
    const baseCampsiteString = percentToString(villager.baseIslandChance);
    const myCampsiteString = percentToString(getCampsiteChance(villager.name, currentResidents, pastResidents, sightings));
    const secondary = [];
    if (timestamp) secondary.push(format(timestamp, "h:mm a"));
    console.log(type);
    if (!type || type !== 'campsite') {
        secondary.push((
            <Tooltip arrow title={`Base chance: ${baseMysteryIslandString}`} placement="top">
                <span>
                    <NmtIcon className={classes.inlineIcon} />
                    {" "}
                    {myMysteryIslandString}
                </span>
            </Tooltip>
        ));
    }
    if (!type || type === 'campsite') {
        secondary.push((
            <Tooltip arrow title={`Base chance: ${baseCampsiteString}`} placement="top">
                <span>
                    <CampsiteIcon className={classes.inlineIcon} />
                    {" "}
                    {myCampsiteString}
                </span>
            </Tooltip>
        ));
    }
    return (
        <ListItem
            button
            component={Link}
            to={`/villagers/${villager.id}/`}
            {...otherProps}
        >
            <ListItemAvatar>
                <Avatar alt={villager.name} src={villager.icon} />
            </ListItemAvatar>
            <ListItemText
                primary={(<VillagerName villager={villager} />)}
                secondary={secondary.map((item, index) => (
                    <React.Fragment key={index}>
                        { item }
                        {index < secondary.length - 1 ? " | " : ""}
                    </React.Fragment>
                ))}
                secondaryTypographyProps={{className: classes.listItemSecondary}}
            />
        </ListItem>
    );
};
