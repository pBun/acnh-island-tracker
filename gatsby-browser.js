/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it

import React from "react";
import { SessionProvider } from "./src/context/currentSession";
import { AppProvider } from "./src/context/app";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const siteTheme = createMuiTheme({
    // palette: {
    //     secondary: {
    //         main: orange[500],
    //     },
    // },
});

export const wrapRootElement = ({ element }) => (
    <ThemeProvider theme={siteTheme}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <AppProvider>
                <SessionProvider>{element}</SessionProvider>
            </AppProvider>
        </MuiPickersUtilsProvider>
    </ThemeProvider>
);
