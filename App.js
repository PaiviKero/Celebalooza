import { Navigation } from "./src/navigation";
import { AuthenticationContextProvider } from "./src/services/authentication.context";
import { LocalizationProvider } from "./src/services/localization.context";

export default function App() {
  return (
    <LocalizationProvider>
      <AuthenticationContextProvider>
        <Navigation />
      </AuthenticationContextProvider>
    </LocalizationProvider>
  );
}
