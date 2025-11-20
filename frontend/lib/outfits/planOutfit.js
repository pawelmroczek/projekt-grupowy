import { clothingTypeOptions, shoesTypeOptions } from "../../assets/constants/types/types";

export function hexToHsl(hex) {
    const hex_tmp = hex.replace('#','');
    const bigint = parseInt(hex_tmp, 16);
    var r = (bigint >> 16) & 255;
    var g = (bigint >> 8) & 255;
    var b = bigint & 255;

    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if(max == min){
        h = s = 0;
    } else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    s = s*100;
    s = Math.round(s);
    l = l*100;
    l = Math.round(l);
    h = Math.round(360*h);
    return {h: h, s: s, l: l};

};

function colorDistanceHex(hexA, hexB){
    const a = hexToHsl(hexA);
    const b = hexToHsl(hexB);
    const dh = Math.min(Math.abs(a.h - b.h), 360 - Math.abs(a.h - b.h)) / 180; // 0..2 normalized
    const ds = Math.abs(a.s - b.s) / 100; // 0..1
    const dl = Math.abs(a.l - b.l) / 100; // 0..1
    // waga: hue 0.6, lightness 0.3, saturation 0.1
    return Math.sqrt((0.6*dh)**2 + (0.1*ds)**2 + (0.3*dl)**2);
}

