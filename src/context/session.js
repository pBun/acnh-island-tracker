import React, {
    createContext,
    useReducer,
} from 'react';
import queryString from 'query-string';
import { format } from 'date-fns';
import PropTypes from 'prop-types';

const SHEET_URL = 'https://script.google.com/macros/s/AKfycbw_4jsHZE4PkIePUPbzPAlzzcXEeWibBltRUzeLu0zpztsVAEg/exec';

const initialSession = {
    id: null,
    timestamp: null,
    islandOffset: 0,
    sightings: [],
};

function reducer(state, action) {
    switch (action.type) {
        case 'initialize':
            const timestamp = Date.now();
            const { islandTimestamp, id } = action.payload;
            const islandOffset = islandTimestamp ? islandTimestamp - timestamp : 0;
            return {
                id,
                timestamp,
                islandOffset,
                sightings: [],
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
        default:
            throw new Error();
    }
}

const SessionContext = createContext();
export const SessionProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialSession);
    return (
        <SessionContext.Provider
            value={{
                session: state,
                initialize: (id, islandTimestamp) => {
                    dispatch({
                        type: 'initialize',
                        payload: {
                            id,
                            islandTimestamp,
                        },
                    });
                },
                trackVillager: (villager) => {
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
