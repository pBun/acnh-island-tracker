import React, { useContext, useState } from 'react';
import { Button, TextField, MenuItem, FormControl, Snackbar } from '@material-ui/core';

import RecentSightings from './RecentSightings';

import SessionContext from '../context/session';

import villagerData from '../data/villagers.json';

const VILLAGERS = villagerData && villagerData.feed && villagerData.feed.entry && villagerData.feed.entry.map((v) => {
    return {
        name: v.gsx$villager.$t,
        species: v.gsx$species.$t,
        gender: v.gsx$gender.$t,
        personality: v.gsx$personality.$t,
    };
});

export default function TrackVillager() {
    const { trackVillager } = useContext(SessionContext);
    const [selectedVillager, setSelectedVillager] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    return (
        <>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    if (!selectedVillager) {
                        return setError('You must select a villager to track.');
                    }
                    trackVillager(selectedVillager)
                        .catch((err) => {
                            setError('Ajax error =(');
                        })
                        .then(() => {
                            setSelectedVillager('');
                            setError('');
                            setSuccess('Villager tracked successfully!');
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
                <div>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disableElevation
                    >
                        Submit
                    </Button>
                </div>
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
