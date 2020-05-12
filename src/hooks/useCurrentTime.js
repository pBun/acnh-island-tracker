import React from "react";
import { format } from "date-fns";

const DEFAULT_TEMPLATE = "MMM d, yyyy hh:mm a";

export default function useCurrentTime() {
    const [currentSystemTimestamp, setCurTimestamp] = React.useState(Date.now());
    React.useEffect(() => {
        if (!window) return;
        let updateTimeout;
        const updateCurTimestamp = () => {
            setCurTimestamp(Date.now());
            updateTimeout = window.setTimeout(updateCurTimestamp, 10000);
        };
        updateCurTimestamp();
        return () => {
            window.clearTimeout(updateTimeout);
        };
    }, []);
    const getPrettySystemTime = (template = DEFAULT_TEMPLATE) => {
        return format(currentSystemTimestamp, template);
    };
    return {
        currentSystemTimestamp,
        getPrettySystemTime,
    };
}
