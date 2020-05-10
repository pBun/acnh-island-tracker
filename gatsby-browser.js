import React from "react";
import { SessionProvider } from "./src/context/currentSession";
import { AppProvider } from "./src/context/app";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

// const DODO_YELLOW = '#eae235';
const DODO_BLUE = '#1591d1';

const siteTheme = createMuiTheme({
    palette: {
        primary: {
            main: DODO_BLUE,
            contrastText: '#f6f8e2',
        },
        secondary: {
            main: '#fa4a4c',
            contrastText: '#f6f8e2',
        },
        text: {
            primary: 'rgba(26,22,16, 0.87)',
            secondary: 'rgba(26,22,16, 0.54)',
            disabled: 'rgba(26,22,16, 0.38)',
            hint: 'rgba(26,22,16, 0.38)',
        },
        background: {
            default: '#fcfdf7',
        },
    },
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
