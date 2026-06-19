export const healthTools = [
  {
    name: 'body_fat_calculator',
    description: 'Calculate body fat percentage using the US Navy circumference method. Requires neck, waist, and (for females) hip measurements.',
    inputSchema: {
      type: 'object',
      properties: {
        gender: { type: 'string', enum: ['male', 'female'], description: 'Biological sex' },
        weight_kg: { type: 'number', description: 'Body weight in kg (used to calculate fat/lean mass)' },
        neck: { type: 'number', description: 'Neck circumference' },
        waist: { type: 'number', description: 'Waist circumference (at navel)' },
        hip: { type: 'number', description: 'Hip circumference (females only)' },
        height: { type: 'number', description: 'Height' },
        unit: { type: 'string', enum: ['metric', 'imperial'], description: 'metric = cm | imperial = inches', default: 'metric' }
      },
      required: ['gender', 'weight_kg', 'neck', 'waist', 'height']
    }
  },
  {
    name: 'ideal_weight_calculator',
    description: 'Calculate ideal body weight using four established formulas: Devine, Robinson, Miller, and Hamwi.',
    inputSchema: {
      type: 'object',
      properties: {
        height_cm: { type: 'number', description: 'Height in centimetres' },
        gender: { type: 'string', enum: ['male', 'female'], description: 'Biological sex' }
      },
      required: ['height_cm', 'gender']
    }
  },
  {
    name: 'water_intake_calculator',
    description: 'Calculate daily water intake recommendation based on body weight, activity level, and climate.',
    inputSchema: {
      type: 'object',
      properties: {
        weight_kg: { type: 'number', description: 'Body weight in kilograms' },
        activity_level: { type: 'string', enum: ['sedentary', 'moderate', 'active'], description: 'Daily activity level', default: 'sedentary' },
        climate: { type: 'string', enum: ['normal', 'hot'], description: 'Climate / environmental heat', default: 'normal' }
      },
      required: ['weight_kg']
    }
  },
  {
    name: 'sleep_calculator',
    description: 'Calculate optimal bedtimes or wake-up times based on 90-minute sleep cycles.',
    inputSchema: {
      type: 'object',
      properties: {
        time: { type: 'string', description: 'Time in HH:MM (24-hour format), e.g. "07:00"' },
        mode: { type: 'string', enum: ['wake_time', 'sleep_time'], description: 'wake_time = you know when you must wake, find bedtimes | sleep_time = you know when you sleep, find wake times' }
      },
      required: ['time', 'mode']
    }
  },
  {
    name: 'macro_calculator',
    description: 'Calculate daily macronutrient targets (protein, carbs, fat) based on TDEE and goal.',
    inputSchema: {
      type: 'object',
      properties: {
        tdee: { type: 'number', description: 'Total Daily Energy Expenditure in kcal/day' },
        goal: { type: 'string', enum: ['fat_loss', 'muscle_gain', 'maintenance'], description: 'Dietary goal' },
        body_weight_kg: { type: 'number', description: 'Body weight in kilograms (used to set protein and fat targets)' }
      },
      required: ['tdee', 'goal', 'body_weight_kg']
    }
  },
  {
    name: 'tdee_calculator',
    description: 'Calculate Total Daily Energy Expenditure (TDEE) using multiple BMR formulas (Mifflin-St Jeor, Harris-Benedict, Katch-McArdle, Oxford) across all activity levels.',
    inputSchema: {
      type: 'object',
      properties: {
        age: { type: 'number', description: 'Age in years' },
        gender: { type: 'string', enum: ['male', 'female'], description: 'Biological sex' },
        weight_kg: { type: 'number', description: 'Body weight in kilograms' },
        height_cm: { type: 'number', description: 'Height in centimetres' },
        activity_level: { type: 'string', enum: ['sedentary', 'lightly_active', 'moderately_active', 'very_active', 'extra_active'], description: 'Overall daily activity level', default: 'sedentary' },
        body_fat_percent: { type: 'number', description: 'Body fat percentage (optional, enables Katch-McArdle formula)' }
      },
      required: ['age', 'gender', 'weight_kg', 'height_cm', 'activity_level']
    }
  },
  {
    name: 'running_pace_calculator',
    description: 'Calculate running pace, finish time, or distance covered. Supports metric and imperial units.',
    inputSchema: {
      type: 'object',
      properties: {
        mode: { type: 'string', enum: ['pace', 'time', 'distance'], description: 'pace = calculate pace from distance+time | time = calculate finish time from distance+pace | distance = calculate distance from time+pace' },
        distance_km: { type: 'number', description: 'Distance in kilometres (required for pace and time modes)' },
        time_seconds: { type: 'number', description: 'Total time in seconds (required for pace and distance modes)' },
        pace_min_per_km: { type: 'number', description: 'Pace in minutes per kilometre (required for time and distance modes)' }
      },
      required: ['mode']
    }
  },
  {
    name: 'ovulation_calculator',
    description: 'Calculate ovulation date, fertile window, and upcoming cycle dates based on last menstrual period.',
    inputSchema: {
      type: 'object',
      properties: {
        last_period_date: { type: 'string', description: 'Start date of last menstrual period (YYYY-MM-DD)' },
        cycle_length: { type: 'number', description: 'Average cycle length in days', default: 28 },
        period_duration: { type: 'number', description: 'Average period duration in days', default: 5 }
      },
      required: ['last_period_date']
    }
  },
  {
    name: 'pregnancy_calculator',
    description: 'Calculate due date, current week of pregnancy, trimester, and key dates using Naegele\'s rule.',
    inputSchema: {
      type: 'object',
      properties: {
        mode: { type: 'string', enum: ['due_date', 'current_week'], description: 'due_date = calculate due date from LMP | current_week = calculate current week from LMP or due date' },
        lmp_date: { type: 'string', description: 'Last menstrual period date (YYYY-MM-DD) — used in both modes if due_date not provided' },
        due_date: { type: 'string', description: 'Known due date (YYYY-MM-DD) — used in current_week mode as alternative to lmp_date' }
      },
      required: ['mode']
    }
  }
];

