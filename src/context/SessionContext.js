import React from "react";
import PropTypes from "prop-types";

import { shareSighting } from "../util/dataShare";

import AppContext from "../context/AppContext";
import LoadingContext from "../context/LoadingContext";

import { SESSION_VERSION, generateRandomId, healSessionShape } from "../util/session";

export const LOCAL_STORAGE_KEY = "islandTrackerSession";

// INTIAL STATE/SESSION
function getInitialSession() {
    return {
        id: generateRandomId(),
        version: SESSION_VERSION,
        timestamp: Date.now(),
        sightings: [],
        residents: [],
    };
}
const initialState = {
    session: getInitialSession(),
    currentResidents: [],
    pastResidents: [],
    getCurrentResidents: () => {},
    getPastResidents: () => {},
    addResident: resident => {},
    removeResident: resident => {},
    nukeResident: resident => {},
    trackVillager: opts => {},
    deleteSighting: opts => {},
    resetSessionData: () => {},
};

// REDUCER
const ACTIONS = {
    ADD_SIGHTING: "ADD_SIGHTING",
    DELETE_SIGHTING: "DELETE_SIGHTING",
    MOVE_IN_RESIDENT: "MOVE_IN_RESIDENT",
    MOVE_OUT_RESIDENT: "MOVE_OUT_RESIDENT",
    DELETE_RESIDENT: "DELETE_RESIDENT_HISTORY",
    RESET_SESSION: "RESET_SESSION",
    OVERRIDE_SESSION: "OVERRIDE_SESSION",
};
function reducer(session, action) {
    switch (action.type) {
        case ACTIONS.ADD_SIGHTING:
            return {
                ...session,
                sightings: [
                    ...session.sightings,
                    {
                        id: generateRandomId(),
                        timestamp: action.payload.timestamp,
                        villager: {
                            id: action.payload.villager.id,
                            name: action.payload.villager.name,
                        },
                        type: action.payload.type,
                        dataShared: action.payload.dataShared,
                    },
                ],
            };
        case ACTIONS.DELETE_SIGHTING:
            return {
                ...session,
                sightings: [...session.sightings.filter(s => s.id !== action.payload.id)],
            };
        case ACTIONS.MOVE_IN_RESIDENT:
            return {
                ...session,
                residents: [
                    ...session.residents.filter(r => r.villager.id !== action.payload.villager.id),
                    {
                        id: generateRandomId(),
                        villager: {
                            id: action.payload.villager.id,
                            name: action.payload.villager.name,
                        },
                        // existing resident
                        ...session.residents
                            .find(r => r.villager.id === action.payload.villager.id),
                        moveInTimestamp: Date.now(),
                        moveOutTimestamp: null,
                    },
                ],
            };
        case ACTIONS.MOVE_OUT_RESIDENT:
            return {
                ...session,
                residents: [
                    ...session.residents.filter(r => r.villager.id !== action.payload.villager.id),
                    {
                        id: generateRandomId(),
                        villager: {
                            id: action.payload.villager.id,
                            name: action.payload.villager.name,
                        },
                        moveInTimestamp: null,
                        // existing resident
                        ...session.residents
                            .find(r => r.villager.id === action.payload.villager.id),
                        moveOutTimestamp: Date.now(),
                    },
                ],
            };
        case ACTIONS.DELETE_RESIDENT:
            return {
                ...session,
                residents: [...session.residents.filter(r => r.villager.id !== action.payload.villager.id)],
            };
        case ACTIONS.OVERRIDE_SESSION:
            return action.payload;
        case ACTIONS.RESET_SESSION:
            return {
                ...getInitialSession(),
                id: session.id,
            };
        default:
            throw new Error();
    }
}

