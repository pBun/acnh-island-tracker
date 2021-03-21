import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { debounce } from "throttle-debounce";
import { matchSorter } from "match-sorter";
import TextField from "@material-ui/core/TextField";
import TablePagination from "@material-ui/core/TablePagination";
import IconButton from "@material-ui/core/IconButton";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import SearchIcon from "@material-ui/icons/Search";

import SessionContext from "../../../context/SessionContext";

import Page from "../../../components/Page";
import SEO from "../../../components/SEO";
import TrackedVillagersList from "../../../components/TrackedVillagersList";

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
    controlsWrapper: {
        margin: theme.spacing(2, 5, 1),
        position: "relative",
    },
    formControl: {
        width: "100%",
        margin: 0,
        "& .MuiInputLabel-outlined": {
            transform: `translate(48px, 20px) scale(1)`,
        },
        "& .MuiInputLabel-outlined.MuiInputLabel-shrink": {
            transform: `translate(14px, -6px) scale(0.75)`,
        },
    },
    searchInput: {
        paddingLeft: theme.spacing(6),
    },
    searchIcon: {
        position: "absolute",
        left: theme.spacing(2),
        top: "50%",
        transform: "translateY(-50%)",
        color: theme.palette.text.hint,
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
                {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === "rtl" ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === "rtl" ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </div>
    );
}

function TrackedCampsiteVillagersPage(props) {
    const DEFAULT_PER_PAGE = [10, 25, 50, { label: "All", value: -1 }];
    const classes = useStyles();
    const { session } = React.useContext(SessionContext);
    const filteredSightings = session.sightings.filter(s => s.type === "campsite");
    const [page, setPage] = React.useState(0);
    const [villagersPerPage, setVillagersPerPage] = React.useState(DEFAULT_PER_PAGE[0]);
    const [searchTerms, setSearchTerms] = React.useState("");
    const searchResults = React.useMemo(
        () => matchSorter(filteredSightings, searchTerms, {
            keys: [
                "villager.name",
                "villager.species",
                "villager.personality",
                item => `${item.villager.personality} ${item.villager.species}`,
                item => `${item.villager.species} ${item.villager.personality}`,
                "villager.gender",
            ],
        }).sort((a, b) => b.timestamp - a.timestamp),
        [filteredSightings, searchTerms],
    );
    const delayedSearch = React.useMemo(
        () => debounce(250, (terms) => {
            setPage(0);
            setSearchTerms(terms);
        }),
        [setPage, setSearchTerms],
    );
    const startIndex = Math.max(page * villagersPerPage, 0);
    const endIndex = startIndex + (villagersPerPage >= 0 ? villagersPerPage : searchResults.length);
    const sightingsToRender = searchResults.slice(startIndex, endIndex);
    const pageTitle = "Campsite Encounters";
    const pageLabel = `${pageTitle} ${
        searchResults.length ? `(${searchResults.length})` : ""
    }`;

    return (
        <Page title={pageLabel}>
            <SEO title={pageTitle} pathname={props.location.pathname} />
            <div className={classes.controlsWrapper}>
                <TextField
                    className={classes.formControl}
                    fullWidth={true}
                    id="villager-search"
                    label="Name, species, personality"
                    type="search"
                    variant="outlined"
                    inputProps={{ className: classes.searchInput }}
                    onChange={(e) => delayedSearch(e.target.value)}
                />
                <SearchIcon className={classes.searchIcon} />
            </div>
            <TrackedVillagersList
                sightings={sightingsToRender}
            />
            <TablePagination
                className={classes.pagination}
                component="div"
                rowsPerPageOptions={DEFAULT_PER_PAGE}
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
                onChangeRowsPerPage={event => {
                    setVillagersPerPage(parseInt(event.target.value, 10));
                    setPage(0);
                }}
                labelRowsPerPage=""
                ActionsComponent={TablePaginationActions}
            />
        </Page>
    );
}

export default TrackedCampsiteVillagersPage;
