import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";

import AppContext, { MODALS } from "../context/AppContext";
import LoadingContext from "../context/LoadingContext";
import SessionContext from "../context/SessionContext";

import GenericModal from "../components/GenericModal";
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

export default function EncounterModal(props) {
    const classes = useStyles();
    const { setLoading } = React.useContext(LoadingContext);
    const { addSighting } = React.useContext(SessionContext);
    const {
        allowDataShare,
        setAllowDataShare,
        trackingPreference,
        setTrackingPreference,
        modalOpen,
        setModalOpen,
        setSnackMessage,
    } = React.useContext(AppContext);
    const [selectedVillager, setSelectedVillager] = React.useState(null);
    const [error, setError] = React.useState(null);
    const handleConfirm = React.useCallback(() => {
        if (!selectedVillager) {
            setError("Please select a villager");
            return;
        }
        setLoading(true);
        addSighting({
            villager: selectedVillager,
            type: trackingPreference,
        }).then(() => {
            setSnackMessage(`${selectedVillager.name} successfully tracked!`);
            setLoading(false);
            setSelectedVillager(null);
        }).catch(err => {
            setSnackMessage(err);
            setLoading(false);
        });
    }, [selectedVillager, setLoading, addSighting, setSnackMessage, trackingPreference]);
    return (
        <GenericModal
            title="Track Encounter"
            handleConfirm={handleConfirm}
            confirmText="Track"
            open={modalOpen === MODALS.TRACK_ENCOUNTER}
            handleCancel={() => {
                setModalOpen(null);
                setSelectedVillager(null);
                setError(null);
            }}
        >
            <>
                <FormControl component="fieldset">
                    <FormLabel component="legend" className={classes.radioGroupLabel}>
                        Encounter Location
                    </FormLabel>
                    <RadioGroup
                        aria-label="encounter type"
                        name="encounter-type"
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
                    onChange={(e, newVal) => {
                        setSelectedVillager(newVal);
                        setError("");
                    }}
                    className={classes.combobox}
                    error={error}
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
            </>
        </GenericModal>
    );
}
