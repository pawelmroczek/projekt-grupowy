import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import { clothingTypeOptions, shoesTypeOptions } from "../../assets/constants/types/types";

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


export function planOutfit(clothes, pickedClothes, minTemp, maxTemp, takeFriends, takeHousehold, isHat, isClean, isOutwear){
    // temperatura -> sezon 
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
            if (c.seasons.map(x=>x.toLowerCase()).includes(computed.toLowerCase())) return true;
        }
        return false;
    };
    function pickForType(type) {

        let candidates = clothes.filter(c => {
            const option = types.find(o => o.label === c.type);
            return option && option.type === type;
        });
        if (isClean) candidates = candidates.filter(c => c.clean);
        candidates = candidates.filter(c => clothesMatchesSeason(c, minTemp, maxTemp));
        if (candidates.length === 0) return null;

        const scored = candidates.map(c => {
            let colorDist = 0;
            if(pickedClothes != null){
                colorDist = c.hexColor ? colorDistanceHex(c.hexColor, pickedClothes.hexColor) : 0;
            }
            const prio = c.priority ?? 0;
            return { c, score: prio * 10 - colorDist };
        });

        scored.sort((a, b) => b.score - a.score);
        return scored[0].c;
    };


    const pickedType = pickedClothes ? types.find(item => item.label === pickedClothes.type).type : null;
    const top = pickedType === 'TOP' ? pickedClothes : pickForType('TOP');
    const bottom = pickedType === 'BOTTOM' ? pickedClothes : pickForType('BOTTOM');
    const shoe = pickedType === 'SHOE' ? pickedClothes : pickForType('SHOE');
    const hat = pickedType === 'HAT' ? pickedClothes : isHat ? pickForType('HAT') : null;
    const outwear = pickedType === 'OUTWEAR' ? pickedClothes : isOutwear ? pickForType('OUTWEAR') : null;

    const ids = [top, bottom, shoe, hat, outwear].flatMap(item => item?.id ? [item.id] : []);   
    return ids;
}
