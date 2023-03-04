import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
// @antd
import { PlusOutlined } from '@ant-design/icons';
import { Form, Input, Modal, Radio, InputNumber, Row, Col, Select, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Button,
  Popover,
  Checkbox,
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
import Label from '../components/label';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';
// mock
import USERLIST from '../_mock/user';
import { upLoadAllImage } from "../firebase/firebase";

//firebase


// ----------------------------------------------------------------------

const { TextArea } = Input;

const { Option } = Select;

const TABLE_HEAD = [
  // { id: 'name', label: 'Name', alignRight: false },
  // { id: 'company', label: 'Company', alignRight: false },
  // { id: 'role', label: 'Role', alignRight: false },
  // { id: 'isVerified', label: 'Verified', alignRight: false },
  // { id: 'status', label: 'Status', alignRight: false },
  // { id: '' },
  { id: 'id', label: 'Id', alignRight: false },
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'price', label: 'Price', alignRight: true },
  { id: 'amount', label: 'Amount', alignRight: true },
  { id: 'amountSold', label: 'AmountSold', alignRight: true },
  { id: 'author', label: 'Author', alignRight: false },
  { id: 'categoryName', label: 'Category', alignRight: false },
  { id: 'publisherName', label: 'Publisher', alignRight: false },
  { id: 'isActive', label: 'Active', alignRight: false },
  { id: '' },
  // { id: 'userId', label: 'User Id', alignRight: false },
  // { id: 'id', label: 'Id', alignRight: false },
  // { id: 'title', label: 'Title', alignRight: false },
  // { id: 'body', label: 'Body', alignRight: false },
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

const CollectionCreateForm = ({ open, onCreate, onCancel }) => {
  const [dataCate, SetDataCate] = useState([{"data" : []}]);
  const [dataPub, SetDataPub] = useState([{"data" : []}]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [fileList, setFileList] = useState([]);

  const APIUrlCate = "https://localhost:44301/api/categories/cus?";
  const APIUrlPublisher = "https://localhost:44301/api/publishers/cus?";
  useEffect(() => {
    fetch(APIUrlCate+"?page=1&pageSize=25")
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        return response.json();
      })
      .then((responsedata) => {
        SetDataCate(responsedata.data); 
        // console.log("Check fetch data", responsedata.data)
      });
      fetch(APIUrlPublisher+"?page=1&pageSize=25")
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        return response.json();
      })
      .then((responsedata) => {
        SetDataPub(responsedata.data); 
        // console.log("Check fetch data", responsedata.data)
      })
      
  }, []);


  const handleUpload = ({ file, fileList }) => {
    if (file.status === 'done') {
      console.log(`${file.name} uploaded successfully`);
    } else if (file.status === 'error') {
      console.log(`${file.name} upload failed.`);
    }
    setFileList(fileList);
  };
   
  console.log(fileList);
  // const onFilesUploadChange = async (e) => {
  //   const fileInput = e.target;

  //   if (!fileInput.files) {
  //     alert("No files were chosen");
  //     return;
  //   }

  //   if (!fileInput.files || fileInput.files.length === 0) {
  //     alert("Files list is empty");
  //     return;
  //   }

  //   /** Files validation */
  //   const validFiles = [];
  //   for (let i = 0; i < fileInput.files.length; i++) {
  //     const file = fileInput.files[i];

  //     if (!file.type.startsWith("image")) {
  //       alert(`File with idx: ${i} is invalid`);
  //       continue;
  //     }

  //     validFiles.push(file);
  //   }

  //   if (!validFiles.length) {
  //     alert("No valid files were chosen");
  //     return;
  //   }

  //   upLoadAllImage(validFiles, setPreviewUrls);
  // };
  // console.log("img", previewUrls);

  const [form] = Form.useForm();
  const onOk = () => {
    form.submit();
  };
  return (
    <Modal
      open={open}
      title="Create a new Book"
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
        form={form}
        autoComplete="off"
        layout="vertical"
        name="form_in_modal"
        // initialValues={{
        //   modifier: 'public',
        // }}
      >
        <Form.Item
            name="name"
            label="Name"
            rules={[
              {
                required: true,
                message: "Please enter your name",
              },
              { whitespace: true },
              { min: 3 },
            ]}
            hasFeedback
          >
            <Input placeholder="Type your name"/>
        </Form.Item>

        <Form.Item
            name="isbn"
            label="ISBN"
            rules={[{ required: true, message: 'Please input ISBN' }]}
          >
            <Input placeholder="Type your ISBN"/>
        </Form.Item>

        <Form.Item
            name="author"
            label="Author"
            rules={[
              {
                required: true,
                message: "Please enter your author",
              },
              { whitespace: true },
              { min: 3 },
            ]}
            hasFeedback
          >
            <Input placeholder="Type your author"/>
        </Form.Item>

        <Form.Item
            name="releaseYear"
            label="Release"
            rules={[
              {
                required: true,
                message: "Please enter your release",
              },
              { whitespace: true },
            ]}
            hasFeedback
          >
            <Input placeholder="Type your release"/>
        </Form.Item>

        <Row gutter={8}>
          <Col span={8}>
            <Form.Item label="Version">
              <Form.Item 
                name="version" 
                rules={[{ 
                  required: true, 
                  message: 'Please type your version number' 
                }]} 
                noStyle
              >
                <InputNumber min={1} max={20}/>
              </Form.Item>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Price">
              <Form.Item 
                name="price" 
                rules={[{ 
                  required: true, 
                  message: 'Please type your price number' 
                }]} 
                noStyle
              >
                <InputNumber min={0}/>
              </Form.Item>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Amount">
              <Form.Item 
                name="amount"
                rules={[{ 
                  required: true, 
                  message: 'Please type your amount number' 
                }]} 
                noStyle
                >
                <InputNumber min={1} max={3000}/>
              </Form.Item>
            </Form.Item>
          </Col>
        </Row>

         <Form.Item 
          label="Upload" 
          rules={[
            { 
            required: true, 
            message: 'Please upload your image', 
            },
            { min: 1 },
          ]}
          valuePropName="fileList">
          <Upload beforeUpload={() => false} listType="picture-card" fileList={fileList}
          onChange={handleUpload}>
            <div>
              <PlusOutlined />
              <div
                style={{
                  marginTop: 8,
                }}
              >
                Images
              </div>
            </div>
          </Upload>
          {/* <input
            className="block w-0 h-0"
            type="file"
            onChange={onFilesUploadChange}
            multiple
            hidden
          /> */}
        </Form.Item>

        <Form.Item
          name="categoryName"
          label="Category"
          hasFeedback
          rules={[{ required: true, message: 'Please select your category' }]}
        >
          <Select placeholder="Please select a category">
          {dataCate.map(option => (
            <option key={option.id} value={option.id}>{option.name}</option>
          ))}
            {/* <Option value="1">Computer science and algorithms</Option>
            <Option value="2">Cartoon</Option> */}
          </Select>
        </Form.Item>

        <Form.Item
          name="publisherName"
          label="Publisher"
          hasFeedback
          rules={[{ required: true, message: 'Please select your publisher' }]}
        >
          <Select placeholder="Please select a publisher">
          {dataPub.map(option => (
            <option key={option.id} value={option.id}>{option.name}</option>
          ))}
            {/* <Option value="1">Bach Khoa Ha Noi</Option>
            <Option value="2">Conan</Option> */}
          </Select>
        </Form.Item>

        <Form.Item  
            name="description" 
            label="Description"
            rules={[
              { whitespace: true },
            ]}
            requiredMark="optional"
        >
          <TextArea 
            placeholder="Type something" 
            rows={4} 
            showCount 
            maxLength={500}  
            
          />
        </Form.Item>
        {/* <Form.Item
          name="title"
          label="Title"
          rules={[
            {
              required: true,
              message: 'Please input the title of collection!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input type="textarea" />
        </Form.Item>
        <Form.Item name="modifier" className="collection-create-form_last-form-item">
          <Radio.Group>
            <Radio value="public">Public</Radio>
            <Radio value="private">Private</Radio>
          </Radio.Group>
        </Form.Item> */}
      </Form>
    </Modal>
  );
};

