import React, { useContext, useState } from 'react';
import { Fade, ButtonGroup, Button, TextField, MenuItem, FormControl, Snackbar, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import RecentSightings from './RecentSightings';

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
}));

export default function TrackVillager() {
    const classes = useStyles();
    const { trackVillager } = useContext(SessionContext);
    const [selectedVillager, setSelectedVillager] = useState('');
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
                    trackVillager({ villager: selectedVillager })
                        .catch((err) => {
                            setError('Ajax error =(');
                            setLoading(false);
                        })
                        .then(() => {
                            setSelectedVillager('');
                            setError('');
                            setSuccess('Villager tracked successfully!');
                            setLoading(false);
                        });
                }}
            >
                <FormControl
                    fullWidth={true}
                    margin={'normal'}
                >
                    <TextField
                        id="select"
                        label="Villager"
                        required={true}
                        select
                        value={selectedVillager}
                        onChange={(e, child) => {
                            setError('');
                            setSelectedVillager(child.key);
                        }}
                        error={!!error}
                    >
                        {VILLAGERS.map(villager => (
                            <MenuItem
                                key={villager.name}
                                value={villager.name}
                            >
                                {villager.name}
                            </MenuItem>
                        ))}
                    </TextField>
                </FormControl>
                <ButtonGroup fullWidth={true}>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={loading}
                        disableElevation
                    >
                        <Fade in={!loading}><span>Track</span></Fade>
                        {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                    </Button>
                </ButtonGroup>
            </form>
            <RecentSightings />
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
