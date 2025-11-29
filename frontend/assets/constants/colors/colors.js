export const colors = [
    { name: "black", hex: "#000000" },//
    { name: "white", hex: "#FFFFFF" },//
    { name: "gray", hex: "#808080" },//
    { name: "light gray", hex: "#D3D3D3" },//
    { name: "beige", hex: "#F5F5DC" },//
    { name: "brown", hex: "#3E1805" },//
    { name: "tan", hex: "#D2B48C" },//
    { name: "khaki", hex: "#F0E68C" },//
    { name: "red", hex: "#FF0000" },//
    { name: "maroon", hex: "#800000" },//
    { name: "pink", hex: "#FFC0CB" },//
    { name: "orange", hex: "#FFA500" },//
    { name: "yellow", hex: "#FFFF00" },//
    { name: "gold", hex: "#FFD700" },//
    { name: "green", hex: "#00FF00" },//
    { name: "olive", hex: "#808000" },//
    { name: "teal", hex: "#008080" },//
    { name: "cyan", hex: "#00FFFF" },//
    { name: "blue", hex: "#0000FF" },//
    { name: "navy", hex: "#000080" },//
    { name: "purple", hex: "#800080" },//
    { name: "lavender", hex: "#E6E6FA" },//
    { name: "burgundy", hex: "#800020" }//
];

export const colorsTypes = ["białe", "jasne", "ciemne", "kolorowe"];

export const getColorGroup = (color) => {
  const biale = ["white"];
  const ciemne = ["black", "brown", "navy", "maroon"];
  const jasne = [ "gray", "light gray", "beige", "tan", "khaki"];
  const kolorowe = ["red", "blue","green","yellow","purple","orange","pink","silver","gold", "olive", "teal", "cyan", "lavender", "burgundy"];
  if (biale.includes(color)) return "białe";
  if (ciemne.includes(color)) return "ciemne";
  if (jasne.includes(color)) return "jasne";
  return "kolorowe";
};


export const getColorFromGroup = (group) => {
  if (group === "białe") return ["white"];
  if (group === "ciemne") return ["black", "brown", "navy", "maroon"];
  if (group === "jasne") return ["gray", "light gray", "beige", "tan", "khaki"];
  if (group === "kolorowe") return ["red", "blue","green","yellow","purple","orange","pink","silver","gold", "olive", "teal", "cyan", "lavender", "burgundy"];
  return ["other"];
};


function hexToHsl(hex) {
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

    // normalizowane wartości
    const ds = Math.abs(a.s - b.s) / 100; 
    const dl = Math.abs(a.l - b.l) / 100; 

    // uwzględniamy, że przy niskim nasyceniu odcień nie ma znaczenia
    const dhRaw = Math.min(Math.abs(a.h - b.h), 360 - Math.abs(a.h - b.h)) / 180; 
    const dh = dhRaw * ((a.s + b.s) / 200); // skaluje odcień proporcjonalnie do średniego nasycenia

    // wagi: hue 0.6, lightness 0.3, saturation 0.1
    return Math.sqrt((0.6*dh)**2 + (0.3*dl)**2 + (0.1*ds)**2);
}


export function simpleColorName(hex) {
    if (!hex) return 'unknown';

    const hsl = hexToHsl(hex);

    if (hsl.l >= 95) return 'white';
    if (hsl.l <= 5) return 'black';

    let closest = colors[0];
    let minDist = colorDistanceHex(hex, colors[0].hex);

    for (let i = 1; i < colors.length; i++) {
        const dist = colorDistanceHex(hex, colors[i].hex);
        if (dist < minDist) {
            minDist = dist;
            closest = colors[i];
        }
    }

    return closest.name;
}