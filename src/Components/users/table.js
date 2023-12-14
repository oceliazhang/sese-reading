import React, { useState, useEffect } from "react";
import { BsFillCheckCircleFill, BsPencil, BsTrash3Fill, BsPlusCircleFill }
  from "react-icons/bs";
import * as client from "./client";
import { Link } from "react-router-dom";
function UserTable() {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({ username: "", password: "", role: "USER" });
  const createUser = async () => {
    try {
      const newUser = await client.createUser(user);
      setUsers([newUser, ...users]);
    } catch (err) {
      console.log(err);
    }
  };
  const selectUser = async (user) => {
    try {
      const u = await client.findUserById(user._id);
      setUser(u);
    } catch (err) {
      console.log(err);
    }
  };
  const updateUser = async () => {
    try {
      const status = await client.updateUser(user);
      setUsers(users.map((u) => (u._id === user._id ? user : u)));
    } catch (err) {
      console.log(err);
    }
  };
  const deleteUser = async (user) => {
    try {
      await client.deleteUser(user);
      setUsers(users.filter((u) => u._id !== user._id));
    } catch (err) {
      console.log(err);
    }
  };
  const fetchUsers = async () => {
    const users = await client.findAllUsers();
    setUsers(users);
  };
  useEffect(() => { fetchUsers(); }, []);
  return (
    <div className="text-center">
      <table className="table mx-auto">
        <thead>
          <tr>
            <th>Username</th>
            <th>Password</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>User Role</th>
          </tr>
          <tr>
            <td>
              <input className="w-75" value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })}/>
            </td>
            <td>
                <input className="w-75" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })}/>
            </td>
            <td>
              <input className="w-75" value={user.firstName} onChange={(e) => setUser({ ...user, firstName: e.target.value })}/>
            </td>
            <td>
              <input className="w-75" value={user.lastName} onChange={(e) => setUser({ ...user, lastName: e.target.value })}/>
            </td>
            <td>
              <select value={user.role} onChange={(e) => setUser({ ...user, role: e.target.value })}>
                <option value="USER">User</option>
                <option value="admin">Admin</option>
                <option value="reader">Reader</option>
                <option value="author">Author</option>
              </select>
            </td>
            <td className="text-nowrap">
              <BsFillCheckCircleFill onClick={updateUser}
                className="me-2 text-primary fs-1 text" />
              <BsPlusCircleFill onClick={createUser}
                className="text-success fs-1 text" />
            </td>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <Link to={`/project/account/${user._id}`}>
                {user.username}
              </Link>
              <td>{user.password}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.role}</td>
              <td>
                <td className="text-nowrap">
                <button className="btn btn-danger w-50 me-2">
                  <BsTrash3Fill onClick={() => deleteUser(user)} />
                </button>
                <button className="btn btn-warning w-50 me-2">
                  <BsPencil onClick={() => selectUser(user)} />
                </button>
              </td>
              </td>
            </tr>))}
        </tbody>
      </table>
    </div>
  );
}
export default UserTable;
