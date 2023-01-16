import React, { createContext, useContext, useState } from "react";

import { LocalizationContext } from "../services/localization.context";

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ children }) => {
  const { initializeAppLanguage } = useContext(LocalizationContext);
  const [user, setUser] = useState(null);

  const onLogin = () => {
    setUser("defUser");
    initializeAppLanguage();
  };

  return (
    <AuthenticationContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        onLogin,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