export function runHealth(name: string, args: Record<string, unknown>): string {
  switch (name) {
    case 'body_fat_calculator':      return bodyFatCalculator(args);
    case 'ideal_weight_calculator':  return idealWeightCalculator(args);
    case 'water_intake_calculator':  return waterIntakeCalculator(args);
    case 'sleep_calculator':         return sleepCalculator(args);
    case 'macro_calculator':         return macroCalculator(args);
    case 'tdee_calculator':          return tdeeCalculator(args);
    case 'running_pace_calculator':  return runningPaceCalculator(args);
    case 'ovulation_calculator':     return ovulationCalculator(args);
    case 'pregnancy_calculator':     return pregnancyCalculator(args);
    default:                         return 'Unknown tool';
  }
}

// ─── 1. Body Fat Calculator ───────────────────────────────────────────────────

function bodyFatCalculator(args: Record<string, unknown>): string {
  const { gender, weight_kg, unit = 'metric' } = args as {
    gender: string; weight_kg: number; unit?: string;
    neck: number; waist: number; hip?: number; height: number;
  };

  let neck   = args.neck   as number;
  let waist  = args.waist  as number;
  let hip    = args.hip    as number | undefined;
  let height = args.height as number;

  // Convert imperial to cm if needed
  if (unit === 'imperial') {
    neck   *= 2.54;
    waist  *= 2.54;
    height *= 2.54;
    if (hip !== undefined) hip *= 2.54;
  }

  let bodyFatPct: number;

  if (gender === 'male') {
    // US Navy formula for males
    bodyFatPct = 86.010 * Math.log10(waist - neck) - 70.041 * Math.log10(height) + 36.76;
  } else {
    // US Navy formula for females
    if (hip === undefined) return 'Error: hip measurement is required for female body fat calculation.';
    bodyFatPct = 163.205 * Math.log10(waist + hip - neck) - 97.684 * Math.log10(height) - 78.387;
  }

  if (bodyFatPct < 0 || isNaN(bodyFatPct)) return 'Error: Invalid measurements. Please check your inputs.';

  const fatMassKg  = (bodyFatPct / 100) * weight_kg;
  const leanMassKg = weight_kg - fatMassKg;

  let category: string;
  if (gender === 'male') {
    if (bodyFatPct < 6)       category = 'Essential Fat';
    else if (bodyFatPct < 14) category = 'Athletes';
    else if (bodyFatPct < 18) category = 'Fitness';
    else if (bodyFatPct < 25) category = 'Acceptable';
    else                      category = 'Obese';
  } else {
    if (bodyFatPct < 14)      category = 'Essential Fat';
    else if (bodyFatPct < 21) category = 'Athletes';
    else if (bodyFatPct < 25) category = 'Fitness';
    else if (bodyFatPct < 32) category = 'Acceptable';
    else                      category = 'Obese';
  }

  const lines = [
    `Body fat:  ${bodyFatPct.toFixed(1)}%`,
    `Fat mass:  ${fatMassKg.toFixed(1)} kg (${(fatMassKg * 2.20462).toFixed(1)} lbs)`,
    `Lean mass: ${leanMassKg.toFixed(1)} kg (${(leanMassKg * 2.20462).toFixed(1)} lbs)`,
    `Category:  ${category}`,
    '',
    'Reference ranges (male):',
    '  Essential Fat < 6% | Athletes 6–13% | Fitness 14–17% | Acceptable 18–24% | Obese 25%+',
    '',
    'Reference ranges (female):',
    '  Essential Fat < 14% | Athletes 14–20% | Fitness 21–24% | Acceptable 25–31% | Obese 32%+',
    '',
    'Method: US Navy circumference method'
  ];

  return lines.join('\n');
}

