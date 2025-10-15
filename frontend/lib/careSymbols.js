// Dostępne symbole prania i ich znaczenie
export const CARE_SYMBOLS = [
  '30C', '40C', '50C', '60C', '70C', '95C',
  'DN_bleach', 'DN_dry', 'DN_dry_clean', 'DN_iron', 'DN_steam', 
  'DN_tumble_dry', 'DN_wash', 'DN_wring', 'bleach', 'chlorine_bleach', 
  'drip_dry', 'dry_clean', 'dry_clean_any_solvent', 
  'dry_clean_any_solvent_except_trichloroethylene', 'dry_clean_low_heat', 
  'dry_clean_no_steam', 'dry_clean_petrol_only', 'dry_clean_reduced_moisture', 
  'dry_clean_short_cycle', 'dry_flat', 'hand_wash', 'iron', 'iron_high', 
  'iron_low', 'iron_medium', 'line_dry', 'line_dry_in_shade', 
  'machine_wash_delicate', 'machine_wash_normal', 'machine_wash_permanent_press', 
  'natural_dry', 'non_chlorine_bleach', 'shade_dry', 'steam', 
  'tumble_dry_low', 'tumble_dry_medium', 'tumble_dry_no_heat', 
  'tumble_dry_normal', 'wet_clean', 'wring'
];

// Kategoryzacja symboli
export const SYMBOL_CATEGORIES = {
  TEMPERATURE: ['30C', '40C', '50C', '60C', '70C', '95C'],
  WASH_TYPE: [
    'hand_wash', 'machine_wash_delicate', 'machine_wash_normal', 
    'machine_wash_permanent_press', 'wet_clean'
  ],
  WASH_RESTRICTIONS: ['DN_wash', 'DN_wring'],
  BLEACH: ['bleach', 'chlorine_bleach', 'non_chlorine_bleach', 'DN_bleach'],
  DRY: [
    'drip_dry', 'line_dry', 'line_dry_in_shade', 'dry_flat', 'shade_dry',
    'tumble_dry_low', 'tumble_dry_medium', 'tumble_dry_no_heat', 
    'tumble_dry_normal', 'natural_dry', 'DN_dry', 'DN_tumble_dry'
  ],
  IRON: ['iron', 'iron_high', 'iron_low', 'iron_medium', 'DN_iron', 'steam', 'DN_steam'],
  DRY_CLEAN: [
    'dry_clean', 'dry_clean_any_solvent', 'dry_clean_any_solvent_except_trichloroethylene',
    'dry_clean_low_heat', 'dry_clean_no_steam', 'dry_clean_petrol_only',
    'dry_clean_reduced_moisture', 'dry_clean_short_cycle', 'DN_dry_clean'
  ]
};

// Polskie opisy symboli
export const SYMBOL_DESCRIPTIONS = {
  // Temperatury
  '30C': 'Pranie w 30°C',
  '40C': 'Pranie w 40°C',
  '50C': 'Pranie w 50°C',
  '60C': 'Pranie w 60°C',
  '70C': 'Pranie w 70°C',
  '95C': 'Pranie w 95°C',
  
  // Typy prania
  'hand_wash': 'Pranie ręczne',
  'machine_wash_delicate': 'Pranie delikatne w pralce',
  'machine_wash_normal': 'Pranie normalne w pralce',
  'machine_wash_permanent_press': 'Pranie z utrwalaniem',
  'wet_clean': 'Pranie mokre',
  
  // Zakazy prania
  'DN_wash': 'Nie prać',
  'DN_wring': 'Nie wykręcać',
  
  // Wybielanie
  'bleach': 'Można wybielać',
  'chlorine_bleach': 'Można wybielać chlorem',
  'non_chlorine_bleach': 'Tylko wybielacz bez chloru',
  'DN_bleach': 'Nie wybielać',
  
  // Suszenie
  'drip_dry': 'Suszenie pionowe',
  'line_dry': 'Suszenie na linie',
  'line_dry_in_shade': 'Suszenie na linie w cieniu',
  'dry_flat': 'Suszenie na płasko',
  'shade_dry': 'Suszenie w cieniu',
  'tumble_dry_low': 'Suszarka - niska temperatura',
  'tumble_dry_medium': 'Suszarka - średnia temperatura',
  'tumble_dry_no_heat': 'Suszarka - bez ciepła',
  'tumble_dry_normal': 'Suszarka - normalna temperatura',
  'natural_dry': 'Suszenie naturalne',
  'DN_dry': 'Nie suszyć',
  'DN_tumble_dry': 'Nie suszyć w suszarce',
  
  // Prasowanie
  'iron': 'Można prasować',
  'iron_high': 'Prasowanie - wysoka temperatura',
  'iron_low': 'Prasowanie - niska temperatura',
  'iron_medium': 'Prasowanie - średnia temperatura',
  'DN_iron': 'Nie prasować',
  'steam': 'Można parować',
  'DN_steam': 'Nie parować',
  
  // Pranie chemiczne
  'dry_clean': 'Pranie chemiczne',
  'dry_clean_any_solvent': 'Pranie chemiczne - dowolny rozpuszczalnik',
  'dry_clean_any_solvent_except_trichloroethylene': 'Pranie chemiczne - bez trichloroetylenu',
  'dry_clean_low_heat': 'Pranie chemiczne - niska temperatura',
  'dry_clean_no_steam': 'Pranie chemiczne - bez pary',
  'dry_clean_petrol_only': 'Pranie chemiczne - tylko benzyna',
  'dry_clean_reduced_moisture': 'Pranie chemiczne - zmniejszona wilgotność',
  'dry_clean_short_cycle': 'Pranie chemiczne - krótki cykl',
  'DN_dry_clean': 'Nie czyścić chemicznie'
};

// Funkcje pomocnicze
export const getSymbolDescription = (symbol) => {
  return SYMBOL_DESCRIPTIONS[symbol] || symbol;
};

export const getSymbolCategory = (symbol) => {
  for (const [category, symbols] of Object.entries(SYMBOL_CATEGORIES)) {
    if (symbols.includes(symbol)) {
      return category;
    }
  }
  return 'OTHER';
};

export const getTemperatureSymbols = () => SYMBOL_CATEGORIES.TEMPERATURE;

export const validateCareSymbols = (symbols) => {
  if (!Array.isArray(symbols)) return false;
  return symbols.every(symbol => CARE_SYMBOLS.includes(symbol));
};