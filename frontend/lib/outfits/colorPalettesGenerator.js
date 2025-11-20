
function rgbToHex(r,g,b) {
  const toHex = v => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2,'0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}
function hslToRgb(h, s, l){
  h = ((h % 360) + 360) % 360;
  if (s === 0) {
    const v = Math.round(l * 255);
    return { r: v, g: v, b: v };
  }
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  const hk = h / 360;
  const tc = i => {
    let t = hk + (i===0?1/3: (i===1?0:-1/3));
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1/6) return p + (q - p) * 6 * t;
    if (t < 1/2) return q;
    if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
    return p;
  };
  return { r: Math.round(tc(0) * 255), g: Math.round(tc(1) * 255), b: Math.round(tc(2) * 255) };
}
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

function roundHsl(h, s, l) {
  const hr = Math.round(h);
  const sr = Math.round(s);
  const lr = Math.round(l);
  return {h: hr, s: sr, l: lr};
}

function rand(min, max) {
  return min + Math.random() * (max - min);
}

function pickHueInSector(sector) {
  let h = rand(sector[0], sector[1]);
  return (h + 360) % 360;
}

function randomFashionSL() {
  return {
    s: rand(20, 55),
    l: rand(30, 70)
  };
}

function randomNeutralSL() {
  const t = Math.random();

  if (t < 0.2) {
    return {
      s: rand(0, 5),
      l: rand(5, 15)
    };
  }

  if (t < 0.4) {
    return {
      s: rand(0, 5),
      l: rand(85, 100)
    };
  }

  return {
    s: rand(0, 10),
    l: rand(20, 80)
  };
}

const HUE_TEMPLATES = {
  "i": [ [-9, 0], [-9, 0], [0, 9], [0, 9]],
  "V": [ [-47, 0], [-47, 0], [0, 47], [0, 47]],
  "L": [ [-47, 47], [-47, 47], [-47, 47], [-99, -81]],
  "L-C": [ [-47, 47], [-47, 47], [-47, 47], [81, 99]],
  "I": [ [-9, 9], [-9, 9], [171, 189], [171, 189] ],
  "T": [ [ -90, 0 ], [ -90, 0 ], [ 0, 90 ], [ 0, 90 ]],
  "Y": [ [ -47, 47], [ -47, 47], [ -47, 47], [171, 189] ],
  "X": [ [-47, 0], [0, 47], [133, 180], [180, 227]]
};

function rotateTemplateToInputHue(template, inputHue) {
  
  return template.map(sec => {
    const [start, end] = sec;

    let s = (start + inputHue) % 360;
    let e = (end + inputHue) % 360;

    if (s < 0) s += 360;
    if (e < 0) e += 360;

    return [s, e];
  });
}

export function generatePalettes(hex) {

  const hsl = hexToHsl(hex);

  const inputColor = roundHsl(hsl.h, hsl.s, hsl.l);

  const result = [];

  Object.keys(HUE_TEMPLATES).forEach(templateName => {
    const template = HUE_TEMPLATES[templateName];

    
    const palette = [inputColor];

    const rotated = rotateTemplateToInputHue(template, hsl.h);

    rotated.forEach((sector) => {

      const hue = pickHueInSector(sector);

        
      let sl;
      if (Math.random() < 0.2) {
        sl = randomNeutralSL();
      } else {
        sl = randomFashionSL();
      }

      palette.push(roundHsl(hue, sl.s, sl.l));
    });

    result.push(palette);
  });

  return result;
}