// ─── 2. Ideal Weight Calculator ──────────────────────────────────────────────

function idealWeightCalculator(args: Record<string, unknown>): string {
  const { height_cm, gender } = args as { height_cm: number; gender: string };

  const heightIn = height_cm / 2.54;
  const excess   = heightIn - 60;

  let devine: number, robinson: number, miller: number, hamwi: number;

  if (gender === 'male') {
    devine   = 50   + 2.30 * excess;
    robinson = 52   + 1.90 * excess;
    miller   = 56.2 + 1.41 * excess;
    hamwi    = 48   + 2.72 * excess;
  } else {
    devine   = 45.5 + 2.30 * excess;
    robinson = 49   + 1.70 * excess;
    miller   = 53.1 + 1.36 * excess;
    hamwi    = 45.4 + 2.27 * excess;
  }

  const toLine = (label: string, kg: number) =>
    `  ${label.padEnd(22)} ${kg.toFixed(1)} kg  (${(kg * 2.20462).toFixed(1)} lbs)`;

  // Healthy BMI range: 18.5–24.9 for height
  const heightM      = height_cm / 100;
  const bmiLow       = (18.5 * heightM * heightM);
  const bmiHigh      = (24.9 * heightM * heightM);

  const lines = [
    `Ideal weight for ${gender}, height ${height_cm} cm (${(height_cm / 2.54).toFixed(1)} in):`,
    '',
    toLine('Devine (1974):', devine),
    toLine('Robinson (1983):', robinson),
    toLine('Miller (1983):', miller),
    toLine('Hamwi (1964):', hamwi),
    '',
    'Healthy BMI weight range (18.5–24.9):',
    `  ${bmiLow.toFixed(1)} kg – ${bmiHigh.toFixed(1)} kg  (${(bmiLow * 2.20462).toFixed(1)} – ${(bmiHigh * 2.20462).toFixed(1)} lbs)`
  ];

  return lines.join('\n');
}

// ─── 3. Water Intake Calculator ───────────────────────────────────────────────

function waterIntakeCalculator(args: Record<string, unknown>): string {
  const { weight_kg, activity_level = 'sedentary', climate = 'normal' } = args as {
    weight_kg: number; activity_level?: string; climate?: string;
  };

  let litres = weight_kg * 0.033;

  if (activity_level === 'moderate') litres *= 1.20;
  else if (activity_level === 'active') litres *= 1.40;

  if (climate === 'hot') litres *= 1.10;

  const ml       = litres * 1000;
  const glasses  = Math.ceil(ml / 250);
  const bottles  = (ml / 500).toFixed(1);

  const activityLabel: Record<string, string> = {
    sedentary: 'Sedentary (no adjustment)',
    moderate:  'Moderate (+20%)',
    active:    'Active (+40%)'
  };
  const climateLabel: Record<string, string> = {
    normal: 'Normal',
    hot:    'Hot (+10%)'
  };

  const lines = [
    `Daily water intake recommendation:`,
    '',
    `  ${litres.toFixed(2)} litres / day`,
    `  ${Math.round(ml)} ml / day`,
    `  ${glasses} glasses (250 ml each)`,
    `  ${bottles} bottles (500 ml each)`,
    '',
    `Inputs used:`,
    `  Weight:         ${weight_kg} kg`,
    `  Activity level: ${activityLabel[activity_level] ?? activity_level}`,
    `  Climate:        ${climateLabel[climate] ?? climate}`
  ];

  return lines.join('\n');
}

