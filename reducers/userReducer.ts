import { IUserAction, userType } from "./userActions";

export interface IUser {
  name: string | undefined;
  email: string | null | undefined;
  photo: string | null | undefined;
  emailVerified: boolean | undefined;
}

export interface IUserState {
  user: IUser;
  error: string;
  loading: boolean;
  privateLoading: boolean;
}

export const initialState: IUserState = {
  user: {} as IUser,
  loading: false,
  privateLoading: true,
  error: "",
};

const userReducer = (state = initialState, action: IUserAction): IUserState => {
  switch (action.type) {
    case userType.AUTH_USER_LOADING:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case userType.AUTH_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        loading: false,
        privateLoading: false,
        error: "",
      };
    case userType.AUTH_PRIVATE_LOADING:
      return {
        ...state,
        loading: false,
        privateLoading: false,
        error: "",
      };
    case userType.AUTH_USER_FAILURE:
      return {
        ...state,
        user: {} as IUser,
        loading: false,
        error: action.payload,
      };
    case userType.AUTH_USER_LOGOUT:
      return {
        ...state,
        user: {} as IUser,
        loading: false,
        error: "",
      };
    default:
      return state;
  }
};

export default userReducer;
