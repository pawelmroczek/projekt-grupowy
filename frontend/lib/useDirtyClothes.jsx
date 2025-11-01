import { useState, useEffect, useContext } from "react";
import { getClothes } from "./clothes/clothes";
import { TokenContext } from "./TokenContext";

// Funkcja do symulacji symboli prania na podstawie typu i koloru ubrania
const addSimulatedCareSymbols = (item) => {
  if (item.careSymbols && item.careSymbols.length > 0) {
    return item; // Jeśli symbole już istnieją, zwróć oryginalny obiekt
  }

  const careSymbols = [];

  // Temperatura na podstawie koloru i typu
  if (item.color === "Biały" || item.color === "Jasny") {
    careSymbols.push("60C");
  } else if (
    item.color === "Czarny" ||
    item.color === "Granatowy" ||
    item.color === "Bordowy"
  ) {
    careSymbols.push("30C");
  } else {
    careSymbols.push("40C");
  }

  // Typ prania na podstawie typu ubrania
  if (item.type === "Sweter" || item.type === "Sukienka") {
    careSymbols.push("machine_wash_delicate");
    careSymbols.push("dry_flat");
    careSymbols.push("iron_low");
  } else if (item.type === "Jeans" || item.type === "Spodnie") {
    careSymbols.push("machine_wash_normal");
    careSymbols.push("tumble_dry_medium");
    careSymbols.push("iron_high");
  } else if (item.type === "T-shirt" || item.type === "Koszulka") {
    careSymbols.push("machine_wash_normal");
    careSymbols.push("tumble_dry_low");
    careSymbols.push("iron_medium");
  } else if (item.type === "Skarpetki" || item.type === "Socks") {
    careSymbols.push("machine_wash_normal");
    careSymbols.push("tumble_dry_normal");
  } else if (item.type === "Hoodie" || item.type === "Bluza") {
    careSymbols.push("machine_wash_normal");
    careSymbols.push("tumble_dry_low");
    careSymbols.push("iron_low");
  } else {
    careSymbols.push("machine_wash_normal");
    careSymbols.push("tumble_dry_low");
  }

  // Specjalne przypadki
  if (item.color === "Biały") {
    careSymbols.push("bleach");
  } else {
    careSymbols.push("DN_bleach");
  }

  return { ...item, careSymbols };
};

const useDirtyClothes = () => {
  const [dirtyClothes, setDirtyClothes] = useState([]);
  const { clothes } = useContext(TokenContext);

  useEffect(() => {
    const dirty = (clothes || [])
      .filter((item) => !item.clean)
      .map(addSimulatedCareSymbols); // Dodaj symulowane symbole prania

    if (dirty.length === 0) {
      console.log("Brak brudnych ubrań do wyświetlenia.");
    }

    setDirtyClothes(dirty);
  }, [clothes]); // Efekt odpala się tylko, gdy zmienią się `clothes`

  return dirtyClothes;
};

export default useDirtyClothes;