// ─── 4. Sleep Calculator ──────────────────────────────────────────────────────

function sleepCalculator(args: Record<string, unknown>): string {
  const { time, mode } = args as { time: string; mode: string };

  const [hourStr, minStr] = time.split(':');
  const baseHour = parseInt(hourStr, 10);
  const baseMin  = parseInt(minStr,  10);

  if (isNaN(baseHour) || isNaN(baseMin)) return 'Error: invalid time format. Use HH:MM (24-hour).';

  const toMinutes = (h: number, m: number) => h * 60 + m;
  const fromMinutes = (total: number): string => {
    const t = ((total % 1440) + 1440) % 1440;
    const h = Math.floor(t / 60);
    const m = t % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
  };

  const CYCLE   = 90; // minutes
  const FALLASLEEP = 15; // minutes to fall asleep

  const lines: string[] = [];

  if (mode === 'wake_time') {
    lines.push(`Wake-up time: ${time}`);
    lines.push('');
    lines.push('Recommended bedtimes (fall asleep ~15 min after lying down):');
    lines.push('');

    const wakeMin = toMinutes(baseHour, baseMin);

    for (let cycles = 6; cycles >= 1; cycles--) {
      const sleepDurationMin = cycles * CYCLE;
      const bedtimeMin       = wakeMin - sleepDurationMin - FALLASLEEP;
      const bedtime          = fromMinutes(bedtimeMin);
      const hours            = (sleepDurationMin / 60).toFixed(1);
      lines.push(`  ${bedtime}  →  ${cycles} cycle${cycles > 1 ? 's' : ''} (${hours} hrs sleep)`);
    }

    lines.push('');
    lines.push('Tip: 5–6 cycles (7.5–9 hours) is ideal for most adults.');

  } else {
    // sleep_time mode
    lines.push(`Bedtime: ${time}`);
    lines.push('');
    lines.push('Recommended wake-up times:');
    lines.push('');

    const bedMin     = toMinutes(baseHour, baseMin);
    const asleepMin  = bedMin + FALLASLEEP;

    for (let cycles = 1; cycles <= 6; cycles++) {
      const wakeMin  = asleepMin + cycles * CYCLE;
      const wakeTime = fromMinutes(wakeMin);
      const hours    = (cycles * CYCLE / 60).toFixed(1);
      lines.push(`  ${wakeTime}  →  ${cycles} cycle${cycles > 1 ? 's' : ''} (${hours} hrs sleep)`);
    }

    lines.push('');
    lines.push('Tip: 5–6 cycles (7.5–9 hours) is ideal for most adults.');
  }

  return lines.join('\n');
}

// ─── 5. Macro Calculator ──────────────────────────────────────────────────────

