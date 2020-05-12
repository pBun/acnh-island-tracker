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
            const existingResident = state.residents.find(r => r.id);
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
                addResident: residentId => {
                    return new Promise((resolve, reject) => {
                        if (state.residents.length >= 10) {
                            return reject("You already have the max number of residents.");
                        }
                        const residentToUpdate = state.residents.find(r => r.id === residentId);
                        if (residentToUpdate && !residentToUpdate.moveOutTimestamp) {
                            return reject("That villager already lives on your island.");
                        }
                        dispatch({
                            type: "updateResident",
                            payload: {
                                id: residentId,
                                moveInTimestamp: Date.now(),
                                moveOutTimestamp: null,
                            },
                        });
                        return resolve();
                    });
                },
                removeResident: residentId => {
                    return new Promise((resolve, reject) => {
                        const residentToRemove = state.residents.find(
                            resident => resident.id === residentId
                        );
                        if (!residentToRemove) {
                            return reject("That villager does not currently live on your island.");
                        }
                        dispatch({
                            type: "updateResident",
                            payload: {
                                id: residentId,
                                moveOutTimestamp: Date.now(),
                            },
                        });
                        return resolve();
                    });
                },
                nukeResident: residentId => {
                    return new Promise((resolve, reject) => {
                        const residentToRemove = state.residents.find(
                            resident => resident.id === residentId
                        );
                        if (!residentToRemove) {
                            return reject("That villager has never lived on your island.");
                        }
                        dispatch({
                            type: "deleteResident",
                            payload: residentId,
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
