import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { LocalizationContext } from "../services/localization.context";

export const AuthenticationContext = createContext();

const LOGIN_KEY = "login_id";
const PASSWORD_KEY = "login_password";

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

  const onLogin = async (username, password) => {
    if (username && password) {
      let loginAs = username;
      setUser(loginAs);
      AsyncStorage.setItem(LOGIN_KEY, loginAs);
      AsyncStorage.setItem(PASSWORD_KEY, password);
      initializeAppLanguage(username);
    } else {
      setUser(null);
    }
  };

  const logOut = () => {
    if (user) {
      setUser(null);
      AsyncStorage.removeItem(LOGIN_KEY);
      AsyncStorage.removeItem(PASSWORD_KEY);
    }
  };

  return (
    <AuthenticationContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        onLogin,
        logOut,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
