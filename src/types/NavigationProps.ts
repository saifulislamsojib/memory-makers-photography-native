import { MaterialBottomTabScreenProps } from "@react-navigation/material-bottom-tabs";

type RootParamList = {
  Home: undefined;
  SignUp: undefined;
  SignIn: undefined;
  SignOut: undefined;
};

type NavigationProps<T extends keyof RootParamList> =
  MaterialBottomTabScreenProps<RootParamList, T>;

export default NavigationProps;
