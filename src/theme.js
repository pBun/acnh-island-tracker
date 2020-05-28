import { createMuiTheme } from "@material-ui/core/styles";

const DODO_YELLOW = "#ffdf4e";
const DODO_BLUE = "#1591d1";
const DODO_BLUE_TEXT = "#30849e";
const DODO_WHITE_TEXT = "#f6f8e2";
// const DODO_RED = '#fa4a4c';
const DODO_TEXT_BG = "#fffae4";
const DODO_LIGHT_BLUE = "#aadcf6";
const DODO_PAPER = "#fcfdf7";

// A custom theme for this app
const defaultTheme = createMuiTheme();
const theme = createMuiTheme({
    palette: {
        primary: {
            main: DODO_BLUE,
            contrastText: DODO_WHITE_TEXT,
        },
        secondary: {
            main: DODO_YELLOW,
            contrastText: DODO_BLUE_TEXT,
        },
        background: {
            default: DODO_LIGHT_BLUE,
            paper: DODO_PAPER,
        },
        action: {
            active: "rgba(6, 48, 69, 0.54)",
            hover: "rgba(6, 48, 69, 0.04)",
            hoverOpacity: 0.04,
            selected: "rgba(6, 48, 69, 0.04)",
            selectedOpacity: 0.8,
            disabled: "rgba(6, 48, 69, 0.26)",
            disabledBackground: "rgba(6, 48, 69, 0.12)",
            disabledOpacity: 0.38,
            focus: "rgba(6, 48, 69, 0.12)",
            focusOpacity: 0.12,
            activatedOpacity: 0.12,
        },
    },
    overrides: {
        MuiAvatar: {
            colorDefault: {
                color: DODO_TEXT_BG,
                backgroundColor: DODO_BLUE,
            },
        },
        MuiListItem: {
            gutters: {
                paddingLeft: defaultTheme.spacing(5),
                paddingRight: defaultTheme.spacing(5),
            },
        },
        MuiDialog: {
            container: {
                "& .MuiDialog-paper": {
                    overflow: "initial",
                },
            },
        },
        MuiDialogContent: {
            root: {
                padding: defaultTheme.spacing(5, 5, 0),
            },
        },
        MuiDialogActions: {
            root: {
                padding: defaultTheme.spacing(2, 4, 2),
            },
        },
        MuiTooltip: {
            arrow: {
                color: DODO_BLUE,
            },
            tooltip: {
                backgroundColor: DODO_BLUE,
                color: DODO_WHITE_TEXT,
                boxShadow: 0,
                fontSize: defaultTheme.typography.fontSize,
                padding: defaultTheme.spacing(1, 2.5),
                borderRadius: 20,
            },
        },
    },
});

export default theme;