function macroCalculator(args: Record<string, unknown>): string {
  const { tdee, goal, body_weight_kg } = args as {
    tdee: number; goal: string; body_weight_kg: number;
  };

  let calorieTarget: number;
  let proteinGPerKg: number;
  let fatGPerKg: number;

  if (goal === 'fat_loss') {
    calorieTarget = tdee - 500;
    proteinGPerKg = 2.2;
    fatGPerKg     = 0.8;
  } else if (goal === 'muscle_gain') {
    calorieTarget = tdee + 300;
    proteinGPerKg = 2.0;
    fatGPerKg     = 1.0;
  } else {
    // maintenance
    calorieTarget = tdee;
    proteinGPerKg = 1.8;
    fatGPerKg     = 0.9;
  }

  const proteinG = proteinGPerKg * body_weight_kg;
  const fatG     = fatGPerKg     * body_weight_kg;

  const proteinKcal = proteinG * 4;
  const fatKcal     = fatG     * 9;
  const carbsKcal   = calorieTarget - proteinKcal - fatKcal;
  const carbsG      = carbsKcal > 0 ? carbsKcal / 4 : 0;

  const pPct = ((proteinKcal / calorieTarget) * 100).toFixed(1);
  const fPct = ((fatKcal     / calorieTarget) * 100).toFixed(1);
  const cPct = ((Math.max(0, carbsKcal) / calorieTarget) * 100).toFixed(1);

  const goalLabel: Record<string, string> = {
    fat_loss:     'Fat Loss (TDEE − 500 kcal)',
    muscle_gain:  'Muscle Gain (TDEE + 300 kcal)',
    maintenance:  'Maintenance (TDEE)'
  };

  const lines = [
    `Goal: ${goalLabel[goal] ?? goal}`,
    '',
    `Calorie target: ${Math.round(calorieTarget)} kcal/day  (TDEE: ${tdee} kcal)`,
    '',
    `Macronutrients:`,
    `  Protein:  ${proteinG.toFixed(0)} g  (${Math.round(proteinKcal)} kcal, ${pPct}%)  [${proteinGPerKg} g/kg]`,
    `  Fat:      ${fatG.toFixed(0)} g  (${Math.round(fatKcal)} kcal, ${fPct}%)  [${fatGPerKg} g/kg]`,
    `  Carbs:    ${carbsG.toFixed(0)} g  (${Math.round(Math.max(0, carbsKcal))} kcal, ${cPct}%)  [remaining calories]`,
    '',
    `Body weight used: ${body_weight_kg} kg`
  ];

  return lines.join('\n');
}

// ─── 6. TDEE Calculator ───────────────────────────────────────────────────────

function tdeeCalculator(args: Record<string, unknown>): string {
  const { age, gender, weight_kg, height_cm, activity_level, body_fat_percent } = args as {
    age: number; gender: string; weight_kg: number; height_cm: number;
    activity_level: string; body_fat_percent?: number;
  };

  // BMR formulas
  let mifflin: number;
  let harrisBenedict: number;
  let oxford: number;

  if (gender === 'male') {
    mifflin        = 10 * weight_kg + 6.25 * height_cm - 5 * age + 5;
    harrisBenedict = 13.397 * weight_kg + 4.799 * height_cm - 5.677 * age + 88.362;
    oxford         = 0.05  * weight_kg + 3.98  * (height_cm / 100) * 100 / 100 * 100 + 669;
    // Simplified Oxford: 0.05×W + 3.98×H(m) + 669
    oxford         = 0.05 * weight_kg + 3.98 * (height_cm / 100) + 669;
  } else {
    mifflin        = 10 * weight_kg + 6.25 * height_cm - 5 * age - 161;
    harrisBenedict = 9.247 * weight_kg + 3.098 * height_cm - 4.330 * age + 447.593;
    oxford         = 0.048 * weight_kg + 2.76 * (height_cm / 100) + 561.9;
  }

  let katchMcArdle: number | null = null;
  if (body_fat_percent !== undefined) {
    const lbm    = weight_kg * (1 - body_fat_percent / 100);
    katchMcArdle = 370 + 21.6 * lbm;
  }

  const multipliers: Record<string, number> = {
    sedentary:         1.2,
    lightly_active:    1.375,
    moderately_active: 1.55,
    very_active:       1.725,
    extra_active:      1.9
  };

  const activityLabels: Record<string, string> = {
    sedentary:         'Sedentary (desk job, no exercise)',
    lightly_active:    'Lightly active (1–3 days/week)',
    moderately_active: 'Moderately active (3–5 days/week)',
    very_active:       'Very active (6–7 days/week)',
    extra_active:      'Extra active (physical job or 2× training)'
  };

  const selectedMultiplier = multipliers[activity_level] ?? 1.2;

  const mifflinTDEE = Math.round(mifflin * selectedMultiplier);
  const hbTDEE      = Math.round(harrisBenedict * selectedMultiplier);
  const oxfordTDEE  = Math.round(oxford * selectedMultiplier);
  const kmTDEE      = katchMcArdle !== null ? Math.round(katchMcArdle * selectedMultiplier) : null;

  const lines: string[] = [
    `TDEE Calculation — ${gender}, ${age} yr, ${weight_kg} kg, ${height_cm} cm`,
    `Activity: ${activityLabels[activity_level] ?? activity_level}  (×${selectedMultiplier})`,
    '',
    '── BMR (Basal Metabolic Rate) ──────────────────────────',
    `  Mifflin-St Jeor (recommended):  ${Math.round(mifflin)} kcal/day`,
    `  Harris-Benedict (1984 rev.):     ${Math.round(harrisBenedict)} kcal/day`,
    `  Oxford:                          ${Math.round(oxford)} kcal/day`,
    katchMcArdle !== null
      ? `  Katch-McArdle (LBM-based):      ${Math.round(katchMcArdle)} kcal/day`
      : `  Katch-McArdle:                  N/A (provide body_fat_percent to enable)`,
    '',
    '── TDEE at selected activity level ─────────────────────',
    `  Mifflin-St Jeor:  ${mifflinTDEE} kcal/day  ← recommended`,
    `  Harris-Benedict:  ${hbTDEE} kcal/day`,
    `  Oxford:           ${oxfordTDEE} kcal/day`,
    kmTDEE !== null
      ? `  Katch-McArdle:    ${kmTDEE} kcal/day`
      : '',
    '',
    '── Mifflin TDEE across all activity levels ──────────────',
  ];

  for (const [level, mult] of Object.entries(multipliers)) {
    const tdeeVal = Math.round(mifflin * mult);
    const marker  = level === activity_level ? ' ◀ your level' : '';
    lines.push(`  ${activityLabels[level].padEnd(44)} ${tdeeVal} kcal${marker}`);
  }

  return lines.filter(l => l !== null && l !== undefined).join('\n');
}

