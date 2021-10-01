import { createContext } from "react";
import { IUserAction } from "../reducers/userActions";
import { IUserState } from "../reducers/userReducer";

interface RootContext {
  loggedInUser: IUserState;
  userDispatch: React.Dispatch<IUserAction>;
}

const context = createContext({} as RootContext);

export default context;
