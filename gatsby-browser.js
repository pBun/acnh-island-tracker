import React from "react";
import { SessionProvider } from "./src/context/currentSession";
import { AppProvider } from "./src/context/app";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

export const wrapRootElement = ({ element }) => (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <AppProvider>
            <SessionProvider>{element}</SessionProvider>
        </AppProvider>
    </MuiPickersUtilsProvider>
);