// ─── 7. Running Pace Calculator ───────────────────────────────────────────────

function runningPaceCalculator(args: Record<string, unknown>): string {
  const { mode, distance_km, time_seconds, pace_min_per_km } = args as {
    mode: string; distance_km?: number; time_seconds?: number; pace_min_per_km?: number;
  };

  const KM_TO_MILES = 0.621371;

  const formatTime = (seconds: number): string => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.round(seconds % 60);
    if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    return `${m}:${String(s).padStart(2, '0')}`;
  };

  const formatPace = (minPerKm: number): string => {
    const m = Math.floor(minPerKm);
    const s = Math.round((minPerKm - m) * 60);
    return `${m}:${String(s).padStart(2, '0')}`;
  };

  const raceDistances: [number, string][] = [
    [5,        '5K'],
    [10,       '10K'],
    [21.0975,  'Half Marathon'],
    [42.195,   'Marathon']
  ];

  const lines: string[] = [];

  if (mode === 'pace') {
    if (distance_km === undefined || time_seconds === undefined)
      return 'Error: pace mode requires distance_km and time_seconds.';

    const pacePerKm      = time_seconds / 60 / distance_km;
    const pacePerMile    = pacePerKm / KM_TO_MILES;
    const speedKmh       = distance_km / (time_seconds / 3600);
    const speedMph       = speedKmh * KM_TO_MILES;

    lines.push(`Distance: ${distance_km} km (${(distance_km * KM_TO_MILES).toFixed(2)} miles)`);
    lines.push(`Time:     ${formatTime(time_seconds)}`);
    lines.push('');
    lines.push(`Pace:     ${formatPace(pacePerKm)} min/km  |  ${formatPace(pacePerMile)} min/mile`);
    lines.push(`Speed:    ${speedKmh.toFixed(2)} km/h  |  ${speedMph.toFixed(2)} mph`);
    lines.push('');
    lines.push('Finish times at this pace for common races:');
    for (const [dist, label] of raceDistances) {
      const t = pacePerKm * dist * 60;
      lines.push(`  ${label.padEnd(16)} ${formatTime(t)}`);
    }

  } else if (mode === 'time') {
    if (distance_km === undefined || pace_min_per_km === undefined)
      return 'Error: time mode requires distance_km and pace_min_per_km.';

    const totalSeconds = pace_min_per_km * distance_km * 60;
    const pacePerMile  = pace_min_per_km / KM_TO_MILES;

    lines.push(`Distance: ${distance_km} km (${(distance_km * KM_TO_MILES).toFixed(2)} miles)`);
    lines.push(`Pace:     ${formatPace(pace_min_per_km)} min/km  |  ${formatPace(pacePerMile)} min/mile`);
    lines.push('');
    lines.push(`Finish time: ${formatTime(totalSeconds)}`);
    lines.push('');
    lines.push('Finish times for common races at this pace:');
    for (const [dist, label] of raceDistances) {
      const t = pace_min_per_km * dist * 60;
      lines.push(`  ${label.padEnd(16)} ${formatTime(t)}`);
    }

  } else if (mode === 'distance') {
    if (time_seconds === undefined || pace_min_per_km === undefined)
      return 'Error: distance mode requires time_seconds and pace_min_per_km.';

    const distKm   = time_seconds / 60 / pace_min_per_km;
    const distMile = distKm * KM_TO_MILES;
    const pacePerMile = pace_min_per_km / KM_TO_MILES;

    lines.push(`Time:  ${formatTime(time_seconds)}`);
    lines.push(`Pace:  ${formatPace(pace_min_per_km)} min/km  |  ${formatPace(pacePerMile)} min/mile`);
    lines.push('');
    lines.push(`Distance covered: ${distKm.toFixed(2)} km  (${distMile.toFixed(2)} miles)`);

  } else {
    return `Error: unknown mode "${mode}". Use pace, time, or distance.`;
  }

  return lines.join('\n');
}