const SessionContext = React.createContext(initialState);
export const SessionProvider = ({ children }) => {
    const { allowDataShare } = React.useContext(AppContext);
    const { setLoading } = React.useContext(LoadingContext);

    const initialSession = getInitialSession();
    const [session, dispatch] = React.useReducer(reducer, initialSession);

    const currentResidents = React.useMemo(
        () => session.residents.filter(r => !r.moveOutTimestamp),
        [session.residents],
    );
    const pastResidents = React.useMemo(
        () => session.residents.filter(r => r.moveOutTimestamp),
        [session.residents],
    );
    const sendSighting = React.useCallback(({ sighting, deletion }) => {
        return new Promise((resolve, reject) => {
            setLoading(true);
            return shareSighting({
                sessionId: session.id,
                sighting,
                currentResidents,
                pastResidents,
                deletion,
            })
                .catch((err) => {
                    console.log(err);
                    setLoading(false);
                    return reject(typeof err === 'string' && err);
                })
                .then(() => {
                    setLoading(false);
                    return resolve();
                });
        });
    }, [setLoading, session.id, currentResidents, pastResidents]);

    React.useEffect(() => {
        // local storage stuff and session state initial value needs to happen client side
        const localStateString = window && window.localStorage.getItem(LOCAL_STORAGE_KEY);
        if (!localStateString) return;
        const localState = localStateString && healSessionShape(JSON.parse(localStateString));
        dispatch({
            type: ACTIONS.OVERRIDE_SESSION,
            payload: {
                ...localState,
            },
        });
    }, []);

    // update local storage whenever there is a change to session
    React.useEffect(() => {
        window && window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(session));
    }, [session]);

    return (
        <SessionContext.Provider
            value={{
                session,
                currentResidents,
                pastResidents,
                resetSessionData: () => {
                    dispatch({ type: ACTIONS.RESET_SESSION });
                },
                overrideSessionData: (session) => {
                    dispatch({ type: ACTIONS.OVERRIDE_SESSION, payload: session });
                },
                moveInResident: (villager) => {
                    return new Promise((resolve, reject) => {
                        const existingResident = session.residents.find(r => r.villager.id === villager.id);
                        if (existingResident && !existingResident.moveOutTimestamp) {
                            return reject(`${villager.name} already lives on your island.`);
                        }
                        if (currentResidents.length >= 10) {
                            return reject("You already have the max number of residents.");
                        }
                        dispatch({
                            type: ACTIONS.MOVE_IN_RESIDENT,
                            payload: { villager },
                        });
                        return resolve();
                    });
                },
                moveOutResident: (villager) => {
                    return new Promise((resolve, reject) => {
                        const existingResident = session.residents.find(r => r.villager.id === villager.id);
                        if (existingResident && existingResident.moveOutTimestamp) {
                            return reject(`${villager.name} already exists in your list of past residents.`);
                        }
                        dispatch({
                            type: ACTIONS.MOVE_OUT_RESIDENT,
                            payload: { villager },
                        });
                        return resolve();
                    });
                },
                deleteResident: (villager) => {
                    return new Promise((resolve, reject) => {
                        const residentToRemove = session.residents.find(r => r.villager.id === villager.id);
                        if (!residentToRemove) {
                            return reject(`${villager.name} has never lived on your island.`);
                        }
                        dispatch({
                            type: ACTIONS.DELETE_RESIDENT,
                            payload: { villager },
                        });
                        return resolve();
                    });
                },
                addSighting: ({ villager, type }) => {
                    return new Promise((resolve, reject) => {
                        const addSightingToSession = (sighting) => {
                            dispatch({
                                type: ACTIONS.ADD_SIGHTING,
                                payload: sighting,
                            });
                        };
                        const sighting = {
                            timestamp: Date.now(),
                            dataShared: allowDataShare,
                            villager,
                            type,
                        };
                        if (!allowDataShare) {
                            addSightingToSession(sighting);
                            return resolve();
                        }
                        return sendSighting({ sighting })
                            .catch((err) => {
                                return reject("There was an error communicating with the sheet.");
                            })
                            .then(() => {
                                addSightingToSession(sighting);
                                return resolve();
                            });
                    });
                },
                deleteSighting: ({ sighting }) => {
                    return new Promise((resolve, reject) => {
                        const removeSightingFromSession = (sighting) => {
                            dispatch({
                                type: ACTIONS.DELETE_SIGHTING,
                                payload: sighting,
                            });
                        };
                        if (!sighting.dataShared) {
                            removeSightingFromSession(sighting);
                            return resolve();
                        }
                        sendSighting({ sighting, deletion: true })
                            .catch(reject)
                            .then(() => {
                                removeSightingFromSession(sighting);
                                return resolve();
                            });
                    });
                },
                getSessionCode: () => {
                    return JSON.stringify(session);
                },
            }}
        >
            {children}
        </SessionContext.Provider>
    );
};

SessionProvider.defaultProps = {
    children: [],
};

SessionProvider.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

export default SessionContext;
