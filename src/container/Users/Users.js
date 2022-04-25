import { Button, TextField } from "@mui/material";
import { message, Modal, Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";

const initialState = {
  name: "",
  age: "",
  email: ""
};

function Users(props) {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(initialState);
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [id, setId] = useState(null);

  const handleAddOpen = () => {
    setUser(initialState);
    setAddOpen(true);
  };

  const handleAddClose = () => {
    setAddOpen(false);
  };

  const handleEditOpen = id => {
    setId(id);
    setEditOpen(true);
    setUser(users.find(e => e.id == id));
  };

  const handleEditClose = () => {
    setEditOpen(false);
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
  };

  const getUsers = async () => {
    try {
      const { data } = await axios.get(
        "https://6264fc9e94374a2c506bde51.mockapi.io/users"
      );
      setUsers(data);
      console.log(data, "data");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const addUser = async () => {
    try {
      const { data } = await axios.post(
        "https://6264fc9e94374a2c506bde51.mockapi.io/users",
        user
      );
    } catch (error) {
      console.error(error);
    }
    getUsers();
    setAddOpen(false);
  };
  console.log("hello");

  const editUser = async () => {
    try {
      const resoponse = await axios.put(
        `https://6264fc9e94374a2c506bde51.mockapi.io/users/${id}`,
        user
      );
    } catch (error) {
      console.error(error);
    }
    getUsers();
    setEditOpen(false);
  };

  const deleteUser = async id => {
    try {
      const resoponse = await axios.delete(
        `https://6264fc9e94374a2c506bde51.mockapi.io/users/${id}`,
        user
      );
    } catch (error) {
      console.error(error);
    }
    getUsers();
  };

  const columns = [
    {
      title: "id",
      dataIndex: "id",
      key: "id"
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age"
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email"
    },
    {
      title: "Edit",
      render: row => {
        return <button onClick={() => handleEditOpen(row.id)}>edit</button>;
      }
    },
    {
      title: "Delete",
      render: row => {
        return <button onClick={() => deleteUser(row.id)}>delete</button>;
      }
    }
  ];

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div>
      <Button onClick={handleAddOpen}>add User</Button>
      <Table
        dataSource={users}
        columns={columns}
        rowKey="id"
        pagination={false}
      />
      <Modal
        title="Add Modal"
        visible={addOpen}
        onOk={addUser}
        onCancel={handleAddClose}
      >
        <TextField
          onChange={handleChange}
          name="name"
          value={user.name}
          variant="standard"
          label="Name"
        />{" "}
        <br /> <br />
        <TextField
          onChange={handleChange}
          name="email"
          value={user.email}
          variant="standard"
          label="Email"
        />{" "}
        <br /> <br />
        <TextField
          onChange={handleChange}
          name="age"
          value={user.age}
          variant="standard"
          label="Age"
        />{" "}
        <br /> <br />
      </Modal>
      <Modal
        title="Edit Modal"
        visible={editOpen}
        onOk={editUser}
        onCancel={handleEditClose}
      >
        <TextField
          onChange={handleChange}
          name="name"
          value={user.name}
          variant="standard"
          label="Name"
        />{" "}
        <br /> <br />
        <TextField
          onChange={handleChange}
          name="email"
          value={user.email}
          variant="standard"
          label="Email"
        />{" "}
        <br /> <br />
        <TextField
          onChange={handleChange}
          name="age"
          value={user.age}
          variant="standard"
          label="Age"
        />{" "}
        <br /> <br />
      </Modal>
    </div>
  );
}

export default Users;
