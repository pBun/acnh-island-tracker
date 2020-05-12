import React from "react";
import PropTypes from "prop-types";

const LOCAL_STORAGE_KEY = "islandTrackerApp";

const getInitialState = () => ({
    trackerModalOpen: false,
    allowDataShare: true,
    trackingPreference: "mystery-island",
});
function reducer(state, action) {
    switch (action.type) {
        case "setTrackerModalState":
            return {
                ...state,
                trackerModalOpen: action.payload,
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
        case "reset":
            return getInitialState();
        default:
            throw new Error();
    }
}
const initialContext = {
    state: getInitialState(),
    setTrackerModalState: () => {},
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
                setClockModalState: modalState => {
                    dispatch({
                        type: "setClockModalState",
                        payload: modalState,
                    });
                },
                setTrackerModalState: modalState => {
                    dispatch({
                        type: "setTrackerModalState",
                        payload: modalState,
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
