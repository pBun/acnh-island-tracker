import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Avatar from "@material-ui/core/Avatar";
import ListSubheader from "@material-ui/core/ListSubheader";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

import useVillagers from "../hooks/useVillagers";
import SessionContext from "../context/currentSession";
import VilagerCombobox from "../components/VillagerCombobox";
import Page from "../components/Page";

const NUM_CUR_RESIDENTS = 10;

const useStyles = makeStyles(theme => ({
    intro: {
        margin: theme.spacing(2, 5, 2),
    },
    listTitle: {
        margin: theme.spacing(3, 5, 0),
    },
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
    removeButton: {
        color: theme.palette.primary.main,
    },
    deleteButton: {
        color: theme.palette.error.main,
    },
    combobox: {
        width: "100%",
    },
    controlsContainer: {
        padding: theme.spacing(4, 5, 2),
    },
    submitButton: {
        marginTop: theme.spacing(2),
    },
}));
const useEmptySlotStyles = makeStyles(theme => ({
    primaryText: {
        color: theme.palette.text.secondary,
    },
    secondaryText: {
        color: theme.palette.text.hint,
    },
    avatar: {
        backgroundColor: theme.palette.text.hint,
    },
}));

const ResidentListItem = props => {
    // const classes = useStyles();
    const { villager, secondaryAction, ...otherProps } = props;
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
                primary={villager.name}
                secondary={`${villager.personality} ${villager.species}`}
            />
            <ListItemSecondaryAction>
                {secondaryAction}
            </ListItemSecondaryAction>
        </ListItem>
    );
};
const EmptySlotListItem = props => {
    const classes = useEmptySlotStyles();
    return (
        <ListItem
            {...props}
        >
            <ListItemAvatar>
                <Avatar className={classes.avatar} alt="Empty" />
            </ListItemAvatar>
            <ListItemText
                primary="Empty Slot"
                secondary="N/A"
                primaryTypographyProps={{
                    className: classes.primaryText,
                }}
                secondaryTypographyProps={{
                    className: classes.secondaryText,
                }}
            />
        </ListItem>
    );
};

const ButtonTooltip = withStyles(theme => ({
    tooltip: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        boxShadow: 0,
        fontSize: theme.typography.fontSize,
    },
}))(Tooltip);

export default function ResidentsPage() {
    const classes = useStyles();
    const { session, addResident, removeResident, nukeResident } = React.useContext(SessionContext);
    const { allVillagers } = useVillagers();
    const [selectedVillager, setSelectedVillager] = React.useState(null);
    const [error, setError] = React.useState('');

    const currentResidents = session.residents.filter(r => !r.moveOutTimestamp);
    const pastResidents = session.residents.filter(r => !!r.moveOutTimestamp);
    const numEmptyPlots = NUM_CUR_RESIDENTS - currentResidents.length;
    return (
        <Page title="Your Residents">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    if (!selectedVillager) return;
                    addResident(selectedVillager)
                        .catch(err => setError(err))
                        .then(() => {
                            setSelectedVillager(null);
                        });
                }}
            >
                <div className={classes.controlsContainer}>
                    <VilagerCombobox
                        value={selectedVillager}
                        onChange={(e, newVal) => {
                            setSelectedVillager(newVal);
                            setError('');
                        }}
                        className={classes.combobox}
                        error={error}
                    />
                    <Button
                        className={classes.submitButton}
                        type="submit"
                        color="primary"
                        startIcon={(<PersonAddIcon />)}
                    >
                        Add resident
                    </Button>
                </div>
            </form>
            <List className={classes.list}>
                <ListSubheader className={classes.listSubheader}>
                    Current Residents ({currentResidents.length} / {NUM_CUR_RESIDENTS})
                </ListSubheader>
                {currentResidents.map(resident => {
                    const villager = allVillagers.find(v => v.id === resident.id);
                    return (
                        <ResidentListItem
                            key={villager.id}
                            className={classes.listItem}
                            villager={villager}
                            timestamp={resident.moveInTimestamp}
                            secondaryAction={(
                                <ButtonTooltip title="Farewell" placement="top">
                                    <IconButton
                                        className={classes.removeButton}
                                        variant="contained"
                                        onClick={() => {
                                            removeResident(villager);
                                        }}
                                        aria-label="remove villager from island"
                                    >
                                        <ExitToAppIcon />
                                    </IconButton>
                                </ButtonTooltip>
                            )}
                        />
                    );
                })}
                {Array.from(new Array(numEmptyPlots).keys()).map((i) => (
                    <EmptySlotListItem
                        key={`empty_${i}`}
                        className={classes.listItem}
                    />
                ))}
                {pastResidents.filter(r => !!r.moveOutTimestamp).length ? (
                    <>
                        <ListSubheader className={classes.listSubheader}>
                            Past Residents
                        </ListSubheader>
                        {pastResidents.map(resident => {
                            const villager = allVillagers.find(v => v.id === resident.id);
                            return (
                                <ResidentListItem
                                    key={villager.id}
                                    className={classes.listItem}
                                    villager={villager}
                                    timstamp={resident.moveOutTimestamp}
                                    secondaryAction={(
                                        <ButtonTooltip title="Delete memories" placement="top">
                                            <IconButton
                                                className={classes.deleteButton}
                                                variant="contained"
                                                onClick={() => {
                                                    const confirmMessage = `Are you sure you want to remove all history of ${villager.name} from your island? This cannot be undone.`;
                                                    if (window && window.confirm(confirmMessage)) {
                                                        nukeResident(villager);
                                                    }
                                                }}
                                                aria-label="delete all history of resident"
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </ButtonTooltip>
                                    )}
                                />
                            );
                        })}
                    </>
                ) : ''}
            </List>
        </Page>
    );
}
