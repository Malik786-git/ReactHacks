import React, { useEffect, useReducer } from "react";

// Define initial state for the reducer
const initialState = {
  users: [],
  loader: true,
  error: ""
};


// Define reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USERS":
      return { ...state, users: action.payload, loader: false };
    case "SET_ERROR":
      return { ...state, error: action.payload, loader: false };
    case "SET_LOADER":
      return { ...state, loader: action.payload };
    default:
      return state;
  }
};

const OptimizeState = () => {
  // Use useReducer hook to manage state
  const [state, dispatch] = useReducer(reducer, initialState);

  const getUsers = async () => {
    try {
      const res = await fetch("https://fakestoreapi.com/products");
      const data = await res.json();
      dispatch({ type: "SET_USERS", payload: data });
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.message });
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  if (state.error) {
    return (
      <div>
        <h1>{state.error}</h1>
      </div>
    );
  }
  return (
    <div>
      <h1>Manage States</h1>
      <br />
      {state.loader ? (
        <h2>Loading...</h2>
      ) : (
        state.users && state.users.map((user) => <h3 key={user.id}>{user.title}</h3>)
      )}
    </div>
  );
};

export default OptimizeState;
