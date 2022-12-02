import { useContext } from "react";
import { Text } from "react-native";

import { RewardListContext } from "../services/reward-list.context";
import { LocalizationContext } from "../services/localization.context";
import { RewardView, RewardButton, AddButton } from "../styles/reward.styles";
import { Spacer } from "../components/spacer-component";
import { strings } from "../services/strings";

export const SettingsScreen = () => {
  const { resetToDefault, clearLists } = useContext(RewardListContext);
  const { appLanguage, setAppLanguage } = useContext(LocalizationContext);

  const handleSetLanguage = async (language) => {
    setAppLanguage(language);
  };

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
        {strings.getAvailableLanguages().map((item) => (
          <Spacer size="small">
            <AddButton onPress={() => handleSetLanguage(item)} title={item} />
            {appLanguage === item ? <Text>√</Text> : null}
          </Spacer>
        ))}
      </Spacer>
    </RewardView>
  );
};
