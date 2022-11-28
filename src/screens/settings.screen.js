import { useContext } from "react";

import { RewardListContext } from "../services/reward-list.context";
import { RewardView, RewardButton } from "../styles/reward.styles";
import { Spacer } from "../components/spacer-component";

export const SettingsScreen = () => {
  const { resetToDefault, clearLists } = useContext(RewardListContext);

  return (
    <RewardView>
      <Spacer size="xxl">
        <RewardButton
          onPress={() => resetToDefault()}
          title="Reset All Reward Lists to Defaults"
        />
      </Spacer>
      <Spacer size="large">
        <RewardButton
          onPress={() => clearLists()}
          title="Clear All Reward Lists"
        />
      </Spacer>
    </RewardView>
  );
};
