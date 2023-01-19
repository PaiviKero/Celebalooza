import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { LocalizationContext } from "../services/localization.context";

export const AuthenticationContext = createContext();

const LOGIN_KEY = "login_id";

export const AuthenticationContextProvider = ({ children }) => {
  const { initializeAppLanguage } = useContext(LocalizationContext);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      let storedUser = await AsyncStorage.getItem(LOGIN_KEY);
      setUser(storedUser);
    };
    loadUser();
  });

  const onLogin = async () => {
    if (!user) {
      let loginAs = "defUser";
      setUser(loginAs);
      AsyncStorage.setItem(LOGIN_KEY, loginAs);
    }

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
