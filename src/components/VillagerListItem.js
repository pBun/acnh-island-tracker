import React from "react";
import { format } from "date-fns";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";

import useVillagerCalc from "../hooks/useVillagerCalc";
import VillagerName from "../components/VillagerName";

const useStyles = makeStyles(theme => ({
    listItemSecondary: {
        color: theme.palette.text.secondary,
        ...theme.typography.caption,
    },
}));

export default function VillagerListItem(props) {
    const classes = useStyles();
    const {
        getMysteryIslandRate,
        // getCampsiteRate,
    } = useVillagerCalc();
    const { villager, timestamp, ...otherProps } = props;
    const secondaryTextItems = [
        `Island: ${getMysteryIslandRate(villager.name)}%`,
        // `Campsite: ${getCampsiteRate(villager.name)}%`,
    ];
    if (timestamp) {
        secondaryTextItems.unshift(format(timestamp, "h:mm a"));
    }
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
                secondary={secondaryTextItems.join(' | ')}
                secondaryTypographyProps={{className: classes.listItemSecondary}}
            />
        </ListItem>
    );
};
