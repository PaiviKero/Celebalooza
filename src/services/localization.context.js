import { createContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { strings } from "./strings";

const APP_LANGUAGE = "appLanguage";

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

  const setLanguage = (language) => {
    strings.setLanguage(language);
    setAppLanguage(language);
    AsyncStorage.setItem(APP_LANGUAGE, language);
  };

  const initializeAppLanguage = async () => {
    const currentLanguage = await AsyncStorage.getItem(APP_LANGUAGE);

    if (!currentLanguage) {
      let localeCode = strings.getInterfaceLanguage();
      setLanguage(localeCode);
    } else {
      setLanguage(currentLanguage);
    }
  };

  return (
    <LocalizationContext.Provider
      value={{
        strings,
        setAppLanguage: setLanguage,
        appLanguage,
        initializeAppLanguage,
      }}
    >
      {children}
    </LocalizationContext.Provider>
  );
};
