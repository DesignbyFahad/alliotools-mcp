// Fun & utility tools — all run locally, zero network calls

export const funTools = [
  {
    name: 'coin_flip',
    description: 'Flip one or more coins and get Heads/Tails results with a count summary.',
    inputSchema: {
      type: 'object',
      properties: {
        flips: { type: 'number', description: 'Number of coins to flip (default 1, max 100)', default: 1 }
      }
    }
  },
  {
    name: 'dice_roller',
    description: 'Roll any number of dice with any number of sides, with an optional modifier.',
    inputSchema: {
      type: 'object',
      properties: {
        dice:     { type: 'number', description: 'Number of dice to roll (default 1)', default: 1 },
        sides:    { type: 'number', enum: [4, 6, 8, 10, 12, 20, 100], description: 'Sides per die: 4/6/8/10/12/20/100 (default 6)', default: 6 },
        modifier: { type: 'number', description: 'Number to add to the total (default 0)', default: 0 }
      }
    }
  },
  {
    name: 'magic_8_ball',
    description: 'Ask the Magic 8-Ball a yes/no question and receive a mystical answer.',
    inputSchema: {
      type: 'object',
      properties: {
        question: { type: 'string', description: 'Your yes/no question (optional)' }
      }
    }
  },
  {
    name: 'random_number_generator',
    description: 'Generate one or more random numbers within a specified range.',
    inputSchema: {
      type: 'object',
      properties: {
        min:     { type: 'number', description: 'Minimum value (default 1)', default: 1 },
        max:     { type: 'number', description: 'Maximum value (default 100)', default: 100 },
        count:   { type: 'number', description: 'How many numbers to generate (default 1, max 1000)', default: 1 },
        integer: { type: 'boolean', description: 'Generate integers only (default true)', default: true }
      }
    }
  },
  {
    name: 'password_generator',
    description: 'Generate strong random passwords with customisable character sets and length.',
    inputSchema: {
      type: 'object',
      properties: {
        length:            { type: 'number', description: 'Password length (default 16, min 4, max 128)', default: 16 },
        include_uppercase: { type: 'boolean', description: 'Include uppercase letters A-Z (default true)', default: true },
        include_lowercase: { type: 'boolean', description: 'Include lowercase letters a-z (default true)', default: true },
        include_numbers:   { type: 'boolean', description: 'Include digits 0-9 (default true)', default: true },
        include_symbols:   { type: 'boolean', description: 'Include symbols !@#$%^&*… (default true)', default: true },
        count:             { type: 'number', description: 'How many passwords to generate (1-10, default 1)', default: 1 }
      }
    }
  },
  {
    name: 'random_name_generator',
    description: 'Generate random human names — male, female, or mixed — in full, first-only, or last-only format.',
    inputSchema: {
      type: 'object',
      properties: {
        count:  { type: 'number', description: 'Number of names to generate (default 1, max 20)', default: 1 },
        gender: { type: 'string', enum: ['male', 'female', 'any'], description: 'Gender of first names (default "any")', default: 'any' },
        format: { type: 'string', enum: ['full', 'first', 'last'], description: 'Name format: full / first / last (default "full")', default: 'full' }
      }
    }
  },
  {
    name: 'random_team_generator',
    description: 'Randomly split a list of people into balanced teams.',
    inputSchema: {
      type: 'object',
      properties: {
        members: { type: 'string', description: 'Comma-separated or newline-separated list of member names' },
        teams:   { type: 'number', description: 'Number of teams to create (default 2)', default: 2 }
      },
      required: ['members']
    }
  },
  {
    name: 'shuffle_list',
    description: 'Randomly shuffle a list of items using the Fisher-Yates algorithm.',
    inputSchema: {
      type: 'object',
      properties: {
        items:     { type: 'string', description: 'Newline-separated or comma-separated list of items to shuffle' },
        separator: { type: 'string', enum: ['newline', 'comma'], description: 'How items are separated in the input/output (default "newline")', default: 'newline' }
      },
      required: ['items']
    }
  }
];

