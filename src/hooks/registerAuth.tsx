import { useContext } from "react";
import { RegisterContext } from "../providers/RegisterContext";

export const useAuth = () => {
  const authContext = useContext(RegisterContext);

  return authContext;
};
