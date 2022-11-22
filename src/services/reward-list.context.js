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

  return (
    <RewardListContext.Provider
      value={{
        rewardList,
        addToList: add,
      }}
    >
      {children}
    </RewardListContext.Provider>
  );
};
