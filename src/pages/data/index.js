import React from "react";
import { format } from 'date-fns';
import { Link } from "gatsby";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import PeopleIcon from '@material-ui/icons/People';
import MoodIcon from '@material-ui/icons/Mood';
import PetsIcon from '@material-ui/icons/Pets';
import EqualizerIcon from '@material-ui/icons/Equalizer';

import SiteMenu from "../../components/SiteMenu";
import Page from "../../components/page";
import DataNav from "../../components/DataNav";

const useStyles = makeStyles({

});

export default function IndexPage() {
    const classes = useStyles();
    return (
        <SiteMenu>
            <Page title="Data">
                <DataNav hideIndex={true} />
            </Page>
        </SiteMenu>
    );
}
