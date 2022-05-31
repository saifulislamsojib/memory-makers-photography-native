import { useContext } from "react";
import context from "../context/context";

const useRootContext = () => {
  return useContext(context);
};

export default useRootContext;
