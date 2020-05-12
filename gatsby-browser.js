import React from "react";
import AppProviders from "./src/context/AppProviders";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

export const wrapRootElement = ({ element }) => (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <AppProviders>
            {element}
        </AppProviders>
    </MuiPickersUtilsProvider>
);
