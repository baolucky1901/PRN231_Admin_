import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { filter } from "lodash";
import { useState, useEffect } from "react";
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
} from "@mui/material";
// components
import Scrollbar from "../../components/scrollbar";
// sections
import { UserListHead, UserListToolbar } from "../../sections/@dashboard/user";
// mock

const TABLE_HEAD = [
  { id: "id", label: "Id", alignRight: false },
  { id: "name", label: "Name", alignRight: false },
  { id: "isbn", label: "Isbn", alignRight: false },
  { id: "author", label: "Author", alignRight: false },
  { id: "categoryName", label: "Category Name", alignRight: false },
  { id: "publisherName", label: "Publisher Name", alignRight: false },
  { id: "" },
];
const TABLE_HEAD_VER_PHYSICAL = [
  { id: "id", label: "Id", alignRight: false },
  { id: "name", label: "Name", alignRight: false },
  { id: "price", label: "Price", alignRight: true },
  { id: "amount", label: "Amount", alignRight: true },
  { id: "author", label: "Author", alignRight: false },
  { id: "categoryName", label: "Category", alignRight: false },
  { id: "publisherName", label: "Publisher", alignRight: false },
  { id: "" },
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
  return order === "desc"
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
    return filter(
      array,
      (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function AddBookToComboPage() {
  const { comboId } = useParams();
  const comId = parseInt(comboId);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState("desc");

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState("id");

  const [filterName, setFilterName] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [dataDetail, setDataDetail] = useState([{ data: [] }]);

  const [data, setData] = useState([{ data: [] }]);

  const APIUrl =
    "https://localhost:44301/api/detail-combo-books/admin/books-of-combo/";
  const APIPhysicalBook =
    "https://localhost:44301/api/books/admin/physical-books?page=1&pageSize=25";

  useEffect(() => {
    const fetchDataFromCombo = async () => {
      const res = await fetch(APIUrl + comId + "?page=1&pageSize=25");
      const data = await res.json();
      console.log(data.data);
      setDataDetail(data.data);
    };
    fetchDataFromCombo();
    const fetchDataPhysicalBook = async () => {
      const res = await fetch(APIPhysicalBook);
      const data = await res.json();
      setData(data.data);
    };
    fetchDataPhysicalBook();
  }, [dataDetail]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
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

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  const filteredUsers = applySortFilter(
    data,
    getComparator(order, orderBy),
    filterName
  );
  console.log(filteredUsers);

  const isNotFound = !filteredUsers.length && !!filterName;

  const navigate = useNavigate();

  const handleReturnToListCombo = async () => {
    navigate("/dashboard/combobook");
  };

  const handleAddToCombo = (e, bookId) => {
    e.preventDefault();
    let addData = { bookId: bookId, comboBookId: comId };
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(addData),
    };
    fetch(
      "https://localhost:44301/api/detail-combo-books/admin/detail-combo-book",
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  };
  const handleDeleteBookFromCombo = (e, bookId) => {
    e.preventDefault();
    console.log(bookId);
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    };
    fetch(
      "https://localhost:44301/api/detail-combo-books/detail-combo-book?id=" +
        bookId,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  };

  return (
    <>
      <Helmet>
        <title> Combo Detail | Minimal UI </title>
      </Helmet>

      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            ComboBook Detail
          </Typography>
        </Stack>

        <Card>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead headLabel={TABLE_HEAD} />
                {dataDetail.length > 0 ? (
                  <TableBody>
                    {dataDetail.map((row) => {
                      return (
                        <TableRow
                          hover
                          key={row.id}
                          tabIndex={-1}
                          role="checkbox"
                        >
                          <TableCell align="left">{row.id}</TableCell>

                          <TableCell component="th" scope="row" padding="none">
                            <Stack
                              direction="row"
                              alignItems="center"
                              spacing={2}
                            >
                              {row.bookName}
                            </Stack>
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack
                              direction="row"
                              alignItems="center"
                              spacing={2}
                            >
                              {row.bookIsbn}
                            </Stack>
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack
                              direction="row"
                              alignItems="center"
                              spacing={2}
                            >
                              {row.bookAuthor}
                            </Stack>
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack
                              direction="row"
                              alignItems="center"
                              spacing={2}
                            >
                              {row.categoryName}
                            </Stack>
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack
                              direction="row"
                              alignItems="center"
                              spacing={2}
                            >
                              {row.publisherName}
                            </Stack>
                          </TableCell>
                          <TableCell>
                            <Button
                              onClick={(e) =>
                                handleDeleteBookFromCombo(e, row.id)
                              }
                            >
                              Delete
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                ) : (
                  <></>
                )}

                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Button onClick={handleReturnToListCombo}>Return</Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>
        </Card>
      </Container>

      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Add Physical Book To Combo
          </Typography>
        </Stack>

        <Card>
          <UserListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD_VER_PHYSICAL}
                  rowCount={data.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  // onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const selectedUser = selected.indexOf(row.id) !== -1;
                      return (
                        <TableRow
                          hover
                          key={row.id}
                          tabIndex={-1}
                          role="checkbox"
                          selected={selectedUser}
                        >
                          <TableCell align="left">{row.id}</TableCell>

                          <TableCell component="th" scope="row" padding="none">
                            <Stack
                              direction="row"
                              alignItems="center"
                              spacing={2}
                            >
                              {row.name}
                            </Stack>
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack
                              direction="row"
                              alignItems="center"
                              spacing={2}
                            >
                              {row.price}
                            </Stack>
                          </TableCell>
                          <TableCell
                            align="center"
                            component="th"
                            scope="row"
                            padding="none"
                          >
                            <Stack
                              direction="row"
                              alignItems="center"
                              spacing={2}
                            >
                              {row.amount}
                            </Stack>
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack
                              direction="row"
                              alignItems="center"
                              spacing={2}
                            >
                              {row.author}
                            </Stack>
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack
                              direction="row"
                              alignItems="center"
                              spacing={2}
                            >
                              {row.categoryName}
                            </Stack>
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack
                              direction="row"
                              alignItems="center"
                              spacing={2}
                            >
                              {row.publisherName}
                            </Stack>
                          </TableCell>

                          <TableCell>
                            <Button
                              onClick={(e) => handleAddToCombo(e, row.id)}
                              style={{ width: 200 }}
                            >
                              Add To Combo
                            </Button>
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
                            textAlign: "center",
                          }}
                        >
                          <Typography variant="h6" paragraph>
                            Not found
                          </Typography>

                          <Typography variant="body2">
                            No results found for &nbsp;
                            <strong>&quot;{filterName}&quot;</strong>.
                            <br /> Try checking for typos or using complete
                            words.
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
