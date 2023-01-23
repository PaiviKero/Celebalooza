import { createContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { strings } from "./strings";

const APP_LANGUAGE_KEY = "appLanguage_";

export const LocalizationContext = createContext({
  strings,
  setAppLanguage: () => {},
  appLanguage: strings.getInterfaceLanguage(),
  initializeAppLanguage: () => {},
});

export const LocalizationProvider = ({ children }) => {
  const [appLanguage, setAppLanguage] = useState(
    strings.getInterfaceLanguage()
  );

  const setLanguage = (user, language) => {
    strings.setLanguage(language);
    setAppLanguage(language);
    AsyncStorage.setItem(APP_LANGUAGE_KEY + user, language);
  };

  const initializeAppLanguage = async (user) => {
    const currentLanguage = await AsyncStorage.getItem(APP_LANGUAGE_KEY + user);

    if (!currentLanguage) {
      let localeCode = strings.getInterfaceLanguage();
      setLanguage(user, localeCode);
    } else {
      setLanguage(user, currentLanguage);
    }
  };

  return (
    <LocalizationContext.Provider
      value={{
        strings,
        setNewAppLanguage: setLanguage,
        appLanguage,
        initializeAppLanguage,
      }}
    >
      {children}
    </LocalizationContext.Provider>
  );
};
