import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import TablePagination from "@material-ui/core/TablePagination";
import IconButton from "@material-ui/core/IconButton";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";

import { VILLAGERS } from "../util/villager";

import useVillagerIcons from "../hooks/useVillagerIcons";

import Page from "../components/page";

const useStyles = makeStyles(theme => ({
    list: {
        marginBottom: theme.spacing(2),
    },
    subheader: {
        backgroundColor: theme.palette.background.paper,
    },
    avatar: {

    },
    customPagination: {
        flexShrink: 0,
        marginLeft: theme.spacing(2.5),
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
    const villagerIcons = useVillagerIcons();
    const [page, setPage] = React.useState(0);
    const [villagersPerPage, setVillagersPerPage] = React.useState(10);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = event => {
        setVillagersPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const startIndex = page * villagersPerPage;
    return (
        <Page title={`All Villagers (${VILLAGERS.length})`}>
            <List className={classes.list}>
                {VILLAGERS.slice(startIndex, startIndex + villagersPerPage).map(
                    villager => (
                        <ListItem
                            key={villager.name}
                            button
                            component="a"
                            href={`https://nookipedia.com/wiki/${villager.name}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <ListItemAvatar>
                                <Avatar
                                    className={classes.avatar}
                                    alt={villager.name}
                                    src={villagerIcons[villager.name]}
                                />
                            </ListItemAvatar>
                            <ListItemText
                                primary={villager.name}
                                secondary={`${villager.personality} ${villager.species}`}
                            />
                        </ListItem>
                    )
                )}
            </List>
            <TablePagination
                component="div"
                rowsPerPageOptions={[10, 25, 50, { label: "All", value: -1 }]}
                count={VILLAGERS.length}
                rowsPerPage={villagersPerPage}
                page={page}
                SelectProps={{
                    inputProps: { "aria-label": "villagers per page" },
                    native: true,
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                labelRowsPerPage=""
                ActionsComponent={TablePaginationActions}
            />
        </Page>
    );
}
