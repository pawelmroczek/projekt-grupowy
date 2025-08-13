const planLaundry = (allClothes, laundryHistory, outfits, options) => {
  const maxItemsPerLoad = options.maxItemsPerLoad;
  const minItemsPerLoad = options.minItemsPerLoad;
  const today = new Date("2025-07-25");

  const getColorGroup = (color) => {
    const biale = ["Biały"];
    const ciemne = ["black", "Granatowy", "Bordowy"];
    const jasne = ["Beżowy", "Błękitny", "Jasnoniebieski", "gray"];
    const kolorowe = ["Niebieski", "Czerwony", "Zielony"];
    if (biale.includes(color)) return "białe";
    if (ciemne.includes(color)) return "ciemne";
    if (jasne.includes(color)) return "jasne";
    return "kolorowe";
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

      return {
        ...c,
        priority,
        colorGroup: getColorGroup(c.color),
      };
    });

  // 2. Grupuj ubrania według koloru i licz łączny priorytet
  const groupedByColor = {};

  for (const item of clothesWithPriority) {
    const group = item.colorGroup;
    if (!groupedByColor[group]) {
      groupedByColor[group] = {
        clothes: [],
        totalPriority: 0,
      };
    }
    groupedByColor[group].clothes.push(item);
    groupedByColor[group].totalPriority += item.priority;
  }

  // 3. Zamień na tablicę i sortuj grupy po łącznym priorytecie malejąco
  const sortedGroups = Object.entries(groupedByColor)
    .filter(([_, data]) => data.clothes.length > 0)
    .sort((a, b) => b[1].totalPriority - a[1].totalPriority);

  // 4. Twórz plan: dziel każdą grupę na ładunki
  const laundryPlan = [];

  for (const [colorGroup, data] of sortedGroups) {
    const sortedClothes = data.clothes.sort((a, b) => b.priority - a.priority);

    for (let i = 0; i < sortedClothes.length; i += maxItemsPerLoad) {
      const load = sortedClothes.slice(i, i + maxItemsPerLoad);
      
      // uwzględnij minimalną liczbę ubrań
      if (load.length >= minItemsPerLoad) {
        laundryPlan.push({
          colorGroup,
          clothes: load,
        });
      }
    }
  }

  return laundryPlan;
};

export default planLaundry;
