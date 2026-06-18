// Unit & text converters — all run locally, zero network calls

export const converterTools = [
  {
    name: 'unit_converter',
    description: 'Convert between units of length, weight, temperature, volume, speed, area, and data storage.',
    inputSchema: {
      type: 'object',
      properties: {
        value: { type: 'number', description: 'Value to convert' },
        from: { type: 'string', description: 'Source unit (e.g. km, kg, celsius, litre, mph, sqm, gb)' },
        to: { type: 'string', description: 'Target unit (e.g. miles, lbs, fahrenheit, gallon, kph, sqft, mb)' }
      },
      required: ['value', 'from', 'to']
    }
  },
  {
    name: 'number_base_converter',
    description: 'Convert numbers between binary, octal, decimal, and hexadecimal.',
    inputSchema: {
      type: 'object',
      properties: {
        value: { type: 'string', description: 'The number to convert (as a string to support all bases)' },
        from_base: { type: 'number', enum: [2, 8, 10, 16], description: 'Source base: 2=binary, 8=octal, 10=decimal, 16=hex' }
      },
      required: ['value', 'from_base']
    }
  },
  {
    name: 'roman_numeral_converter',
    description: 'Convert between Roman numerals and integers (1–3999).',
    inputSchema: {
      type: 'object',
      properties: {
        input: { type: 'string', description: 'An integer (1–3999) or Roman numeral string (e.g. XLII or 42)' }
      },
      required: ['input']
    }
  },
  {
    name: 'number_to_words',
    description: 'Convert any number to its written English word form (e.g. 1234 → "one thousand two hundred thirty-four").',
    inputSchema: {
      type: 'object',
      properties: {
        number: { type: 'number', description: 'Number to convert to words (up to 999 trillion)' }
      },
      required: ['number']
    }
  },
  {
    name: 'color_converter',
    description: 'Convert colors between HEX, RGB, HSL, HSV, and CMYK formats.',
    inputSchema: {
      type: 'object',
      properties: {
        input: { type: 'string', description: 'Color in any format: #FF5733 or rgb(255,87,51) or hsl(11,100%,60%) or a CSS color name like "coral"' }
      },
      required: ['input']
    }
  }
];

export function runConverter(name: string, args: Record<string, unknown>): string {
  switch (name) {
    case 'unit_converter': return unitConverter(args);
    case 'number_base_converter': return baseConverter(args);
    case 'roman_numeral_converter': return romanConverter(args);
    case 'number_to_words': return numberToWords(args);
    case 'color_converter': return colorConverter(args);
    default: return 'Unknown tool';
  }
}

// ─── Unit Converter ───────────────────────────────────────────────────────────

type ConversionMap = Record<string, number>;

const LENGTH: ConversionMap = {
  mm:0.001,cm:0.01,m:1,km:1000,inch:0.0254,inches:0.0254,ft:0.3048,feet:0.3048,
  foot:0.3048,yd:0.9144,yards:0.9144,mile:1609.344,miles:1609.344,
  nautical_mile:1852,ly:9.461e15,au:1.496e11
};
const WEIGHT: ConversionMap = {
  mg:0.000001,g:0.001,kg:1,tonne:1000,metric_ton:1000,oz:0.028349523,
  ounce:0.028349523,lb:0.453592,lbs:0.453592,pound:0.453592,pounds:0.453592,
  stone:6.35029,ton:907.185,short_ton:907.185
};
const VOLUME: ConversionMap = {
  ml:0.001,millilitre:0.001,l:1,litre:1,liter:1,liters:1,litres:1,
  cl:0.01,dl:0.1,m3:1000,cm3:0.001,
  tsp:0.00492892,teaspoon:0.00492892,tbsp:0.0147868,tablespoon:0.0147868,
  cup:0.236588,cups:0.236588,pint:0.473176,pints:0.473176,quart:0.946353,
  quarts:0.946353,gallon:3.78541,gallons:3.78541,floz:0.0295735,
  imperial_gallon:4.54609,imperial_pint:0.568261
};
const SPEED: ConversionMap = {
  mps:1,ms:1,'m/s':1,kph:0.277778,'km/h':0.277778,kmh:0.277778,
  mph:0.44704,'mi/h':0.44704,knot:0.514444,knots:0.514444,fps:0.3048,'ft/s':0.3048
};
const AREA: ConversionMap = {
  sqmm:0.000001,sqcm:0.0001,sqm:1,'m2':1,sqkm:1000000,'km2':1000000,
  sqin:0.00064516,sqft:0.092903,'ft2':0.092903,sqyd:0.836127,sqmi:2589988,
  acre:4046.86,acres:4046.86,hectare:10000,ha:10000
};
const DATA: ConversionMap = {
  bit:1,bits:1,byte:8,bytes:8,kb:8000,kilobyte:8000,kilobytes:8000,
  kib:8192,mb:8000000,megabyte:8000000,megabytes:8000000,mib:8388608,
  gb:8000000000,gigabyte:8000000000,gigabytes:8000000000,gib:8589934592,
  tb:8e12,terabyte:8e12,terabytes:8e12,tib:8796093022208,
  pb:8e15,petabyte:8e15
};

