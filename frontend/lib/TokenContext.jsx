import React, { createContext, useState } from "react";

export const TokenContext = createContext();

const TokenProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [clothes, setClothes] = useState([]);
  const [outfits, setOutfits] = useState([]);

  return (
    <TokenContext.Provider value={{ token, setToken, clothes, setClothes, outfits, setOutfits }}>
      {children}
    </TokenContext.Provider>
  );
};



export default TokenProvider;