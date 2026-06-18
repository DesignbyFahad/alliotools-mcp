// Text tools â€” all run locally, zero network calls

export const textTools = [
  {
    name: 'word_counter',
    description: 'Count words, characters, sentences, paragraphs, and reading time for any text.',
    inputSchema: {
      type: 'object',
      properties: { text: { type: 'string', description: 'Text to analyse' } },
      required: ['text']
    }
  },
  {
    name: 'case_converter',
    description: 'Convert text to UPPERCASE, lowercase, Title Case, camelCase, snake_case, kebab-case, or PascalCase.',
    inputSchema: {
      type: 'object',
      properties: {
        text: { type: 'string', description: 'Text to convert' },
        to: { type: 'string', enum: ['upper','lower','title','camel','snake','kebab','pascal','sentence','toggle'], description: 'Target case style' }
      },
      required: ['text', 'to']
    }
  },
  {
    name: 'text_diff',
    description: 'Compare two texts and show the differences line by line.',
    inputSchema: {
      type: 'object',
      properties: {
        text1: { type: 'string', description: 'Original text' },
        text2: { type: 'string', description: 'Modified text' }
      },
      required: ['text1', 'text2']
    }
  },
  {
    name: 'lorem_ipsum_generator',
    description: 'Generate lorem ipsum placeholder text in paragraphs, sentences, or words.',
    inputSchema: {
      type: 'object',
      properties: {
        type: { type: 'string', enum: ['paragraphs','sentences','words'], default: 'paragraphs' },
        count: { type: 'number', description: 'How many paragraphs/sentences/words to generate', default: 3 }
      }
    }
  },
  {
    name: 'text_to_slug',
    description: 'Convert any text to a URL-friendly slug (lowercase, hyphens, no special characters).',
    inputSchema: {
      type: 'object',
      properties: {
        text: { type: 'string', description: 'Text to convert to a slug' },
        separator: { type: 'string', description: 'Word separator', default: '-' }
      },
      required: ['text']
    }
  },
  {
    name: 'palindrome_checker',
    description: 'Check if a word or phrase is a palindrome (reads the same forwards and backwards).',
    inputSchema: {
      type: 'object',
      properties: {
        text: { type: 'string', description: 'Word or phrase to check' },
        ignore_spaces: { type: 'boolean', description: 'Ignore spaces when checking', default: true }
      },
      required: ['text']
    }
  },
  {
    name: 'text_reverser',
    description: 'Reverse text character by character, word by word, or line by line.',
    inputSchema: {
      type: 'object',
      properties: {
        text: { type: 'string', description: 'Text to reverse' },
        mode: { type: 'string', enum: ['characters','words','lines'], default: 'characters' }
      },
      required: ['text']
    }
  },
  {
    name: 'duplicate_line_remover',
    description: 'Remove duplicate lines from text, optionally case-insensitive.',
    inputSchema: {
      type: 'object',
      properties: {
        text: { type: 'string', description: 'Text with potentially duplicate lines' },
        case_sensitive: { type: 'boolean', description: 'Treat lines as case-sensitive', default: true },
        sort: { type: 'boolean', description: 'Sort the resulting unique lines', default: false }
      },
      required: ['text']
    }
  },
  {
    name: 'text_sorter',
    description: 'Sort lines of text alphabetically, by length, or in reverse.',
    inputSchema: {
      type: 'object',
      properties: {
        text: { type: 'string', description: 'Text to sort (one item per line)' },
        mode: { type: 'string', enum: ['alpha_asc','alpha_desc','length_asc','length_desc','random'], default: 'alpha_asc' }
      },
      required: ['text']
    }
  },
  {
    name: 'morse_code_converter',
    description: 'Convert text to Morse code or decode Morse code back to text.',
    inputSchema: {
      type: 'object',
      properties: {
        input: { type: 'string', description: 'Text to encode or Morse code to decode (use dots, dashes, and spaces)' },
        mode: { type: 'string', enum: ['encode','decode'] }
      },
      required: ['input', 'mode']
    }
  },
  {
    name: 'character_counter',
    description: 'Count characters with and without spaces, and get character frequency breakdown.',
    inputSchema: {
      type: 'object',
      properties: {
        text: { type: 'string', description: 'Text to count characters in' },
        show_frequency: { type: 'boolean', description: 'Show top character frequencies', default: false }
      },
      required: ['text']
    }
  }
];

export function runText(name: string, args: Record<string, unknown>): string {
  switch (name) {
    case 'word_counter': return wordCounter(args);
    case 'case_converter': return caseConverter(args);
    case 'text_diff': return textDiff(args);
    case 'lorem_ipsum_generator': return loremIpsum(args);
    case 'text_to_slug': return textToSlug(args);
    case 'palindrome_checker': return palindromeChecker(args);
    case 'text_reverser': return textReverser(args);
    case 'duplicate_line_remover': return duplicateRemover(args);
    case 'text_sorter': return textSorter(args);
    case 'morse_code_converter': return morseConverter(args);
    case 'character_counter': return charCounter(args);
    default: return 'Unknown tool';
  }
}

