import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import FilterListIcon from '@material-ui/icons/FilterList';
import AddIcon from '@material-ui/icons/Add';
import axios from '../../api';
import { red } from '@material-ui/core/colors';
import { Redirect } from "react-router-dom";
import { Button } from "antd";


function createData(productName, address, imageUrl, avatarUrl, traderName, discription, expirationDate, onSalePrice, originalPrice, quantity, id) {
    return { productName, address, imageUrl, avatarUrl, traderName, discription, expirationDate, onSalePrice, originalPrice, quantity, id };
}


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
    return order === 'desc'
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
    return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    { id: 'productName', numeric: false, disablePadding: true, label: 'Product ' },
    { id: 'address', numeric: true, disablePadding: false, label: 'Address' },
    { id: 'imageUrl', numeric: true, disablePadding: false, label: 'Img' },
    { id: 'avatarUrl', numeric: true, disablePadding: false, label: 'Img' },
    { id: 'traderName', numeric: true, disablePadding: false, label: 'traderName' },
    { id: 'discription', numeric: true, disablePadding: false, label: 'discription' },
    { id: 'expirationDate', numeric: true, disablePadding: false, label: 'expirationDate' },
    { id: 'onSalePrice', numeric: true, disablePadding: false, label: 'onSalePrice' },
    { id: 'originalPrice', numeric: true, disablePadding: false, label: 'originalPrice' },
    { id: 'quantity', numeric: true, disablePadding: false, label: 'quantity' },

];

function EnhancedTableHead(props) {
    const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{ 'aria-label': 'select all desserts' }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'default'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <span className={classes.visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </span>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
        //color
        backgroundColor: theme.palette.divider
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    title: {
        flex: '1 1 100%',
    },
}));





const EnhancedTableToolbar = (props) => {
    const classes = useToolbarStyles();
    const { numSelected, selected, selectedRow, fetchProductInfos, userName, setItemEdit, setSelectedRow } = props;
    const [isEdit, setEdit] = useState(false);

    async function deleteItems(row) {
        const tradername = row.traderName;
        const item = row.productName;
        const quantity = row.quantity;
        const onsaleprice = row.onSalePrice;
        const {
            data: { messages, message },
        } = await axios.post('/api/delete-item', { tradername, item, quantity, onsaleprice })
        alert(message);
        selected.splice(0, 1);

    }
    return (
        <Toolbar
            className={clsx(classes.root, {
                [classes.highlight]: numSelected > 0,
            })}
        > {isEdit && <Redirect to={{ pathname: '/my-shop', state: { curUserInfo: selected } }} />}
            {numSelected > 0 ? (
                <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography className={classes.title} color="white" variant="h6" id="tableTitle" component="div">
                    Edit/Delete/Create
                </Typography>
            )}

            {numSelected > 0 ? (
                <>
                    <Tooltip title="Delete">
                        <IconButton aria-label="delete" onClick={() => { deleteItems(selectedRow); fetchProductInfos(userName) }}>
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="Edit">
                        <IconButton aria-label="edit" onClick={() => { alert('edit'); console.log(selected); setItemEdit(true) }}>
                            <EditIcon />
                        </IconButton>
                    </Tooltip>
                </>
            ) : (
                <>
                    <Tooltip title="Filter list">
                        <IconButton aria-label="filter list" onClick={() => { console.log('click') }}>
                            <FilterListIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Add Item">
                        <IconButton aria-label="add item" onClick={() => { setSelectedRow([]); setItemEdit(true) }}>
                            <AddIcon />
                        </IconButton>
                    </Tooltip>
                </>
            )}
        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(10),
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
}));

export default function NewEnhancedTable({ userName, selectedRow, setSelectedRow, itemEdit, setItemEdit, isSearch, searchType, searchString, setSearch }) {
    const classes = useStyles();
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('calories');
    const [selected, setSelected] = useState([]);
    //const [selectedRow, setSelectedRow]=useState([]);
    const [page, setPage] = useState(0);
    const [dense, setDense] = useState(true);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [productInfos, setProductInfos] = useState([]);
    useEffect(() => {
        console.log(userName)
        fetchProductInfos(userName);
    }, []);
    console.log(isSearch)
    console.log(searchType)
    console.log(searchString.length)
    const fetchProductInfos = async (userName, searchType, searchString) => {
        try {
            let queryParams = { userName };
            console.log(userName);
            if (searchType && searchString) queryParams = { userName: userName, searchString: searchString, searchType: searchType };
            console.log(queryParams);
            const {
                data: { messages, message },
            } = await axios.post('/api/search-item-by-user', queryParams)
            console.log(messages)
            if (!messages) alert(message);
            else setProductInfos(messages);

        } catch (error) {
            throw Error('When fetching product info => Error ' + error);
        }
    };
    // if (isSearch) {
    //   fetchProductInfos(userName,searchType, searchString);
    //   console.log("searching");
    //   setSearch(false);

    // } 
    useEffect(() => {
        fetchProductInfos(userName, searchType, searchString);
        console.log("searching");
    }, [searchType]);

    const rows = productInfos

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = rows.map((n) => n.productName);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick1 = (event, name) => {

        const selectedIndex = selected.indexOf(name);

        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        console.log(newSelected)
        setSelected(newSelected);
    };

    const handleClick = (event, name, row) => {
        const selectedIndex = selected.indexOf(name);
        if (selectedIndex === -1) {
            setSelected([name]);
            setSelectedRow(row);
        }
        else {
            setSelected([]);
            setSelectedRow([]);
        }


    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };

    const isSelected = (name) => selected.indexOf(name) !== -1;

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
    console.log(productInfos)

    return (
        <div className={classes.root}>

            <Paper className={classes.paper}>
                <div className='App-title' >
                    <h1 >上架商品一覽表</h1>
                </div>
                <EnhancedTableToolbar numSelected={selected.length} selected={selected} selectedRow={selectedRow} setSelectedRow={setSelectedRow} fetchProductInfos={fetchProductInfos} userName={userName} setItemEdit={setItemEdit} />
                <TableContainer>
                    <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                        size={dense ? 'small' : 'medium'}
                        aria-label="enhanced table"
                    >
                        <EnhancedTableHead
                            classes={classes}
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                        />
                        <TableBody>
                            {stableSort(rows, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const isItemSelected = isSelected(row._id);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            onClick={(event) => handleClick(event, row._id, row)}
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row._id}
                                            selected={isItemSelected}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    checked={isItemSelected}
                                                    inputProps={{ 'aria-labelledby': labelId }}
                                                />
                                            </TableCell>
                                            <TableCell component="th" id={labelId} scope="row" padding="none">
                                                {row.productName}
                                            </TableCell>
                                            <TableCell align="right">{row.address}</TableCell>
                                            <TableCell align="right"><img src={row.img[0]['0']}></img></TableCell>
                                            <TableCell align="right"><img src={row.img[0]['1']}></img></TableCell>
                                            {/* <TableCell align="right"><img src={row.imageUrl}></img></TableCell>
                                            <TableCell align="right"><img src={row.avatarUrl}></img></TableCell> */}
                                            <TableCell align="right">{row.traderName}</TableCell>
                                            <TableCell align="right">{row.discription}</TableCell>
                                            <TableCell align="right">{row.expirationDate}</TableCell>
                                            <TableCell align="right">{row.onSalePrice}</TableCell>
                                            <TableCell align="right">{row.originalPrice}</TableCell>
                                            <TableCell align="right">{row.quantity}</TableCell>
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
            <FormControlLabel
                control={<Switch checked={dense} onChange={handleChangeDense} />}
                label="Dense padding"
            />


        </div>

    );
}