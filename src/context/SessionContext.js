import React from "react";
import PropTypes from "prop-types";

import { shareSighting } from "../util/dataShare";

import AppContext from "../context/AppContext";
import LoadingContext from "../context/LoadingContext";

const LOCAL_STORAGE_KEY = "islandTrackerSession";

const getInitialSession = () => ({
    id: Math.random().toString(36).substr(2, 12),
    timestamp: Date.now(),
    sightings: [],
    residents: [],
});
function reducer(state, action) {
    switch (action.type) {
        case "trackVillager":
            return {
                ...state,
                sightings: [
                    ...state.sightings,
                    {
                        timestamp: action.payload.timestamp,
                        villager: action.payload.villager,
                        location: action.payload.location,
                    },
                ],
            };
        case "updateResident":
            const existingResident = state.residents.find(r => r.id === action.payload.id);
            return {
                ...state,
                residents: [
                    // remove existing resident if they previously lived here
                    ...state.residents.filter(r => r.id !== action.payload.id),
                    // add a clean version
                    {
                        ...existingResident,
                        ...action.payload,
                    },
                ],
            };
        case "deleteResident":
            return {
                ...state,
                residents: [...state.residents.filter(r => r.id !== action.payload)],
            };
        case "reset":
            return getInitialSession();
        default:
            throw new Error();
    }
}
const initialState = {
    ...getInitialSession(),
    currentResidents: [],
    pastResidents: [],
    getCurrentResidents: () => {},
    getPastResidents: () => {},
    addResident: resident => {},
    removeResident: resident => {},
    nukeResident: resident => {},
    trackVillager: opts => {},
    resetSessionData: () => {},
};
const SessionContext = React.createContext(initialState);
export const SessionProvider = ({ children }) => {
    const { allowDataShare } = React.useContext(AppContext);
    const { setLoading } = React.useContext(LoadingContext);
    const localStateString = window && window.localStorage.getItem(LOCAL_STORAGE_KEY);
    const localState = localStateString && JSON.parse(localStateString);
    const initialSession = getInitialSession();
    const [state, dispatch] = React.useReducer(reducer, {
        ...initialSession,
        ...localState,
    });
    React.useEffect(() => {
        window && window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
    }, [state]);
    const currentResidents = state.residents.filter(r => !r.moveOutTimestamp);
    const pastResidents = state.residents.filter(r => r.moveOutTimestamp);
    return (
        <SessionContext.Provider
            value={{
                sightings: state.sightings,
                currentResidents,
                pastResidents,
                resetSessionData: () => {
                    dispatch({ type: "reset" });
                },
                addResident: (resident, type="current") => {
                    return new Promise((resolve, reject) => {
                        if (type === "current" && currentResidents.length >= 10) {
                            return reject("You already have the max number of residents.");
                        }
                        const existingResident = state.residents.find(r => r.id === resident.id);
                        if (type === "current" && existingResident && !existingResident.moveOutTimestamp) {
                            return reject("That villager already lives on your island.");
                        }
                        if (type === "past" && existingResident && !existingResident.moveOutTimestamp) {
                            return reject("That villager currently lives on your island. Use the 'move out' button to add them to the list of past residents.");
                        }
                        if (type === "past" && existingResident && existingResident.moveOutTimestamp) {
                            return reject("That villager already exists in your list of past residents.");
                        }
                        dispatch({
                            type: "updateResident",
                            payload: {
                                id: resident.id,
                                name: resident.name,
                                moveInTimestamp: type === "current" ? Date.now() : null,
                                moveOutTimestamp: type === "past" ? Date.now() : null,
                            },
                        });
                        return resolve();
                    });
                },
                removeResident: resident => {
                    return new Promise((resolve, reject) => {
                        const residentToRemove = state.residents.find(r => r.id === resident.id);
                        if (!residentToRemove) {
                            return reject("That villager does not currently live on your island.");
                        }
                        dispatch({
                            type: "updateResident",
                            payload: {
                                id: resident.id,
                                moveOutTimestamp: Date.now(),
                            },
                        });
                        return resolve();
                    });
                },
                nukeResident: resident => {
                    return new Promise((resolve, reject) => {
                        const residentToRemove = state.residents.find(r => r.id === resident.id);
                        if (!residentToRemove) {
                            return reject("That villager has never lived on your island.");
                        }
                        dispatch({
                            type: "deleteResident",
                            payload: resident.id,
                        });
                        return resolve();
                    });
                },
                trackVillager: ({ villager, location }) => {
                    return new Promise((resolve, reject) => {
                        const timestamp = Date.now();
                        const updateState = () => {
                            dispatch({
                                type: "trackVillager",
                                payload: {
                                    timestamp,
                                    villager,
                                    location,
                                },
                            });
                        };
                        if (!allowDataShare) {
                            updateState();
                            return resolve();
                        }
                        setLoading(true);
                        shareSighting({
                            id: state.id,
                            timestamp,
                            villager,
                            location,
                            currentResidents,
                            pastResidents,
                        })
                            .catch(() => {
                                setLoading(false);
                                return reject();
                            })
                            .then(() => {
                                updateState();
                                setLoading(false);
                                return resolve();
                            });
                    });
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
