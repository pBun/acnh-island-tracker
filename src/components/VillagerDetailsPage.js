import React from "react";
import { Link } from "gatsby";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import {
    getMysteryIslandChance,
    getCampsiteChance,
} from "../util/villager";
import { percentToString } from "../util/text";
import useVillagers from "../hooks/useVillagers";
import SessionContext from "../context/SessionContext";
import Page from "../components/Page";
import TrackedVillagersList from "../components/TrackedVillagersList";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import HomeIcon from "@material-ui/icons/Home";
import CampsiteIcon from "../components/icons/Campsite";

const useStyles = makeStyles(theme => ({
    container: {
        position: 'relative',
        padding: theme.spacing(0, 5, 5),
        textAlign: 'center',
    },
    title: {
        paddingBottom: theme.spacing(2),
    },
    label: {
        fontWeight: 'bold',
        textAlign: 'right',
    },
    value: {
        textAlign: 'left',
    },
    table: {
        margin: theme.spacing(2, 0, 2),
    },
    extra: {
        position: 'absolute',
        top: theme.spacing(0),
        right: theme.spacing(3),
    },
}));

const ButtonTooltip = withStyles(theme => ({
    arrow: {
        color: theme.palette.primary.main,
    },
    tooltip: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        boxShadow: 0,
        fontSize: theme.typography.fontSize,
        padding: theme.spacing(1, 2.5),
    },
}))(Tooltip);

export default function VillagerDetailsPage(props) {
    const classes = useStyles();
    const { currentResidents, pastResidents, sightings } = React.useContext(SessionContext);
    const { allVillagers } = useVillagers();
    const villagerId = props.pageContext && props.pageContext.villager
        && props.pageContext.villager.id;
    const villager = allVillagers.find(v => v.id === villagerId);
    const isCurrentResident = !!currentResidents.find(r => r.id === villager.id);
    const isPastResident = !!pastResidents.find(r => r.id === villager.id);
    const hasVisitedCampsite = !!sightings.find(r => r.villager === villager.name && !r.location === 'campsite');
    const filteredSightings = sightings.filter(
        s => s.villager === villager.name && (!s.location || s.location === "mystery-island")
    );
    if (!villager) return '404';
    return (
        <Page title={villager.name}>
            <div className={classes.container}>
                <img src={villager.icon} alt={`Portrait of ${villager.name}`} />
                <Typography className={classes.title} variant="h3">
                    {villager.name}
                </Typography>
                <Divider />
                <Grid container justify="center" alignItems="center" spacing={2} className={classes.table}>
                    <Grid item xs={12}>
                        <a
                            href={`https://nookipedia.com/wiki/${villager.name}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >{`View ${villager.name} on Nookipedia`}</a>
                    </Grid>
                    <Grid item xs={6} className={classes.label}>
                        Species:
                    </Grid>
                    <Grid item xs={6} className={classes.value}>
                        {villager.species}
                    </Grid>
                    <Grid item xs={6} className={classes.label}>
                        Personality:
                    </Grid>
                    <Grid item xs={6} className={classes.value}>
                        {villager.personality}
                    </Grid>
                    <Grid item xs={6} className={classes.label}>
                        Gender:
                    </Grid>
                    <Grid item xs={6} className={classes.value}>
                        {villager.gender}
                    </Grid>
                </Grid>
                <div className={classes.extra}>
                    {hasVisitedCampsite ? (
                        <ButtonTooltip arrow title={`${villager.name} has visited your campsite`} placement="bottom">
                            <IconButton
                                variant="contained"
                                component={Link}
                                to="/data/campsite/tracked/"
                                aria-label="go to campsite tracked page"
                            >
                                <CampsiteIcon />
                            </IconButton>
                        </ButtonTooltip>
                    ) : ''}
                    {isCurrentResident ? (
                        <ButtonTooltip arrow title={`${villager.name} is currently a resident on your island`} placement="bottom">
                            <IconButton
                                variant="contained"
                                component={Link}
                                to="/residents/"
                                aria-label="go to residents page"
                            >
                                <HomeIcon />
                            </IconButton>
                        </ButtonTooltip>
                    ) : isPastResident ? (
                        <ButtonTooltip arrow title={`${villager.name} was previously a resident on your island`} placement="bottom">
                            <IconButton
                                variant="contained"
                                component={Link}
                                to="/residents/"
                                aria-label="go to residents page"
                            >
                                <ExitToAppIcon />
                            </IconButton>
                        </ButtonTooltip>
                    ) : ''}
                </div>

                <Grid container justify="center" alignItems="center" spacing={2} className={classes.table}>
                    <Grid item xs={12}>
                        <Typography variant="h5">
                            Campsite
                        </Typography>
                    </Grid>
                    <Grid item xs={6} className={classes.label}>
                        Spawn rate (base):
                    </Grid>
                    <Grid item xs={6} className={classes.value}>
                        {percentToString(villager.baseCampsiteChance)}
                    </Grid>
                    <Grid item xs={6} className={classes.label}>
                        Spawn rate (my island):
                    </Grid>
                    <Grid item xs={6} className={classes.value}>
                        {percentToString(getCampsiteChance(villager.name, currentResidents, pastResidents, sightings))}
                    </Grid>
                </Grid>


                <Grid container justify="center" alignItems="center" spacing={2} className={classes.table}>
                    <Grid item xs={12}>
                        <Typography variant="h5">
                            Mystery Islands
                        </Typography>
                    </Grid>
                    <Grid item xs={6} className={classes.label}>
                        Spawn rate (base):
                    </Grid>
                    <Grid item xs={6} className={classes.value}>
                        {percentToString(villager.baseIslandChance)}
                    </Grid>
                    <Grid item xs={6} className={classes.label}>
                        Spawn rate (my island):
                    </Grid>
                    <Grid item xs={6} className={classes.value}>
                        {percentToString(getMysteryIslandChance(villager.name, currentResidents))}
                    </Grid>
                </Grid>

                {filteredSightings.length ? (
                    <>
                        <Typography variant="h5">
                            Recent Activity
                        </Typography>
                        <TrackedVillagersList
                            sightings={filteredSightings}
                            currentResidents={currentResidents}
                            pastResidents={pastResidents}
                        />
                    </>
                ) : ''}
            </div>
        </Page>
    );
}
