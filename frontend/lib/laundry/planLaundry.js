import { SYMBOL_CATEGORIES, getSymbolDescription } from "../careSymbols.js";
import {
  getWashInstructions,
  getWashTemperature,
  hasCareTags,
} from "./utils.js";
import { getColorGroup } from "../../assets/constants/colors/colors.js";
import { LAUNDRY_ICONS_NAMES } from "../../assets/constants/laundry_icons/laundry_icons.js";

const planLaundry = (allClothes, laundryHistory, outfits, options) => {
  const today = new Date();

  const minItemsPerLoad = options.minItemsPerLoad || 1;

  // Opcje dopasowania według metek (domyślne wartości)
  const careSymbolOptions = {
    useTemperatureMatching: options.useTemperatureMatching ?? true,
    useRestrictionMatching: options.useRestrictionMatching ?? true,
    temperatureTolerance: options.temperatureTolerance ?? 10,
    treatEmptyAsCompatible: options.treatEmptyAsCompatible ?? true,
    allowHandWashWithMachine: options.allowHandWashWithMachine ?? false,
    allowDelicateWithNormal: options.allowDelicateWithNormal ?? true,
    ...options.careSymbolOptions,
  };

  const isWashTypeMatchingEnabled =
    !careSymbolOptions.allowHandWashWithMachine ||
    !careSymbolOptions.allowDelicateWithNormal;

  // Sprawdza czy dwa elementy można prać razem (używane do finalnej weryfikacji)
  const canWashTogether = (item1, item2) => {
    const hasTags1 = hasCareTags(item1.pictogramIds);
    const hasTags2 = hasCareTags(item2.pictogramIds);
    if (
      careSymbolOptions.treatEmptyAsCompatible &&
      (!hasTags1 || !hasTags2)
    ) {
      return getColorGroup(item1.color) === getColorGroup(item2.color);
    }

    if (hasTags1 && hasTags2) {
      return checkCareSymbolCompatibility(item1.pictogramIds, item2.pictogramIds);
    }

    return false;
  };

  const checkCareSymbolCompatibility = (symbols1, symbols2) => {
    if (careSymbolOptions.useTemperatureMatching) {
      const t1 = getWashTemperature(symbols1);
      const t2 = getWashTemperature(symbols2);
      if (Math.abs(t1 - t2) > careSymbolOptions.temperatureTolerance) return false;
    }

    if (careSymbolOptions.useRestrictionMatching) {
      if (symbols1.includes(LAUNDRY_ICONS_NAMES.indexOf("DN_wash")) || symbols2.includes(LAUNDRY_ICONS_NAMES.indexOf("DN_wash"))) return false;
    }

    if (isWashTypeMatchingEnabled) {
      const hand1 = symbols1.includes(LAUNDRY_ICONS_NAMES.indexOf("hand_wash"));
      const hand2 = symbols2.includes(LAUNDRY_ICONS_NAMES.indexOf("hand_wash"));
      if (!careSymbolOptions.allowHandWashWithMachine && hand1 !== hand2) return false;

      const delicate1 = symbols1.includes(LAUNDRY_ICONS_NAMES.indexOf("machine_wash_delicate"));
      const delicate2 = symbols2.includes(LAUNDRY_ICONS_NAMES.indexOf("machine_wash_delicate"));
      const normal1 = symbols1.includes(LAUNDRY_ICONS_NAMES.indexOf("machine_wash_normal"));
      const normal2 = symbols2.includes(LAUNDRY_ICONS_NAMES.indexOf("machine_wash_normal"));
      if (!careSymbolOptions.allowDelicateWithNormal) {
        if ((delicate1 && normal2) || (normal1 && delicate2)) return false;
      }
    }

    return true;
  };

  // Zwraca typ prania: "hand_wash" | "delicate" | "normal" | "no_wash"
  const getWashType = (symbols = []) => {
    if (symbols.includes(LAUNDRY_ICONS_NAMES.indexOf("DN_wash"))) return "no_wash";
    if (symbols.includes(LAUNDRY_ICONS_NAMES.indexOf("hand_wash"))) return "hand_wash";
    if (symbols.includes(LAUNDRY_ICONS_NAMES.indexOf("machine_wash_delicate"))) return "delicate";
    if (symbols.includes(LAUNDRY_ICONS_NAMES.indexOf("machine_wash_normal"))) return "normal";
    // brak metek lub nieokreślone -> traktuj jako normal jeśli treatEmptyAsCompatible true
    return careSymbolOptions.treatEmptyAsCompatible ? "normal" : "unknown";
  };

  const getLastWashDate = (clothingId) => {
    const washes = laundryHistory
      .filter((entry) => entry.clothes.includes(clothingId))
      .map((entry) => new Date(entry.date));
    return washes.length > 0 ? new Date(Math.max(...washes)) : null;
  };

  const getOutfitCount = (clothingId) => {
    return outfits.filter(o =>
      o.clothes.some(c => c.id === clothingId)
    ).length;
  };

  // 1. Przygotuj listę brudnych ubrań z priorytetem
  const clothesWithPriority = allClothes
    .filter((c) => !c.clean)
    .map((c) => {
      const lastWash = getLastWashDate(c.id);
      const daysSinceWash = lastWash
        ? Math.floor((today - lastWash) / (1000 * 60 * 60 * 24))
        : 30;
      const outfitCount = getOutfitCount(c.id);

      let priority = 10;
      priority += outfitCount;
      priority += daysSinceWash;
      if (lastWash && daysSinceWash === 0) priority -= 15;

      const washTemp = getWashTemperature(c.pictogramIds);
      const colorGroup = getColorGroup(c.color);
      const washType = getWashType(c.pictogramIds);

      return {
        ...c,
        priority,
        colorGroup,
        washTemperature: washTemp,
        washType,
      };
    });

  // 2. Grupuj tylko po kolorze i typie prania
  const groups = {};
  for (const item of clothesWithPriority) {
    const key = `${item.colorGroup}_${item.washType}`;
    if (!groups[key]) groups[key] = [];
    groups[key].push(item);
  }

  // 3. Dla każdej grupy twórz pojedynczy ładunek (bez limitów ilości)
  //    — wewnętrznie odrzucamy elementy, które nie są zgodne z resztą grupy (np. sprzeczne metki)
  const laundryPlan = [];

  for (const [groupKey, items] of Object.entries(groups)) {
    // sortuj po priorytecie by w miarę sensownie układać
    const sorted = items.sort((a, b) => b.priority - a.priority);

    // zbuduj listę kompatybilnych elementów zaczynając od najwyższego priorytetu
    const load = [];
    for (const candidate of sorted) {
      // jeśli load jest pusty — weź candidate
      if (load.length === 0) {
        load.push(candidate);
        continue;
      }
      // sprawdź czy candidate kompatybilny ze wszystkimi w load
      const compatibleWithAll = load.every((existing) =>
        canWashTogether(existing, candidate)
      );
      if (compatibleWithAll) {
        load.push(candidate); 
        // jesli kompatybilny — dodaj go do ładunku
        // jeśli niekompatybilny utworzymy dla niego osobny (mały) ładunek
        // Zamiast tworzyć od razu nowy plan, zbieramy takie "odrzucone" i dodamy je później jako osobne ładunki
      } 
    }

    // Zbieramy też elementy, które nie zmieściły się do głównego load (niekompatybilne)
    const leftovers = sorted.filter((i) => !load.includes(i));

    // Dodaj główny load jeśli ma cokolwiek
    if (load.length >= minItemsPerLoad) {
      laundryPlan.push({
        washGroup: groupKey,
        colorGroup: load[0].colorGroup,
        washTemperature: getWashTemperature(load[0].pictogramIds),
        clothes: load,
        washInstructions: getWashInstructions(load, careSymbolOptions),
      });
    }

    // Dla każdego leftover stwórz osobny ładunek (można później scalić ręcznie)
    for (const single of leftovers) {
      laundryPlan.push({
        washGroup: `${groupKey}_separate`,
        colorGroup: single.colorGroup,
        washTemperature: getWashTemperature(single.pictogramIds),
        clothes: [single],
        washInstructions: getWashInstructions([single], careSymbolOptions),
      });
    }
  }

  //Posortuj ładunki według najwyższego łącznego priorytetu w ładunku (aby najważniejsze były na górze listy)
  laundryPlan.sort((a, b) => {
    const priorityA = a.clothes.reduce((sum, item) => sum + item.priority, 0); // suma priorytetów w ładunku
    const priorityB = b.clothes.reduce((sum, item) => sum + item.priority, 0); // suma priorytetów w ładunku
    return priorityB - priorityA;
  });


  return laundryPlan;
};

export default planLaundry;
