import React from 'react'
import { useNavigate, useParams } from 'react-router-dom' 
import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Button,
  Popover,
  // Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
} from '@mui/material';
// components
import Label from '../../components/label';
import Iconify from '../../components/iconify';
import Scrollbar from '../../components/scrollbar';
// sections
import { UserListHead, UserListToolbar } from '../../sections/@dashboard/user';
import { fontWeight } from '@mui/system';
// mock

const TABLE_HEAD = [
  { id: 'id', label: 'Id', alignRight: false },
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'quantity', label: 'Quantity', alignRight: false },
  { id: 'price', label: 'Price', alignRight: false },
  { id: '' },
];

// ----------------------------------------------------------------------

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

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function PaidPage() {
  const {orderId} = useParams();
  const ordId = parseInt(orderId);
    // console.log(ordId);
  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('desc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('id');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [data, setData] = useState([{"data" : []}]);
  const [dataOrder, setDataOrder] = useState([{"data": {}}])

  const [loading, setLoading] = useState(true);
 
  const [error, setError] = useState(null);

  const APIUrl = "https://localhost:44301/api/order-details/";
  const APIUrlOrder = "https://localhost:44301/api/orders/admin/order/";

  useEffect(() => {
    
    const fetchDataOrderDetail = async () => {
      const res = await fetch(
        APIUrl + ordId
      );
      const data = await res.json();
      setData(data.data);
    };
    fetchDataOrderDetail();

    const fetchDataOrder = async () => {
      const res = await fetch(
        APIUrlOrder + ordId
      );
      const data = await res.json();
      setDataOrder(data.data);
    }
    fetchDataOrder();
  }, []);
  console.log(data);
  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = data.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  const filteredUsers = applySortFilter(data, getComparator(order, orderBy), filterName);
  console.log(filteredUsers)

  const isNotFound = !filteredUsers.length && !!filterName;

  const navigate = useNavigate();
  const handleChangeStatusToPaid = async () => {
    const response = await fetch('https://localhost:44301/api/orders/order/order-status/paid?orderId='+ordId, {
      method: 'PUT',
      body: JSON.stringify({ /* data to be sent in the request body */ }),
      // headers: { 'Content-Type': 'application/json' }
    })
    navigate('/dashboard/order');
  }

  const handleReturnToListOrder = async () => {
    navigate('/dashboard/order');
  }

  return (
    <>
      <Helmet>
        <title> Order Detail | Minimal UI </title>
      </Helmet>

        {loading && <div>A moment please...</div>}
        {error && (
        <div>{`There is a problem fetching the post data - ${error}`}</div>
        )}

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Order Detail
          </Typography>
        </Stack>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Do you want to paid the order?
          </Typography>
        </Stack>

        <Card>
          <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={data.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    // const { id, name, email, imgPath, isActive } = row;
                    const selectedUser = selected.indexOf(row.id) !== -1;

                    return (
                      <TableRow hover key={row.id} tabIndex={-1} role="checkbox" selected={selectedUser}>
                        {/* <TableCell padding="checkbox">
                          <Checkbox checked={selectedUser} onChange={(event) => handleClick(event, id)} />
                        </TableCell> */}

                        <TableCell align="left">{row.id}</TableCell>

                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            {row.ebookId != null ? 
                            <Typography variant="subtitle2" noWrap>
                              {row.eBookName} <Label color={('error')}>Ebook</Label>
                            </Typography> : row.bookId != null ? 
                            <Typography variant="subtitle2" noWrap>
                              {row.bookName} <Label color={('success')}>Physical Book</Label>
                            </Typography> : row.comboBookId != null ?
                            <Typography variant="subtitle2" noWrap>
                            {row.comboBookName} <Label color={('warning')}>Combo Book</Label>
                          </Typography> : <></>}
                          </Stack>
                        </TableCell>

                        <TableCell align="left">{row.quantity}</TableCell>

                        <TableCell align="left">
                          {/* {isActive === true ? <Label color={('success')}>Active</Label> : <Label color={('error')}>Inactive</Label>} */}
                          {row.priceBook != null ? 
                          <Typography variant="subtitle2" noWrap>
                            {row.quantity * row.priceBook}
                          </Typography> : row.priceEBook != null ?
                          <Typography variant="subtitle2" noWrap>
                            {row.quantity * row.priceEBook}
                          </Typography> : row.priceCombo != null ?
                          <Typography variant="subtitle2" noWrap>
                            {row.quantity * row.priceCombo}
                          </Typography> : <></>
                          }   
                        </TableCell>

                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                            textAlign: 'center',
                          }}
                        >
                          <Typography variant="h6" paragraph>
                            Not found
                          </Typography>

                          <Typography variant="body2">
                            No results found for &nbsp;
                            <strong>&quot;{filterName}&quot;</strong>.
                            <br /> Try checking for typos or using complete words.
                          </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
                <TableBody>
                  <TableRow>
                    <TableCell align="center" style={{fontWeight: 'bold'}}>Total Bill: </TableCell>
                    <TableCell align="left" style={{fontWeight: 'bold'}}>{dataOrder.totalPrice}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Button onClick={handleChangeStatusToPaid}>Paid</Button>
                    </TableCell>
                    <TableCell>
                      <Button onClick={handleReturnToListOrder}>Return</Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>

    </>
  )
}
 