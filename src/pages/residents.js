import React from "react";
import { Link } from "gatsby";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
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

import useVillagers from "../hooks/useVillagers";
import SessionContext from "../context/SessionContext";
import VilagerCombobox from "../components/VillagerCombobox";
import Page from "../components/Page";
import SEO from "../components/SEO";

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
        backgroundColor: theme.palette.background.paper,
    },
    formTitle: {
        paddingLeft: theme.spacing(5),
        paddingRight: theme.spacing(5),
        color: theme.palette.text.secondary,
        fontWeight: 500,
        marginBottom: theme.spacing(3),
    },
    removeButton: {
        color: theme.palette.primary.main,
    },
    deleteButton: {
        color: theme.palette.error.main,
    },
    combobox: {
        width: "100%",
        marginBottom: theme.spacing(0.5),
    },
    controlsContainer: {
        padding: theme.spacing(0, 5, 2),
    },
    submitButton: {
        margin: theme.spacing(1, 0, 1),
        padding: theme.spacing(0.667, 3.5),
    },
    radioGroupLabel: {
        position: "absolute",
        overflow: "hidden",
        textIndent: "-1000px",
    },
    radioWrapper: {
        flexDirection: "row",
        justifyContent: "flex-end",
        width: "100%",
    },
    secondaryAction: {
        right: theme.spacing(4),
    },
    form: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(0),
    },
    buttonWrapper: {
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

export default function ResidentsPage(props) {
    const classes = useStyles();
    const {
        currentResidents,
        pastResidents,
        addResident,
        removeResident,
        nukeResident,
    } = React.useContext(SessionContext);
    const { allVillagers } = useVillagers();
    const [selectedVillager, setSelectedVillager] = React.useState(null);
    const [typeOfResident, setTypeOfResident] = React.useState("current");
    const [error, setError] = React.useState("");

    const numEmptyPlots = NUM_CUR_RESIDENTS - currentResidents.length;
    const pageTitle = "My Residents";
    return (
        <Page title={pageTitle}>
            <SEO title={pageTitle} pathname={props.location.pathname} />
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
                <Typography variant="body2" component="h2" className={classes.formTitle}>
                    Add Resident
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
                    <FormControl component="fieldset" className={classes.radioWrapper}>
                        <FormLabel component="legend" className={classes.radioGroupLabel}>
                            Type of resident
                        </FormLabel>
                        <RadioGroup
                            className={classes.radioWrapper}
                            aria-label="type of resident"
                            name="tracking-location"
                            value={typeOfResident}
                            onChange={e => setTypeOfResident(e.target.value)}
                            defaultValue="current"
                        >
                            <FormControlLabel
                                className={classes.radioLabel}
                                value="current"
                                control={<Radio color="primary" size="small" />}
                                label={<Typography variant="body2">Current resident</Typography>}
                            />
                            <FormControlLabel
                                className={classes.radioLabel}
                                value="past"
                                control={<Radio color="primary" size="small" />}
                                label={<Typography variant="body2">Past resident</Typography>}
                            />
                        </RadioGroup>
                    </FormControl>
                    <div className={classes.buttonWrapper}>
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
                <div>
                    {currentResidents.map(resident => {
                        const villager = allVillagers.find(v => v.id === resident.id);
                        return (
                            <ResidentListItem
                                key={`${villager.id}_currentResident`}
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
                </div>
                <div>
                    {Array.from(new Array(numEmptyPlots).keys()).map(i => (
                        <EmptySlotListItem key={`empty_${i}`} className={classes.listItem} />
                    ))}
                </div>
                <div>
                    {pastResidents.length ? (
                        <>
                            <ListSubheader className={classes.listSubheader}>
                                {`Past Residents (${pastResidents.length})`}
                            </ListSubheader>
                            {pastResidents.map(resident => {
                                const villager = allVillagers.find(v => v.id === resident.id);
                                return (
                                    <ResidentListItem
                                        key={`${villager.id}_pastResident`}
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
                </div>
            </List>
        </Page>
    );
}
