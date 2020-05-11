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
    const [state, dispatch] = React.useReducer(
        reducer,
        localState || getInitialSession()
    );
    const {
        currentSystemTimestamp,
        getPrettySystemTime,
    } = useCurrentTime();
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
