import { createContext, useState } from "react";

export const RewardListContext = createContext();

export const RewardListContextProvider = ({ children }) => {
  const [rewardList, setRewardList] = useState([
    { key: "Go eat out" },
    { key: "Buy something nice" },
    { key: "Cook your favorite meal" },
    { key: "Eat a bit of ice-cream" },
    { key: "Eat a bit of chocolate" },
    { key: "Take a nap" },
    { key: "Take a bath" },
    { key: "Watch your favorite Netflix series" },
    { key: "Watch a movie" },
    { key: "Read a book" },
    { key: "Do a nonogram" },
    { key: "Go for a walk" },
    { key: "Go for a bike ride / swim" },
    { key: "Have a glass of smoothie" },
    { key: "Have a glass of juice" },
    { key: "Have a cup of yummy tea" },
    { key: "Eat a fruit" },
    { key: "Eat a protein bar" },
    { key: "Listen to a song" },
    { key: "Dance a bit" },
    { key: "Relax in the warmth of the sun" },
    { key: "Stretch a bit" },
  ]);

  const add = (reward) => {
    setRewardList([...rewardList, { key: reward }]);
  };

  const remove = (reward) => {
    const newRewardList = rewardList.filter((x) => x.key !== reward);

    setRewardList(newRewardList);
  };

  const getRandom = () => {
    const randomIndex = Math.floor(Math.random() * rewardList.length);
    return rewardList[randomIndex].key;
  };

  const getRandomOrNo = () => {
    if (Math.random() > 0.25) {
      return getRandom();
    } else {
      return "This time your reward is the joy of job well done!";
    }
  };

  return (
    <RewardListContext.Provider
      value={{
        rewardList,
        addToList: add,
        removeFromList: remove,
        getRandomReward: getRandom,
        getRandomOrNoReward: getRandomOrNo,
      }}
    >
      {children}
    </RewardListContext.Provider>
  );
};
