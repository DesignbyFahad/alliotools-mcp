// Text tools — all run locally, zero network calls

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
  },
  {
    name: 'add_comma',
    description: 'Join a list of items with commas and "and" before the last item, with optional Oxford comma.',
    inputSchema: {
      type: 'object',
      properties: {
        items: { type: 'string', description: 'Items to join — one per line OR comma-separated' },
        oxford_comma: { type: 'boolean', description: 'Use Oxford comma (serial comma) before "and"', default: true }
      },
      required: ['items']
    }
  },
  {
    name: 'anagram_checker',
    description: 'Check if two strings are anagrams of each other and show shared vs. different letters.',
    inputSchema: {
      type: 'object',
      properties: {
        word1: { type: 'string', description: 'First word or phrase' },
        word2: { type: 'string', description: 'Second word or phrase' }
      },
      required: ['word1', 'word2']
    }
  },
  {
    name: 'find_and_replace',
    description: 'Find and replace all occurrences of a string within text, with optional case sensitivity and whole-word matching.',
    inputSchema: {
      type: 'object',
      properties: {
        text: { type: 'string', description: 'Source text to search within' },
        find: { type: 'string', description: 'Text to find' },
        replace: { type: 'string', description: 'Replacement text' },
        case_sensitive: { type: 'boolean', description: 'Match case exactly', default: false },
        whole_word: { type: 'boolean', description: 'Match whole words only', default: false }
      },
      required: ['text', 'find', 'replace']
    }
  },
  {
    name: 'html_to_text',
    description: 'Strip HTML tags and convert an HTML document or snippet to plain text, preserving structure.',
    inputSchema: {
      type: 'object',
      properties: {
        html: { type: 'string', description: 'HTML string to convert' },
        preserve_links: { type: 'boolean', description: 'Keep link URLs in format "text (URL)"', default: false },
        preserve_line_breaks: { type: 'boolean', description: 'Convert block elements to newlines', default: true }
      },
      required: ['html']
    }
  },
  {
    name: 'markdown_to_html',
    description: 'Convert Markdown to HTML. Supports headings, bold, italic, code, links, images, lists, blockquotes, and horizontal rules.',
    inputSchema: {
      type: 'object',
      properties: {
        markdown: { type: 'string', description: 'Markdown text to convert' }
      },
      required: ['markdown']
    }
  },
  {
    name: 'readability_score',
    description: 'Calculate Flesch Reading Ease and Flesch-Kincaid Grade Level scores plus full text statistics.',
    inputSchema: {
      type: 'object',
      properties: {
        text: { type: 'string', description: 'Text to analyse for readability' }
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
    case 'add_comma': return addComma(args);
    case 'anagram_checker': return anagramChecker(args);
    case 'find_and_replace': return findAndReplace(args);
    case 'html_to_text': return htmlToText(args);
    case 'markdown_to_html': return markdownToHtml(args);
    case 'readability_score': return readabilityScore(args);
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
  return `"${text}" is ${isPalindrome ? 'a palindrome' : 'not a palindrome'}\nCleaned: "${clean}"\nReversed: "${reversed}"`;
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

// ─── NEW TOOLS ───────────────────────────────────────────────────────────────

function addComma(args: Record<string, unknown>): string {
  const { items, oxford_comma = true } = args as { items: string; oxford_comma?: boolean };

  // Detect if input is newline-separated or comma-separated
  let parsed: string[];
  if (items.includes('\n')) {
    parsed = items.split('\n').map(s => s.trim()).filter(s => s.length > 0);
  } else {
    parsed = items.split(',').map(s => s.trim()).filter(s => s.length > 0);
  }

  if (parsed.length === 0) return '';
  if (parsed.length === 1) return parsed[0];
  if (parsed.length === 2) return `${parsed[0]} and ${parsed[1]}`;

  const allButLast = parsed.slice(0, -1);
  const last = parsed[parsed.length - 1];
  const oxfordPart = oxford_comma ? ',' : '';
  return `${allButLast.join(', ')}${oxfordPart} and ${last}`;
}

function anagramChecker(args: Record<string, unknown>): string {
  const { word1, word2 } = args as { word1: string; word2: string };

  // Clean: lowercase, remove spaces and punctuation
  const clean = (s: string) => s.toLowerCase().replace(/[^a-z]/g, '');
  const c1 = clean(word1);
  const c2 = clean(word2);

  // Build frequency maps
  const freq = (s: string): Record<string, number> => {
    const map: Record<string, number> = {};
    for (const ch of s) map[ch] = (map[ch] || 0) + 1;
    return map;
  };

  const f1 = freq(c1);
  const f2 = freq(c2);
  const allLetters = new Set([...Object.keys(f1), ...Object.keys(f2)]);

  const shared: string[] = [];
  const onlyIn1: string[] = [];
  const onlyIn2: string[] = [];

  for (const letter of [...allLetters].sort()) {
    const count1 = f1[letter] || 0;
    const count2 = f2[letter] || 0;
    const minCount = Math.min(count1, count2);
    if (minCount > 0) shared.push(`${letter}×${minCount}`);
    if (count1 > count2) onlyIn1.push(`${letter}×${count1 - count2}`);
    if (count2 > count1) onlyIn2.push(`${letter}×${count2 - count1}`);
  }

  const isAnagram = onlyIn1.length === 0 && onlyIn2.length === 0;

  const lines = [
    `"${word1}" and "${word2}"`,
    `Result: ${isAnagram ? 'Yes, they are anagrams' : 'No, not anagrams'}`,
    ``,
    `Cleaned form 1: "${c1}" (${c1.length} letters)`,
    `Cleaned form 2: "${c2}" (${c2.length} letters)`,
    ``,
    `Shared letters: ${shared.length > 0 ? shared.join(', ') : '(none)'}`,
  ];

  if (onlyIn1.length > 0) lines.push(`Only in "${word1}": ${onlyIn1.join(', ')}`);
  if (onlyIn2.length > 0) lines.push(`Only in "${word2}": ${onlyIn2.join(', ')}`);

  return lines.join('\n');
}

function findAndReplace(args: Record<string, unknown>): string {
  const { text, find, replace, case_sensitive = false, whole_word = false } =
    args as { text: string; find: string; replace: string; case_sensitive?: boolean; whole_word?: boolean };

  if (!find) return `Error: "find" cannot be empty`;

  const escapedFind = find.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const pattern = whole_word ? `\\b${escapedFind}\\b` : escapedFind;
  const flags = case_sensitive ? 'g' : 'gi';

  let count = 0;
  const regex = new RegExp(pattern, flags);
  const result = text.replace(regex, (match) => {
    count++;
    return replace;
  });

  return [
    `Replacements made: ${count}`,
    ``,
    result
  ].join('\n');
}

function htmlToText(args: Record<string, unknown>): string {
  const { html, preserve_links = false, preserve_line_breaks = true } =
    args as { html: string; preserve_links?: boolean; preserve_line_breaks?: boolean };

  let text = html;

  // Handle preserve_links: convert <a href="...">text</a> to "text (URL)"
  if (preserve_links) {
    text = text.replace(/<a\s[^>]*href=["']([^"']*)["'][^>]*>([\s\S]*?)<\/a>/gi, (_, url, linkText) => {
      const cleanLinkText = linkText.replace(/<[^>]+>/g, '').trim();
      return `${cleanLinkText} (${url})`;
    });
  }

  if (preserve_line_breaks) {
    // Block-level elements → newlines
    text = text.replace(/<\/(p|div|h[1-6]|blockquote|pre|tr|li)>/gi, '\n');
    text = text.replace(/<br\s*\/?>/gi, '\n');
    // List items get bullet prefix
    text = text.replace(/<li[^>]*>/gi, '• ');
  } else {
    // Replace block tags with space
    text = text.replace(/<\/(p|div|h[1-6]|blockquote|pre|tr|li)>/gi, ' ');
    text = text.replace(/<br\s*\/?>/gi, ' ');
  }

  // Strip all remaining tags
  text = text.replace(/<[^>]+>/g, '');

  // Decode common HTML entities
  text = text
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&apos;/gi, "'")
    .replace(/&nbsp;/gi, ' ')
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(parseInt(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCharCode(parseInt(h, 16)));

  // Clean up excess whitespace/newlines
  text = text.replace(/\n{3,}/g, '\n\n');
  text = text.replace(/[ \t]+/g, ' ');
  text = text.replace(/^ +| +$/gm, '');

  return text.trim();
}

function markdownToHtml(args: Record<string, unknown>): string {
  const { markdown } = args as { markdown: string };
  let text = markdown;

  // Fenced code blocks first (``` ... ```)
  text = text.replace(/```([a-z]*)\n([\s\S]*?)```/gm, (_, lang, code) => {
    const langAttr = lang ? ` class="language-${lang}"` : '';
    return `<pre><code${langAttr}>${code.replace(/</g,'&lt;').replace(/>/g,'&gt;')}</code></pre>`;
  });

  // Blockquotes
  text = text.replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>');

  // Headings
  text = text.replace(/^### (.+)$/gm, '<h3>$1</h3>');
  text = text.replace(/^## (.+)$/gm, '<h2>$1</h2>');
  text = text.replace(/^# (.+)$/gm, '<h1>$1</h1>');

  // Horizontal rule
  text = text.replace(/^---+$/gm, '<hr>');

  // Unordered lists — collect consecutive items
  text = text.replace(/((?:^[*\-] .+\n?)+)/gm, (block) => {
    const items = block.trim().split('\n').map(line => `<li>${line.replace(/^[*\-] /, '')}</li>`).join('\n');
    return `<ul>\n${items}\n</ul>`;
  });

  // Ordered lists
  text = text.replace(/((?:^\d+\. .+\n?)+)/gm, (block) => {
    const items = block.trim().split('\n').map(line => `<li>${line.replace(/^\d+\. /, '')}</li>`).join('\n');
    return `<ol>\n${items}\n</ol>`;
  });

  // Inline code (after fenced blocks so they don't interfere)
  text = text.replace(/`([^`]+)`/g, '<code>$1</code>');

  // Bold
  text = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  text = text.replace(/__(.+?)__/g, '<strong>$1</strong>');

  // Italic
  text = text.replace(/\*(.+?)\*/g, '<em>$1</em>');
  text = text.replace(/_(.+?)_/g, '<em>$1</em>');

  // Images (before links)
  text = text.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1">');

  // Links
  text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

  // Paragraphs: wrap blocks of text separated by blank lines
  const blocks = text.split(/\n\n+/);
  const wrapped = blocks.map(block => {
    const trimmed = block.trim();
    if (!trimmed) return '';
    // Don't wrap if it already starts with an HTML block element
    if (/^<(h[1-6]|ul|ol|li|pre|blockquote|hr|img)/.test(trimmed)) return trimmed;
    return `<p>${trimmed.replace(/\n/g, '<br>')}</p>`;
  });

  return wrapped.filter(b => b).join('\n\n');
}

function countSyllables(word: string): number {
  const w = word.toLowerCase().replace(/[^a-z]/g, '');
  if (w.length === 0) return 0;
  if (w.length <= 3) return 1;

  // Remove silent trailing e
  const cleaned = w.replace(/e$/, '');
  // Count vowel groups
  const vowelGroups = cleaned.match(/[aeiouy]+/g);
  let count = vowelGroups ? vowelGroups.length : 1;

  // Adjustments
  if (/le$/.test(w) && !/[aeiouy]le$/.test(w)) count++;
  if (/ed$/.test(w)) count = Math.max(1, count - 1);

  return Math.max(1, count);
}

function readabilityScore(args: Record<string, unknown>): string {
  const { text } = args as { text: string };

  if (!text.trim()) return 'Error: No text provided';

  // Counts
  const charCount = text.length;
  const words = text.trim().split(/\s+/).filter(w => w.length > 0);
  const wordCount = words.length;
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const sentenceCount = Math.max(1, sentences.length);
  const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim().length > 0);
  const paragraphCount = Math.max(1, paragraphs.length);

  const syllableCount = words.reduce((sum, w) => sum + countSyllables(w), 0);

  const avgWordsPerSentence = wordCount / sentenceCount;
  const avgSyllablesPerWord = syllableCount / Math.max(1, wordCount);

  // Flesch Reading Ease
  const fleschEase = 206.835 - 1.015 * avgWordsPerSentence - 84.6 * avgSyllablesPerWord;
  const fleschEaseClamped = Math.min(100, Math.max(0, fleschEase));

  // Flesch-Kincaid Grade Level
  const fkGrade = 0.39 * avgWordsPerSentence + 11.8 * avgSyllablesPerWord - 15.59;
  const fkGradeClamped = Math.max(0, fkGrade);

  // Reading ease interpretation
  let interpretation: string;
  if (fleschEaseClamped >= 90) interpretation = 'Very Easy (5th grade)';
  else if (fleschEaseClamped >= 80) interpretation = 'Easy (6th grade)';
  else if (fleschEaseClamped >= 70) interpretation = 'Fairly Easy (7th grade)';
  else if (fleschEaseClamped >= 60) interpretation = 'Standard (8th–9th grade)';
  else if (fleschEaseClamped >= 50) interpretation = 'Fairly Difficult (10th–12th grade)';
  else if (fleschEaseClamped >= 30) interpretation = 'Difficult (college level)';
  else interpretation = 'Very Confusing (professional/academic)';

  // Reading time at 200 wpm average
  const readingMinutes = wordCount / 200;
  const readingTime = readingMinutes < 1
    ? `~${Math.ceil(readingMinutes * 60)} seconds`
    : `~${Math.ceil(readingMinutes)} minute${Math.ceil(readingMinutes) !== 1 ? 's' : ''}`;

  return [
    `─── Text Statistics ───`,
    `Words:                  ${wordCount.toLocaleString()}`,
    `Characters:             ${charCount.toLocaleString()}`,
    `Sentences:              ${sentenceCount}`,
    `Paragraphs:             ${paragraphCount}`,
    `Syllables:              ${syllableCount.toLocaleString()}`,
    `Avg words/sentence:     ${avgWordsPerSentence.toFixed(1)}`,
    `Avg syllables/word:     ${avgSyllablesPerWord.toFixed(2)}`,
    `Estimated reading time: ${readingTime}`,
    ``,
    `─── Readability Scores ───`,
    `Flesch Reading Ease:    ${fleschEaseClamped.toFixed(1)} / 100`,
    `Interpretation:         ${interpretation}`,
    `F-K Grade Level:        ${fkGradeClamped.toFixed(1)} (US school grade)`,
  ].join('\n');
}