export function runFun(name: string, args: Record<string, unknown>): string {
  switch (name) {
    case 'coin_flip':               return coinFlip(args);
    case 'dice_roller':             return diceRoller(args);
    case 'magic_8_ball':            return magic8Ball(args);
    case 'random_number_generator': return randomNumberGenerator(args);
    case 'password_generator':      return passwordGenerator(args);
    case 'random_name_generator':   return randomNameGenerator(args);
    case 'random_team_generator':   return randomTeamGenerator(args);
    case 'shuffle_list':            return shuffleList(args);
    default: return 'Unknown tool';
  }
}

// ---------------------------------------------------------------------------
// coin_flip
// ---------------------------------------------------------------------------
function coinFlip(args: Record<string, unknown>): string {
  const flips = Math.min(Math.max(1, Math.round((args.flips as number) || 1)), 100);

  if (flips === 1) {
    return Math.random() < 0.5 ? 'Heads' : 'Tails';
  }

  const results: string[] = [];
  let heads = 0;
  for (let i = 0; i < flips; i++) {
    const r = Math.random() < 0.5 ? 'Heads' : 'Tails';
    results.push(r);
    if (r === 'Heads') heads++;
  }
  const tails = flips - heads;

  return [
    `Flips: ${flips}`,
    `Results: ${results.join(', ')}`,
    ``,
    `Heads: ${heads}`,
    `Tails: ${tails}`
  ].join('\n');
}

// ---------------------------------------------------------------------------
// dice_roller
// ---------------------------------------------------------------------------
function diceRoller(args: Record<string, unknown>): string {
  const dice     = Math.max(1, Math.round((args.dice as number) || 1));
  const sides    = ([4, 6, 8, 10, 12, 20, 100].includes(args.sides as number) ? args.sides as number : 6);
  const modifier = Math.round((args.modifier as number) || 0);

  const rolls: number[] = [];
  for (let i = 0; i < dice; i++) {
    rolls.push(Math.floor(Math.random() * sides) + 1);
  }
  const total     = rolls.reduce((a, b) => a + b, 0);
  const withMod   = total + modifier;
  const notation  = `${dice}d${sides}${modifier !== 0 ? (modifier > 0 ? '+' : '') + modifier : ''}`;

  const lines: string[] = [
    `Notation: ${notation}`,
    ``,
    `Rolls: ${rolls.join(', ')}`,
    `Subtotal: ${total}`
  ];
  if (modifier !== 0) {
    lines.push(`Modifier: ${modifier > 0 ? '+' : ''}${modifier}`);
    lines.push(`Total: ${withMod}`);
  } else {
    lines.push(`Total: ${total}`);
  }
  if (dice > 1) {
    lines.push(`Min possible: ${dice}`);
    lines.push(`Max possible: ${dice * sides}`);
  }
  return lines.join('\n');
}

// ---------------------------------------------------------------------------
// magic_8_ball
// ---------------------------------------------------------------------------
function magic8Ball(args: Record<string, unknown>): string {
  const question = (args.question as string | undefined) || '';

  const responses = [
    // 10 positive
    'It is certain.',
    'It is decidedly so.',
    'Without a doubt.',
    'Yes, definitely.',
    'You may rely on it.',
    'As I see it, yes.',
    'Most likely.',
    'Outlook good.',
    'Yes.',
    'Signs point to yes.',
    // 5 neutral
    'Reply hazy, try again.',
    'Ask again later.',
    'Better not tell you now.',
    'Cannot predict now.',
    'Concentrate and ask again.',
    // 5 negative
    "Don't count on it.",
    'My reply is no.',
    'My sources say no.',
    'Outlook not so good.',
    'Very doubtful.'
  ];

  const answer = responses[Math.floor(Math.random() * responses.length)];

  if (question.trim()) {
    return `Q: ${question.trim()}\n\n🎱 ${answer}`;
  }
  return `🎱 ${answer}`;
}

