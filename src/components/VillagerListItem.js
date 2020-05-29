import React from "react";
import { Link } from "gatsby";
import { format } from "date-fns";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Avatar from "@material-ui/core/Avatar";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import HomeIcon from "@material-ui/icons/Home";

import AppContext from "../context/AppContext";
import SessionContext from "../context/SessionContext";

import NmtIcon from "../components/icons/Nmt";
import CampsiteIcon from "../components/icons/Campsite";

import {
    NUM_VILLAGERS,
    getMysteryIslandChance,
    getCampsiteChance,
    getDistinctEncounters,
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
    secondaryAction: {
        right: theme.spacing(4),
    },
    deleteButton: {
        color: theme.palette.error.main,
    },
}));

export default function VillagerListItem(props) {
    const {
        villager,
        sighting,
        children,
        ...otherProps
    } = props;
    const classes = useStyles();
    const { currentResidents, pastResidents, session, deleteSighting } = React.useContext(SessionContext);
    const { setSnackMessage } = React.useContext(AppContext);
    const baseMysteryIslandString = percentToString(villager.baseIslandChance);
    const myMysteryIslandChance = getMysteryIslandChance(villager, currentResidents);
    const myMysteryIslandString = percentToString(myMysteryIslandChance);
    const baseCampsiteString = percentToString(villager.baseCampsiteChance);
    const myCampsiteChance = getCampsiteChance(villager, currentResidents, pastResidents, session.sightings);
    const myCampsiteString = percentToString(myCampsiteChance);
    const isMysteryIslandEncounter = sighting && sighting.type === 'mystery-island';
    const isCampsiteEncounter = sighting && sighting.type === 'campsite';
    const isCurrentResident = !!currentResidents.find(r => r.villager.id === villager.id);
    const isPastResident = !!pastResidents.find(r => r.villager.id === villager.id);
    const hasVisitedCampsite = !!session.sightings.find(s => s.villager.id === villager.id && s.type === 'campsite');
    const distinctEncounters = getDistinctEncounters(currentResidents, pastResidents, session.sightings.filter(s => s.type === 'campsite'));
    const isFirstCyle = distinctEncounters.length < NUM_VILLAGERS;
    const secondary = [];
    if (sighting) secondary.push(format(sighting.timestamp, "h:mm a"));
    if (isCurrentResident) {
        secondary.push((
            <Tooltip
                arrow
                title={(
                    <>
                        <p>{villager.name} is a current resident which means your encounter rate is 0%</p>
                        <p>Base campsite rate: {baseCampsiteString}</p>
                        <p>Base mystery island rate: {baseMysteryIslandString}</p>
                    </>
                )}
                placement="top"
            >
                <span>
                    <HomeIcon className={classes.inlineIcon} />
                </span>
            </Tooltip>
        ));
    } else {
        if (!sighting || isMysteryIslandEncounter) {
            secondary.push((
                <Tooltip
                    arrow
                    title={(
                        <>
                            <p>Your encounter rate: {myMysteryIslandString}</p>
                            <p>Base rate: {baseMysteryIslandString}</p>
                        </>
                    )}
                    placement="top"
                >
                    <span>
                        <NmtIcon className={classes.inlineIcon} />
                        {" "}
                        {myMysteryIslandChance ? myMysteryIslandString : ""}
                    </span>
                </Tooltip>
            ));
        }
        if (sighting && !isCampsiteEncounter) {
            // skip
        } else if (isFirstCyle && isPastResident) {
            secondary.push((
                <Tooltip
                    arrow
                    title={(
                        <>
                            <p>{villager.name} was a resident on your island which means your encounter rate is 0%</p>
                            <p>Base campsite rate: {baseCampsiteString}</p>
                        </>
                    )}
                    placement="top"
                >
                    <span>
                        <HomeIcon className={classes.inlineIcon} />
                    </span>
                </Tooltip>
            ));
        } else if (isFirstCyle && hasVisitedCampsite) {
            secondary.push((
                <Tooltip
                    arrow
                    title={(
                        <>
                            <p>{villager.name} has visited your campsite which means your encounter rate is 0%</p>
                            <p>Base campsite rate: {baseCampsiteString}</p>
                        </>
                    )}
                    placement="top"
                >
                    <span>
                        <CampsiteIcon className={classes.inlineIcon} />
                    </span>
                </Tooltip>
            ));
        } else {
            secondary.push((
                <Tooltip
                    arrow
                    title={(
                        <>
                            <p>Your encounter rate: {myCampsiteString}</p>
                            <p>Base rate: {baseCampsiteString}</p>
                        </>
                    )}
                    placement="top"
                >
                    <span>
                        <CampsiteIcon className={classes.inlineIcon} />
                        {" "}
                        {myCampsiteChance ? myCampsiteString : ""}
                    </span>
                </Tooltip>
            ));
        }
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
            {sighting ? (
                <ListItemSecondaryAction className={classes.secondaryAction}>
                    <Tooltip arrow title={`Delete encounter${sighting.dataShared ? " and flag for deletion on shared spreadsheet" : ""}`} placement="top">
                        <IconButton
                            className={classes.deleteButton}
                            variant="contained"
                            onClick={() => {
                                const confirmMessage = "Are you sure you want to permenantly delete this encounter? This cannot be undone.";
                                if (window && window.confirm(confirmMessage)) {
                                    deleteSighting({ sighting })
                                        .then(() => {
                                            setSnackMessage(`Encounter successfully deleted from browser${sighting.dataShared ? " and flagged for deletion on shared spreadsheet!" : "!"}`)
                                        });
                                }
                            }}
                            aria-label="delete encounter"
                        >
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                </ListItemSecondaryAction>
            ) : ""}
        </ListItem>
    );
};