function wordCounter(args: Record<string, unknown>): string {
  const { text } = args as { text: string };
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const chars = text.length;
  const charsNoSpaces = text.replace(/\s/g,'').length;
  const sentences = (text.match(/[.!?]+/g) || []).length;
  const paragraphs = text.split(/\n\s*\n/).filter(p=>p.trim()).length || (text.trim() ? 1 : 0);
  const readingTime = Math.ceil(words / 200);

  return [
    `Words: ${words.toLocaleString()}`,
    `Characters: ${chars.toLocaleString()}`,
    `Characters (no spaces): ${charsNoSpaces.toLocaleString()}`,
    `Sentences: ${sentences}`,
    `Paragraphs: ${paragraphs}`,
    `Reading time: ~${readingTime} min${readingTime !== 1 ? 's' : ''} (at 200 wpm)`
  ].join('\n');
}

function caseConverter(args: Record<string, unknown>): string {
  const { text, to } = args as { text: string; to: string };
  let result: string;
  switch (to) {
    case 'upper': result = text.toUpperCase(); break;
    case 'lower': result = text.toLowerCase(); break;
    case 'title': result = text.replace(/\w\S*/g, w => w[0].toUpperCase() + w.slice(1).toLowerCase()); break;
    case 'sentence': result = text.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, c => c.toUpperCase()); break;
    case 'camel': result = text.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (_,c) => c.toUpperCase()); break;
    case 'pascal': {
      const camel = text.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (_,c) => c.toUpperCase());
      result = camel[0].toUpperCase() + camel.slice(1);
      break;
    }
    case 'snake': result = text.trim().toLowerCase().replace(/[^a-zA-Z0-9]+/g,'_'); break;
    case 'kebab': result = text.trim().toLowerCase().replace(/[^a-zA-Z0-9]+/g,'-'); break;
    case 'toggle': result = text.split('').map(c => c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()).join(''); break;
    default: return 'Unknown case type';
  }
  return result;
}

function textDiff(args: Record<string, unknown>): string {
  const { text1, text2 } = args as { text1: string; text2: string };
  const lines1 = text1.split('\n');
  const lines2 = text2.split('\n');
  const maxLen = Math.max(lines1.length, lines2.length);
  const diffs: string[] = [];
  let added = 0, removed = 0, unchanged = 0;

  for (let i = 0; i < maxLen; i++) {
    const l1 = lines1[i];
    const l2 = lines2[i];
    if (l1 === l2) { unchanged++; }
    else if (l1 === undefined) { diffs.push(`+ [${i+1}] ${l2}`); added++; }
    else if (l2 === undefined) { diffs.push(`- [${i+1}] ${l1}`); removed++; }
    else { diffs.push(`- [${i+1}] ${l1}`); diffs.push(`+ [${i+1}] ${l2}`); added++; removed++; }
  }

  return [
    `Lines: text1=${lines1.length}, text2=${lines2.length}`,
    `Changes: +${added} added, -${removed} removed, ${unchanged} unchanged`,
    ``,
    diffs.length > 0 ? diffs.join('\n') : 'No differences found'
  ].join('\n');
}

function loremIpsum(args: Record<string, unknown>): string {
  const { type = 'paragraphs', count = 3 } = args as { type?: string; count?: number };
  const wordList = 'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco laboris nisi aliquip ex ea commodo consequat duis aute irure in reprehenderit voluptate velit esse cillum eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt culpa qui officia deserunt mollit anim id est laborum'.split(' ');

  const word = () => wordList[Math.floor(Math.random() * wordList.length)];
  const sentence = () => {
    const len = 8 + Math.floor(Math.random() * 10);
    const words = Array.from({length: len}, word);
    words[0] = words[0][0].toUpperCase() + words[0].slice(1);
    return words.join(' ') + '.';
  };
  const paragraph = () => Array.from({length: 4 + Math.floor(Math.random() * 4)}, sentence).join(' ');

  const n = Math.min(Math.max(1, Math.round(count as number)), 50);

  if (type === 'words') return Array.from({length: n}, word).join(' ');
  if (type === 'sentences') return Array.from({length: n}, sentence).join(' ');
  return Array.from({length: n}, paragraph).join('\n\n');
}

function textToSlug(args: Record<string, unknown>): string {
  const { text, separator = '-' } = args as { text: string; separator?: string };
  const slug = text
    .toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g,'')
    .replace(/[^a-z0-9\s-]/g,'')
    .trim()
    .replace(/[\s-]+/g, separator as string);
  return slug;
}

function palindromeChecker(args: Record<string, unknown>): string {
  const { text, ignore_spaces = true } = args as { text: string; ignore_spaces?: boolean };
  let clean = text.toLowerCase().replace(/[^a-z0-9\s]/g,'');
  if (ignore_spaces) clean = clean.replace(/\s/g,'');
  const reversed = clean.split('').reverse().join('');
  const isPalindrome = clean === reversed;
  return `"${text}" is ${isPalindrome ? 'âœ“ a palindrome' : 'âœ— not a palindrome'}\nCleaned: "${clean}"\nReversed: "${reversed}"`;
}

