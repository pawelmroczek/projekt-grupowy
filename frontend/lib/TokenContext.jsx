import React, { createContext, useState } from "react";
import { getClothes } from "./clothes/clothes";
import { getLoanedClothes } from "./clothes/clothesFriendsParams";
import { getUserInfo } from "./friends/friends";

export const TokenContext = createContext();

const TokenProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [clothes, setClothes] = useState([]);
  const [outfits, setOutfits] = useState([]);

  
  const fetchClothes = async () => {
    const clothesData = await getClothes(token) || [];
    const loanClothesData = await getLoanedClothes(token) || [];
    const userInfo = await getUserInfo(token);

    const allClothes = [...clothesData, ...loanClothesData];

    const clothesToSave = allClothes.filter((item) => {
      if (item.isLoaned) {
        return item.userId !== userInfo.id;
      }
      return true;
    });

    setClothes(clothesToSave || []);
  };


  return (
    <TokenContext.Provider
      value={{
        token,
        setToken,
        clothes,
        setClothes,
        outfits,
        setOutfits,
        fetchClothes,
      }}
    >
      {children}
    </TokenContext.Provider>
  );
};

export default TokenProvider;
