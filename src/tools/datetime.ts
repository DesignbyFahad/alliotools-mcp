// Date & time tools — all run locally, zero network calls

export const datetimeTools = [
  {
    name: 'date_calculator',
    description: 'Calculate the number of days between two dates, or add/subtract days from a date.',
    inputSchema: {
      type: 'object',
      properties: {
        mode: { type: 'string', enum: ['difference', 'add_subtract'], description: 'difference = days between two dates | add_subtract = add or subtract days from a date' },
        date1: { type: 'string', description: 'Start date in YYYY-MM-DD format' },
        date2: { type: 'string', description: 'End date in YYYY-MM-DD format (for difference mode)' },
        days: { type: 'number', description: 'Days to add (positive) or subtract (negative) from date1 (for add_subtract mode)' },
        exclude_weekends: { type: 'boolean', description: 'Exclude weekends from the count', default: false }
      },
      required: ['mode', 'date1']
    }
  },
  {
    name: 'time_zone_converter',
    description: 'Convert a time from one time zone to another. Handles daylight saving automatically.',
    inputSchema: {
      type: 'object',
      properties: {
        time: { type: 'string', description: 'Time to convert in ISO format or "YYYY-MM-DD HH:MM" (default: current time)' },
        from_tz: { type: 'string', description: 'Source IANA timezone e.g. "America/New_York", "Europe/London", "Asia/Tokyo"' },
        to_tz: { type: 'string', description: 'Target IANA timezone' }
      },
      required: ['from_tz', 'to_tz']
    }
  },
  {
    name: 'unix_timestamp_converter',
    description: 'Convert Unix timestamps to human-readable dates and back, in any timezone.',
    inputSchema: {
      type: 'object',
      properties: {
        input: { type: 'string', description: 'Unix timestamp (10 digits = seconds, 13 digits = ms) OR date string' },
        timezone: { type: 'string', description: 'IANA timezone for display (default: UTC)' }
      },
      required: ['input']
    }
  },
  {
    name: 'week_number_calculator',
    description: 'Find the ISO week number for any date, and the date range of any week number.',
    inputSchema: {
      type: 'object',
      properties: {
        date: { type: 'string', description: 'Date in YYYY-MM-DD format (default: today)' }
      }
    }
  },
  {
    name: 'time_duration_calculator',
    description: 'Calculate duration between two times, or add a duration to a time.',
    inputSchema: {
      type: 'object',
      properties: {
        mode: { type: 'string', enum: ['duration_between', 'add_duration'], description: 'duration_between = time between two times | add_duration = add HH:MM to a time' },
        time1: { type: 'string', description: 'First time in HH:MM or HH:MM:SS format' },
        time2: { type: 'string', description: 'Second time / duration to add in HH:MM or HH:MM:SS' },
        spans_midnight: { type: 'boolean', description: 'Set true if the duration crosses midnight', default: false }
      },
      required: ['mode', 'time1', 'time2']
    }
  },
  {
    name: 'countdown_timer',
    description: 'Calculate how much time remains until a future date, or how long ago a past date was.',
    inputSchema: {
      type: 'object',
      properties: {
        target_date: { type: 'string', description: 'Target date in YYYY-MM-DD or "YYYY-MM-DD HH:MM" format' },
        label: { type: 'string', description: 'Optional label for the event (e.g. "Christmas", "Project deadline")' }
      },
      required: ['target_date']
    }
  },
  {
    name: 'world_clock',
    description: 'Show the current time across multiple timezones simultaneously.',
    inputSchema: {
      type: 'object',
      properties: {
        timezones: {
          type: 'array',
          items: { type: 'string' },
          description: 'List of IANA timezone strings e.g. ["America/New_York", "Europe/London"]. Defaults to UTC, New York, London, Tokyo, Sydney.'
        },
        show_date: { type: 'boolean', description: 'Also show the date for each timezone (default false)', default: false }
      }
    }
  }
];

