/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it

import React from 'react';
import { SessionProvider } from './src/context/currentSession';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

export const wrapRootElement = ({ element }) => (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <SessionProvider>
            {element}
        </SessionProvider>
    </MuiPickersUtilsProvider>
)
