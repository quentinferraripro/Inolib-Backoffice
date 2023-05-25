import { createContext, useContext, useState } from "react";

const DashboardContext = createContext();
export default DashboardContext;

export function DashboardContextProvider() {
  const [focused, moveFocus] = useState();
  const [focusable, setFocus] = useState();
  const [selected, setSelected] = useState();
  return <DashboardContext.Provider>{children}</DashboardContext.Provider>;
}

export const useCurrentUserContext = () => useContext(DashboardContext);
