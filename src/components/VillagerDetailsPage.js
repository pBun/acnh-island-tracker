import React from "react";
import { Link, useStaticQuery, graphql } from "gatsby";
import { makeStyles } from "@material-ui/core/styles";
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
import SEO from "../components/SEO";
import TrackedVillagersList from "../components/TrackedVillagersList";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import HomeIcon from "@material-ui/icons/Home";
import CampsiteIcon from "../components/icons/Campsite";

const useStyles = makeStyles(theme => ({
    container: {
        position: 'relative',
        textAlign: 'center',
    },
    divider: {
        margin: theme.spacing(0, 5),
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
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
    extra: {
        position: 'absolute',
        top: theme.spacing(0),
        right: theme.spacing(3),
    },
}));

export default function VillagerDetailsPage(props) {
    const classes = useStyles();
    const { site, allFile } = useStaticQuery(
        graphql`
            query {
                site {
                    siteMetadata {
                        siteUrl
                    }
                }
                allFile {
                    nodes {
                        name
                        publicURL
                    }
                }
            }
        `
    );
    const allVillagerImgs = allFile && allFile.nodes;
    const { currentResidents, pastResidents, sightings } = React.useContext(SessionContext);
    const { allVillagers } = useVillagers();
    const villagerId = props.pageContext && props.pageContext.villager
        && props.pageContext.villager.id;
    const villager = allVillagers.find(v => v.id === villagerId);
    const fullImage = (allVillagerImgs && allFile.nodes.find(item => item.name === villager.id).publicURL)
        || villager.icon;
    const isCurrentResident = !!currentResidents.find(r => r.villager.id === villager.id);
    const isPastResident = !!pastResidents.find(r => r.villager.id === villager.id);
    const hasVisitedCampsite = !!sightings.find(s => s.villager.id === villager.id && s.type === 'campsite');
    const filteredSightings = sightings.filter(s => s.villager.id === villager.id);
    if (!villager) return '404';
    return (
        <Page title={villager.name}>
            <SEO
                title={villager.name}
                pathname={props.location.pathname}
                meta={[{
                    name: "og:image",
                    content: `${site.siteMetadata.siteUrl}${fullImage}`,
                }]}
            />
            <div className={classes.container}>
                <img src={fullImage} alt={`Portrait of ${villager.name}`} />
                <Typography className={classes.title} variant="h3">
                    {villager.name}
                </Typography>
                <Divider className={classes.divider} />
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
                        <Tooltip arrow title={`${villager.name} has visited your campsite`} placement="bottom">
                            <IconButton
                                variant="contained"
                                component={Link}
                                to="/data/campsite/tracked/"
                                aria-label="go to campsite tracked page"
                            >
                                <CampsiteIcon />
                            </IconButton>
                        </Tooltip>
                    ) : ''}
                    {isCurrentResident ? (
                        <Tooltip arrow title={`${villager.name} is currently a resident on your island`} placement="bottom">
                            <IconButton
                                variant="contained"
                                component={Link}
                                to="/residents/"
                                aria-label="go to residents page"
                            >
                                <HomeIcon />
                            </IconButton>
                        </Tooltip>
                    ) : isPastResident ? (
                        <Tooltip arrow title={`${villager.name} was previously a resident on your island`} placement="bottom">
                            <IconButton
                                variant="contained"
                                component={Link}
                                to="/residents/"
                                aria-label="go to residents page"
                            >
                                <ExitToAppIcon />
                            </IconButton>
                        </Tooltip>
                    ) : ''}
                </div>

                <Grid container justify="center" alignItems="center" spacing={2} className={classes.table}>
                    <Grid item xs={12}>
                        <Typography variant="h5">
                            Campsite
                        </Typography>
                    </Grid>
                    <Grid item xs={6} className={classes.label}>
                        Your Encounter Rate:
                    </Grid>
                    <Grid item xs={6} className={classes.value}>
                        {percentToString(getCampsiteChance(villager, currentResidents, pastResidents, sightings))}
                    </Grid>
                    <Grid item xs={6} className={classes.label}>
                        Base Encounter Rate:
                    </Grid>
                    <Grid item xs={6} className={classes.value}>
                        {percentToString(villager.baseCampsiteChance)}
                    </Grid>
                </Grid>


                <Grid container justify="center" alignItems="center" spacing={2} className={classes.table}>
                    <Grid item xs={12}>
                        <Typography variant="h5">
                            Mystery Islands
                        </Typography>
                    </Grid>
                    <Grid item xs={6} className={classes.label}>
                        Your Encounter Rate:
                    </Grid>
                    <Grid item xs={6} className={classes.value}>
                        {percentToString(getMysteryIslandChance(villager, currentResidents))}
                    </Grid>
                    <Grid item xs={6} className={classes.label}>
                        Base Encounter Rate:
                    </Grid>
                    <Grid item xs={6} className={classes.value}>
                        {percentToString(villager.baseIslandChance)}
                    </Grid>
                </Grid>
                <Typography variant="h5">
                    Recent Encounters
                </Typography>
                <TrackedVillagersList sightings={filteredSightings} />
            </div>
        </Page>
    );
}
