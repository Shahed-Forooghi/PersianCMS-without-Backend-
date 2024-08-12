import { useEffect, useState } from "react";
import ErrorBox from "../ErrorBox/ErrorBox";
import UsersTable from "./UsersTable/UsersTable";

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = () => {
    fetch(`http://localhost:8000/api/users`)
      .then((res) => res.json())
      .then((result) => {
        setUsers(result);
        console.log(result);
      });
  };

  const removeUser = (userID) => {
    fetch(`http://localhost:8000/api/users/${userID}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        getAllUsers();
      });
  };

  const editUser = (updateUser , userID) => {
    console.log(userID);
    console.log(updateUser);
    console.log(users);
    fetch(`http://localhost:8000/api/users/${userID}`, {
      method: "PUT",
      headers : {'Content-Type' : 'application/json'},
      body: JSON.stringify(updateUser),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result), getAllUsers();
      });
  };

  return (
    <div>
      <h1 className="text-2xl sm:text-4xl mt-10">کاربران</h1>
      {users.length ? (
        <UsersTable users={users} removeUser={removeUser} editUser={editUser} />
      ) : (
        <ErrorBox msg={"هیچ کاربری یافت نشد ."} />
      )}
    </div>
  );
}