// ─── 8. Ovulation Calculator ─────────────────────────────────────────────────

function ovulationCalculator(args: Record<string, unknown>): string {
  const { last_period_date, cycle_length = 28, period_duration = 5 } = args as {
    last_period_date: string; cycle_length?: number; period_duration?: number;
  };

  const addDays = (dateStr: string, days: number): string => {
    const d = new Date(dateStr);
    d.setDate(d.getDate() + days);
    return d.toISOString().split('T')[0];
  };

  const formatDate = (dateStr: string): string => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' });
  };

  const ovulationDay     = cycle_length - 14;
  const ovulationDate    = addDays(last_period_date, ovulationDay);
  const fertileStart     = addDays(ovulationDate, -5);
  const fertileEnd       = addDays(ovulationDate, 2);
  const nextPeriod       = addDays(last_period_date, cycle_length);

  const lines: string[] = [
    `Last period:    ${formatDate(last_period_date)}`,
    `Cycle length:   ${cycle_length} days`,
    `Period length:  ${period_duration} days`,
    '',
    `Ovulation date: ${formatDate(ovulationDate)}  (day ${ovulationDay} of cycle)`,
    '',
    `Fertile window: ${formatDate(fertileStart)}  →  ${formatDate(fertileEnd)}`,
    `  (5 days before ovulation through 2 days after)`,
    '',
    `Next period:    ${formatDate(nextPeriod)}`,
    '',
    'Next 3 cycle predictions:'
  ];

  for (let i = 1; i <= 3; i++) {
    const cycleStart   = addDays(last_period_date, cycle_length * i);
    const cycleOvul    = addDays(cycleStart, ovulationDay);
    const cycleFertS   = addDays(cycleOvul, -5);
    const cycleFertE   = addDays(cycleOvul, 2);
    lines.push('');
    lines.push(`  Cycle ${i + 1}:`);
    lines.push(`    Period starts:  ${formatDate(cycleStart)}`);
    lines.push(`    Ovulation:      ${formatDate(cycleOvul)}`);
    lines.push(`    Fertile window: ${formatDate(cycleFertS)} → ${formatDate(cycleFertE)}`);
  }

  lines.push('');
  lines.push('Note: These are estimates based on average cycle patterns.');
  lines.push('Individual cycles can vary. Consult a healthcare provider for guidance.');

  return lines.join('\n');
}

// ─── 9. Pregnancy Calculator ─────────────────────────────────────────────────

