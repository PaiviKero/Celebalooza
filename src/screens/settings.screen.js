import { useContext } from "react";
import { Text } from "react-native";
import { RadioButton } from "react-native-paper";

import { RewardListContext } from "../services/reward-list.context";
import { LocalizationContext } from "../services/localization.context";
import { AuthenticationContext } from "../services/authentication.context";
import {
  RewardView,
  RewardButton,
  RowContainer,
} from "../styles/reward.styles";
import { Spacer } from "../components/spacer-component";
import { strings } from "../services/strings";

export const SettingsScreen = () => {
  const { resetToDefault, clearLists } = useContext(RewardListContext);
  const { appLanguage, setAppLanguage } = useContext(LocalizationContext);
  const { logOut } = useContext(AuthenticationContext);

  return (
    <RewardView>
      <Spacer size="xxl">
        <RewardButton
          onPress={() => resetToDefault()}
          title={strings.RESET_REWARDS_BUTTON}
        />
      </Spacer>
      <Spacer size="large">
        <RewardButton
          onPress={() => clearLists()}
          title={strings.CLEAR_REWARDS_BUTTON}
        />
      </Spacer>
      <Spacer size="large">
        <Text>{strings.CHOOSE_LANGUAGE}:</Text>
        {strings.getAvailableLanguages().map((language, i) => (
          <RowContainer key={language}>
            <RadioButton
              value={language}
              status={appLanguage === language ? "checked" : "unchecked"}
              onPress={() => {
                setAppLanguage(language);
              }}
            />
            <Text>{language}</Text>
          </RowContainer>
        ))}
      </Spacer>
      <Spacer size="large">
        <RewardButton onPress={() => logOut()} title={strings.LOGOUT} />
      </Spacer>
    </RewardView>
  );
};