export function runDatetime(name: string, args: Record<string, unknown>): string {
  switch (name) {
    case 'date_calculator':         return dateCalculator(args);
    case 'time_zone_converter':     return tzConverter(args);
    case 'unix_timestamp_converter': return unixConverter(args);
    case 'week_number_calculator':  return weekNumber(args);
    case 'time_duration_calculator': return timeDuration(args);
    case 'countdown_timer':         return countdownTimer(args);
    case 'world_clock':             return worldClock(args);
    default: return 'Unknown tool';
  }
}

function dateCalculator(args: Record<string, unknown>): string {
  const { mode, date1, date2, days, exclude_weekends = false } = args as {
    mode: string; date1: string; date2?: string; days?: number; exclude_weekends?: boolean;
  };

  const d1 = new Date(date1 + 'T00:00:00Z');
  if (isNaN(d1.getTime())) return `Invalid date: "${date1}"`;

  if (mode === 'add_subtract') {
    if (days === undefined) return 'days parameter required for add_subtract mode';
    const result = new Date(d1);
    result.setUTCDate(result.getUTCDate() + days);
    const diff = Math.abs(days);
    const dir = days >= 0 ? 'after' : 'before';
    return [
      `Start: ${date1}`,
      `${days >= 0 ? '+' : ''}${days} days`,
      `Result: ${result.toISOString().slice(0,10)}`,
      `(${diff} calendar days ${dir})`
    ].join('\n');
  }

  if (!date2) return 'date2 required for difference mode';
  const d2 = new Date(date2 + 'T00:00:00Z');
  if (isNaN(d2.getTime())) return `Invalid date: "${date2}"`;

  const totalMs = Math.abs(d2.getTime() - d1.getTime());
  const totalDays = Math.round(totalMs / 86400000);

  let workingDays = totalDays;
  if (exclude_weekends) {
    workingDays = 0;
    const cursor = new Date(Math.min(d1.getTime(), d2.getTime()));
    for (let i = 0; i < totalDays; i++) {
      const dow = cursor.getUTCDay();
      if (dow !== 0 && dow !== 6) workingDays++;
      cursor.setUTCDate(cursor.getUTCDate() + 1);
    }
  }

  const years = Math.floor(totalDays / 365);
  const months = Math.floor(totalDays / 30);
  const weeks = Math.floor(totalDays / 7);

  return [
    `From: ${date1}`,
    `To:   ${date2}`,
    ``,
    `Calendar days: ${totalDays.toLocaleString()}`,
    exclude_weekends ? `Working days: ${workingDays.toLocaleString()}` : null,
    `Weeks: ${weeks}`,
    `Months: ~${months}`,
    `Years: ~${years}`
  ].filter(Boolean).join('\n');
}

function tzConverter(args: Record<string, unknown>): string {
  const { time, from_tz, to_tz } = args as { time?: string; from_tz: string; to_tz: string };

  try {
    let date: Date;
    if (time) {
      date = new Date(time.includes('T') ? time : time.replace(' ', 'T'));
      if (isNaN(date.getTime())) {
        const [datePart, timePart] = time.split(' ');
        date = new Date(`${datePart}T${timePart || '00:00'}:00`);
      }
    } else {
      date = new Date();
    }

    const fmt = (tz: string) => date.toLocaleString('en-US', {
      timeZone: tz,
      year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit', second: '2-digit',
      hour12: false,
      timeZoneName: 'shortOffset'
    });

    return [
      `${from_tz}:  ${fmt(from_tz)}`,
      `${to_tz}:  ${fmt(to_tz)}`,
      ``,
      `UTC: ${date.toUTCString()}`
    ].join('\n');
  } catch (e) {
    return `Error: ${(e as Error).message}. Make sure timezone names are valid IANA identifiers (e.g. "America/New_York", "Europe/London", "Asia/Tokyo").`;
  }
}

