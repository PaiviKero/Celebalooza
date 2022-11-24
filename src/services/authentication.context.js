import React, { createContext, useState } from "react";

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const onLogin = () => {
    setUser("defUser");
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
