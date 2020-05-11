import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Avatar from "@material-ui/core/Avatar";
import TablePagination from "@material-ui/core/TablePagination";
import IconButton from "@material-ui/core/IconButton";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";

import useVillagers from "../hooks/useVillagers";

import Page from "../components/Page";

const useStyles = makeStyles(theme => ({
    list: {
        marginBottom: theme.spacing(2),
    },
    subheader: {
        backgroundColor: theme.palette.background.paper,
    },
    customPagination: {
        flexShrink: 0,
        marginLeft: theme.spacing(2.5),
    },
    formControl: {
        margin: theme.spacing(1),
        width: "100%",
    },
    filters: {
        display: "flex",
        padding: theme.spacing(2, 4, 1),
    },
}));

function TablePaginationActions(props) {
    const classes = useStyles();
    const theme = useTheme();
    const { count, page, rowsPerPage, onChangePage } = props;

    const handleFirstPageButtonClick = event => {
        onChangePage(event, 0);
    };

    const handleBackButtonClick = event => {
        onChangePage(event, page - 1);
    };

    const handleNextButtonClick = event => {
        onChangePage(event, page + 1);
    };

    const handleLastPageButtonClick = event => {
        onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <div className={classes.customPagination}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === "rtl" ? (
                    <LastPageIcon />
                ) : (
                    <FirstPageIcon />
                )}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === "rtl" ? (
                    <KeyboardArrowRight />
                ) : (
                    <KeyboardArrowLeft />
                )}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === "rtl" ? (
                    <KeyboardArrowLeft />
                ) : (
                    <KeyboardArrowRight />
                )}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === "rtl" ? (
                    <FirstPageIcon />
                ) : (
                    <LastPageIcon />
                )}
            </IconButton>
        </div>
    );
}

export default function VillagersPage() {
    const classes = useStyles();
    const { allVillagers } = useVillagers();
    const [page, setPage] = React.useState(0);
    const [speciesFilter, setSpeciesFilter] = React.useState("All");
    const [personalityFilter, setPersonalityFilter] = React.useState("All");
    const [villagersPerPage, setVillagersPerPage] = React.useState(10);
    const availableSpecies = allVillagers
        .reduce((acc, v) => {
            if (acc.indexOf(v.species) < 0) acc.push(v.species);
            return acc;
        }, [])
        .sort();
    const availablePersonalities = allVillagers
        .reduce((acc, v) => {
            if (acc.indexOf(v.personality) < 0) acc.push(v.personality);
            return acc;
        }, [])
        .sort();
    const filteredVillagers = allVillagers
        .filter(
            villager =>
                speciesFilter === "All" || speciesFilter === villager.species
        )
        .filter(
            villager =>
                personalityFilter === "All" ||
                personalityFilter === villager.personality
        );
    const startIndex = Math.max(page * villagersPerPage, 0);
    const endIndex = startIndex + (villagersPerPage >= 0
        ? villagersPerPage : filteredVillagers.length);
    const villagersToRender = filteredVillagers.slice(
        startIndex,
        endIndex,
    );
    return (
        <Page title={`All Villagers (${filteredVillagers.length})`}>
            <div className={classes.filters}>
                <FormControl className={classes.formControl}>
                    <InputLabel id="species-select-label">
                        Filter Species
                    </InputLabel>
                    <Select
                        labelId="species-select-label"
                        id="species-select"
                        value={speciesFilter}
                        onChange={e => setSpeciesFilter(e.target.value)}
                    >
                        <MenuItem value="All">All</MenuItem>
                        {availableSpecies.map(species => (
                            <MenuItem key={species} value={species}>
                                {species}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl className={classes.formControl}>
                    <InputLabel id="personality-select-label">
                        Filter Personality
                    </InputLabel>
                    <Select
                        labelId="personality-select-label"
                        id="personality-select"
                        value={personalityFilter}
                        onChange={e => setPersonalityFilter(e.target.value)}
                    >
                        <MenuItem value="All">All</MenuItem>
                        {availablePersonalities.map(personality => (
                            <MenuItem key={personality} value={personality}>
                                {personality}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
            <List className={classes.list}>
                {villagersToRender.map(villager => (
                    <ListItem
                        key={villager.id}
                        button
                        component="a"
                        href={`https://nookipedia.com/wiki/${villager.name}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <ListItemAvatar>
                            <Avatar alt={villager.name} src={villager.icon} />
                        </ListItemAvatar>
                        <ListItemText
                            primary={villager.name}
                            secondary={`${villager.personality} ${villager.species}`}
                        />
                    </ListItem>
                ))}
            </List>
            <TablePagination
                component="div"
                rowsPerPageOptions={[10, 25, 50, { label: "All", value: -1 }]}
                count={filteredVillagers.length}
                rowsPerPage={villagersPerPage}
                page={page}
                SelectProps={{
                    inputProps: { "aria-label": "villagers per page" },
                    native: true,
                }}
                onChangePage={(event, newPage) => {
                    setPage(newPage);
                }}
                onChangeRowsPerPage={(event) => {
                    setVillagersPerPage(parseInt(event.target.value, 10));
                    setPage(0);
                }}
                labelRowsPerPage=""
                ActionsComponent={TablePaginationActions}
            />
        </Page>
    );
}
