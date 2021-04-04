import React, { useState, useEffect, useMemo, createContext } from "react";
import { getToken, removeToken } from "../helpers/auth";

const UserContext = createContext();

export const UserProvider = (props) => {
  const [user, setUser] = useState({});
  const [token, setToken] = useState(getToken());
  const logOut = () => {
    removeToken();
    return setToken(null);
  };

  //borrar todas las suscripciones para evitar advertencias de pérdida de memoria
  useEffect(() => {}, [token]);
  //Memorized token
  const value = useMemo(() => {
    return {
      user,
      setUser,
      token,
      setToken,
      logOut,
    };
  }, [user, token]);
  return <UserContext.Provider value={value} {...props}></UserContext.Provider>;
};

export const useUser = () => {
  const context = React.useContext(UserContext);
  if (!context) {
    throw new Error("useUser not found");
  }
  return context;
};
