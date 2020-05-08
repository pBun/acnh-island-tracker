import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { format } from 'date-fns';

import SessionContext from '../context/currentSession';

import villagerData from '../data/villagers.json';

const VILLAGERS = villagerData && villagerData.feed && villagerData.feed.entry && villagerData.feed.entry.map((v) => {
    return {
        name: v.gsx$villager.$t,
        species: v.gsx$species.$t,
        gender: v.gsx$gender.$t,
        personality: v.gsx$personality.$t,
    };
});

const useRowStyles = makeStyles({
    root: {
        marginBottom: 0,
        "& > *": {
            borderBottom: "unset",
        },
    },
});

function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();

    return (
        <React.Fragment>
            <TableRow className={classes.root}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? (
                            <KeyboardArrowUpIcon />
                        ) : (
                            <KeyboardArrowDownIcon />
                        )}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.name}
                </TableCell>
                <TableCell>{row.history.length}</TableCell>
                <TableCell>{row.percent}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell
                    style={{ paddingBottom: 0, paddingTop: 0 }}
                    colSpan={6}
                >
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography
                                variant="h6"
                                gutterBottom
                                component="div"
                            >
                                History
                            </Typography>
                            <Table size="small" aria-label="purchases">
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
                                            <TableCell
                                                component="th"
                                                scope="row"
                                            >
                                                {historyRow.villager}
                                            </TableCell>
                                            <TableCell>
                                                {format(historyRow.timestamp, 'hh:mm a')}
                                            </TableCell>
                                            <TableCell>
                                                {format(historyRow.timestamp,'MMM d, yyyy' )}
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
        percent: PropTypes.string.isRequired,
        history: PropTypes.arrayOf(
            PropTypes.shape({
                villager: PropTypes.string.isRequired,
                timestamp: PropTypes.number.isRequired,
            })
        ).isRequired,
        name: PropTypes.string.isRequired,
    }).isRequired,
};

function PercentBreakdown({ villagerPropName }) {
    const { session } = useContext(SessionContext);
    const data = {};
    const availableProps = VILLAGERS.reduce((acc, curVal) => {
        if (acc.indexOf(curVal[villagerPropName]) < 0) {
            acc.push(curVal[villagerPropName]);
        }
        return acc;
    }, []);
    availableProps.forEach((prop) => {
        data[prop] = [];
    });
    session.sightings.forEach((sighting) => {
        const villager = VILLAGERS.find(v => v.name === sighting.villager);
        const prop = villager && villager[villagerPropName];
        if (!prop) return;
        data[prop].push(sighting);
    });
    return (
        <TableContainer>
            <Table size="small" aria-label={`breakdown of villagers by ${villagerPropName}`}>
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>{ villagerPropName.charAt(0).toUpperCase() + villagerPropName.slice(1) }</TableCell>
                        <TableCell>Seen</TableCell>
                        <TableCell>Seen/Total</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Object.keys(data).map((prop) => (
                        <Row key={prop} row={{
                            name: prop,
                            percent: `${Math.round(data[prop].length / session.sightings.length * 100)}%`,
                            history: data[prop],
                        }} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

PercentBreakdown.propTypes = {
    villagerPropName: PropTypes.string.isRequired,
};

export default PercentBreakdown;