function pregnancyCalculator(args: Record<string, unknown>): string {
  const { mode, lmp_date, due_date } = args as {
    mode: string; lmp_date?: string; due_date?: string;
  };

  const addDays = (dateStr: string, days: number): string => {
    const d = new Date(dateStr);
    d.setDate(d.getDate() + days);
    return d.toISOString().split('T')[0];
  };

  const formatDate = (dateStr: string): string => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' });
  };

  const daysBetween = (a: string, b: string): number => {
    const da = new Date(a).getTime();
    const db = new Date(b).getTime();
    return Math.round((db - da) / 86400000);
  };

  const today = new Date().toISOString().split('T')[0];

  if (mode === 'due_date') {
    if (!lmp_date) return 'Error: lmp_date is required for due_date mode.';

    // Naegele's rule: LMP + 280 days
    const calculatedDueDate = addDays(lmp_date, 280);
    const conceptionDate    = addDays(lmp_date, 14);
    const daysRemaining     = daysBetween(today, calculatedDueDate);
    const daysPregnant      = daysBetween(lmp_date, today);
    const weeksPregnant     = Math.floor(daysPregnant / 7);
    const extraDays         = daysPregnant % 7;

    let trimester: string;
    if (weeksPregnant <= 13)       trimester = '1st trimester (weeks 1–13)';
    else if (weeksPregnant <= 27)  trimester = '2nd trimester (weeks 14–27)';
    else                           trimester = '3rd trimester (weeks 28+)';

    const lines = [
      `Last menstrual period:   ${formatDate(lmp_date)}`,
      '',
      `Due date (Naegele):      ${formatDate(calculatedDueDate)}`,
      `Conception estimate:     ${formatDate(conceptionDate)}  (LMP + 14 days)`,
      '',
      `Today (${today}):`,
      `  Current week:    ${weeksPregnant} weeks and ${extraDays} day${extraDays !== 1 ? 's' : ''}`,
      `  Trimester:       ${trimester}`,
      `  Days remaining:  ${daysRemaining > 0 ? daysRemaining : 'Due date has passed'}`,
      '',
      'Key milestones:',
      `  End of 1st trimester: ${formatDate(addDays(lmp_date, 13 * 7))}`,
      `  End of 2nd trimester: ${formatDate(addDays(lmp_date, 27 * 7))}`,
      `  Full term (37 weeks): ${formatDate(addDays(lmp_date, 37 * 7))}`,
      '',
      'Note: Naegele\'s rule assumes a 28-day cycle and is an estimate only.',
      'Confirm dates with your healthcare provider.'
    ];

    return lines.join('\n');

  } else if (mode === 'current_week') {
    let lmp: string;

    if (lmp_date) {
      lmp = lmp_date;
    } else if (due_date) {
      // LMP = due_date − 280 days
      const d = new Date(due_date);
      d.setDate(d.getDate() - 280);
      lmp = d.toISOString().split('T')[0];
    } else {
      return 'Error: current_week mode requires either lmp_date or due_date.';
    }

    const calculatedDueDate = addDays(lmp, 280);
    const conceptionDate    = addDays(lmp, 14);
    const daysPregnant      = daysBetween(lmp, today);
    const weeksPregnant     = Math.floor(daysPregnant / 7);
    const extraDays         = daysPregnant % 7;
    const daysRemaining     = daysBetween(today, calculatedDueDate);

    let trimester: string;
    if (weeksPregnant <= 13)       trimester = '1st trimester (weeks 1–13)';
    else if (weeksPregnant <= 27)  trimester = '2nd trimester (weeks 14–27)';
    else                           trimester = '3rd trimester (weeks 28+)';

    const lines = [
      `LMP used:              ${formatDate(lmp)}`,
      `Due date:              ${formatDate(calculatedDueDate)}`,
      `Conception estimate:   ${formatDate(conceptionDate)}`,
      '',
      `Today (${today}):`,
      `  Current week:  ${weeksPregnant} weeks and ${extraDays} day${extraDays !== 1 ? 's' : ''}`,
      `  Trimester:     ${trimester}`,
      `  Days remaining: ${daysRemaining > 0 ? daysRemaining : 'Due date has passed'}`,
      '',
      'Key milestones:',
      `  End of 1st trimester: ${formatDate(addDays(lmp, 13 * 7))}`,
      `  End of 2nd trimester: ${formatDate(addDays(lmp, 27 * 7))}`,
      `  Full term (37 weeks): ${formatDate(addDays(lmp, 37 * 7))}`,
      '',
      'Note: Dates are estimates. Confirm with your healthcare provider.'
    ];

    return lines.join('\n');

  } else {
    return `Error: unknown mode "${mode}". Use due_date or current_week.`;
  }
}
