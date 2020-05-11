import React, { createContext } from "react";
import PropTypes from "prop-types";

const initialState = {
    loading: false,
    clockModalOpen: false,
    trackerModalOpen: false,
    allowDataShare: false,
    startLoading: () => {},
    stopLoading: () => {},
    openClockModal: () => {},
    closeClockModal: () => {},
    openTrackerModal: () => {},
    closeTrackerModal: () => {},
    setAllowDataShare: (approval) => {},
};

const AppContext = createContext(initialState);
export const AppProvider = ({ children }) => {
    const [clockModalOpen, setClockModalOpen] = React.useState(
        initialState.clockModalOpen
    );
    const [trackerModalOpen, setTrackerModalOpen] = React.useState(
        initialState.trackerModalOpen
    );
    const [allowDataShare, setAllowDataShare] = React.useState(
        initialState.siteMenuOpen
    );
    const [loading, setLoading] = React.useState(initialState.loading);
    return (
        <AppContext.Provider
            value={{
                loading,
                clockModalOpen,
                trackerModalOpen,
                allowDataShare,
                startLoading: () => setLoading(true),
                stopLoading: () => setLoading(false),
                openClockModal: () => setClockModalOpen(true),
                closeClockModal: () => setClockModalOpen(false),
                openTrackerModal: () => setTrackerModalOpen(true),
                closeTrackerModal: () => setTrackerModalOpen(false),
                setAllowDataShare: (approval) => setAllowDataShare(approval),
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
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]),
};

export default AppContext;
