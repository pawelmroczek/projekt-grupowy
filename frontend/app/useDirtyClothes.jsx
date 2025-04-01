import { useState, useEffect, useContext } from "react";
import { getClothes } from "../lib/authorization/clothes";
import { TokenContext } from "./TokenContext";

const useDirtyClothes = () => {
  const [dirtyClothes, setDirtyClothes] = useState(null);
  const { token } = useContext(TokenContext);

  useEffect(() => {
    const fetchDirtyClothes = async () => {
      if (!token) return;
      try {
        const clothesData = await getClothes(token);
        const dirty = (clothesData || []).filter(item => !item.clean);
        
        if (dirty.length === 0) {
          console.log("Brak brudnych ubrań do wyświetlenia.");
        }

        setDirtyClothes(dirty);
      } catch (error) {
        console.error("Błąd podczas pobierania ubrań:", error);
      }
    };

    fetchDirtyClothes();
  }, [token]);

  return dirtyClothes;
};

export default useDirtyClothes;
