import { RewardListScreen } from "./src/screens/reward-list.screen";

import { RewardListContextProvider } from "./src/services/reward-list.context";

export default function App() {
  return (
    <>
      <RewardListContextProvider>
        <RewardListScreen />
      </RewardListContextProvider>
    </>
  );
}
