import { IUser } from "./userReducer";

export enum userType {
  AUTH_USER_SUCCESS = "AUTH_USER_SUCCESS",
  AUTH_USER_FAILURE = "AUTH_USER_FAILURE",
  AUTH_USER_LOADING = "AUTH_USER_LOADING",
  AUTH_PRIVATE_LOADING = "AUTH_PRIVATE_LOADING",
  AUTH_USER_LOGOUT = "AUTH_USER_LOGOUT",
}

interface IUserSuccess {
  type: userType.AUTH_USER_SUCCESS;
  payload: IUser;
}

interface IUserFailure {
  type: userType.AUTH_USER_FAILURE;
  payload: string;
}

interface IUserLoading {
  type: userType.AUTH_USER_LOADING;
}

interface IPrivateLoading {
  type: userType.AUTH_PRIVATE_LOADING;
}

interface IUserLogout {
  type: userType.AUTH_USER_LOGOUT;
}

export type IUserAction =
  | IUserSuccess
  | IUserFailure
  | IUserLoading
  | IUserLogout
  | IPrivateLoading;

export const userSuccess = (user: IUser): IUserAction => {
  return {
    type: userType.AUTH_USER_SUCCESS,
    payload: user,
  };
};

export const userLoading = (): IUserAction => {
  return {
    type: userType.AUTH_USER_LOADING,
  };
};

export const privateLoading = (): IUserAction => {
  return {
    type: userType.AUTH_PRIVATE_LOADING,
  };
};

export const userLogout = (): IUserAction => {
  return {
    type: userType.AUTH_USER_LOGOUT,
  };
};

export const userFailure = (error: string): IUserAction => {
  return {
    type: userType.AUTH_USER_FAILURE,
    payload: error,
  };
};
