import { useContext } from "react";

import { DashContext } from "../providers/DashBoardContext";

export const useAuth = () => {
  const authContext = useContext(DashContext);

  return authContext;
};