function convertLinear(value: number, from: string, to: string, map: ConversionMap): string | null {
  const f = map[from.toLowerCase()];
  const t = map[to.toLowerCase()];
  if (!f || !t) return null;
  const result = (value * f) / t;
  return `${value} ${from} = ${+result.toPrecision(8)} ${to}`;
}

function unitConverter(args: Record<string, unknown>): string {
  const { value, from, to } = args as { value: number; from: string; to: string };
  const f = (from as string).toLowerCase();
  const t = (to as string).toLowerCase();

  // Temperature — special case (not multiplicative)
  const temps = ['celsius','c','fahrenheit','f','kelvin','k','rankine','r'];
  if (temps.includes(f) || temps.includes(t)) {
    let celsius: number;
    switch (f) {
      case 'celsius': case 'c': celsius = value; break;
      case 'fahrenheit': case 'f': celsius = (value - 32) * 5/9; break;
      case 'kelvin': case 'k': celsius = value - 273.15; break;
      case 'rankine': case 'r': celsius = (value - 491.67) * 5/9; break;
      default: return `Unknown temperature unit: ${from}`;
    }
    let result: number;
    switch (t) {
      case 'celsius': case 'c': result = celsius; break;
      case 'fahrenheit': case 'f': result = celsius * 9/5 + 32; break;
      case 'kelvin': case 'k': result = celsius + 273.15; break;
      case 'rankine': case 'r': result = (celsius + 273.15) * 9/5; break;
      default: return `Unknown temperature unit: ${to}`;
    }
    return `${value} ${from} = ${+result.toPrecision(8)} ${to}`;
  }

  const maps: Array<[string, ConversionMap]> = [
    ['length', LENGTH], ['weight', WEIGHT], ['volume', VOLUME],
    ['speed', SPEED], ['area', AREA], ['data', DATA]
  ];

  for (const [category, map] of maps) {
    const result = convertLinear(value, f, t, map);
    if (result) return `${result}\n(${category})`;
  }

  return `Cannot convert "${from}" to "${to}". Supported categories: length, weight, temperature, volume, speed, area, data.`;
}

// ─── Base Converter ───────────────────────────────────────────────────────────

function baseConverter(args: Record<string, unknown>): string {
  const { value, from_base } = args as { value: string; from_base: number };
  const decimal = parseInt(value, from_base);
  if (isNaN(decimal)) return `"${value}" is not a valid base-${from_base} number.`;

  return [
    `Input: ${value} (base ${from_base})`,
    ``,
    `Binary  (base 2):  ${decimal.toString(2)}`,
    `Octal   (base 8):  ${decimal.toString(8)}`,
    `Decimal (base 10): ${decimal.toString(10)}`,
    `Hex     (base 16): ${decimal.toString(16).toUpperCase()}`
  ].join('\n');
}

