import PropTypes from "prop-types";

import { getSightings } from "../util/dataShare";

import { VILLAGERS_MINIMAL, villagerShape  } from "../util/villager";

export const SESSION_VERSION = 1;
export const SIGHTING_TYPES = ['mystery-island', 'campsite'];

// SHAPES
export const sightingShape = PropTypes.shape({
    id: PropTypes.string.isRequired,
    timestamp: PropTypes.number.isRequired,
    villager: PropTypes.shape(villagerShape).isRequired,
    type: PropTypes.oneOf(SIGHTING_TYPES).isRequired,
    dataShared: PropTypes.bool.isRequired,
});
export const residentShape = PropTypes.shape({
    id: PropTypes.string.isRequired,
    villager: PropTypes.shape(villagerShape).isRequired,
    moveInTimestamp: PropTypes.number,
    moveOutTimestamp: PropTypes.number,
});
export const sessionShape = PropTypes.shape({
    id: PropTypes.string.isRequired,
    sightings: PropTypes.arrayOf(sightingShape).isRequired,
    residents: PropTypes.arrayOf(residentShape).isRequired,
    version: PropTypes.number,
    timestamp: PropTypes.number,
});

// HELPERS
export function generateRandomId() {
    return `${Math.random().toString(36).substr(2, 9)}${Math.random().toString(36).substr(2, 9)}`;
}
export function healSessionShape(session) {
    if (session.version >= SESSION_VERSION) return session;
    return {
        id: session.id || generateRandomId(),
        version: 1,
        timestamp: session.timestamp,
        sightings: session.sightings.map(s => ({
            id: s.id || generateRandomId(),
            timestamp: s.timestamp,
            villager: VILLAGERS_MINIMAL.find(v => v.name === s.villager),
            type: s.location || "mystery-island",
            dataShared: !!s.dataShared,
        })),
        residents: session.residents.map(r => ({
            id: generateRandomId(),
            villager: VILLAGERS_MINIMAL.find(v => v.name === r.name),
            moveInTimestamp: r.moveInTimestamp,
            moveOutTimestamp: r.moveOutTimestamp,
        })),
    };
}

export function fetchRawSightings(targetSessionId) {
    return new Promise((resolve, reject) => {
        getSightings().then((data) => {
            if (!data || !data.feed || !data.feed.entry) {
                return reject('No spreadsheet data found.');
            }
            const sightings = data.feed.entry
                .filter(d => d.gsx$sessionid.$t === targetSessionId);
            if (!sightings || !sightings.length) {
                return reject(`No sightings found for session ${targetSessionId}.`);
            }
            resolve(sightings);
        });
    });
}

export function formatRawSightings(rawSightings) {
    return rawSightings.map(d => ({
        id: generateRandomId(),
        timestamp: (new Date(d.gsx$timestamp.$t)).getTime(),
        villager: VILLAGERS_MINIMAL.find(v => v.name === d.gsx$villager.$t),
        type: d.gsx$spawntype.$t,
        dataShared: false,
    }));
}

export function formatRawSightingResidents(rawSighting) {
    const currentResidentNames = rawSighting.gsx$currentresidents
        && rawSighting.gsx$currentresidents.$t
        ? rawSighting.gsx$currentresidents.$t.split(',')
        : [];
    const pastResidentNames = rawSighting.gsx$pastresidents
        && rawSighting.gsx$pastresidents.$t
        ? rawSighting.gsx$pastresidents.$t.split(',')
    : [];
    const currentResidents = currentResidentNames.map((residentId) => ({
        id: generateRandomId(),
        villager: VILLAGERS_MINIMAL.find(v => v.id === residentId),
        moveInTimestamp: Date.now(),
        moveOutTimestamp: null,
    }));
    const pastResidents = pastResidentNames.map((residentId) => ({
        id: generateRandomId(),
        villager: VILLAGERS_MINIMAL.find(v => v.id === residentId),
        moveInTimestamp: Date.now(),
        moveOutTimestamp: Date.now(),
    }));
    return [
        ...currentResidents,
        ...pastResidents,
    ];
}

export function encodeSession(session) {
    return btoa(JSON.stringify(session));
}

export function decodeSessionCode(sessionCode) {
    const rawSession = JSON.parse(atob(sessionCode));
    const session = healSessionShape(rawSession);
    return session;
}
