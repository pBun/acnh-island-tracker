import React, { useContext } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import { format } from "date-fns";

import SessionContext from "../context/currentSession";

import { VILLAGERS } from "../util/villager";

const useStyles = makeStyles(theme => ({
    root: {
        width: "100%",
        "& th": {
            fontWeight: "bold",
        },
        "& tbody>tr:nth-child(2n-1) td": {
            borderBottom: "unset",
        },
        "& tbody>tr:nth-child(2n-1) th": {
            borderBottom: "unset",
        },
        "& tbody tbody>tr:last-child": {
            borderBottom: "unset",
        },
    },
    paper: {
        width: "100%",
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
    },
    visuallyHidden: {
        border: 0,
        clip: "rect(0 0 0 0)",
        height: 1,
        margin: -1,
        overflow: "hidden",
        padding: 0,
        position: "absolute",
        top: 20,
        width: 1,
    },
    tableHead: {
        fontWeight: 'bold',
    }
}));

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === "desc"
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
}

function EnhancedTableHead(props) {
    const {
        villagerPropName,
        classes,
        order,
        orderBy,
        onRequestSort,
    } = props;
    const createSortHandler = property => event => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {[
                    {
                        id: "category",
                        label:
                            villagerPropName.charAt(0).toUpperCase() +
                            villagerPropName.slice(1),
                    },
                    { id: "count", label: "Seen (Total%)" },
                ].map(headCell => (
                    <TableCell
                        key={headCell.id}
                        align={"left"}
                        padding={"default"}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : "asc"}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <span className={classes.visuallyHidden}>
                                    {order === "desc"
                                        ? "sorted descending"
                                        : "sorted ascending"}
                                </span>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
                <TableCell padding="checkbox" />
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(["asc", "desc"]).isRequired,
    orderBy: PropTypes.string.isRequired,
};

function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    return (
        <React.Fragment>
            <TableRow>
                <TableCell component="th" scope="row">
                    {row.name}
                </TableCell>
                <TableCell>{`${row.count} (${row.percent}%)`}</TableCell>
                <TableCell padding="checkbox">
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                        disabled={!row.count}
                    >
                        {row.count && open ? (
                            <KeyboardArrowUpIcon />
                        ) : row.count ? (
                            <KeyboardArrowDownIcon />
                        ) : (
                            ""
                        )}
                    </IconButton>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell
                    style={{ paddingBottom: 0, paddingTop: 0 }}
                    colSpan={3}
                >
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography
                                variant="h6"
                                gutterBottom
                                component="div"
                            >
                                {`${row.name} Sighting History`}
                            </Typography>
                            <Table size="small" aria-label={`${row.name} history`}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Villager</TableCell>
                                        <TableCell>Time</TableCell>
                                        <TableCell>Date</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.history.map(historyRow => (
                                        <TableRow key={historyRow.timestamp}>
                                            <TableCell>
                                                {historyRow.villager}
                                            </TableCell>
                                            <TableCell>
                                                {format(
                                                    historyRow.timestamp,
                                                    "hh:mm a"
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                {format(
                                                    historyRow.timestamp,
                                                    "MMM d, yyyy"
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

Row.propTypes = {
    row: PropTypes.shape({
        name: PropTypes.string.isRequired,
        count: PropTypes.number.isRequired,
        percent: PropTypes.number.isRequired,
        history: PropTypes.arrayOf(
            PropTypes.shape({
                villager: PropTypes.string.isRequired,
                timestamp: PropTypes.number.isRequired,
            })
        ).isRequired,
    }).isRequired,
};

function PercentBreakdownTable({ villagerPropName }) {
    const classes = useStyles();
    const { session } = useContext(SessionContext);
    const [order, setOrder] = React.useState("desc");
    const [orderBy, setOrderBy] = React.useState("count");
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(25);

    const data = {};
    const availableProps = VILLAGERS.reduce((acc, curVal) => {
        if (acc.indexOf(curVal[villagerPropName]) < 0) {
            acc.push(curVal[villagerPropName]);
        }
        return acc;
    }, []);
    availableProps.forEach(prop => {
        data[prop] = [];
    });
    session.sightings.forEach(sighting => {
        const villager = VILLAGERS.find(v => v.name === sighting.villager);
        const prop = villager && villager[villagerPropName];
        if (!prop) return;
        data[prop].push(sighting);
    });

    // sort
    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    // pagination
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const rows = Object.keys(data).map(prop => ({
        name: prop,
        count: data[prop].length,
        percent: Math.round(
            data[prop].length / Math.max(1, session.sightings.length) * 100
        ),
        history: data[prop],
    }));
    const emptyRows =
        rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
    const rowsPerPageOptions = [25];
    if (availableProps.length >= 50) {
        rowsPerPageOptions.push(50);
    }
    if (availableProps.length >= 100) {
        rowsPerPageOptions.push(100);
    }
    if (availableProps.length > 100) {
        rowsPerPageOptions.push(availableProps.length);
    }
    return (
        <TableContainer className={classes.root}>
            <Table
                size="small"
                aria-label={`breakdown of villagers by ${villagerPropName}`}
            >
                <EnhancedTableHead
                    villagerPropName={villagerPropName}
                    classes={classes}
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={handleRequestSort}
                />
                <TableBody>
                    {stableSort(rows, getComparator(order, orderBy))
                        .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                        )
                        .map((row, index) => (
                            <Row key={row.name} row={row} />
                        ))}
                    {emptyRows > 0 && (
                        <TableRow style={{ height: 33 * emptyRows }}>
                            <TableCell colSpan={3} />
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <TablePagination
                rowsPerPageOptions={rowsPerPageOptions}
                component="div"
                count={Math.ceil(rows.length / rowsPerPage)}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </TableContainer>
    );
}

PercentBreakdownTable.propTypes = {
    villagerPropName: PropTypes.string.isRequired,
};

export default PercentBreakdownTable;
