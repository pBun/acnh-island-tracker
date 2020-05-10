import React, {
    createContext,
} from 'react';
import PropTypes from 'prop-types';

const initialState = {
    loading: false,
    clockModalOpen: false,
    trackerModalOpen: false,
    siteMenuOpen: false,
    startLoading: () => {},
    stopLoading: () => {},
    openSiteMenu: () => {},
    closeSiteMenu: () => {},
    openClockModal: () => {},
    closeClockModal: () => {},
    openTrackerModal: () => {},
    closeTrackerModal: () => {},
};

const AppContext = createContext(initialState);
export const AppProvider = ({ children }) => {
    const [clockModalOpen, setClockModalOpen] = React.useState(initialState.clockModalOpen);
    const [trackerModalOpen, setTrackerModalOpen] = React.useState(initialState.trackerModalOpen);
    const [siteMenuOpen, setSiteMenuOpen] = React.useState(initialState.siteMenuOpen);
    const [loading, setLoading] = React.useState(initialState.loading);
    return (
        <AppContext.Provider
            value={{
                loading,
                clockModalOpen,
                trackerModalOpen,
                siteMenuOpen,
                startLoading: () => setLoading(true),
                stopLoading: () => setLoading(false),
                openSiteMenu: () => setSiteMenuOpen(true),
                closeSiteMenu: () => setSiteMenuOpen(false),
                openClockModal: () => setClockModalOpen(true),
                closeClockModal: () => setClockModalOpen(false),
                openTrackerModal: () => setTrackerModalOpen(true),
                closeTrackerModal: () => setTrackerModalOpen(false),
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
