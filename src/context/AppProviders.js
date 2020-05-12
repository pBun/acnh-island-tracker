import React from 'react';
import PropTypes from 'prop-types';
import { AppProvider } from '../context/AppContext';
import { LoadingProvider } from '../context/LoadingContext';
import { SessionProvider } from '../context/SessionContext';

function AppProviders({
    children,
}) {
    return (
        <AppProvider>
            <LoadingProvider>
                <SessionProvider>
                    {children}
                </SessionProvider>
            </LoadingProvider>
        </AppProvider>
    );
}

AppProviders.defaultProps = {

};

AppProviders.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]).isRequired,
};

export default AppProviders;
