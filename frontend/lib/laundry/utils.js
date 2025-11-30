import { SYMBOL_CATEGORIES } from "../careSymbols";
import { LAUNDRY_ICONS_NAMES } from "../../assets/constants/laundry_icons/laundry_icons";

// Funkcja do określenia temperatury prania na podstawie symboli
export const getWashTemperature = (careSymbols) => {

  if (!careSymbols || !Array.isArray(careSymbols) || careSymbols.length === 0) {
    return 40; // domyślna temperatura
  }

  // Znajdź symbol temperatury
  const tempSymbols = careSymbols.filter((symbol) =>
    SYMBOL_CATEGORIES.TEMPERATURE.includes(LAUNDRY_ICONS_NAMES.indexOf(symbol))
  );

  if (tempSymbols.length === 0) return 40; // domyślna temperatura

  // Zwróć najniższą temperaturę (najbezpieczniejszą)
  const temps = tempSymbols.map((symbol) => parseInt(symbol.replace("C", "")));
  return Math.min(...temps);
};

export const getLastWashDate = (clothingId, laundryHistory) => {
  const washes = laundryHistory
    .filter((entry) => entry.clothesIds.includes(clothingId))
    .map((entry) => new Date(entry.date));
  return washes.length > 0 ? new Date(Math.max(...washes)) : null;
};

// Funkcja do sprawdzenia czy ubranie ma metki
export const hasCareTags = (careSymbols) => {
  return careSymbols && Array.isArray(careSymbols) && careSymbols.length > 0;
};

// Funkcja do generowania instrukcji prania
export function getWashInstructions(clothes, careSymbolOptions) {
  const allSymbols = clothes.flatMap((item) => (item.pictogramIds || []).map((id) => LAUNDRY_ICONS_NAMES[id]));
  const uniqueSymbols = [...new Set(allSymbols)];

  const instructions = {
    temperature:
      getWashTemperature(clothes[0]?.pictogramIds, careSymbolOptions) || 40,
    symbols: uniqueSymbols,
    warnings: [],
  };

  // Dodaj ostrzeżenia na podstawie symboli
  if (uniqueSymbols.includes("hand_wash")) {
    instructions.warnings.push("Wymagane pranie ręczne");
  }
  if (uniqueSymbols.includes("machine_wash_delicate")) {
    instructions.warnings.push("Program delikatny");
  }
  if (uniqueSymbols.includes("DN_bleach")) {
    instructions.warnings.push("Nie używać wybielacza");
  }
  if (uniqueSymbols.includes("DN_tumble_dry")) {
    instructions.warnings.push("Nie suszyć w suszarce");
  }
  if (uniqueSymbols.includes("DN_iron")) {
    instructions.warnings.push("Nie prasować");
  }

  return instructions;
}

export const wichStrictnessIsActive = (options) => {
  const {
    useTemperatureMatching,
    useRestrictionMatching,
    treatEmptyAsCompatible,
    allowHandWashWithMachine,
    allowDelicateWithNormal,
    temperatureTolerance,
  } = options;

  // Sprawdź czy wszystkie opcje odpowiadają poziomowi "loose"
  if (
    !useTemperatureMatching &&
    !useRestrictionMatching &&
    treatEmptyAsCompatible &&
    allowHandWashWithMachine &&
    allowDelicateWithNormal
  ) {
    return "loose";
  }
  // Sprawdź czy wszystkie opcje odpowiadają poziomowi "medium"
  else if (
    useTemperatureMatching &&
    useRestrictionMatching &&
    treatEmptyAsCompatible &&
    !allowHandWashWithMachine &&
    allowDelicateWithNormal &&
    temperatureTolerance === 20
  ) {
    return "medium";
  }
  // Sprawdź czy wszystkie opcje odpowiadają poziomowi "strict"
  else if (
    useTemperatureMatching &&
    useRestrictionMatching &&
    !treatEmptyAsCompatible &&
    !allowHandWashWithMachine &&
    !allowDelicateWithNormal &&
    temperatureTolerance === 10
  ) {
    return "strict";
  }
  // Wszystkie inne kombinacje to "custom"
  else {
    return "custom";
  }
};
