import { useContext } from "react";
import { LoginContext } from "../providers/LoginContext";

export const useAuth = () => {
  const authContext = useContext(LoginContext);

  return authContext;
};
