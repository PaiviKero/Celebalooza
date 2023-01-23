import { useContext, useState } from "react";

import { AuthenticationContext } from "../services/authentication.context";

import { RewardView, RewardButton, RewardInput } from "../styles/reward.styles";
import { Spacer } from "../components/spacer-component";
import { strings } from "../services/strings";

export const LoginScreen = ({ navigation }) => {
  const { onLogin } = useContext(AuthenticationContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <RewardView>
      <Spacer size="xxl" />
      <RewardInput
        label={strings.LOGIN_ID}
        value={username}
        autoCapitalize="none"
        onChangeText={(t) => {
          setUsername(t);
        }}
      />
      <Spacer size="xl" />
      <RewardInput
        label={strings.LOGIN_PASSWORD}
        value={password}
        textContentType="password"
        secureTextEntry
        autoCapitalize="none"
        onChangeText={(t) => {
          setPassword(t);
        }}
      />
      <Spacer size="xl">
        <RewardButton
          onPress={() => onLogin(username, password)}
          title={strings.LOGIN}
        />
      </Spacer>
    </RewardView>
  );
};
