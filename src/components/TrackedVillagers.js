import React from "react";
import { format } from "date-fns";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";

import useVillagers from "../hooks/useVillagers";

import TrackedVillagerListItem from "../components/TrackedVillagerListItem";

const useStyles = makeStyles(theme => ({
    list: {
        marginBottom: theme.spacing(2),
        padding: theme.spacing(1, 0, 4),
    },
    listItem: {},
    listSubheader: {
        paddingLeft: theme.spacing(5),
        paddingRight: theme.spacing(5),
        backgroundColor: theme.palette.background.paper,
    },
}));

export default function TrackedVillagers(props) {
    const classes = useStyles();
    const { sightings, ...otherProps } = props;

    const { getVillager } = useVillagers();

    const sortedSightings = sightings.sort((a, b) => b.timestamp - a.timestamp);
    const formattedSightings = sortedSightings.map((sighting, index) => {
        const villager = getVillager(sighting.villager);
        return {
            timestamp: sighting.timestamp,
            date: format(sighting.timestamp, "MMM d, yyyy"),
            villager,
        };
    });
    const sightingsGroupedByDate = formattedSightings.reduce((acc, data) => {
        (acc[data.date] = acc[data.date] || []).push(data);
        return acc;
    }, {});
    return (
        <List className={classes.list} {...otherProps}>
            {sortedSightings.length ? (
                Object.keys(sightingsGroupedByDate).map(date => (
                    <React.Fragment key={date}>
                        <ListSubheader className={classes.listSubheader}>
                            {date}
                        </ListSubheader>
                        {sightingsGroupedByDate[date].map(data => (
                            <TrackedVillagerListItem
                                key={data.timestamp}
                                className={classes.listItem}
                                villager={data.villager}
                                timestamp={data.timestamp}
                            />
                        ))}
                    </React.Fragment>
                ))
            ) : (
                <ListSubheader className={classes.listSubheader}>
                    No villagers tracked
                </ListSubheader>
            )}
        </List>
    );
}