// ---------------------------------------------------------------------------
// random_number_generator
// ---------------------------------------------------------------------------
function randomNumberGenerator(args: Record<string, unknown>): string {
  const min     = (args.min as number) ?? 1;
  const max     = (args.max as number) ?? 100;
  const count   = Math.min(Math.max(1, Math.round((args.count as number) || 1)), 1000);
  const integer = (args.integer as boolean) ?? true;

  if (min > max) return `Error: min (${min}) must be less than or equal to max (${max})`;

  const nums: number[] = [];
  for (let i = 0; i < count; i++) {
    const raw = Math.random() * (max - min) + min;
    nums.push(integer ? Math.floor(raw) : Math.round(raw * 100) / 100);
  }

  if (count === 1) {
    return `${nums[0]}`;
  }

  const sum  = nums.reduce((a, b) => a + b, 0);
  const mean = Math.round((sum / count) * 100) / 100;
  const actualMin = Math.min(...nums);
  const actualMax = Math.max(...nums);

  return [
    `Count: ${count}  Range: ${min}–${max}${integer ? '  (integers)' : '  (decimals)'}`,
    ``,
    `Numbers: ${nums.join(', ')}`,
    ``,
    `Min: ${actualMin}`,
    `Max: ${actualMax}`,
    `Mean: ${mean}`
  ].join('\n');
}

// ---------------------------------------------------------------------------
// password_generator
// ---------------------------------------------------------------------------
function passwordGenerator(args: Record<string, unknown>): string {
  const length            = Math.min(Math.max(4, Math.round((args.length as number) || 16)), 128);
  const include_uppercase = (args.include_uppercase as boolean) ?? true;
  const include_lowercase = (args.include_lowercase as boolean) ?? true;
  const include_numbers   = (args.include_numbers as boolean) ?? true;
  const include_symbols   = (args.include_symbols as boolean) ?? true;
  const count             = Math.min(Math.max(1, Math.round((args.count as number) || 1)), 10);

  const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
  const NUMBERS   = '0123456789';
  const SYMBOLS   = '!@#$%^&*()-_=+[]{}|;:,.<>?';

  const sets: { chars: string; label: string }[] = [];
  if (include_uppercase) sets.push({ chars: UPPERCASE, label: 'uppercase' });
  if (include_lowercase) sets.push({ chars: LOWERCASE, label: 'lowercase' });
  if (include_numbers)   sets.push({ chars: NUMBERS,   label: 'numbers' });
  if (include_symbols)   sets.push({ chars: SYMBOLS,   label: 'symbols' });

  if (sets.length === 0) return 'Error: at least one character set must be enabled';

  const pool = sets.map(s => s.chars).join('');

  const makePassword = (): string => {
    // Guarantee at least one char from each selected set
    const mandatory = sets.map(s => s.chars[Math.floor(Math.random() * s.chars.length)]);
    const remaining: string[] = [];
    for (let i = mandatory.length; i < length; i++) {
      remaining.push(pool[Math.floor(Math.random() * pool.length)]);
    }
    const all = [...mandatory, ...remaining];
    // Fisher-Yates shuffle
    for (let i = all.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [all[i], all[j]] = [all[j], all[i]];
    }
    return all.join('');
  };

  // Strength estimate
  const entropy = Math.log2(Math.pow(pool.length, length));
  let strength: string;
  if (entropy < 40)      strength = 'Weak';
  else if (entropy < 60) strength = 'Fair';
  else if (entropy < 80) strength = 'Strong';
  else                   strength = 'Very Strong';

  const passwords = Array.from({ length: count }, makePassword);

  const lines: string[] = [
    `Length: ${length}  Character sets: ${sets.map(s => s.label).join(', ')}`,
    `Entropy: ~${Math.round(entropy)} bits  Strength: ${strength}`,
    ``
  ];
  if (count === 1) {
    lines.push(`Password: ${passwords[0]}`);
  } else {
    passwords.forEach((p, i) => lines.push(`${i + 1}. ${p}`));
  }
  return lines.join('\n');
}

