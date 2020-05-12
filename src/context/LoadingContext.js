import React from "react";
import PropTypes from "prop-types";

const initialContext = {
    loading: false,
    setLoading: () => {},
};
const LoadingContext = React.createContext(initialContext);
export const LoadingProvider = ({ children }) => {
    const [loading, setLoading] = React.useState(initialContext.loading);
    return (
        <LoadingContext.Provider
            value={{
                loading,
                setLoading,
            }}
        >
            {children}
        </LoadingContext.Provider>
    );
};

LoadingProvider.defaultProps = {
    children: [],
};

LoadingProvider.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

export default LoadingContext;
