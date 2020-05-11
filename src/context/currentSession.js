import React from "react";
import PropTypes from "prop-types";

import { shareSighting } from "../util/dataShare";

import useCurrentTime from "../hooks/useCurrentTime";

import AppContext from "./app";

const LOCAL_STORAGE_KEY = "islandTrackerSession";

const getInitialSession = () => ({
    id: Math.random().toString(36).substr(2, 12),
    timestamp: Date.now(),
    islandOffset: null,
    sightings: [],
});
function reducer(state, action) {
    switch (action.type) {
        case "setIslandOffset":
            const { islandOffset } = action.payload;
            return {
                ...state,
                islandOffset,
            };
        case "trackVillager":
            return {
                ...state,
                sightings: [
                    ...state.sightings,
                    {
                        timestamp: action.payload.timestamp,
                        villager: action.payload.villager,
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
    setIslandOffset: opts => {},
    trackVillager: opts => {},
    resetSessionData: () => {},
    getPrettyIslandTime: () => {},
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
        currentIslandTimestamp,
        getPrettyIslandTime,
    } = useCurrentTime(state.islandOffset);
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
                currentIslandTimestamp,
                getPrettyIslandTime,
                setIslandOffset: ({ islandOffset }) => {
                    dispatch({
                        type: "setIslandOffset",
                        payload: {
                            islandOffset,
                        },
                    });
                },
                resetSessionData: () => {
                    dispatch({ type: "reset" });
                },
                trackVillager: ({ villager }) => {
                    return new Promise((resolve, reject) => {
                        const timestamp = Date.now();
                        const updateState = () => {
                            dispatch({
                                type: "trackVillager",
                                payload: {
                                    timestamp,
                                    villager,
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
                            islandOffset: state.islandOffset,
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
