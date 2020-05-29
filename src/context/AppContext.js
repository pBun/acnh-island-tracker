import React from "react";
import PropTypes from "prop-types";

const LOCAL_STORAGE_KEY = "islandTrackerApp";

export const MODALS = {
    TRACKER: "TRACKER",
    TRACK_ENCOUNTER: "TRACK_ENCOUNTER",
    IMPORT_RESIDENTS: "IMPORT_RESIDENTS",
    IMPORT_ENCOUNTERS: "IMPORT_ENCOUNTERS",
    EXPORT_SESSION: "EXPORT_SESSION",
    IMPORT_SESSION: "IMPORT_SESSION",
};

const getInitialState = () => ({
    modalOpen: null,
    allowDataShare: true,
    trackingPreference: "mystery-island",
    snackMessage: null,
});
function reducer(state, action) {
    switch (action.type) {
        case "setModalOpen":
            return {
                ...state,
                modalOpen: action.payload,
            };
        case "setTrackingPreference":
            return {
                ...state,
                trackingPreference: action.payload,
            };
        case "setAllowDataShare":
            return {
                ...state,
                allowDataShare: action.payload,
            };
        case "setSnackMessage":
            return {
                ...state,
                snackMessage: action.payload,
            };
        case "reset":
            return getInitialState();
        default:
            throw new Error();
    }
}
const initialContext = {
    state: getInitialState(),
    setModalOpen: (modal) => {},
    setSnackMessage: (msg) => {},
    setAllowDataShare: approval => {},
    setTrackingPreference: preference => {},
};
const AppContext = React.createContext(initialContext);
export const AppProvider = ({ children }) => {
    const localStateString = window && window.localStorage.getItem(LOCAL_STORAGE_KEY);
    const localState = localStateString && JSON.parse(localStateString);
    const [state, dispatch] = React.useReducer(reducer, localState || getInitialState());
    React.useEffect(() => {
        if (!window) return;
        // only store the data share var
        const stateToStore = getInitialState();
        stateToStore.allowDataShare = state.allowDataShare;
        stateToStore.trackingPreference = state.trackingPreference;
        window && window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(stateToStore));
    }, [state]);
    return (
        <AppContext.Provider
            value={{
                ...state,
                setModalOpen: modal => {
                    dispatch({
                        type: "setModalOpen",
                        payload: modal,
                    });
                },
                setSnackMessage: msg => {
                    dispatch({
                        type: "setSnackMessage",
                        payload: msg,
                    });
                },
                setAllowDataShare: approval => {
                    dispatch({ type: "setAllowDataShare", payload: approval });
                },
                setTrackingPreference: preference => {
                    dispatch({
                        type: "setTrackingPreference",
                        payload: preference,
                    });
                },
                resetAppData: () => {
                    dispatch({ type: "reset" });
                },
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

AppProvider.defaultProps = {
    children: [],
};

AppProvider.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

export default AppContext;