// ─── Roman Numeral Converter ──────────────────────────────────────────────────

function romanConverter(args: Record<string, unknown>): string {
  const { input } = args as { input: string };
  const trimmed = input.trim();

  if (/^\d+$/.test(trimmed)) {
    let num = parseInt(trimmed);
    if (num < 1 || num > 3999) return 'Integer must be between 1 and 3999.';
    const vals = [1000,900,500,400,100,90,50,40,10,9,5,4,1];
    const syms = ['M','CM','D','CD','C','XC','L','XL','X','IX','V','IV','I'];
    let roman = '';
    for (let i = 0; i < vals.length; i++) {
      while (num >= vals[i]) { roman += syms[i]; num -= vals[i]; }
    }
    return `${trimmed} = ${roman}`;
  }

  const upper = trimmed.toUpperCase();
  const vals: Record<string, number> = {M:1000,D:500,C:100,L:50,X:10,V:5,I:1};
  let result = 0;
  for (let i = 0; i < upper.length; i++) {
    const cur = vals[upper[i]];
    const next = vals[upper[i+1]];
    if (!cur) return `Invalid Roman numeral character: ${upper[i]}`;
    if (next && cur < next) result -= cur;
    else result += cur;
  }
  return `${upper} = ${result}`;
}

// ─── Number to Words ──────────────────────────────────────────────────────────

function numberToWords(args: Record<string, unknown>): string {
  const { number } = args as { number: number };
  if (number === 0) return 'zero';
  if (!isFinite(number)) return 'Invalid number';

  const ones = ['','one','two','three','four','five','six','seven','eight','nine',
    'ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen'];
  const tens = ['','','twenty','thirty','forty','fifty','sixty','seventy','eighty','ninety'];

  function say(n: number): string {
    if (n < 20) return ones[n];
    if (n < 100) return tens[Math.floor(n/10)] + (n%10 ? '-' + ones[n%10] : '');
    if (n < 1000) return ones[Math.floor(n/100)] + ' hundred' + (n%100 ? ' ' + say(n%100) : '');
    if (n < 1e6) return say(Math.floor(n/1000)) + ' thousand' + (n%1000 ? ' ' + say(n%1000) : '');
    if (n < 1e9) return say(Math.floor(n/1e6)) + ' million' + (n%1e6 ? ' ' + say(n%1e6) : '');
    if (n < 1e12) return say(Math.floor(n/1e9)) + ' billion' + (n%1e9 ? ' ' + say(n%1e9) : '');
    return say(Math.floor(n/1e12)) + ' trillion' + (n%1e12 ? ' ' + say(n%1e12) : '');
  }

  const abs = Math.abs(Math.round(number));
  return (number < 0 ? 'negative ' : '') + say(abs);
}

// ─── Color Converter ──────────────────────────────────────────────────────────

const CSS_COLORS: Record<string, string> = {
  red:'#FF0000',green:'#008000',blue:'#0000FF',white:'#FFFFFF',black:'#000000',
  yellow:'#FFFF00',cyan:'#00FFFF',magenta:'#FF00FF',orange:'#FFA500',
  purple:'#800080',pink:'#FFC0CB',brown:'#A52A2A',gray:'#808080',grey:'#808080',
  coral:'#FF7F50',tomato:'#FF6347',gold:'#FFD700',lime:'#00FF00',teal:'#008080',
  navy:'#000080',maroon:'#800000',olive:'#808000',silver:'#C0C0C0',
  aqua:'#00FFFF',fuchsia:'#FF00FF',indigo:'#4B0082',violet:'#EE82EE'
};

function hexToRgb(hex: string): [number,number,number] {
  const n = hex.replace('#','');
  const full = n.length === 3 ? n.split('').map(c=>c+c).join('') : n;
  return [
    parseInt(full.slice(0,2),16),
    parseInt(full.slice(2,4),16),
    parseInt(full.slice(4,6),16)
  ];
}