function unixConverter(args: Record<string, unknown>): string {
  const { input, timezone = 'UTC' } = args as { input: string; timezone?: string };
  const s = input.trim();
  let date: Date;

  if (/^\d{10}$/.test(s)) { date = new Date(parseInt(s) * 1000); }
  else if (/^\d{13}$/.test(s)) { date = new Date(parseInt(s)); }
  else {
    date = new Date(s);
    if (isNaN(date.getTime())) return `Cannot parse: "${s}"`;
    return [
      `Unix timestamp (sec): ${Math.floor(date.getTime()/1000)}`,
      `Unix timestamp (ms): ${date.getTime()}`,
      `ISO 8601: ${date.toISOString()}`,
      `UTC: ${date.toUTCString()}`
    ].join('\n');
  }

  try {
    const local = date.toLocaleString('en-US', { timeZone: timezone as string, dateStyle: 'full', timeStyle: 'long' });
    return [
      `Unix (sec): ${Math.floor(date.getTime()/1000)}`,
      `Unix (ms):  ${date.getTime()}`,
      `ISO 8601:   ${date.toISOString()}`,
      `UTC:        ${date.toUTCString()}`,
      `${timezone}: ${local}`
    ].join('\n');
  } catch {
    return [`Unix (sec): ${Math.floor(date.getTime()/1000)}`, `ISO 8601: ${date.toISOString()}`].join('\n');
  }
}

