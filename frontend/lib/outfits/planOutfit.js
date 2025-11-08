import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

export function hexToHsl(hex) {
    const hex_tmp = hex.replace('#','');
    const bigint = parseInt(hex_tmp, 16);
    var r = (bigint >> 16) & 255;
    var g = (bigint >> 8) & 255;
    var b = bigint & 255;

    console.log('RGB:', r, g, b);

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

// prosta odleglosc w HSL (ważymy najbardziej odcień i jasność)
function colorDistanceHex(hexA, hexB){
    const a = hexToHsl(hexA);
    const b = hexToHsl(hexB);
    const dh = Math.min(Math.abs(a.h - b.h), 360 - Math.abs(a.h - b.h)) / 180; // 0..2 normalized
    const ds = Math.abs(a.s - b.s) / 100; // 0..1
    const dl = Math.abs(a.l - b.l) / 100; // 0..1
    // waga: hue 0.6, lightness 0.3, saturation 0.1
    return Math.sqrt((0.6*dh)**2 + (0.1*ds)**2 + (0.3*dl)**2);
}


function isNeutralByHsl(hex){
    const hsl = hexToHsl(hex);
    return hsl.s < 8 || (hsl.l > 90 || hsl.l < 10);
}


// mapowanie hex -> prosty tag koloru (opcjonalne, pomocnicze)
function simpleColorName(hex){
    const hsl = hexToHsl(hex);
    if(isNeutralByHsl(hex)) return 'neutral';
    if(hsl.h < 30 || hsl.h >= 330) return 'red';
    if(hsl.h < 60) return 'orange';
    if(hsl.h < 90) return 'yellow';
    if(hsl.h < 150) return 'green';
    if(hsl.h < 210) return 'cyan';
    if(hsl.h < 270) return 'blue';
    if(hsl.h < 330) return 'purple';
    return 'unknown';
}


const temperature = 15;
const pickedClothes = {id: 1, type: "top", color: '#FF5733', seasons: ['spring', 'summer']};
const takeFriends = false;
const takeHousehold = false;
const isHat = false;
const isClean = true;

export function planOutfit(clothes, pickedClothes, temperature, takeFriends, takeHousehold, isHat, isClean){
    // temperatura -> sezon 

    function tempToSeasons(temp){
        // <=5: winter
        // 6..16: autumn/winter/spring (transitions) -> return ['spring', 'autumn']
        // 17..23: spring/autumn
        // 24+: summer
        if (temp >= 24) return ['summer'];
        if (temp >= 17 && temp <= 23) return ['spring', 'autumn'];
        if (temp >= 6 && temp <= 16) return ['autumn', 'winter', 'spring'];
        return ['winter'];
    }

    function clothesMatchesSeason(c, temp) {
        const computed = tempToSeasons(temp);
        if (c.seasons && Array.isArray(c.seasons) && c.seasons.length>0) {
        for (const s of computed) {
            if (c.seasons.map(x=>x.toLowerCase()).includes(s.toLowerCase())) return true;
        }
        }
        return false;
    };

        // helper: for a given type pick best garment
    function pickForType(type) {
        let candidates = clothes.filter(c => c.type === type);
        if (isClean) candidates = candidates.filter(c => c.clean);
        candidates = candidates.filter(c => clothesMatchesSeason(c, temperature));
        if (candidates.length === 0) return null;

        const scored = candidates.map(c => {
            const colorDist = targetHsl && c.color ? colorDistanceHex(c.color, pickedClothes.color) : 0;
            const prio = c.priority ?? 0;
            return { c, score: prio * 10 - colorDist };
        });

        scored.sort((a, b) => b.score - a.score);
        return scored[0].c;
    };

    const top = pickForType('top');
    const bottom = pickForType('bottom');
    const shoe = pickForType('shoe');
    const hat = isHat ? pickForType('hat') : null;

    const result = {top,bottom,shoe,hat};    
    return result;
}