function colorDistanceHsl(hex, hsl){
    const a = hexToHsl(hex);
    const b = hsl;
    const dh = Math.min(Math.abs(a.h - b.h), 360 - Math.abs(a.h - b.h)) / 180; // 0..2 normalized
    const ds = Math.abs(a.s - b.s) / 100; // 0..1
    const dl = Math.abs(a.l - b.l) / 100; // 0..1
    // waga: hue 0.6, lightness 0.3, saturation 0.1
    return Math.sqrt((0.6*dh)**2 + (0.1*ds)**2 + (0.3*dl)**2);
}
// --- nowa, rozszerzona funkcja planOutfit ---
export function planOutfit(
  clothes,
  pickedClothes,
  minTemp,
  maxTemp,
  takeFriends,
  takeHousehold,
  isHat,
  isClean,
  isOutwear,
  colorPalettes
) {
  const types = [
    ...clothingTypeOptions,
    ...shoesTypeOptions,
  ];

  function tempToSeason(minTemp, maxTemp) {
    const avg = (minTemp + maxTemp) / 2;
    if (maxTemp <= 5) return 'winter';
    if (minTemp >= 24 || avg >= 24) return 'summer';
    if (avg >= 17 && avg <= 23) return 'spring';
    if (avg >= 6 && avg <= 17) {
      return avg < 11 ? 'autumn' : 'spring';
    }
    return 'winter';
  }

  function clothesMatchesSeason(c, minTemp, maxTemp) {
    const computed = tempToSeason(minTemp, maxTemp);
    if (c.seasons) {
      if (c.seasons.map(x => x.toLowerCase()).includes(computed.toLowerCase())) return true;
    }
    return false;
  }

  function colorDistToPalette(hex, palette) {
    if (!hex) return 0;
    let minD = 100;
    for (const p of palette) {
      const d = colorDistanceHsl(hex, p);
      if (d < minD) minD = d;
    }
    return minD;
  }

  //Ubrania użytkownika pasujące do typu
  function getCandidatesForType(type) {
    let candidates = clothes.filter(c => {
      const option = types.find(o => o.label === c.type);
      return option && option.type === type;
    });
    if (isClean) candidates = candidates.filter(c => c.clean);
    candidates = candidates.filter(c => clothesMatchesSeason(c, minTemp, maxTemp));
    return candidates;
  }

  function scoreBestForType({ candidates, palette}) {
    const wPrio = 2;
    const wPalette = 20;

    let best = null;

    const evalCandidate = (c) => {
      const prio = c.priority ?? 0;
      const distPalette = colorDistToPalette(c.colorHex, palette);
      let score = prio * wPrio - distPalette * wPalette;
      return score;
    };
    for (const c of candidates) {
      const s = evalCandidate(c);
      if (!best || s > best.score) best = { item: c, score: s };
    }
    return best;
  }

  function scoreForHex(candidates)
  {
    const wPrio = 2;
    const wColor = 20;

    let best = null;

    const evalCandidate = (c) => {
      const prio = c.priority ?? 0;
      const distHex = colorDistanceHex(c.colorHex, pickedClothes.colorHex);
      let score = prio * wPrio - distHex * wColor;
      return score;
    };

    for (const c of candidates) {
      const s = evalCandidate(c);
      if (!best || s > best.score) best = { item: c, score: s };
    }
    return best.item;
  }


  const palettes = (colorPalettes && colorPalettes.length > 0) ? colorPalettes : [null]; // jeśli brak palet -> jedn opcja null

  if(colorPalettes.length === 0)
  {
    const pickedType = pickedClothes ? types.find(item => item.label === pickedClothes.type).type : null;
    const top = pickedType === 'TOP' ? pickedClothes : scoreForHex(getCandidatesForType('TOP'));
    const bottom = pickedType === 'BOTTOM' ? pickedClothes : scoreForHex(getCandidatesForType('BOTTOM'));
    const shoe = pickedType === 'SHOE' ? pickedClothes : scoreForHex(getCandidatesForType('SHOE'));
    const hat = pickedType === 'HAT' ? pickedClothes : isHat ? scoreForHex(getCandidatesForType('HAT')) : null;
    const outwear = pickedType === 'OUTWEAR' ? pickedClothes : isOutwear ? scoreForHex(getCandidatesForType('OUTWEAR')) : null;

    const ids = [top, bottom, shoe, hat, outwear].flatMap(item => item?.id ? [item.id] : []);   
    return {
      ids: ids
    }
  }


  // główna pętla: dla każdej palety liczymy najlepszy outfit (z opcją 0 albo 1 friend-item)
  const slotTypes = [
    'TOP',
    'BOTTOM',
    'SHOE',
    ...(isHat ? ['HAT'] : []),
    ...(isOutwear ? ['OUTWEAR'] : []),
  ];

  const resultsPerPalette = [];

  for (let pIndex = 0; pIndex < palettes.length; pIndex++) {
    const palette = palettes[pIndex] || [];

    const forced = {};
    if (pickedClothes && pickedClothes.type) {
      const opt = types.find(item => item.label === pickedClothes.type);
      if (opt) forced[opt.type] = pickedClothes;
    }

    const baseOutfit = {};
    for (const slot of slotTypes) {
      if (forced[slot]) {
        baseOutfit[slot.toLowerCase()] = forced[slot];
      } else {
        const cands = getCandidatesForType(slot);
        if (!cands || cands.length === 0) baseOutfit[slot.toLowerCase()] = null;
        else {
          const best = scoreBestForType({ candidates: cands, palette});
          baseOutfit[slot.toLowerCase()] = best ? best.item : null;
        } 
      }
    }

    // funkcja pomocnicza do policzenia sumarycznego score dla outfit objektu (zakłada max 1 friend-item)
    function computeOutfitScore(outfit) {
      // sumujemy score poszczególnych elementów używając tej samej funkcji oceny co wcześniej
      let total = 0;
      for (const slot of slotTypes) {
        const key = slot.toLowerCase();
        const item = outfit[key];
        if (!item) continue;
        const prio = item.priority ?? 0;
        const distPalette = colorDistToPalette(item.colorHex, palette);
        total += prio * 2 - distPalette * 20;
        if (item.fromFriend) {
          total -= 2;
        }
      }
      return total; 
    }

    const baseScore = computeOutfitScore(baseOutfit); 
    
    let bestVariant = { outfit: baseOutfit, score: baseScore, usedFriend: null, usedFriendSlot: null };

    if (takeFriends) {
      for (const slot of slotTypes) {
        if (forced[slot]) continue;

        //TODO: pobierz friends ubrania

        if (friendCands.length === 0) continue;

        const bestFriendForSlot = scoreBestForType({
          candidates: friendCands,
          palette
        });

        if (!bestFriendForSlot) continue;

        // zbuduj nowy outfit, kopiując baseOutfit i podmieniajac slot
        const newOutfit = { ...baseOutfit, [slot.toLowerCase()]: bestFriendForSlot.item };

        // oznacz item jako fromFriend, żeby computeOutfitScore wiedzial że to friend (albo najlepiej sprawdzić pola owner)
        // zamiast mutować obiekt oryginalny, w tym obliczeniu możemy przekazać tymczasowy flag:
        // easiest: shallow copy item z flagą
        newOutfit[slot.toLowerCase()] = { ...bestFriendForSlot.item, fromFriend: true };

        const newScore = computeOutfitScore(newOutfit);

        if (newScore > bestVariant.score) {
          bestVariant = { outfit: newOutfit, score: newScore, usedFriend: bestFriendForSlot.item, usedFriendSlot: slot };
        }
      }
    }

    resultsPerPalette.push({
      paletteIndex: pIndex,
      palette,
      outfit: bestVariant.outfit,
      score: bestVariant.score,
      usedFriendSlot: bestVariant.usedFriendSlot,
      usedFriend: bestVariant.usedFriend,
    });
  } // koniec pętli po paletach

  resultsPerPalette.sort((a, b) => b.score - a.score);
  const bestResult = resultsPerPalette[0];

  const pickedIds = [bestResult?.outfit?.top, bestResult?.outfit?.bottom, bestResult?.outfit?.shoe, bestResult?.outfit?.hat, bestResult?.outfit?.outwear]
    .flatMap(item => item?.id ? [item.id] : []);

  return {
    ids: pickedIds,
    bestPaletteIndex: bestResult ? bestResult.paletteIndex : null,
    bestOutfit: bestResult ? bestResult.outfit : null,
    score: bestResult ? bestResult.score : null,
  };
}