function textReverser(args: Record<string, unknown>): string {
  const { text, mode = 'characters' } = args as { text: string; mode?: string };
  let result: string;
  switch (mode) {
    case 'characters': result = text.split('').reverse().join(''); break;
    case 'words': result = text.split(/\s+/).reverse().join(' '); break;
    case 'lines': result = text.split('\n').reverse().join('\n'); break;
    default: return 'Unknown mode';
  }
  return result;
}

function duplicateRemover(args: Record<string, unknown>): string {
  const { text, case_sensitive = true, sort = false } = args as { text: string; case_sensitive?: boolean; sort?: boolean };
  const lines = text.split('\n');
  const seen = new Set<string>();
  const unique = lines.filter(line => {
    const key = case_sensitive ? line : line.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
  const result = sort ? unique.sort() : unique;
  return [
    `Original: ${lines.length} lines`,
    `Unique: ${result.length} lines`,
    `Removed: ${lines.length - result.length} duplicates`,
    ``,
    result.join('\n')
  ].join('\n');
}

function textSorter(args: Record<string, unknown>): string {
  const { text, mode = 'alpha_asc' } = args as { text: string; mode?: string };
  const lines = text.split('\n');
  let sorted: string[];
  switch (mode) {
    case 'alpha_asc': sorted = [...lines].sort((a,b)=>a.localeCompare(b)); break;
    case 'alpha_desc': sorted = [...lines].sort((a,b)=>b.localeCompare(a)); break;
    case 'length_asc': sorted = [...lines].sort((a,b)=>a.length-b.length); break;
    case 'length_desc': sorted = [...lines].sort((a,b)=>b.length-a.length); break;
    case 'random': sorted = [...lines].sort(()=>Math.random()-0.5); break;
    default: return 'Unknown mode';
  }
  return sorted.join('\n');
}

const MORSE: Record<string, string> = {
  A:'.-',B:'-...',C:'-.-.',D:'-..',E:'.',F:'..-.',G:'--.',H:'....',I:'..',J:'.---',
  K:'-.-',L:'.-..',M:'--',N:'-.',O:'---',P:'.--.',Q:'--.-',R:'.-.',S:'...',T:'-',
  U:'..-',V:'...-',W:'.--',X:'-..-',Y:'-.--',Z:'--..',
  '0':'-----','1':'.----','2':'..---','3':'...--','4':'....-','5':'.....',
  '6':'-....','7':'--...','8':'---..','9':'----.','.':'.-.-.-',',':'--..--',
  '?':'..--..','!':'-.-.--','/':'-..-.','(':'-.--.',')':`-.--.-`,
  '&':'.-...',':':'---...',';':'-.-.-.','-':'-....-','_':'..--.-',
  '"':'.-..-.','$':'...-..-','@':'.---.-.',' ':'/'
};
const MORSE_REV: Record<string, string> = Object.fromEntries(Object.entries(MORSE).map(([k,v])=>[v,k]));

function morseConverter(args: Record<string, unknown>): string {
  const { input, mode } = args as { input: string; mode: string };
  if (mode === 'encode') {
    const encoded = input.toUpperCase().split('').map(c => MORSE[c] || '?').join(' ');
    return encoded;
  } else {
    const decoded = input.split(' / ').map(word =>
      word.split(' ').map(code => MORSE_REV[code] || '?').join('')
    ).join(' ');
    return decoded;
  }
}

function charCounter(args: Record<string, unknown>): string {
  const { text, show_frequency = false } = args as { text: string; show_frequency?: boolean };
  const withSpaces = text.length;
  const withoutSpaces = text.replace(/\s/g,'').length;
  const letters = (text.match(/[a-zA-Z]/g)||[]).length;
  const digits = (text.match(/\d/g)||[]).length;
  const spaces = (text.match(/\s/g)||[]).length;
  const special = withSpaces - letters - digits - spaces;

  const lines = [
    `Total characters: ${withSpaces}`,
    `Without spaces: ${withoutSpaces}`,
    `Letters: ${letters}`,
    `Digits: ${digits}`,
    `Spaces: ${spaces}`,
    `Special characters: ${special}`
  ];

  if (show_frequency) {
    const freq: Record<string, number> = {};
    for (const c of text.toLowerCase()) { if (c.trim()) freq[c] = (freq[c]||0) + 1; }
    const sorted = Object.entries(freq).sort((a,b)=>b[1]-a[1]).slice(0,10);
    lines.push('', 'Top 10 characters:');
    sorted.forEach(([c,n]) => lines.push(`  "${c}": ${n} times (${((n/withoutSpaces)*100).toFixed(1)}%)`));
  }

  return lines.join('\n');
}