// ---------------------------------------------------------------------------
// random_name_generator
// ---------------------------------------------------------------------------
function randomNameGenerator(args: Record<string, unknown>): string {
  const count  = Math.min(Math.max(1, Math.round((args.count as number) || 1)), 20);
  const gender = (args.gender as string) || 'any';
  const format = (args.format as string) || 'full';

  const maleFirst   = ['James','William','Oliver','George','Harry','Jack','Noah','Charlie','Jacob','Alfie','Freddie','Archie','Oscar','Henry','Leo','Muhammad','Ethan','Lucas','Mason','Logan','Sebastian','Theodore','Elijah','Alexander','Daniel','Michael','Matthew','Joseph','David','Samuel'];
  const femaleFirst = ['Olivia','Amelia','Isla','Ava','Mia','Isabella','Sophia','Grace','Lily','Emily','Ella','Freya','Charlotte','Poppy','Daisy','Florence','Alice','Evie','Lucy','Millie','Rosie','Sophie','Eleanor','Chloe','Sienna','Imogen','Layla','Maya','Aria','Scarlett'];
  const lastNames   = ['Smith','Jones','Williams','Taylor','Brown','Davies','Evans','Wilson','Thomas','Roberts','Johnson','Walker','Wright','Robinson','Thompson','White','Hughes','Edwards','Green','Hall','Lewis','Harris','Clarke','Patel','Jackson','Wood','Turner','Martin','Cooper','Hill'];

  const pick = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

  const names: string[] = [];
  for (let i = 0; i < count; i++) {
    let first: string;
    if (gender === 'male') {
      first = pick(maleFirst);
    } else if (gender === 'female') {
      first = pick(femaleFirst);
    } else {
      first = Math.random() < 0.5 ? pick(maleFirst) : pick(femaleFirst);
    }
    const last = pick(lastNames);

    if (format === 'first') names.push(first);
    else if (format === 'last') names.push(last);
    else names.push(`${first} ${last}`);
  }

  if (count === 1) return names[0];
  return names.map((n, i) => `${i + 1}. ${n}`).join('\n');
}

// ---------------------------------------------------------------------------
// random_team_generator
// ---------------------------------------------------------------------------
function randomTeamGenerator(args: Record<string, unknown>): string {
  const membersRaw = (args.members as string) || '';
  const numTeams   = Math.max(2, Math.round((args.teams as number) || 2));

  // Parse comma or newline separated
  const members = membersRaw
    .split(/[\n,]+/)
    .map(m => m.trim())
    .filter(Boolean);

  if (members.length === 0) return 'Error: no members provided';
  if (numTeams > members.length) return `Error: cannot create ${numTeams} teams with only ${members.length} member(s)`;

  // Fisher-Yates shuffle
  const shuffled = [...members];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  // Distribute across teams
  const teams: string[][] = Array.from({ length: numTeams }, () => []);
  shuffled.forEach((m, i) => teams[i % numTeams].push(m));

  const lines: string[] = [`Members: ${members.length}  Teams: ${numTeams}`, ''];
  teams.forEach((team, i) => {
    lines.push(`Team ${i + 1} (${team.length} member${team.length !== 1 ? 's' : ''}):`);
    team.forEach(m => lines.push(`  • ${m}`));
    if (i < teams.length - 1) lines.push('');
  });
  return lines.join('\n');
}

// ---------------------------------------------------------------------------
// shuffle_list
// ---------------------------------------------------------------------------
function shuffleList(args: Record<string, unknown>): string {
  const itemsRaw  = (args.items as string) || '';
  const separator = (args.separator as string) || 'newline';

  const splitter = separator === 'comma' ? /,/ : /\n/;
  const items = itemsRaw.split(splitter).map(s => s.trim()).filter(Boolean);

  if (items.length === 0) return 'Error: no items to shuffle';

  // Fisher-Yates
  const shuffled = [...items];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  const joiner = separator === 'comma' ? ', ' : '\n';
  return [
    `Items: ${items.length}`,
    ``,
    shuffled.join(joiner)
  ].join('\n');
}
