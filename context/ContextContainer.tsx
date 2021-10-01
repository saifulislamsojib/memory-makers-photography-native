import React, { ReactNode, useEffect, useReducer } from "react";
import { auth, setUser } from "../auth/authManager";
import { privateLoading, userSuccess } from "../reducers/userActions";
import userReducer, { initialState } from "../reducers/userReducer";
import context from "./context";

interface IProps {
  children: ReactNode;
}

const ContextContainer = ({ children }: IProps) => {
  const [loggedInUser, userDispatch] = useReducer(userReducer, initialState);

  useEffect(() => {
    auth().onAuthStateChanged((user) => {
      if (user) {
        userDispatch(userSuccess(setUser(user)));
      } else {
        userDispatch(privateLoading());
      }
    });
  }, []);

  const value = {
    loggedInUser,
    userDispatch,
  };

  return <context.Provider value={value}>{children}</context.Provider>;
};

export default ContextContainer;
