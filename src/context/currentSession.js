import React, {
    createContext,
    useReducer,
    useEffect,
} from 'react';
import queryString from 'query-string';
import { format } from 'date-fns';
import PropTypes from 'prop-types';

const LOCAL_STORAGE_KEY = 'islandTrackerSession';
const SHEET_URL = 'https://script.google.com/macros/s/AKfycbw_4jsHZE4PkIePUPbzPAlzzcXEeWibBltRUzeLu0zpztsVAEg/exec';

const getInitialSession = () => ({
    id: Math.random().toString(36).substr(2, 12),
    timestamp: null,
    islandOffset: 0,
    sightings: [],
});

function reducer(state, action) {
    switch (action.type) {
        case 'setIslandOffset':
            const { islandOffset } = action.payload;
            return {
                ...state,
                islandOffset,
            };
        case 'trackVillager':
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
        case 'reset':
            return getInitialSession();
        default:
            throw new Error();
    }
}
const initialState = {
    session: getInitialSession(),
    setIslandOffset: (opts) => {},
    trackVillager: (opts) => {},
    resetSession: () => {},
};
const SessionContext = createContext(initialState);
export const SessionProvider = ({ children }) => {
    const localStateString = window && window.localStorage.getItem(LOCAL_STORAGE_KEY);
    const localState = localStateString && JSON.parse(localStateString);
    const [state, dispatch] = useReducer(reducer, localState || getInitialSession());
    useEffect(() => {
        window && window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
    }, [state]);
    return (
        <SessionContext.Provider
            value={{
                session: state,
                setIslandOffset: ({ islandOffset }) => {
                    dispatch({
                        type: 'setIslandOffset',
                        payload: {
                            islandOffset,
                        },
                    });
                },
                resetSession: () => {
                    dispatch({ type: 'reset' });
                },
                trackVillager: ({ villager }) => {
                    return new Promise((resolve, reject) => {
                        const timestamp = Date.now();
                        const qs = queryString.stringify({
                            timestamp: encodeURIComponent(format(timestamp, 'MM/dd/yyyy hh:mm:ss')),
                            'island_timestamp': encodeURIComponent(format(timestamp + state.islandOffset, 'MM/dd/yyyy hh:mm:ss')),
                            villager: encodeURIComponent(villager),
                            'session_id': encodeURIComponent(state.id),
                        });
                        var request = new XMLHttpRequest();
                        request.open('GET', `${SHEET_URL}?${qs}`, true);
                        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
                        request.onload = function() {
                            if (this.status < 200 || this.status > 400) return reject();
                            dispatch({
                                type: 'trackVillager',
                                payload: {
                                    timestamp,
                                    villager,
                                }
                            });
                            resolve();
                        }
                        request.onerror = function() {
                            reject();
                        }
                        request.send();
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
