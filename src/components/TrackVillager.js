import React, { useContext, useState } from 'react';
import { Typography, InputLabel, Select, FormHelperText, Fade, ButtonGroup, Button, TextField, MenuItem, FormControl, Snackbar, CircularProgress } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import PublishIcon from '@material-ui/icons/Publish';
import { makeStyles } from '@material-ui/core/styles';

import SessionContext from '../context/currentSession';

import villagerData from '../data/villagers.json';

const VILLAGERS = villagerData && villagerData.feed && villagerData.feed.entry && villagerData.feed.entry.map((v) => {
    return {
        name: v.gsx$villager.$t,
        species: v.gsx$species.$t,
        gender: v.gsx$gender.$t,
        personality: v.gsx$personality.$t,
    };
});

const useStyles = makeStyles((theme) => ({
    buttonProgress: {
        color: 'rgba(0, 0, 0, 0.54)',
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
    formControl: {
        margin: theme.spacing(1),
        display: 'flex',
    },
    label: {
        backgroundColor: 'white',
    },
    formInner: {
        display: 'flex',
        width: '100%',
    },
    comboBox: {
        borderRadius: '4px 0 0 4px',
    },
    btn: {
        borderRadius: '0 4px 4px 0',
    }
}));

export default function TrackVillager() {
    const classes = useStyles();
    const { trackVillager } = useContext(SessionContext);
    const [selectedVillager, setSelectedVillager] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    return (
        <>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    if (!selectedVillager) {
                        return setError('You must select a villager to track.');
                    }
                    setLoading(true);
                    trackVillager({ villager: selectedVillager.name })
                        .catch((err) => {
                            setError('Ajax error =(');
                            setLoading(false);
                        })
                        .then(() => {
                            setSelectedVillager(null);
                            setError('');
                            setSuccess('Villager tracked successfully!');
                            setLoading(false);
                        });
                }}
            >
                <div className={classes.formInner}>
                    <Autocomplete
                        id="villager-combobox"
                        className={classes.comboBox}
                        error={error}
                        disabled={loading}
                        disableClearable
                        options={VILLAGERS.sort((a, b) => -b.species.localeCompare(a.species))}
                        getOptionLabel={(option) => option.name}
                        groupBy={(option) => option.species}
                        style={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="Villager" variant="outlined" />}
                        value={selectedVillager}
                        onChange={(e, newVal) => {
                            setError('');
                            setSelectedVillager(newVal);
                        }}
                    />
                    <Button
                        type="submit"
                        className={classes.btn}
                        variant="contained"
                        color="primary"
                        disabled={loading}
                        disableElevation
                    >
                        <Fade in={!loading}><PublishIcon /></Fade>
                        {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                    </Button>
                </div>
            </form>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={!!success || !!error}
                autoHideDuration={6000}
                onClose={() => {
                    setSuccess('');
                    setError('');
                }}
                key={success ? 'success' : error ? 'error' : ''}
                message={success || error || ''}
            />
        </>
    );
}