function weekNumber(args: Record<string, unknown>): string {
  const { date } = args as { date?: string };
  const d = date ? new Date(date + 'T00:00:00Z') : new Date();
  d.setUTCHours(0,0,0,0);

  // ISO 8601 week number
  const thursday = new Date(d);
  thursday.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  const yearStart = new Date(Date.UTC(thursday.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil((((thursday.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
  const isoYear = thursday.getUTCFullYear();

  const days = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
  const dow = days[(d.getUTCDay() + 6) % 7];

  const weekStart = new Date(d);
  weekStart.setUTCDate(d.getUTCDate() - ((d.getUTCDay() + 6) % 7));
  const weekEnd = new Date(weekStart);
  weekEnd.setUTCDate(weekStart.getUTCDate() + 6);

  const dayOfYear = Math.floor((d.getTime() - new Date(Date.UTC(d.getUTCFullYear(),0,0)).getTime()) / 86400000);
  const daysRemaining = (date ? new Date(date + 'T00:00:00Z') : new Date()).getUTCFullYear() % 4 === 0 ? 366 - dayOfYear : 365 - dayOfYear;

  return [
    `Date: ${d.toISOString().slice(0,10)} (${dow})`,
    `ISO Week: W${String(weekNo).padStart(2,'0')} of ${isoYear}`,
    `Week range: ${weekStart.toISOString().slice(0,10)} – ${weekEnd.toISOString().slice(0,10)}`,
    `Day of year: ${dayOfYear}`,
    `Days remaining in year: ${daysRemaining}`
  ].join('\n');
}

function timeDuration(args: Record<string, unknown>): string {
  const { mode, time1, time2, spans_midnight = false } = args as {
    mode: string; time1: string; time2: string; spans_midnight?: boolean;
  };

  const parseTime = (t: string): number => {
    const parts = t.split(':').map(Number);
    return parts[0] * 3600 + (parts[1] || 0) * 60 + (parts[2] || 0);
  };

  const formatDuration = (secs: number): string => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return [h>0?`${h}h`:'', m>0?`${m}m`:'', s>0?`${s}s`:''].filter(Boolean).join(' ') || '0s';
  };

  const formatTime = (secs: number): string => {
    const total = ((secs % 86400) + 86400) % 86400;
    const h = Math.floor(total/3600);
    const m = Math.floor((total%3600)/60);
    const s = total%60;
    return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
  };

  const s1 = parseTime(time1);
  const s2 = parseTime(time2);

  if (mode === 'duration_between') {
    let diff = s2 - s1;
    if (spans_midnight && diff < 0) diff += 86400;
    const absDiff = Math.abs(diff);
    const decimal = (absDiff / 3600).toFixed(2);
    return [
      `From: ${time1}`,
      `To:   ${time2}`,
      spans_midnight ? '(spans midnight)' : null,
      `Duration: ${formatDuration(absDiff)}`,
      `In decimal hours: ${decimal}h`,
      `In minutes: ${Math.round(absDiff/60)}`
    ].filter(Boolean).join('\n');
  }

  if (mode === 'add_duration') {
    const result = s1 + s2;
    return [
      `Start: ${time1}`,
      `+ ${formatDuration(s2)}`,
      `= ${formatTime(result)}${result >= 86400 ? ' (+1 day)' : ''}`
    ].join('\n');
  }

  return 'Invalid mode';
}

// ---------------------------------------------------------------------------
// countdown_timer
// ---------------------------------------------------------------------------
function countdownTimer(args: Record<string, unknown>): string {
  const { target_date, label } = args as { target_date: string; label?: string };

  // Parse target — support "YYYY-MM-DD" and "YYYY-MM-DD HH:MM"
  let target: Date;
  if (/^\d{4}-\d{2}-\d{2}$/.test(target_date.trim())) {
    target = new Date(target_date.trim() + 'T00:00:00Z');
  } else {
    target = new Date(target_date.trim().replace(' ', 'T'));
  }
  if (isNaN(target.getTime())) return `Invalid date: "${target_date}"`;

  const now      = new Date();
  const diffMs   = target.getTime() - now.getTime();
  const isFuture = diffMs >= 0;
  const absMs    = Math.abs(diffMs);

  const totalSeconds = Math.floor(absMs / 1000);
  const seconds      = totalSeconds % 60;
  const totalMinutes = Math.floor(totalSeconds / 60);
  const minutes      = totalMinutes % 60;
  const totalHours   = Math.floor(totalMinutes / 60);
  const hours        = totalHours % 24;
  const totalDays    = Math.floor(totalHours / 24);
  const weeks        = Math.floor(totalDays / 7);

  // Percentage of year elapsed/remaining
  const yearStart  = new Date(Date.UTC(now.getUTCFullYear(), 0, 1));
  const yearEnd    = new Date(Date.UTC(now.getUTCFullYear() + 1, 0, 1));
  const yearLen    = yearEnd.getTime() - yearStart.getTime();
  const yearPct    = Math.round(((now.getTime() - yearStart.getTime()) / yearLen) * 100);

  const header = label
    ? `${label}: ${target_date}`
    : `Target: ${target_date}`;

  const direction = isFuture ? 'Time remaining' : 'Time since';

  return [
    header,
    `Now:    ${now.toUTCString()}`,
    ``,
    `${direction}:`,
    `  ${totalDays.toLocaleString()} days, ${hours}h ${minutes}m ${seconds}s`,
    `  (~${weeks} week${weeks !== 1 ? 's' : ''})`,
    ``,
    `Year progress: ${yearPct}% of ${now.getUTCFullYear()} has elapsed`
  ].join('\n');
}

// ---------------------------------------------------------------------------
// world_clock
// ---------------------------------------------------------------------------
function worldClock(args: Record<string, unknown>): string {
  const tzArg    = args.timezones as string[] | undefined;
  const showDate = (args.show_date as boolean) ?? false;

  const timezones = (Array.isArray(tzArg) && tzArg.length > 0)
    ? tzArg
    : ['UTC', 'America/New_York', 'Europe/London', 'Asia/Tokyo', 'Australia/Sydney'];

  const now = new Date();

  // Find longest timezone label for alignment
  const pad = Math.max(...timezones.map(tz => tz.length));

  const lines: string[] = [
    `Current time across ${timezones.length} timezone${timezones.length !== 1 ? 's' : ''}`,
    `(as of ${now.toUTCString()})`,
    ``
  ];

  for (const tz of timezones) {
    try {
      const timeOpts: Intl.DateTimeFormatOptions = {
        timeZone: tz,
        hour:   '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZoneName: 'shortOffset'
      };
      const dateOpts: Intl.DateTimeFormatOptions = {
        timeZone: tz,
        weekday: 'short',
        year:    'numeric',
        month:   'short',
        day:     'numeric'
      };

      const timeStr = now.toLocaleString('en-GB', timeOpts);
      const label   = tz.padEnd(pad);

      if (showDate) {
        const dateStr = now.toLocaleString('en-GB', dateOpts);
        lines.push(`${label}  ${timeStr}  (${dateStr})`);
      } else {
        lines.push(`${label}  ${timeStr}`);
      }
    } catch {
      lines.push(`${tz.padEnd(pad)}  [Invalid timezone]`);
    }
  }

  return lines.join('\n');
}
