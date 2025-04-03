import { useState, useEffect, useContext } from "react";
import { getClothes } from "../lib/clothes/clothes";
import { TokenContext } from "./TokenContext";

const useDirtyClothes = () => {
  const [dirtyClothes, setDirtyClothes] = useState(null);
  const { token } = useContext(TokenContext);
  const { clothes } = useContext(TokenContext);

  useEffect(() => {
    const dirty = (clothes || []).filter(item => !item.clean);
        
    if (dirty.length === 0) {
        console.log("Brak brudnych ubrań do wyświetlenia.");
      }

    setDirtyClothes(dirty);
  }, [clothes]); // Efekt odpala się tylko, gdy zmienią się `clothes`
  return dirtyClothes;
};

export default useDirtyClothes;
