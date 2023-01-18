import { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { AuthenticationContext } from "./authentication.context";
import { strings } from "./strings";
export const RewardListContext = createContext();

export const RewardListContextProvider = ({ children }) => {
  const { user } = useContext(AuthenticationContext);
  const [rewardLists, setRewardLists] = useState(null);
  const JUST_JOY_TYPE = "just_joy";
  const rewardTypes = {
    NICE: "nice",
    GOOD: "good",
    GREAT: "great",
    SPECIAL: "special",
  };
  const slotTypes = {
    NORMAL: "normal",
    SPECIAL: "special",
  };
  const niceCount = 15;
  const goodCount = 6;
  const greatCount = 2;
  const specialCount = 1;
  const rewardSlots = {
    normal: [
      { slot: 25, type: JUST_JOY_TYPE }, // 25% change
      { slot: 75, type: rewardTypes.NICE }, // 50% change (75-25)
      { slot: 95, type: rewardTypes.GOOD }, // 20% change (95-75)
      { slot: 100, type: rewardTypes.GREAT }, // 5% change (100-95)
    ],
    special: [
      { slot: 75, type: rewardTypes.GREAT }, // 75% change
      { slot: 100, type: rewardTypes.SPECIAL }, // 25% change (100-75)
    ],
  };

  const createDefaultList = (count, type) => {
    return Array.apply(null, { length: count })
      .map(Number.call, Number)
      .map((number) => {
        return { key: "DEFAULT_" + type.toUpperCase() + "_" + (number + 1) };
      });
  };

  const setDefaultRewardLists = () => {
    setRewardLists(null);
    setRewardLists({
      [rewardTypes.NICE]: createDefaultList(niceCount, rewardTypes.NICE),
      [rewardTypes.GOOD]: createDefaultList(goodCount, rewardTypes.GOOD),
      [rewardTypes.GREAT]: createDefaultList(greatCount, rewardTypes.GREAT),
      [rewardTypes.SPECIAL]: createDefaultList(
        specialCount,
        rewardTypes.SPECIAL
      ),
    });
  };

  const clearRewardLists = () => {
    setRewardLists({
      [rewardTypes.NICE]: [],
      [rewardTypes.GOOD]: [],
      [rewardTypes.GREAT]: [],
      [rewardTypes.SPECIAL]: [],
    });
  };

  useEffect(() => {
    const saveRewardList = async (list) => {
      try {
        const saveKey = "@rewardlists-" + user;
        const saveValue = JSON.stringify(rewardLists);
        await AsyncStorage.setItem(saveKey, saveValue);
      } catch (e) {
        console.error("error storing reward list");
      }
    };

    if (user && rewardLists !== null) {
      saveRewardList(rewardLists);
    }
  }, [rewardLists, user]);

  useEffect(() => {
    const loadRewardList = async () => {
      try {
        const loadKey = "@rewardlists-" + user;
        const loadValue = await AsyncStorage.getItem(loadKey);
        if (loadValue !== "null") {
          setRewardLists(JSON.parse(loadValue));
        }
      } catch (e) {
        console.error("error loading reward list");
      }
    };

    if (user) {
      loadRewardList();
    }
  }, [user]);

  const add = (rewardType, reward) => {
    if (!rewardLists) {
      setRewardLists({ [rewardType]: [{ key: reward }] });
    } else if (!rewardLists[rewardType]) {
      setRewardLists({ ...rewardLists, [rewardType]: [{ key: reward }] });
    } else {
      setRewardLists({
        ...rewardLists,
        [rewardType]: [...rewardLists[rewardType], { key: reward }],
      });
    }
  };

  const remove = (rewardType, reward) => {
    const newRewardList = rewardLists[rewardType].filter(
      (x) => x.key !== reward
    );

    setRewardLists({ ...rewardLists, [rewardType]: newRewardList });
  };

  const getRandomReward = (rewardType) => {
    const getRewardString = (type, index) => {
      let rewardString = rewardLists[type][index].key;
      if (rewardString.startsWith("DEFAULT_")) {
        rewardString = strings[rewardString];
      }
      return rewardString;
    };

    if (!rewardType) {
      rewardType = rewardTypes.NICE;
    }
    if (rewardType === JUST_JOY_TYPE) {
      return strings.JOY_REWARD;
    }
    if (rewardLists[rewardType].length > 0) {
      const randomIndex = Math.floor(
        Math.random() * rewardLists[rewardType].length
      );

      return getRewardString(rewardType, randomIndex);
    } else {
      return strings.ERROR_LIST_EMPTY;
    }
  };

  const getRewardType = (level) => {
    const rewardSlot = Math.random();
    const rewardLevelSlots = rewardSlots[level];

    const index = rewardLevelSlots.findIndex(
      (slot) => rewardSlot * 100 < slot.slot
    );
    return rewardLevelSlots[index].type;
  };

  const getRandomOrNoReward = () => {
    return getRandomReward(getRewardType(slotTypes.NORMAL));
  };

  const getSpecialReward = () => {
    return getRandomReward(getRewardType(slotTypes.SPECIAL));
  };

  return (
    <RewardListContext.Provider
      value={{
        rewardTypes,
        rewardLists,
        addToList: add,
        removeFromList: remove,
        getRandomReward,
        getRandomOrNoReward,
        resetToDefault: setDefaultRewardLists,
        clearLists: clearRewardLists,
        getSpecialReward,
      }}
      l
    >
      {children}
    </RewardListContext.Provider>
  );
};
