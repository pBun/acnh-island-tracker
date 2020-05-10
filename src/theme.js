import { createMuiTheme } from '@material-ui/core/styles';

// const DODO_YELLOW = '#eae235';
const DODO_BLUE = '#1591d1';

// A custom theme for this app
const theme = createMuiTheme({
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

export default theme;
