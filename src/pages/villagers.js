import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import matchSorter from 'match-sorter'
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import TextField from "@material-ui/core/TextField";
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
    controlsWrapper: {
        padding: theme.spacing(2, 4, 1),
    },
    pagination: {
        "& .MuiTablePagination-toolbar": {
            padding: 0,
        },
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
    const [villagersPerPage, setVillagersPerPage] = React.useState(10);
    const [searchTerms, setSearchTerms] = React.useState('');
    const searchResults = matchSorter(
        allVillagers,
        searchTerms,
        {keys: [
            'name',
            'species',
            'personality',
            (item) => `${item.personality} ${item.species}`,
            (item) => `${item.species} ${item.personality}`,
            'gender',
        ]},
    );
    const startIndex = Math.max(page * villagersPerPage, 0);
    const endIndex = startIndex + (villagersPerPage >= 0
        ? villagersPerPage : searchResults.length);
    const villagersToRender = searchResults.slice(
        startIndex,
        endIndex,
    );
    return (
        <Page title={`All Villagers (${searchResults.length})`}>
            <div className={classes.controlsWrapper}>
                <TextField
                    className={classes.formControl}
                    id="villager-search"
                    label="Search"
                    type="search"
                    variant="outlined"
                    value={searchTerms}
                    onChange={(e) => setSearchTerms(e.target.value)}
                />
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
                className={classes.pagination}
                component="div"
                rowsPerPageOptions={[10, 25, 50, { label: "All", value: -1 }]}
                count={searchResults.length}
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
