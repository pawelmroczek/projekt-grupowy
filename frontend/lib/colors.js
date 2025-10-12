export const colors = [
  { name: "red", hex: "#FF0000" },//
  { name: "black", hex: "#000000" },//
  { name: "blue", hex: "#0000FF" },//
  { name: "gray", hex: "#808080" },//
  { name: "white", hex: "#FFFFFF" },//
  { name: "green", hex: "#00FF00" },//
  { name: "yellow", hex: "#FFFF00" },//
  { name: "purple", hex: "#800080" },//
  { name: "orange", hex: "#FFA500" },//
  { name: "brown", hex: "#A52A2A" },//
  { name: "pink", hex: "#FFC0CB" },//
  { name: "silver", hex: "#C0C0C0" },//
  { name: "gold", hex: "#FFD700" },//
  { name: "other", hex: "#FFFFFF" },
];

export const colorsTypes = ["białe", "jasne", "ciemne", "kolorowe"];

export const getColorGroup = (color) => {
  const biale = ["white"];
  const ciemne = ["black", "brown"]
  const jasne = [ "gray"];
  const kolorowe = ["red","blue","green","yellow","purple","orange","pink","silver","gold"];
  if (biale.includes(color)) return "białe";
  if (ciemne.includes(color)) return "ciemne";
  if (jasne.includes(color)) return "jasne";
  return "kolorowe";
};


export const getColorFromGroup = (group) => {
  if (group === "białe") return ["white"];
  if (group === "ciemne") return ["black", "brown"];
  if (group === "jasne") return ["gray"];
  if (group === "kolorowe") return ["red","blue","green","yellow","purple","orange","pink","silver","gold"];
  return ["other"];

};
