import { Navigation } from "./src/navigation";
import { AuthenticationContextProvider } from "./src/services/authentication.context";

export default function App() {
  return (
    <AuthenticationContextProvider>
      <Navigation />
    </AuthenticationContextProvider>
  );
}
