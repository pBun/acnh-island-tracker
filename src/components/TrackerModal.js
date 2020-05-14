import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";

import AppContext from "../context/AppContext";

import ChatStyleHeadline from "../components/ChatStyleHeadline";
import VilagerCombobox from "../components/VillagerCombobox";

const useStyles = makeStyles(theme => ({
    checkboxLabel: {
        fontSize: "0.75rem",
    },
    combobox: {
        marginTop: theme.spacing(2),
    },
    radioGroupLabel: {
        position: "absolute",
        overflow: "hidden",
        textIndent: "-1000px",
    },
    radioLabel: {
        "& .MuiFormControlLabel-label": {
            fontSize: "0.9rem",
        },
    },
}));

export default function FormModal({
    children,
    open,
    handleClockSettings,
    handleConfirm,
    handleCancel,
}) {
    const classes = useStyles();
    const {
        allowDataShare,
        setAllowDataShare,
        trackingPreference,
        setTrackingPreference,
    } = React.useContext(AppContext);
    const [selectedVillager, setSelectedVillager] = React.useState(null);
    return (
        <Dialog open={open} onClose={handleCancel} aria-labelledby="form-dialog-title">
            <ChatStyleHeadline id="form-dialog-title" component="h2">
                Track Encounter
            </ChatStyleHeadline>
            <DialogContent>
                <FormControl component="fieldset">
                    <FormLabel component="legend" className={classes.radioGroupLabel}>
                        Encounter Location
                    </FormLabel>
                    <RadioGroup
                        aria-label="tracking location"
                        name="tracking-location"
                        value={trackingPreference}
                        onChange={e => setTrackingPreference(e.target.value)}
                        defaultValue="mystery-island"
                    >
                        <FormControlLabel
                            className={classes.radioLabel}
                            value="mystery-island"
                            control={<Radio color="primary" size="small" />}
                            label={<Typography variant="body2">Mystery Island Encounter</Typography>}
                        />
                        <FormControlLabel
                            className={classes.radioLabel}
                            value="campsite"
                            control={<Radio color="primary" size="small" />}
                            label={<Typography variant="body2">Campsite Encounter</Typography>}
                        />
                    </RadioGroup>
                </FormControl>
                <VilagerCombobox
                    id="villager-to-track"
                    value={selectedVillager}
                    onChange={(e, newVal) => setSelectedVillager(newVal)}
                    className={classes.combobox}
                />
                <FormControl
                    margin="normal"
                    style={{
                        display: "block",
                    }}
                >
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={allowDataShare}
                                onChange={e => setAllowDataShare(e.target.checked)}
                                name="allowDataShare"
                                size="small"
                                color="primary"
                            />
                        }
                        label={
                            <span className={classes.checkboxLabel}>
                                Support the community by sending your villager sightings to{" "}
                                <a
                                    href="https://docs.google.com/spreadsheets/d/1p542EQ85gdgLJfjZcI3SSmTdsnZKNi6KKjjjSdGkl7Q/edit?usp=sharing"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    our spreadsheet
                                </a>
                                .
                            </span>
                        }
                    />
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={() => {
                        handleCancel();
                        setSelectedVillager(null);
                    }}
                    color="primary"
                >
                    Cancel
                </Button>
                <Button
                    disabled={!selectedVillager}
                    onClick={() => {
                        handleConfirm(selectedVillager, trackingPreference);
                        setSelectedVillager(null);
                    }}
                    color="primary"
                >
                    Track
                </Button>
            </DialogActions>
        </Dialog>
    );
}
