import React, { useEffect, useState } from "react";

const ManageState = () => {

  const [users, setUsers] = useState([]);
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState("");

  const getUsers = async () => {
    try {
      const res = await fetch("https://fakestoreapi.com/products");
      const data = await res.json();
      setUsers(data);
      console.log(data, 'data state');
      setLoader(false);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  if (error) {
    return (
        <div>
         <h1>{error}</h1>
        </div>
      );
  }
  return (
    <div>
      <h1>Manage States</h1>
      <br />
      {loader ? (
        <h2>Loading...</h2>
      ) : (
        users.map((user) => <h3 key={user.id}>{user.title}</h3>)
      )}
    </div>
  );
};

export default ManageState;