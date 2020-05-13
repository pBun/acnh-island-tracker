import React from "react";
import { Link } from "gatsby";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
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
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import useVillagers from "../hooks/useVillagers";
import SessionContext from "../context/SessionContext";
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
        color: theme.palette.text.secondary,
        fontWeight: 500,
    },
    removeButton: {
        color: theme.palette.primary.main,
    },
    deleteButton: {
        color: theme.palette.error.main,
    },
    combobox: {
        width: "100%",
        marginTop: theme.spacing(3),
    },
    controlsContainer: {
        padding: theme.spacing(0, 5, 2),
    },
    submitButton: {
        margin: theme.spacing(1, 0, 1),
        padding: theme.spacing(0.667, 3.5),
    },
    radioControl: {
        width: "100%",
    },
    radioGroupLabel: {
        marginBottom: theme.spacing(1),
        fontSize: "0.9rem",
        position: "absolute",
        overflow: "hidden",
        textIndent: "-1000px",
    },
    radioGroup: {
        flexDirection: "row",
    },
    radioLabel: {
        "& .MuiFormControlLabel-label": {
            ...theme.typography.body2,
        },
    },
    secondaryAction: {
        right: theme.spacing(4),
    },
    form: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(0),
    },
    nestedControls: {
        padding: theme.spacing(0.5, 0, 0),
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
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
    const classes = useStyles();
    const { villager, secondaryAction, ...otherProps } = props;
    return (
        <ListItem button component={Link} to={`/villagers/${villager.id}/`} {...otherProps}>
            <ListItemAvatar>
                <Avatar alt={villager.name} src={villager.icon} />
            </ListItemAvatar>
            <ListItemText
                primary={villager.name}
                secondary={`${villager.personality} ${villager.species}`}
            />
            <ListItemSecondaryAction className={classes.secondaryAction}>
                {secondaryAction}
            </ListItemSecondaryAction>
        </ListItem>
    );
};
const EmptySlotListItem = props => {
    const classes = useEmptySlotStyles();
    return (
        <ListItem {...props}>
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
    const {
        currentResidents,
        pastResidents,
        addResident,
        addPastResident,
        removeResident,
        nukeResident,
    } = React.useContext(SessionContext);
    const { allVillagers } = useVillagers();
    const [selectedVillager, setSelectedVillager] = React.useState(null);
    const [typeOfResident, setTypeOfResident] = React.useState("current");
    const [error, setError] = React.useState("");

    const numEmptyPlots = NUM_CUR_RESIDENTS - currentResidents.length;
    return (
        <Page title="My Residents">
            <form
                className={classes.form}
                onSubmit={e => {
                    e.preventDefault();
                    if (!selectedVillager) return;
                    addResident(selectedVillager, typeOfResident)
                        .catch(err => setError(err))
                        .then(() => {
                            setSelectedVillager(null);
                        });
                }}
            >
                <Typography variant="body2" component="h2" className={classes.listSubheader}>
                    Add resident
                </Typography>
                <div className={classes.controlsContainer}>
                    <VilagerCombobox
                        value={selectedVillager}
                        onChange={(e, newVal) => {
                            setSelectedVillager(newVal);
                            setError("");
                        }}
                        className={classes.combobox}
                        error={error}
                    />
                    <div className={classes.nestedControls}>
                        <FormControl component="fieldset" className={classes.radioControl}>
                            <FormLabel component="legend" className={classes.radioGroupLabel}>
                                Type of resident
                            </FormLabel>
                            <RadioGroup
                                className={classes.radioGroup}
                                aria-label="type of resident"
                                name="tracking-location"
                                value={typeOfResident}
                                onChange={e => setTypeOfResident(e.target.value)}
                                defaultValue="current"
                            >
                                <FormControlLabel
                                    className={classes.radioLabel}
                                    value="current"
                                    control={<Radio color="primary" />}
                                    label="Current resident"
                                />
                                <FormControlLabel
                                    className={classes.radioLabel}
                                    value="past"
                                    control={<Radio color="primary" />}
                                    label="Past resident"
                                />
                            </RadioGroup>
                        </FormControl>
                        <Button
                            className={classes.submitButton}
                            type="submit"
                            color="primary"
                            variant="contained"
                            startIcon={<PersonAddIcon />}
                            disableElevation
                        >
                            Add
                        </Button>
                    </div>
                </div>
            </form>
            <List className={classes.list}>
                <ListSubheader className={classes.listSubheader} variant="h5">
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
                            secondaryAction={
                                <ButtonTooltip title="Move out" placement="top">
                                    <IconButton
                                        className={classes.removeButton}
                                        variant="contained"
                                        onClick={() => {
                                            const confirmMessage = `Are you sure you want to remove ${villager.name} from your island?`;
                                            if (window && window.confirm(confirmMessage)) {
                                                removeResident(villager);
                                            }
                                        }}
                                        aria-label="remove villager from island"
                                    >
                                        <ExitToAppIcon />
                                    </IconButton>
                                </ButtonTooltip>
                            }
                        />
                    );
                })}
                {Array.from(new Array(numEmptyPlots).keys()).map(i => (
                    <EmptySlotListItem key={`empty_${i}`} className={classes.listItem} />
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
                                    secondaryAction={
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
                                    }
                                />
                            );
                        })}
                    </>
                ) : (
                    ""
                )}
            </List>
        </Page>
    );
}
