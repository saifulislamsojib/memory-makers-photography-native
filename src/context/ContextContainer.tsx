import React, { FC, useEffect, useReducer } from "react";
import { getUser } from "../auth/authManager";
import { privateLoading, userSuccess } from "../reducers/userActions";
import userReducer, { initialState } from "../reducers/userReducer";
import context from "./context";

const ContextContainer: FC = ({ children }) => {
  const [loggedInUser, userDispatch] = useReducer(userReducer, initialState);

  useEffect(() => {
    const unsubscribe = getUser((user) => {
      if (user) {
        userDispatch(userSuccess(user));
      } else {
        userDispatch(privateLoading());
      }
    });
    return unsubscribe;
  }, []);

  const value = {
    loggedInUser,
    userDispatch,
  };

  return <context.Provider value={value}>{children}</context.Provider>;
};

export default ContextContainer;
