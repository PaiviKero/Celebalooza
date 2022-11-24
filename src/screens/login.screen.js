import { useContext } from "react";

import { AuthenticationContext } from "../services/authentication.context";

import { RewardView, RewardButton } from "../styles/reward.styles";
import { Spacer } from "../components/spacer-component";

export const LoginScreen = ({ navigation }) => {
  const { onLogin } = useContext(AuthenticationContext);
  return (
    <RewardView>
      <Spacer size="xxl">
        <RewardButton onPress={() => onLogin()} title="Login" />
      </Spacer>
    </RewardView>
  );
};
