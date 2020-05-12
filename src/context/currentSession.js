import React from "react";
import PropTypes from "prop-types";

import { shareSighting } from "../util/dataShare";

import useCurrentTime from "../hooks/useCurrentTime";

import AppContext from "./app";

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
                residents: [
                    ...state.residents.filter(r => r.id !== action.payload),
                ],
            };
        case "reset":
            return getInitialSession();
        default:
            throw new Error();
    }
}
const initialState = {
    session: getInitialSession(),
    trackVillager: opts => {},
    resetSessionData: () => {},
    currentSystemTimestamp: null,
    getPrettySystemTime: () => {},
};
const SessionContext = React.createContext(initialState);
export const SessionProvider = ({ children }) => {
    const { allowDataShare, setLoading } = React.useContext(AppContext);
    const localStateString =
        window && window.localStorage.getItem(LOCAL_STORAGE_KEY);
    const localState = localStateString && JSON.parse(localStateString);
    const initialSession = getInitialSession();
    const [state, dispatch] = React.useReducer(reducer, {
        ...initialSession,
        ...localState,
    });
    const { currentSystemTimestamp, getPrettySystemTime } = useCurrentTime();
    React.useEffect(() => {
        window &&
            window.localStorage.setItem(
                LOCAL_STORAGE_KEY,
                JSON.stringify(state)
            );
    }, [state]);
    return (
        <SessionContext.Provider
            value={{
                session: state,
                currentSystemTimestamp,
                getPrettySystemTime,
                resetSessionData: () => {
                    dispatch({ type: "reset" });
                },
                addResident: resident => {
                    return new Promise((resolve, reject) => {
                        if (state.residents.length >= 10) {
                            return reject(
                                "You already have the max number of residents."
                            );
                        }
                        const residentToUpdate = state.residents.find(
                            r => r.id === resident.id
                        );
                        if (
                            residentToUpdate &&
                            !residentToUpdate.moveOutTimestamp
                        ) {
                            return reject(
                                "That villager already lives on your island."
                            );
                        }
                        dispatch({
                            type: "updateResident",
                            payload: {
                                id: resident.id,
                                name: resident.name,
                                moveInTimestamp: Date.now(),
                                moveOutTimestamp: null,
                            },
                        });
                        return resolve();
                    });
                },
                removeResident: resident => {
                    return new Promise((resolve, reject) => {
                        const residentToRemove = state.residents.find(
                            r => r.id === resident.id
                        );
                        if (!residentToRemove) {
                            return reject(
                                "That villager does not currently live on your island."
                            );
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
                        const residentToRemove = state.residents.find(
                            r => r.id === resident.id
                        );
                        if (!residentToRemove) {
                            return reject(
                                "That villager has never lived on your island."
                            );
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
                        const currentResidents = state.residents.filter(
                            r => !r.moveOutTimestamp
                        );
                        const pastResidents = state.residents.filter(
                            r => r.moveOutTimestamp
                        );
                        console.log(state.residents, currentResidents, pastResidents);
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
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]),
};

export default SessionContext;
