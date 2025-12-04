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
    if (careSymbolOptions.treatEmptyAsCompatible && (!hasTags1 || !hasTags2)) {
      return getColorGroup(item1.color) === getColorGroup(item2.color);
    }

    if (hasTags1 && hasTags2) {
      return checkCareSymbolCompatibility(
        item1.pictogramIds,
        item2.pictogramIds
      );
    }

    return false;
  };

  const checkCareSymbolCompatibility = (symbols1, symbols2) => {
    if (careSymbolOptions.useTemperatureMatching) {
      const t1 = getWashTemperature(symbols1);
      const t2 = getWashTemperature(symbols2);
      if (Math.abs(t1 - t2) > careSymbolOptions.temperatureTolerance)
        return false;
    }

    if (careSymbolOptions.useRestrictionMatching) {
      if (
        symbols1.includes(LAUNDRY_ICONS_NAMES.indexOf("DN_wash")) ||
        symbols2.includes(LAUNDRY_ICONS_NAMES.indexOf("DN_wash"))
      )
        return false;
    }

    if (isWashTypeMatchingEnabled) {
      const hand1 = symbols1.includes(LAUNDRY_ICONS_NAMES.indexOf("hand_wash"));
      const hand2 = symbols2.includes(LAUNDRY_ICONS_NAMES.indexOf("hand_wash"));
      if (!careSymbolOptions.allowHandWashWithMachine && hand1 !== hand2)
        return false;

      const delicate1 = symbols1.includes(
        LAUNDRY_ICONS_NAMES.indexOf("machine_wash_delicate")
      );
      const delicate2 = symbols2.includes(
        LAUNDRY_ICONS_NAMES.indexOf("machine_wash_delicate")
      );
      const normal1 = symbols1.includes(
        LAUNDRY_ICONS_NAMES.indexOf("machine_wash_normal")
      );
      const normal2 = symbols2.includes(
        LAUNDRY_ICONS_NAMES.indexOf("machine_wash_normal")
      );
      if (!careSymbolOptions.allowDelicateWithNormal) {
        if ((delicate1 && normal2) || (normal1 && delicate2)) return false;
      }
    }

    return true;
  };

  // Zwraca typ prania: "hand_wash" | "delicate" | "normal" | "no_wash"
  const getWashType = (symbols = []) => {
    if (symbols.includes(LAUNDRY_ICONS_NAMES.indexOf("DN_wash")))
      return "no_wash";
    if (symbols.includes(LAUNDRY_ICONS_NAMES.indexOf("hand_wash")))
      return "hand_wash";
    if (symbols.includes(LAUNDRY_ICONS_NAMES.indexOf("machine_wash_delicate")))
      return "delicate";
    if (symbols.includes(LAUNDRY_ICONS_NAMES.indexOf("machine_wash_normal")))
      return "normal";
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
    return outfits.filter((o) => o.clothes.some((c) => c.id === clothingId))
      .length;
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

      let priority = c.priority * 5; // waga bazowa
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
    // sortuj po priorytecie malejąco
    const sorted = [...items].sort((a, b) => b.priority - a.priority);

    const loads = [];

    //Wstawiaj kolejno elementy: do pierwszego kompatybilnego ładunku,
    //jeśli brak — twórz nowy ładunek.
    for (const candidate of sorted) {
      let bestLoadIndex = -1;
      let bestLoadScore = -Infinity;

      for (let i = 0; i < loads.length; i++) {
        const load = loads[i];
        const compatibleWithAll = load.every((existing) =>
          canWashTogether(existing, candidate)
        );
        if (compatibleWithAll) {
          // preferuj "większe" ładunki (żeby wypełniać już istniejące)
          const loadScore = load.reduce((s, it) => s + (it.priority || 0), 0);
          if (loadScore > bestLoadScore) {
            bestLoadScore = loadScore;
            bestLoadIndex = i;
          }
        }
      }

      if (bestLoadIndex >= 0) {
        loads[bestLoadIndex].push(candidate);
      } else {
        loads.push([candidate]);
      }
    }

    // Spróbuj przenieść elementy z ładunków "małych" do innych, aby zredukować singli.
    for (let i = loads.length - 1; i >= 0; i--) {
      const load = loads[i];
      if (load.length >= minItemsPerLoad) continue; // tylko małe ładunki próbujemy rozwiązać

      // spróbuj przenieść każdy element do innego ładunku
      for (let j = 0; j < load.length; j++) {
        const item = load[j];
        let placed = false;
        for (let k = 0; k < loads.length; k++) {
          if (k === i) continue;
          const target = loads[k];
          const ok = target.every((existing) =>
            canWashTogether(existing, item)
          );
          if (ok) {
            target.push(item);
            placed = true;
            break;
          }
        }
        if (placed) {
          // oznacz do usunięcia (ustaw null)
          load[j] = null;
        }
      }
      // odfiltrowanie usuniętych (przeniesionych)
      loads[i] = load.filter((x) => x !== null);
    }

    // Usuń ładunki nie spełniające minimalnej liczby elementów
    const finalLoads = loads.filter((l) => l.length >= minItemsPerLoad);

    // 3) Dodaj powstałe ładunki do laundryPlan (każdy ładunek -> osobny entry)
    for (const load of finalLoads) {
      laundryPlan.push({
        washGroup: load.length === 1 ? `${groupKey}_separate` : groupKey,
        colorGroup: load[0].colorGroup,
        washTemperature: getWashTemperature(load[0].pictogramIds),
        clothes: load,
        washInstructions: getWashInstructions(load, careSymbolOptions),
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
