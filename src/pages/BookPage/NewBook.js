import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// @antd
import { Button, Form, Input, InputNumber, Row, Col, Select } from "antd";
import { upLoadAllImage } from "../../firebase/firebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ====================================================

const { TextArea } = Input;

const { Option } = Select;

function NewBook() {
  const [form] = Form.useForm();
  const [dataCate, SetDataCate] = useState([{ data: [] }]);
  const [dataPub, SetDataPub] = useState([{ data: [] }]);
  const [previewUrls, setPreviewUrls] = useState([]);

  const navigate = useNavigate();

  const APIUrlCate = "https://localhost:44301/api/categories/cus";
  const APIUrlPublisher = "https://localhost:44301/api/publishers/cus";

  useEffect(() => {
    fetch(APIUrlCate + "?page=1&pageSize=25")
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        return response.json();
      })
      .then((responseData) => {
        SetDataCate(responseData.data);
      });
    fetch(APIUrlPublisher + "?page=1&pageSize=25")
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        return response.json();
      })
      .then((responseData) => {
        SetDataPub(responseData.data);
      });
  }, []);

  const onFilesUploadChange = async (e) => {
    const fileInput = e.target;

    if (!fileInput.files) {
      alert("No files were chosen");
      return;
    }

    if (!fileInput.files || fileInput.files.length === 0) {
      alert("Files list is empty");
      return;
    }

    /** Files validation */
    const validFiles = [];
    for (let i = 0; i < fileInput.files.length; i++) {
      const file = fileInput.files[i];

      if (!file.type.startsWith("image")) {
        alert(`File with idx: ${i} is invalid`);
        continue;
      }

      validFiles.push(file);
    }

    if (!validFiles.length) {
      alert("No valid files were chosen");
      return;
    }

    upLoadAllImage(validFiles, setPreviewUrls);
  };

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  const [name, SetName] = useState("");
  const [isbn, SetISBN] = useState("");
  const [author, SetAuthor] = useState("");
  const [releaseYear, SetReleaseYear] = useState("");
  const [version, SetVersion] = useState(0);
  const [price, SetPrice] = useState(0);
  const [description, SetDescription] = useState("");
  const [amount, SetAmount] = useState(0);
  const [categoryId, SetCategoryId] = useState("");
  const [publisherId, SetPublisherId] = useState("");
  const handleSelectCategory = (value) => {
    SetCategoryId(value);
  };

  const handleSelectPublisher = (value) => {
    SetPublisherId(value);
  };

  function handleInputVersion(value) {
    SetVersion(value);
  }

  function handleInputPrice(value) {
    SetPrice(value);
  }

  function handleInputAmount(value) {
    SetAmount(value);
  }

  const handleCreate = async () => {
    // event.preventDefault();
    let addData = {
      name: name,
      isbn: isbn,
      author: author,
      releaseYear: releaseYear,
      version: version,
      price: price,
      description: description,
      amount: amount,
      categoryId: parseInt(categoryId),
      publisherId: parseInt(publisherId),
    };

    const response = await fetch("https://localhost:44301/api/books/book", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(addData),
    });
    const dataRes = await response.json();

    try {
      const promises = previewUrls.map((url) => {
        const createBookImage = {
          imgPath: url,
          bookId: dataRes.data,
        };
        console.log("CreateBookImage: ", createBookImage);
        return fetch("https://localhost:44301/api/book-images/book-image", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(createBookImage),
        });
      });
      const response = await Promise.all(promises);
      if (response != null) {
        toast.success("Create Successfully!");
        navigate("/dashboard/book");
      } else {
        alert("Create failed!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form
      form={form}
      autoComplete="off"
      layout="vertical"
      name="form_in_modal"
      onFinish={onFinish}
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
        <Input
          placeholder="Type your name"
          onChange={(e) => SetName(e.target.value)}
        />
      </Form.Item>

      <Form.Item
        name="isbn"
        label="ISBN"
        rules={[{ required: true, message: "Please input ISBN" }]}
      >
        <Input
          placeholder="Type your ISBN"
          onChange={(e) => SetISBN(e.target.value)}
        />
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
        <Input
          placeholder="Type your author"
          onChange={(e) => SetAuthor(e.target.value)}
        />
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
        <Input
          placeholder="Type your release"
          onChange={(e) => SetReleaseYear(e.target.value)}
        />
      </Form.Item>

      <Row gutter={8}>
        <Col span={8}>
          <Form.Item label="Version">
            <Form.Item
              name="version"
              rules={[
                {
                  required: true,
                  message: "Please type your version number",
                },
              ]}
              noStyle
            >
              <InputNumber
                min={1}
                max={20}
                onChange={handleInputVersion}
                value={version}
              />
            </Form.Item>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Price">
            <Form.Item
              name="price"
              rules={[
                {
                  required: true,
                  message: "Please type your price number",
                },
              ]}
              noStyle
            >
              <InputNumber min={0} onChange={handleInputPrice} value={price} />
            </Form.Item>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Amount">
            <Form.Item
              name="amount"
              rules={[
                {
                  required: true,
                  message: "Please type your amount number",
                },
              ]}
              noStyle
            >
              <InputNumber
                min={1}
                max={3000}
                onChange={handleInputAmount}
                value={amount}
              />
            </Form.Item>
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        label="Upload"
        rules={[
          {
            required: true,
            message: "Please upload your image",
          },
          { min: 1 },
        ]}
        valuePropName="fileList"
      >
        <input
          className="block w-0 h-0"
          type="file"
          onChange={onFilesUploadChange}
          multiple
          hidden
        />
      </Form.Item>

      <Form.Item
        name="categoryName"
        label="Category"
        hasFeedback
        rules={[{ required: true, message: "Please select your category" }]}
      >
        <Select
          placeholder="Please select a category"
          // value={categoryId}
          onSelect={handleSelectCategory}
        >
          {dataCate.map((option) => (
            <Option key={option.id} value={option.id}>
              {option.name}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        name="publisherName"
        label="Publisher"
        hasFeedback
        rules={[{ required: true, message: "Please select your publisher" }]}
      >
        <Select
          placeholder="Please select a publisher"
          // value={publisherId}
          onSelect={handleSelectPublisher}
          defaultActiveFirstOption
        >
          {dataPub.map((option) => (
            <Option key={option.id} value={option.id}>
              {option.name}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        name="description"
        label="Description"
        rules={[{ whitespace: true }]}
        requiredMark="optional"
      >
        <TextArea
          placeholder="Type something"
          rows={4}
          showCount
          maxLength={500}
          onChange={(e) => SetDescription(e.target.value)}
        />
      </Form.Item>
      <Button type="primary" htmlType="submit" onClick={handleCreate}>
        Create
      </Button>
    </Form>
  );
}

export default NewBook;
