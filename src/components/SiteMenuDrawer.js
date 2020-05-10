import React from "react";
import { Link } from "gatsby";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";

import AppContext from "../context/app";

import DataNav from "../components/DataNav";

const useStyles = makeStyles({
    list: {
        width: 320,
    },
});

export default function TemporaryDrawer(props) {
    const classes = useStyles();
    const { siteMenuOpen, closeSiteMenu, openClockModal } = React.useContext(
        AppContext
    );
    const closeDrawer = React.useCallback(
        e => {
            if (
                e.type === "keydown" &&
                (e.key === "Tab" || e.key === "Shift")
            ) {
                return;
            }
            closeSiteMenu();
        },
        [closeSiteMenu]
    );
    return (
        <Drawer
            anchor="right"
            open={siteMenuOpen}
            onClose={closeDrawer}
            {...props}
        >
            <div
                className={classes.list}
                role="presentation"
                onClick={closeDrawer}
                onKeyDown={closeDrawer}
            >
                <DataNav />
            </div>
        </Drawer>
    );
}