export default function BookPage() {
  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('desc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('id');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [data, setData] = useState([{"data" : []}]);

  const [loading, setLoading] = useState(true);
 
  const [error, setError] = useState(null);

  const APIUrl = "https://localhost:44301/api/books/admin/physical-books";

  //modal create button
  const [openModal, setOpenModal] = useState(false);

  const onCreate = (values) => {
    console.log('Received values of form: ', values);
    // let addData = {name: values.name, isbn: values.isbn, author: values.author, releaseYear: values.releaseYear, version: values.version, price: values.price, description: values.description, amount: values.amount, categoryId: values.categoryName, publisherId: values.publisherName};
    // const requestOptions = {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(addData)
    // };
    // fetch('https://localhost:44301/api/books/book', requestOptions)
    //   .then(response => response.json())
    //   .then(data => previewUrls.map((url) => {
    //     let requestImageData = {
    //       imgPath: url,
    //       requestSellSecondHandId: data.data,
    //     };
    //     console.log(requestImageData);
  
    //     return fetch(
    //       "https://localhost:44301/api/book-images/book-image",
    //       {
    //         method: "POST",
    //         body: JSON.stringify(requestImageData),
    //         headers: { "Content-Type": "application/json" },
    //       }
    //     );
    //   }))
    //   .catch(error => console.error(error));
    setOpenModal(false);
  };

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

  return (
    <>
      <Helmet>
        <title> Book | Minimal UI </title>
      </Helmet>

        {loading && <div>A moment please...</div>}
        {error && (
        <div>{`There is a problem fetching the post data - ${error}`}</div>
        )}

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Book
          </Typography>
          <Button
            variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}
            type="primary"
            onClick={() => {
              setOpenModal(true);
            }}
          >
            New Book
          </Button>
          <CollectionCreateForm
            open={openModal}
            onCreate={onCreate}
            onCancel={() => {
              setOpenModal(false);
            }}
          />
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
                    const { id, name, isbn, author, price, amount, amountSold, categoryName, publisherName,isActive } = row;
                    const selectedUser = selected.indexOf(id) !== -1;

                    return (
                      <TableRow hover key={id} tabIndex={-1} role="checkbox" selected={selectedUser}>
                        {/* <TableCell padding="checkbox">
                          <Checkbox checked={selectedUser} onChange={(event) => handleClick(event, id)} />
                        </TableCell> */}

                        <TableCell align="left">{id}</TableCell>

                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="column" alignItems="start" padding={2} spacing={2}>
                            
                            <Typography variant="subtitle2" noWrap>
                              {name}
                            </Typography>
                            ISBN: {isbn}
                          </Stack>
                        </TableCell>

                        <TableCell align="right">{price}</TableCell>

                        <TableCell align="right">{amount}</TableCell>

                        <TableCell align="right">{amountSold}</TableCell>

                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="start" minWidth={2} padding={2} spacing={2}>
                            <Typography variant="subtitle2" noWrap>
                              {author}
                            </Typography>
                          </Stack>
                        </TableCell>

                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" padding={2} spacing={2}>
                            <Typography noWrap>
                              {categoryName}
                            </Typography>
                          </Stack>
                        </TableCell>

                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" padding={2} spacing={2}>
                            <Typography noWrap>
                              {publisherName}
                            </Typography>
                          </Stack>
                        </TableCell>

                        <TableCell align="left">
                          {isActive === true ? <Label color={('success')}>Active</Label> : <Label color={('error')}>Inactive</Label>}
                        </TableCell>

                        {/* <TableCell align="left">{isVerified ? 'Yes' : 'No'}</TableCell>

                        <TableCell align="left">
                          <Label color={(status === 'banned' && 'error') || 'success'}>{sentenceCase(status)}</Label>
                        </TableCell> */}

                        <TableCell align="right">
                          <IconButton size="large" color="inherit" onClick={handleOpenMenu}>
                            <Iconify icon={'eva:more-vertical-fill'} />
                          </IconButton>
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

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem>
          <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem sx={{ color: 'error.main' }}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}