function rgbToHsl(r: number, g: number, b: number): [number,number,number] {
  r/=255; g/=255; b/=255;
  const max=Math.max(r,g,b), min=Math.min(r,g,b);
  let h=0, s=0, l=(max+min)/2;
  if (max!==min) {
    const d=max-min;
    s=l>0.5?d/(2-max-min):d/(max+min);
    switch(max){
      case r: h=((g-b)/d+(g<b?6:0))/6; break;
      case g: h=((b-r)/d+2)/6; break;
      case b: h=((r-g)/d+4)/6; break;
    }
  }
  return [Math.round(h*360),Math.round(s*100),Math.round(l*100)];
}

function rgbToHsv(r: number, g: number, b: number): [number,number,number] {
  r/=255; g/=255; b/=255;
  const max=Math.max(r,g,b), min=Math.min(r,g,b), d=max-min;
  let h=0;
  const s=max===0?0:d/max, v=max;
  if (d!==0) {
    switch(max){
      case r: h=((g-b)/d+(g<b?6:0))/6; break;
      case g: h=((b-r)/d+2)/6; break;
      case b: h=((r-g)/d+4)/6; break;
    }
  }
  return [Math.round(h*360),Math.round(s*100),Math.round(v*100)];
}

function rgbToCmyk(r: number, g: number, b: number): [number,number,number,number] {
  r/=255; g/=255; b/=255;
  const k=1-Math.max(r,g,b);
  if (k===1) return [0,0,0,100];
  return [
    Math.round(((1-r-k)/(1-k))*100),
    Math.round(((1-g-k)/(1-k))*100),
    Math.round(((1-b-k)/(1-k))*100),
    Math.round(k*100)
  ];
}

function colorConverter(args: Record<string, unknown>): string {
  const { input } = args as { input: string };
  let hex: string;

  const s = input.trim().toLowerCase();

  if (CSS_COLORS[s]) {
    hex = CSS_COLORS[s];
  } else if (/^#?[0-9a-f]{3,6}$/i.test(s)) {
    hex = s.startsWith('#') ? s : '#' + s;
  } else if (/^rgb/i.test(s)) {
    const m = s.match(/[\d.]+/g)!.map(Number);
    hex = '#' + m.slice(0,3).map(v=>Math.round(v).toString(16).padStart(2,'0')).join('').toUpperCase();
  } else if (/^hsl/i.test(s)) {
    const m = s.match(/[\d.]+/g)!.map(Number);
    const [h,ss,l] = [m[0]/360, m[1]/100, m[2]/100];
    const q=l<0.5?l*(1+ss):l+ss-l*ss, p=2*l-q;
    const hue2rgb=(p2:number,q2:number,t:number)=>{
      if(t<0)t+=1;if(t>1)t-=1;
      if(t<1/6)return p2+(q2-p2)*6*t;
      if(t<1/2)return q2;
      if(t<2/3)return p2+(q2-p2)*(2/3-t)*6;
      return p2;
    };
    const rgb=[hue2rgb(p,q,h+1/3),hue2rgb(p,q,h),hue2rgb(p,q,h-1/3)].map(v=>Math.round(v*255));
    hex = '#' + rgb.map(v=>v.toString(16).padStart(2,'0')).join('').toUpperCase();
  } else {
    return `Cannot parse color: "${input}". Try: #FF5733, rgb(255,87,51), hsl(11,100%,60%), or a CSS color name.`;
  }

  const [r,g,b] = hexToRgb(hex);
  const [h,sl,l] = rgbToHsl(r,g,b);
  const [,sv,v] = rgbToHsv(r,g,b);
  const [c,m,y,k] = rgbToCmyk(r,g,b);

  return [
    `HEX:  ${hex.toUpperCase()}`,
    `RGB:  rgb(${r}, ${g}, ${b})`,
    `HSL:  hsl(${h}, ${sl}%, ${l}%)`,
    `HSV:  hsv(${h}, ${sv}%, ${v}%)`,
    `CMYK: cmyk(${c}%, ${m}%, ${y}%, ${k}%)`
  ].join('\n');
}
