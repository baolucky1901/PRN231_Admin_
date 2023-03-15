import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { useState, useEffect } from 'react';
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Button,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
} from '@mui/material';
// components
import Label from '../components/label';
import Scrollbar from '../components/scrollbar';
// sections
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';
// mock


const TABLE_HEAD = [
  { id: 'id', label: 'Id', alignRight: false },
  { id: 'customerName', label: 'Customer Name', alignRight: false },
  { id: 'totalPrice', label: 'Total Bill', alignRight: false },
  { id: 'createDate', label: 'Date Created', alignRight: false },
  { id: 'shippingAddress', label: 'Shipping Address', alignRight: false },
  { id: 'paymentMethod', label: 'Payment method', alignRight: false },
  { id: 'orderStatus', label: 'Status', alignRight: false },
  { id: '' },
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
    return filter(array, (_user) => _user.customerName.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}


export default function OrderPage() {

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('desc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('id');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [data, setData] = useState([{"data" : []}]);

  const [loading, setLoading] = useState(true);
 
  const [error, setError] = useState(null);

  const APIUrl = "https://localhost:44301/api/orders/admin?";

  //modal create button

  useEffect(() => {
    fetch(APIUrl+"?page=1&pageSize=25")
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        return response.json();
      })
      .then((responsedata) => {
        setData(responsedata.data); 
        // console.log("Check fetch data", responsedata.data)
      })
      .catch((err) => {
        setError(err.message);
        setData(null);
      })
      .finally(() => {
        setLoading(false);
      });
      
  }, []);

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

  return (
    <>
      <Helmet>
        <title> Order | Minimal UI </title>
      </Helmet>

        {loading && <div>A moment please...</div>}
        {error && (
        <div>{`There is a problem fetching the post data - ${error}`}</div>
        )}

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Order
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
                    const selectedUser = selected.indexOf(row.id) !== -1;

                    return (
                      <TableRow hover key={row.id} tabIndex={-1} role="checkbox" selected={selectedUser}>

                        <TableCell align="left">{row.id}</TableCell>

                        <TableCell component="th" scope="row">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            {/* <Avatar alt={name} src={imgPath} /> */}
                            <Typography variant="subtitle2" noWrap>
                              {row.customerName}
                            </Typography>
                          </Stack>
                        </TableCell>

                        <TableCell component="th" scope="row">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            {/* <Avatar alt={name} src={imgPath} /> */}
                            <Typography variant="subtitle2" noWrap>
                              {row.totalPrice}
                            </Typography>
                          </Stack>
                        </TableCell>

                        <TableCell component="th" scope="row">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            {/* <Avatar alt={name} src={imgPath} /> */}
                            <Typography variant="subtitle2" noWrap>
                              {row.createDate}
                            </Typography>
                          </Stack>
                        </TableCell>

                        <TableCell component="th" scope="row">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            {/* <Avatar alt={name} src={imgPath} /> */}
                            <Typography variant="subtitle2" noWrap>
                              {row.shippingAddress}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell component="th" scope="row">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            {/* <Avatar alt={name} src={imgPath} /> */}
                            <Typography variant="subtitle2" noWrap>
                              {row.paymentMethod}
                            </Typography>
                          </Stack>
                        </TableCell>

                        <TableCell component="th" scope="row">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            {/* <Avatar alt={name} src={imgPath} /> */}
                            <Typography variant="subtitle2" noWrap>
                            {row.orderStatus === "In_Progress" ?
                             <Label color={('warning')}>In_Progress</Label> : row.orderStatus === "Accepted" ?
                             <Label color={('primary')}>Accepted</Label> : row.orderStatus === "Paid" ?
                             <Label color={('default')}>Paid</Label> :  row.orderStatus === "Physical_book_delivered" ?
                             <Label color={('secondary')}>Physical_book_delivered</Label> : row.orderStatus === "Ebook_delivered" ?
                             <Label color={('secondary')}>Ebook_delivered</Label> : row.orderStatus === "Done" ?
                             <Label color={('success')}>Done</Label> : row.orderStatus === "Cancel" ?
                             <Label color={('error')}>Cancel</Label> : <></>
                            }
                            </Typography>
                          </Stack>
                        </TableCell>
                        {row.orderStatus === "In_Progress"? <TableCell align='right'>
                          
                          {row.paymentMethod === "Thanh toán online"?
                            <Button href={`order/accepted-online/${row.id}`}>
                              Accepted
                            </Button>: row.paymentMethod === "Thanh toán khi nhận hàng"?
                            <Button href={`order/accepted/${row.id}`}>
                              Accepted
                            </Button>: <></>
                          }
                          
                        </TableCell>: <></>}
                        {row.orderStatus === "Accepted"?
                        <TableCell align='right'>
                          <Button href={`order/paid/${row.id}`}>Paid</Button>
                        </TableCell>:<></>
                        }
                        {row.orderStatus === "Paid" || row.orderStatus === "Ebook_delivered"?
                        <TableCell align='right'>
                          <Button href={`order/done/${row.id}`}>Done</Button>
                        </TableCell>:<></>
                        }
                        {row.orderStatus === "In_Progress"?
                        <TableCell align='right'>
                          <Button href={`order/cancel/${row.id}`}>Cancel</Button>
                        </TableCell>:<></>
                        }
                        
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
  );
}
