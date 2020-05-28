import React from "react";
import { format } from "date-fns";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";

import { groupBy } from "../util/list";
import useVillagers from "../hooks/useVillagers";
import VillagerListItem from "../components/VillagerListItem";

const useStyles = makeStyles(theme => ({
    list: {
        marginBottom: theme.spacing(2),
        padding: theme.spacing(1, 0, 4),
    },
    listSubheader: {
        paddingLeft: theme.spacing(5),
        paddingRight: theme.spacing(5),
        backgroundColor: theme.palette.background.paper,
    },
}));

export default function TrackedVillagersList(props) {
    const classes = useStyles();
    const {
        sightings,
        ...otherProps
    } = props;

    const { getVillager } = useVillagers();

    const sortedSightings = sightings.sort((a, b) => b.timestamp - a.timestamp);
    const formattedSightings = sortedSightings.map((sighting, index) => {
        const villager = getVillager(sighting.villager.id);
        return {
            ...sighting,
            date: format(sighting.timestamp, "MMM d, yyyy"),
            villager,
        };
    });
    const sightingsGroupedByDate = groupBy(formattedSightings, 'date');
    return (
        <List className={classes.list} {...otherProps}>
            {sortedSightings.length ? (
                Object.keys(sightingsGroupedByDate).map(date => (
                    <React.Fragment key={date}>
                        <ListSubheader className={classes.listSubheader}>{date}</ListSubheader>
                        {sightingsGroupedByDate[date].map(sighting => (
                            <VillagerListItem
                                key={sighting.timestamp}
                                villager={sighting.villager}
                                sighting={sighting}
                            />
                        ))}
                    </React.Fragment>
                ))
            ) : (
                <ListSubheader className={classes.listSubheader}>
                    No encounters to display
                </ListSubheader>
            )}
        </List>
    );
}
