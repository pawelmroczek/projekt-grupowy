import { SYMBOL_CATEGORIES, getSymbolDescription } from "../careSymbols.js";
import {
  getColorGroup,
  getWashInstructions,
  getWashTemperature,
  hasCareTags,
} from "./utils.js";

const planLaundry = (allClothes, laundryHistory, outfits, options) => {
  const maxItemsPerLoad = options.maxItemsPerLoad;
  const minItemsPerLoad = options.minItemsPerLoad;
  const today = new Date();

  // Opcje dopasowania według metek (domyślne wartości)
  const careSymbolOptions = {
    useTemperatureMatching: options.useTemperatureMatching ?? true,
    useRestrictionMatching: options.useRestrictionMatching ?? true,
    temperatureTolerance: options.temperatureTolerance ?? 10, // różnica w °C
    treatEmptyAsCompatible: options.treatEmptyAsCompatible ?? true, // ubrania bez metek jako kompatybilne
    allowHandWashWithMachine: options.allowHandWashWithMachine ?? false, // czy pranie ręczne może być z maszynowym
    allowDelicateWithNormal: options.allowDelicateWithNormal ?? true, // czy delikatne może być z normalnym
    ...options.careSymbolOptions,
  };

  console.log("Opcje planowania prania:", careSymbolOptions);

  // Sprawdź czy jakiekolwiek opcje typu prania są aktywne
  const isWashTypeMatchingEnabled =
    !careSymbolOptions.allowHandWashWithMachine ||
    !careSymbolOptions.allowDelicateWithNormal;

  // Funkcja do sprawdzenia czy ubrania mogą być prane razem
  const canWashTogether = (item1, item2) => {
    const hasCareTags1 = hasCareTags(item1.careSymbols);
    const hasCareTags2 = hasCareTags(item2.careSymbols);

    // Jeśli jedno lub oba ubrania nie mają metek i opcja treatEmptyAsCompatible jest włączona
    if (
      careSymbolOptions.treatEmptyAsCompatible &&
      (!hasCareTags1 || !hasCareTags2)
    ) {
      // Ubrania bez metek są kompatybilne z wszystkimi (tylko sprawdź kolor)
      return getColorGroup(item1.color) === getColorGroup(item2.color);
    }

    // Jeśli oba mają metki, sprawdź zgodność
    if (hasCareTags1 && hasCareTags2) {
      return checkCareSymbolCompatibility(item1.careSymbols, item2.careSymbols);
    }

    // Jeśli treatEmptyAsCompatible jest wyłączone, nieoznaczone ubrania nie są kompatybilne z oznaczonymi
    return false;
  };

  // Szczegółowa funkcja sprawdzania kompatybilności symboli
  const checkCareSymbolCompatibility = (symbols1, symbols2) => {
    // Sprawdź temperaturę jeśli włączone
    if (careSymbolOptions.useTemperatureMatching) {
      const temp1 = getWashTemperature(symbols1, careSymbolOptions);
      const temp2 = getWashTemperature(symbols2, careSymbolOptions);
      const tempDiff = Math.abs(temp1 - temp2);
      if (tempDiff > careSymbolOptions.temperatureTolerance) return false;
    }

    // Sprawdź restrykcje prania jeśli włączone
    if (careSymbolOptions.useRestrictionMatching) {
      const noWash1 = symbols1.includes("DN_wash");
      const noWash2 = symbols2.includes("DN_wash");
      if (noWash1 || noWash2) return false;
    }

    // Sprawdź typ prania jeśli jakiekolwiek ograniczenia są aktywne
    if (isWashTypeMatchingEnabled) {
      const handWash1 = symbols1.includes("hand_wash");
      const handWash2 = symbols2.includes("hand_wash");
      // Sprawdź czy pranie ręczne może być z maszynowym
      if (
        !careSymbolOptions.allowHandWashWithMachine &&
        handWash1 !== handWash2
      ) {
        return false;
      }
      // Sprawdź delikatność
      const delicate1 = symbols1.includes("machine_wash_delicate");
      const delicate2 = symbols2.includes("machine_wash_delicate");
      const normal1 = symbols1.includes("machine_wash_normal");
      const normal2 = symbols2.includes("machine_wash_normal");
      // Sprawdź czy delikatne może być z normalnym
      if (!careSymbolOptions.allowDelicateWithNormal) {
        if ((delicate1 && normal2) || (normal1 && delicate2)) return false;
      }
    }

    return true;
  };

  // Funkcja do grupowania według wymagań prania
  const getWashGroup = (item) => {
    const symbols = item.careSymbols || [];
    const colorGroup = getColorGroup(item.color);

    // Jeśli ubranie nie ma metek i treatEmptyAsCompatible jest włączone
    if (!hasCareTags(symbols) && careSymbolOptions.treatEmptyAsCompatible) {
      return `${colorGroup}_no_tags`;
    }

    const temp = careSymbolOptions.useTemperatureMatching
      ? getWashTemperature(symbols, careSymbolOptions)
      : "any";
    let washType = "normal";

    if (isWashTypeMatchingEnabled) {
      if (symbols.includes("hand_wash")) washType = "hand_wash";
      else if (symbols.includes("machine_wash_delicate")) washType = "delicate";
      else if (symbols.includes("DN_wash")) washType = "no_wash";
    }

    // Buduj grupę na podstawie włączonych opcji
    let groupKey = colorGroup;

    if (careSymbolOptions.useTemperatureMatching) {
      groupKey += `_${temp}C`;
    }

    if (isWashTypeMatchingEnabled) {
      groupKey += `_${washType}`;
    }

    if (careSymbolOptions.useRestrictionMatching) {
      const hasRestrictions = symbols.some((s) => s.startsWith("DN_"));
      groupKey += `_${hasRestrictions ? "restricted" : "free"}`;
    }

    return groupKey;
  };

  const getLastWashDate = (clothingId) => {
    const washes = laundryHistory
      .filter((entry) => entry.clothesIds.includes(clothingId))
      .map((entry) => new Date(entry.date));
    return washes.length > 0 ? new Date(Math.max(...washes)) : null;
  };

  const getOutfitCount = (clothingId) => {
    return outfits.filter((o) => o.clothesIds.includes(clothingId)).length;
  };

  // 1. Przygotuj listę brudnych ubrań z obliczonym priorytetem
  const clothesWithPriority = allClothes
    .filter((c) => !c.clean)
    .map((c) => {
      const lastWash = getLastWashDate(c.id);
      const daysSinceWash = lastWash
        ? Math.floor((today - lastWash) / (1000 * 60 * 60 * 24))
        : 30;
      const outfitCount = getOutfitCount(c.id);

      let priority = 10; // base for being dirty
      priority += outfitCount;
      priority += daysSinceWash;
      if (lastWash && daysSinceWash === 0) priority -= 15;

      // Dodaj informacje o praniu
      const washTemp = getWashTemperature(c.careSymbols, careSymbolOptions);
      const washGroup = getWashGroup(c);

      return {
        ...c,
        priority,
        colorGroup: getColorGroup(c.color),
        washTemperature: washTemp,
        washGroup: washGroup,
      };
    });

  // 2. Grupuj ubrania według wymagań prania (kolor + temperatura + typ prania)
  const groupedByWashRequirements = {};

  for (const item of clothesWithPriority) {
    const group = item.washGroup;
    if (!groupedByWashRequirements[group]) {
      groupedByWashRequirements[group] = {
        clothes: [],
        totalPriority: 0,
        washTemperature: item.washTemperature,
        colorGroup: item.colorGroup,
      };
    }
    groupedByWashRequirements[group].clothes.push(item);
    groupedByWashRequirements[group].totalPriority += item.priority;
  }

  // 3. Zamień na tablicę i sortuj grupy po łącznym priorytecie malejąco
  const sortedGroups = Object.entries(groupedByWashRequirements)
    .filter(([_, data]) => data.clothes.length > 0)
    .sort((a, b) => b[1].totalPriority - a[1].totalPriority);

  // pomocnicza: tworzy ładunki maksymalnie duże i zgodne — greedy, ale lepszy od prostego slice
  function createLoadsFromGroup(items) {
    const remaining = [...items].sort((a, b) => b.priority - a.priority);
    const loads = [];

    while (remaining.length > 0) {
      const seed = remaining.shift();
      const load = [seed];

      // spróbuj dodać kolejne najwyższe priorytetowe elementy kompatybilne ze wszystkimi w bieżącym ładunku
      for (let i = 0; i < remaining.length && load.length < maxItemsPerLoad; ) {
        const candidate = remaining[i];
        const compatibleWithLoad = load.every((item) =>
          canWashTogether(item, candidate)
        );
        if (compatibleWithLoad) {
          load.push(candidate);
          remaining.splice(i, 1);
        } else {
          i++;
        }
      }

      loads.push(load);
    }

    // Po zbudowaniu wstępnych ładunków spróbuj połączyć małe ładunki (poniżej minItemsPerLoad)
    let merged = true;
    while (merged) {
      merged = false;
      for (let i = 0; i < loads.length; i++) {
        if (loads[i].length >= minItemsPerLoad) continue;
        // spróbuj znaleźć inny ładunek, z którym można bezpiecznie połączyć
        for (let j = 0; j < loads.length; j++) {
          if (i === j) continue;
          if (loads[i].length + loads[j].length > maxItemsPerLoad) continue;

          // sprawdź kompatybilność wszystkich elementów obu ładunków
          const canMerge = loads[i].every((a) =>
            loads[j].every((b) => canWashTogether(a, b))
          );
          if (canMerge) {
            loads[j] = loads[j].concat(loads[i]);
            loads.splice(i, 1);
            merged = true;
            break;
          }
        }
        if (merged) break;
      }
    }

    // Jeśli po próbach łączenia wciąż są ładunki poniżej minItemsPerLoad, spróbuj przyłączyć pojedyncze elementy do dowolnych ładunków kompatybilnych
    const smallLoads = loads.filter(
      (l) => l.length > 0 && l.length < minItemsPerLoad
    );
    for (const small of smallLoads) {
      let attached = false;
      for (const target of loads) {
        if (small === target) continue;
        if (target.length + small.length > maxItemsPerLoad) continue;
        const canAttach = small.every((a) =>
          target.every((b) => canWashTogether(a, b))
        );
        if (canAttach) {
          target.push(...small);
          // usun maly
          const idx = loads.indexOf(small);
          if (idx !== -1) loads.splice(idx, 1);
          attached = true;
          break;
        }
      }
      // jeśli nie udało się dołączyć — zostaw jak jest (można później zdecydować, czy tolerować mniejsze ładunki)
    }

    return loads;
  }

  // 4. Twórz plan: dla każdej grupy stwórz jak największe ładunki
  const laundryPlan = [];

  for (const [washGroup, data] of sortedGroups) {
    const items = data.clothes.sort((a, b) => b.priority - a.priority);
    const loads = createLoadsFromGroup(items);

    for (const load of loads) {
      if (load.length >= minItemsPerLoad) {
        laundryPlan.push({
          washGroup,
          colorGroup: data.colorGroup,
          washTemperature: getWashTemperature(
            load[0].careSymbols,
            careSymbolOptions
          ),
          clothes: load,
          washInstructions: getWashInstructions(load, careSymbolOptions),
        });
      } else {
        // jeżeli ładunek końcowy jest zbyt mały — próbuj dopasować go do już istniejących planów (innych grup)
        let mergedIntoExisting = false;
        for (const existing of laundryPlan) {
          // tylko jeżeli kolor i temperatura są kompatybilne (dozwolone "miękkie" dopasowanie)
          const sameColor = existing.colorGroup === data.colorGroup;
          const tempDiff = Math.abs(
            (existing.washTemperature || 0) -
              (getWashTemperature(load[0].careSymbols, careSymbolOptions) || 0)
          );
          if (
            !sameColor ||
            (careSymbolOptions.useTemperatureMatching &&
              tempDiff > careSymbolOptions.temperatureTolerance)
          )
            continue;

          // sprawdź kompatybilność wszystkich elementów
          const canMerge = load.every((a) =>
            existing.clothes.every((b) => canWashTogether(a, b))
          );
          if (
            canMerge &&
            existing.clothes.length + load.length <= maxItemsPerLoad
          ) {
            existing.clothes.push(...load);
            existing.washInstructions = getWashInstructions(existing.clothes, careSymbolOptions);
            mergedIntoExisting = true;
            break;
          }
        }

        if (!mergedIntoExisting) {
          // pozostaw jako mniejszy ładunek — przydatne jeśli użytkownik woli nie czekać
          laundryPlan.push({
            washGroup: `${washGroup}_small`,
            colorGroup: data.colorGroup,
            washTemperature: getWashTemperature(
              load[0].careSymbols,
              careSymbolOptions
            ),
            clothes: load,
            washInstructions: getWashInstructions(load, careSymbolOptions),
          });
        }
      }
    }
  }

  return laundryPlan;
};

export default planLaundry;
