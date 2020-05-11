import React from "react";
import { format } from "date-fns";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
// import { makeStyles } from "@material-ui/core/styles";

// const useStyles = makeStyles(theme => ({
//
// }));

const TrackedVillagerListItem = props => {
    // const classes = useStyles();
    const {
        villager,
        timestamp,
        ...otherProps
    } = props;
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
                <Avatar
                    alt={villager.name}
                    src={villager.icon}
                />
            </ListItemAvatar>
            <ListItemText
                primary={`${villager.name} (${villager.personality} ${villager.species})`}
                secondary={format(timestamp, "h:mm a")}
            />
        </ListItem>
    );
};

export default TrackedVillagerListItem;
