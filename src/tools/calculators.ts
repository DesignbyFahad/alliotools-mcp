// Calculators — all run locally, zero network calls

export const calculatorTools = [
  {
    name: 'percentage_calculator',
    description: 'Calculate percentages: what is X% of Y, X is what % of Y, or percentage change between two values.',
    inputSchema: {
      type: 'object',
      properties: {
        mode: { type: 'string', enum: ['of', 'what_percent', 'change'], description: '"of" = X% of Y | "what_percent" = X is what % of Y | "change" = % change from X to Y' },
        x: { type: 'number', description: 'First value' },
        y: { type: 'number', description: 'Second value' }
      },
      required: ['mode', 'x', 'y']
    }
  },
  {
    name: 'compound_interest_calculator',
    description: 'Calculate compound interest: final amount, total interest earned, and year-by-year breakdown.',
    inputSchema: {
      type: 'object',
      properties: {
        principal: { type: 'number', description: 'Initial investment amount' },
        rate: { type: 'number', description: 'Annual interest rate as a percentage (e.g. 5 for 5%)' },
        years: { type: 'number', description: 'Investment period in years' },
        compounds_per_year: { type: 'number', description: 'Compounding frequency: 1=annually, 4=quarterly, 12=monthly, 365=daily', default: 12 },
        monthly_contribution: { type: 'number', description: 'Optional monthly contribution amount', default: 0 }
      },
      required: ['principal', 'rate', 'years']
    }
  },
  {
    name: 'bmi_calculator',
    description: 'Calculate Body Mass Index (BMI) and get the corresponding weight category.',
    inputSchema: {
      type: 'object',
      properties: {
        weight: { type: 'number', description: 'Body weight' },
        height: { type: 'number', description: 'Height' },
        unit: { type: 'string', enum: ['metric', 'imperial'], description: 'metric = kg/cm | imperial = lbs/inches', default: 'metric' }
      },
      required: ['weight', 'height']
    }
  },
  {
    name: 'age_calculator',
    description: 'Calculate exact age from a birthdate: years, months, days, and next birthday countdown.',
    inputSchema: {
      type: 'object',
      properties: {
        birthdate: { type: 'string', description: 'Birthdate in YYYY-MM-DD format' },
        reference_date: { type: 'string', description: 'Date to calculate age at, defaults to today (YYYY-MM-DD)' }
      },
      required: ['birthdate']
    }
  },
  {
    name: 'tip_calculator',
    description: 'Calculate tip amount and total bill, optionally split between multiple people.',
    inputSchema: {
      type: 'object',
      properties: {
        bill: { type: 'number', description: 'Total bill amount before tip' },
        tip_percent: { type: 'number', description: 'Tip percentage (e.g. 18 for 18%)', default: 18 },
        people: { type: 'number', description: 'Number of people splitting the bill', default: 1 }
      },
      required: ['bill']
    }
  },
  {
    name: 'discount_calculator',
    description: 'Calculate the discounted price, amount saved, and effective discount percentage.',
    inputSchema: {
      type: 'object',
      properties: {
        original_price: { type: 'number', description: 'Original price before discount' },
        discount: { type: 'number', description: 'Discount amount or percentage' },
        discount_type: { type: 'string', enum: ['percent', 'amount'], description: 'Whether discount is a percentage or fixed amount', default: 'percent' }
      },
      required: ['original_price', 'discount']
    }
  },
  {
    name: 'profit_margin_calculator',
    description: 'Calculate gross profit margin, markup percentage, and net profit from cost and revenue.',
    inputSchema: {
      type: 'object',
      properties: {
        cost: { type: 'number', description: 'Cost of goods/services' },
        revenue: { type: 'number', description: 'Selling price / revenue' }
      },
      required: ['cost', 'revenue']
    }
  },
  {
    name: 'salary_calculator',
    description: 'Convert between hourly, daily, weekly, monthly, and annual salary figures.',
    inputSchema: {
      type: 'object',
      properties: {
        amount: { type: 'number', description: 'Salary amount to convert' },
        from_period: { type: 'string', enum: ['hourly', 'daily', 'weekly', 'biweekly', 'monthly', 'annual'], description: 'Period of the input amount' },
        hours_per_week: { type: 'number', description: 'Working hours per week', default: 40 },
        days_per_week: { type: 'number', description: 'Working days per week', default: 5 }
      },
      required: ['amount', 'from_period']
    }
  },
  {
    name: 'loan_calculator',
    description: 'Calculate monthly loan payment, total interest, and amortization for any loan.',
    inputSchema: {
      type: 'object',
      properties: {
        principal: { type: 'number', description: 'Loan amount' },
        annual_rate: { type: 'number', description: 'Annual interest rate as percentage (e.g. 6.5 for 6.5%)' },
        term_months: { type: 'number', description: 'Loan term in months (e.g. 360 for 30-year mortgage)' }
      },
      required: ['principal', 'annual_rate', 'term_months']
    }
  },
  {
    name: 'break_even_calculator',
    description: 'Calculate the break-even point in units and revenue from fixed costs, variable costs, and selling price.',
    inputSchema: {
      type: 'object',
      properties: {
        fixed_costs: { type: 'number', description: 'Total fixed costs (rent, salaries, etc.)' },
        variable_cost_per_unit: { type: 'number', description: 'Variable cost per unit produced/sold' },
        selling_price_per_unit: { type: 'number', description: 'Selling price per unit' }
      },
      required: ['fixed_costs', 'variable_cost_per_unit', 'selling_price_per_unit']
    }
  },
  {
    name: 'markup_calculator',
    description: 'Calculate selling price from cost and markup percentage, or find the markup from cost and price.',
    inputSchema: {
      type: 'object',
      properties: {
        mode: { type: 'string', enum: ['price_from_markup', 'markup_from_price'], description: 'Calculation direction' },
        cost: { type: 'number', description: 'Cost price' },
        markup_percent: { type: 'number', description: 'Markup percentage (required for price_from_markup mode)' },
        selling_price: { type: 'number', description: 'Selling price (required for markup_from_price mode)' }
      },
      required: ['mode', 'cost']
    }
  },
  {
    name: 'area_calculator',
    description: 'Calculate the area of common shapes: rectangle, circle, triangle, trapezoid, ellipse, and more.',
    inputSchema: {
      type: 'object',
      properties: {
        shape: { type: 'string', enum: ['rectangle', 'circle', 'triangle', 'trapezoid', 'ellipse', 'parallelogram', 'square', 'rhombus'], description: 'Shape to calculate area for' },
        dimensions: { type: 'object', description: 'Shape dimensions — rectangle: {width, height} | circle: {radius} | triangle: {base, height} | trapezoid: {a, b, height} | ellipse: {a, b} | parallelogram: {base, height} | square: {side} | rhombus: {d1, d2}' }
      },
      required: ['shape', 'dimensions']
    }
  },
  {
    name: 'fuel_cost_calculator',
    description: 'Calculate total fuel cost and cost per kilometre/mile for a trip.',
    inputSchema: {
      type: 'object',
      properties: {
        distance: { type: 'number', description: 'Trip distance' },
        fuel_efficiency: { type: 'number', description: 'Fuel efficiency (L/100km or MPG)' },
        fuel_price: { type: 'number', description: 'Price per litre or gallon of fuel' },
        unit: { type: 'string', enum: ['metric', 'imperial'], description: 'metric = km + L/100km | imperial = miles + MPG', default: 'metric' }
      },
      required: ['distance', 'fuel_efficiency', 'fuel_price']
    }
  },
  {
    name: 'inflation_calculator',
    description: 'Calculate the inflation-adjusted value of money between any two years (1913–2024).',
    inputSchema: {
      type: 'object',
      properties: {
        amount: { type: 'number', description: 'Original amount of money' },
        from_year: { type: 'number', description: 'Starting year (1913–2024)' },
        to_year: { type: 'number', description: 'Target year (1913–2024)' }
      },
      required: ['amount', 'from_year', 'to_year']
    }
  },
  {
    name: 'calorie_calculator',
    description: 'Calculate daily calorie needs (TDEE) based on age, gender, weight, height, and activity level.',
    inputSchema: {
      type: 'object',
      properties: {
        age: { type: 'number', description: 'Age in years' },
        gender: { type: 'string', enum: ['male', 'female'] },
        weight_kg: { type: 'number', description: 'Weight in kilograms' },
        height_cm: { type: 'number', description: 'Height in centimetres' },
        activity_level: { type: 'string', enum: ['sedentary', 'light', 'moderate', 'active', 'very_active'], description: 'sedentary=desk job | light=1-3x/week | moderate=3-5x/week | active=6-7x/week | very_active=twice/day' },
        goal: { type: 'string', enum: ['lose', 'maintain', 'gain'], description: 'Weight goal', default: 'maintain' }
      },
      required: ['age', 'gender', 'weight_kg', 'height_cm', 'activity_level']
    }
  },
  // ── New tools ──────────────────────────────────────────────────────────────
  {
    name: 'mortgage_calculator',
    description: 'Calculate monthly mortgage payment (P&I + taxes + insurance = PITI), total interest paid, and a 15 vs 30-year comparison.',
    inputSchema: {
      type: 'object',
      properties: {
        home_price: { type: 'number', description: 'Total home purchase price' },
        down_payment: { type: 'number', description: 'Down payment amount in dollars' },
        annual_rate: { type: 'number', description: 'Annual mortgage interest rate as percentage (e.g. 6.5 for 6.5%)' },
        term_years: { type: 'number', description: 'Loan term in years', default: 30 },
        property_tax_annual: { type: 'number', description: 'Annual property tax in dollars (optional)' },
        insurance_annual: { type: 'number', description: 'Annual homeowners insurance in dollars (optional)' }
      },
      required: ['home_price', 'down_payment', 'annual_rate']
    }
  },
  {
    name: 'investment_return_calculator',
    description: 'Calculate ROI and CAGR from a known final value, or project future value from an expected return rate. Supports monthly contributions.',
    inputSchema: {
      type: 'object',
      properties: {
        initial_investment: { type: 'number', description: 'Starting investment amount' },
        years: { type: 'number', description: 'Investment period in years' },
        final_value: { type: 'number', description: 'Known final value — provide this to calculate ROI and CAGR' },
        annual_return_rate: { type: 'number', description: 'Expected annual return rate as percentage (e.g. 8 for 8%) — provide this to project future value' },
        monthly_contribution: { type: 'number', description: 'Monthly contribution amount added each month', default: 0 }
      },
      required: ['initial_investment', 'years']
    }
  },
  {
    name: 'retirement_calculator',
    description: 'Project retirement savings with compound growth and monthly contributions, adjusted for inflation. Shows 4% rule monthly income.',
    inputSchema: {
      type: 'object',
      properties: {
        current_age: { type: 'number', description: 'Your current age' },
        retirement_age: { type: 'number', description: 'Age at which you plan to retire' },
        current_savings: { type: 'number', description: 'Current retirement savings balance' },
        monthly_contribution: { type: 'number', description: 'Monthly contribution to retirement savings' },
        expected_return: { type: 'number', description: 'Expected annual nominal return rate as percentage', default: 7 },
        inflation_rate: { type: 'number', description: 'Expected annual inflation rate as percentage', default: 2.5 }
      },
      required: ['current_age', 'retirement_age', 'current_savings', 'monthly_contribution']
    }
  },
  {
    name: 'electricity_cost_calculator',
    description: 'Calculate the electricity cost of running any device — daily, weekly, monthly, and annual cost in kWh and dollars.',
    inputSchema: {
      type: 'object',
      properties: {
        watts: { type: 'number', description: 'Power consumption of the device in watts' },
        hours_per_day: { type: 'number', description: 'Average hours the device runs per day' },
        days: { type: 'number', description: 'Number of days to calculate cost for', default: 30 },
        cost_per_kwh: { type: 'number', description: 'Electricity rate in dollars per kWh', default: 0.12 }
      },
      required: ['watts', 'hours_per_day']
    }
  },
  {
    name: 'sales_tax_calculator',
    description: 'Add sales tax to a pre-tax price, or strip tax out of a tax-inclusive price to find the original amount.',
    inputSchema: {
      type: 'object',
      properties: {
        price: { type: 'number', description: 'The price to calculate tax on' },
        tax_rate: { type: 'number', description: 'Sales tax rate as a percentage (e.g. 8.5 for 8.5%)' },
        mode: { type: 'string', enum: ['add', 'remove'], description: '"add" = add tax to pre-tax price | "remove" = extract tax from tax-inclusive price', default: 'add' }
      },
      required: ['price', 'tax_rate']
    }
  },
  {
    name: 'fraction_calculator',
    description: 'Add, subtract, multiply, or divide two fractions. Returns the result reduced to lowest terms, as a decimal, and as a mixed number.',
    inputSchema: {
      type: 'object',
      properties: {
        numerator1: { type: 'number', description: 'Numerator of the first fraction' },
        denominator1: { type: 'number', description: 'Denominator of the first fraction' },
        operation: { type: 'string', enum: ['add', 'subtract', 'multiply', 'divide'], description: 'Arithmetic operation to perform' },
        numerator2: { type: 'number', description: 'Numerator of the second fraction' },
        denominator2: { type: 'number', description: 'Denominator of the second fraction' }
      },
      required: ['numerator1', 'denominator1', 'operation', 'numerator2', 'denominator2']
    }
  },
  {
    name: 'speed_calculator',
    description: 'Calculate speed, time, or distance from the other two values. Converts between km/miles and hours/minutes/seconds.',
    inputSchema: {
      type: 'object',
      properties: {
        mode: { type: 'string', enum: ['speed', 'time', 'distance'], description: 'What to calculate: "speed" (needs distance + time) | "time" (needs distance + speed) | "distance" (needs speed + time)' },
        distance_km: { type: 'number', description: 'Distance in kilometres' },
        time_seconds: { type: 'number', description: 'Time in seconds' },
        speed_kmh: { type: 'number', description: 'Speed in km/h' }
      },
      required: ['mode']
    }
  }
];

export function runCalculator(name: string, args: Record<string, unknown>): string {
  switch (name) {
    case 'percentage_calculator': return percentageCalculator(args);
    case 'compound_interest_calculator': return compoundInterest(args);
    case 'bmi_calculator': return bmiCalculator(args);
    case 'age_calculator': return ageCalculator(args);
    case 'tip_calculator': return tipCalculator(args);
    case 'discount_calculator': return discountCalculator(args);
    case 'profit_margin_calculator': return profitMargin(args);
    case 'salary_calculator': return salaryCalculator(args);
    case 'loan_calculator': return loanCalculator(args);
    case 'break_even_calculator': return breakEven(args);
    case 'markup_calculator': return markupCalculator(args);
    case 'area_calculator': return areaCalculator(args);
    case 'fuel_cost_calculator': return fuelCost(args);
    case 'inflation_calculator': return inflationCalculator(args);
    case 'calorie_calculator': return calorieCalculator(args);
    case 'mortgage_calculator': return mortgageCalculator(args);
    case 'investment_return_calculator': return investmentReturnCalculator(args);
    case 'retirement_calculator': return retirementCalculator(args);
    case 'electricity_cost_calculator': return electricityCostCalculator(args);
    case 'sales_tax_calculator': return salesTaxCalculator(args);
    case 'fraction_calculator': return fractionCalculator(args);
    case 'speed_calculator': return speedCalculator(args);
    default: return 'Unknown tool';
  }
}

function percentageCalculator(args: Record<string, unknown>): string {
  const { mode, x, y } = args as { mode: string; x: number; y: number };
  if (mode === 'of') {
    const result = (x / 100) * y;
    return `${x}% of ${y} = ${result.toFixed(4).replace(/\.?0+$/, '')}`;
  }
  if (mode === 'what_percent') {
    const result = (x / y) * 100;
    return `${x} is ${result.toFixed(4).replace(/\.?0+$/, '')}% of ${y}`;
  }
  if (mode === 'change') {
    const result = ((y - x) / Math.abs(x)) * 100;
    const dir = result >= 0 ? 'increase' : 'decrease';
    return `${x} → ${y} = ${Math.abs(result).toFixed(2)}% ${dir}`;
  }
  return 'Invalid mode';
}

function compoundInterest(args: Record<string, unknown>): string {
  const { principal, rate, years, compounds_per_year = 12, monthly_contribution = 0 } = args as {
    principal: number; rate: number; years: number; compounds_per_year?: number; monthly_contribution?: number;
  };
  const r = rate / 100;
  const n = compounds_per_year;
  const t = years;
  const pmt = monthly_contribution;

  let amount = principal * Math.pow(1 + r / n, n * t);
  if (pmt > 0) {
    const periodicRate = r / 12;
    const months = years * 12;
    amount += pmt * ((Math.pow(1 + periodicRate, months) - 1) / periodicRate);
  }

  const totalContributions = principal + pmt * years * 12;
  const interest = amount - totalContributions;

  return [
    `Principal: $${principal.toLocaleString()}`,
    `Rate: ${rate}% per year (compounded ${n}x/year)`,
    `Period: ${years} years`,
    pmt > 0 ? `Monthly contribution: $${pmt.toLocaleString()}` : null,
    ``,
    `Final amount: $${amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`,
    `Total contributions: $${totalContributions.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`,
    `Interest earned: $${interest.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`
  ].filter(Boolean).join('\n');
}

function bmiCalculator(args: Record<string, unknown>): string {
  let { weight, height, unit = 'metric' } = args as { weight: number; height: number; unit?: string };
  let bmi: number;
  if (unit === 'imperial') {
    bmi = (weight / (height * height)) * 703;
  } else {
    const heightM = height / 100;
    bmi = weight / (heightM * heightM);
  }
  let category: string;
  if (bmi < 18.5) category = 'Underweight';
  else if (bmi < 25) category = 'Normal weight';
  else if (bmi < 30) category = 'Overweight';
  else category = 'Obese';

  return `BMI: ${bmi.toFixed(1)}\nCategory: ${category}\n\nRanges: Underweight <18.5 | Normal 18.5–24.9 | Overweight 25–29.9 | Obese ≥30`;
}

function ageCalculator(args: Record<string, unknown>): string {
  const { birthdate, reference_date } = args as { birthdate: string; reference_date?: string };
  const birth = new Date(birthdate);
  const ref = reference_date ? new Date(reference_date) : new Date();
  ref.setHours(0, 0, 0, 0);

  let years = ref.getFullYear() - birth.getFullYear();
  let months = ref.getMonth() - birth.getMonth();
  let days = ref.getDate() - birth.getDate();

  if (days < 0) { months--; const prevMonth = new Date(ref.getFullYear(), ref.getMonth(), 0); days += prevMonth.getDate(); }
  if (months < 0) { years--; months += 12; }

  const nextBirthday = new Date(ref.getFullYear(), birth.getMonth(), birth.getDate());
  if (nextBirthday <= ref) nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);
  const daysUntilBirthday = Math.ceil((nextBirthday.getTime() - ref.getTime()) / 86400000);

  const totalDays = Math.floor((ref.getTime() - birth.getTime()) / 86400000);

  return [
    `Age: ${years} years, ${months} months, ${days} days`,
    `Total days lived: ${totalDays.toLocaleString()}`,
    `Next birthday in: ${daysUntilBirthday} days`
  ].join('\n');
}

function tipCalculator(args: Record<string, unknown>): string {
  const { bill, tip_percent = 18, people = 1 } = args as { bill: number; tip_percent?: number; people?: number };
  const tip = bill * (tip_percent / 100);
  const total = bill + tip;
  const perPerson = total / people;
  const tipPerPerson = tip / people;

  return [
    `Bill: $${bill.toFixed(2)}`,
    `Tip (${tip_percent}%): $${tip.toFixed(2)}`,
    `Total: $${total.toFixed(2)}`,
    people > 1 ? `\nSplit ${people} ways:` : null,
    people > 1 ? `Per person: $${perPerson.toFixed(2)} (tip: $${tipPerPerson.toFixed(2)})` : null
  ].filter(Boolean).join('\n');
}

function discountCalculator(args: Record<string, unknown>): string {
  const { original_price, discount, discount_type = 'percent' } = args as { original_price: number; discount: number; discount_type?: string };
  let discountAmount: number;
  let discountPercent: number;

  if (discount_type === 'percent') {
    discountAmount = original_price * (discount / 100);
    discountPercent = discount;
  } else {
    discountAmount = discount;
    discountPercent = (discount / original_price) * 100;
  }

  const finalPrice = original_price - discountAmount;
  return [
    `Original price: $${original_price.toFixed(2)}`,
    `Discount: ${discountPercent.toFixed(1)}% (-$${discountAmount.toFixed(2)})`,
    `Final price: $${finalPrice.toFixed(2)}`,
    `You save: $${discountAmount.toFixed(2)}`
  ].join('\n');
}

function profitMargin(args: Record<string, unknown>): string {
  const { cost, revenue } = args as { cost: number; revenue: number };
  const profit = revenue - cost;
  const margin = (profit / revenue) * 100;
  const markup = (profit / cost) * 100;

  return [
    `Cost: $${cost.toFixed(2)}`,
    `Revenue: $${revenue.toFixed(2)}`,
    `Gross profit: $${profit.toFixed(2)}`,
    `Profit margin: ${margin.toFixed(2)}%`,
    `Markup: ${markup.toFixed(2)}%`
  ].join('\n');
}

function salaryCalculator(args: Record<string, unknown>): string {
  const { amount, from_period, hours_per_week = 40, days_per_week = 5 } = args as {
    amount: number; from_period: string; hours_per_week?: number; days_per_week?: number;
  };

  const hoursPerYear = hours_per_week * 52;
  const daysPerYear = days_per_week * 52;

  let annual: number;
  switch (from_period) {
    case 'hourly': annual = amount * hoursPerYear; break;
    case 'daily': annual = amount * daysPerYear; break;
    case 'weekly': annual = amount * 52; break;
    case 'biweekly': annual = amount * 26; break;
    case 'monthly': annual = amount * 12; break;
    case 'annual': annual = amount; break;
    default: return 'Invalid period';
  }

  return [
    `Hourly: $${(annual / hoursPerYear).toFixed(2)}`,
    `Daily: $${(annual / daysPerYear).toFixed(2)}`,
    `Weekly: $${(annual / 52).toFixed(2)}`,
    `Bi-weekly: $${(annual / 26).toFixed(2)}`,
    `Monthly: $${(annual / 12).toFixed(2)}`,
    `Annual: $${annual.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
    `\nBased on ${hours_per_week}h/week, ${days_per_week} days/week`
  ].join('\n');
}

function loanCalculator(args: Record<string, unknown>): string {
  const { principal, annual_rate, term_months } = args as { principal: number; annual_rate: number; term_months: number };
  const monthlyRate = annual_rate / 100 / 12;
  const payment = principal * (monthlyRate * Math.pow(1 + monthlyRate, term_months)) / (Math.pow(1 + monthlyRate, term_months) - 1);
  const totalPaid = payment * term_months;
  const totalInterest = totalPaid - principal;

  return [
    `Loan amount: $${principal.toLocaleString()}`,
    `Interest rate: ${annual_rate}% per year`,
    `Term: ${term_months} months (${(term_months / 12).toFixed(1)} years)`,
    ``,
    `Monthly payment: $${payment.toFixed(2)}`,
    `Total paid: $${totalPaid.toFixed(2)}`,
    `Total interest: $${totalInterest.toFixed(2)}`,
    `Interest as % of loan: ${((totalInterest / principal) * 100).toFixed(1)}%`
  ].join('\n');
}

function breakEven(args: Record<string, unknown>): string {
  const { fixed_costs, variable_cost_per_unit, selling_price_per_unit } = args as {
    fixed_costs: number; variable_cost_per_unit: number; selling_price_per_unit: number;
  };
  const contributionMargin = selling_price_per_unit - variable_cost_per_unit;
  if (contributionMargin <= 0) return 'Selling price must be higher than variable cost per unit.';
  const breakEvenUnits = fixed_costs / contributionMargin;
  const breakEvenRevenue = breakEvenUnits * selling_price_per_unit;

  return [
    `Fixed costs: $${fixed_costs.toLocaleString()}`,
    `Variable cost/unit: $${variable_cost_per_unit}`,
    `Selling price/unit: $${selling_price_per_unit}`,
    `Contribution margin/unit: $${contributionMargin.toFixed(2)}`,
    ``,
    `Break-even: ${breakEvenUnits.toFixed(0)} units`,
    `Break-even revenue: $${breakEvenRevenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  ].join('\n');
}

function markupCalculator(args: Record<string, unknown>): string {
  const { mode, cost, markup_percent, selling_price } = args as {
    mode: string; cost: number; markup_percent?: number; selling_price?: number;
  };
  if (mode === 'price_from_markup') {
    if (markup_percent === undefined) return 'markup_percent required';
    const price = cost * (1 + markup_percent / 100);
    const margin = ((price - cost) / price) * 100;
    return `Cost: $${cost}\nMarkup: ${markup_percent}%\nSelling price: $${price.toFixed(2)}\nProfit margin: ${margin.toFixed(2)}%`;
  }
  if (mode === 'markup_from_price') {
    if (selling_price === undefined) return 'selling_price required';
    const markup = ((selling_price - cost) / cost) * 100;
    const margin = ((selling_price - cost) / selling_price) * 100;
    return `Cost: $${cost}\nSelling price: $${selling_price}\nMarkup: ${markup.toFixed(2)}%\nProfit margin: ${margin.toFixed(2)}%`;
  }
  return 'Invalid mode';
}

function areaCalculator(args: Record<string, unknown>): string {
  const { shape, dimensions } = args as { shape: string; dimensions: Record<string, number> };
  let area: number;
  let formula: string;

  switch (shape) {
    case 'rectangle': area = dimensions.width * dimensions.height; formula = `${dimensions.width} × ${dimensions.height}`; break;
    case 'square': area = dimensions.side ** 2; formula = `${dimensions.side}²`; break;
    case 'circle': area = Math.PI * dimensions.radius ** 2; formula = `π × ${dimensions.radius}²`; break;
    case 'triangle': area = 0.5 * dimensions.base * dimensions.height; formula = `½ × ${dimensions.base} × ${dimensions.height}`; break;
    case 'trapezoid': area = 0.5 * (dimensions.a + dimensions.b) * dimensions.height; formula = `½ × (${dimensions.a} + ${dimensions.b}) × ${dimensions.height}`; break;
    case 'ellipse': area = Math.PI * dimensions.a * dimensions.b; formula = `π × ${dimensions.a} × ${dimensions.b}`; break;
    case 'parallelogram': area = dimensions.base * dimensions.height; formula = `${dimensions.base} × ${dimensions.height}`; break;
    case 'rhombus': area = 0.5 * dimensions.d1 * dimensions.d2; formula = `½ × ${dimensions.d1} × ${dimensions.d2}`; break;
    default: return 'Unknown shape';
  }

  return `Shape: ${shape}\nFormula: ${formula}\nArea: ${area.toFixed(4).replace(/\.?0+$/, '')} square units`;
}

function fuelCost(args: Record<string, unknown>): string {
  const { distance, fuel_efficiency, fuel_price, unit = 'metric' } = args as {
    distance: number; fuel_efficiency: number; fuel_price: number; unit?: string;
  };

  let totalFuel: number;
  let costPerDist: number;

  if (unit === 'metric') {
    totalFuel = (distance / 100) * fuel_efficiency;
    const totalCost = totalFuel * fuel_price;
    costPerDist = totalCost / distance;
    return [
      `Distance: ${distance} km`,
      `Fuel efficiency: ${fuel_efficiency} L/100km`,
      `Fuel price: $${fuel_price}/L`,
      ``,
      `Fuel needed: ${totalFuel.toFixed(2)} L`,
      `Total cost: $${(totalFuel * fuel_price).toFixed(2)}`,
      `Cost per km: $${costPerDist.toFixed(3)}`
    ].join('\n');
  } else {
    totalFuel = distance / fuel_efficiency;
    const totalCost = totalFuel * fuel_price;
    costPerDist = totalCost / distance;
    return [
      `Distance: ${distance} miles`,
      `Fuel efficiency: ${fuel_efficiency} MPG`,
      `Fuel price: $${fuel_price}/gallon`,
      ``,
      `Fuel needed: ${totalFuel.toFixed(2)} gallons`,
      `Total cost: $${totalCost.toFixed(2)}`,
      `Cost per mile: $${costPerDist.toFixed(3)}`
    ].join('\n');
  }
}

// US CPI data (annual averages) — static, no network call needed
const CPI_DATA: Record<number, number> = {
  1913:9.9,1914:10.0,1915:10.1,1916:10.9,1917:12.8,1918:15.1,1919:17.3,
  1920:20.0,1921:17.9,1922:16.8,1923:17.1,1924:17.1,1925:17.5,1926:17.7,
  1927:17.4,1928:17.1,1929:17.1,1930:16.7,1931:15.2,1932:13.7,1933:13.0,
  1934:13.4,1935:13.7,1936:13.9,1937:14.4,1938:14.1,1939:13.9,1940:14.0,
  1941:14.7,1942:16.3,1943:17.3,1944:17.6,1945:18.0,1946:19.5,1947:22.3,
  1948:24.1,1949:23.8,1950:24.1,1951:26.0,1952:26.5,1953:26.7,1954:26.9,
  1955:26.8,1956:27.2,1957:28.1,1958:28.9,1959:29.1,1960:29.6,1961:29.9,
  1962:30.2,1963:30.6,1964:31.0,1965:31.5,1966:32.4,1967:33.4,1968:34.8,
  1969:36.7,1970:38.8,1971:40.5,1972:41.8,1973:44.4,1974:49.3,1975:53.8,
  1976:56.9,1977:60.6,1978:65.2,1979:72.6,1980:82.4,1981:90.9,1982:96.5,
  1983:99.6,1984:103.9,1985:107.6,1986:109.6,1987:113.6,1988:118.3,1989:124.0,
  1990:130.7,1991:136.2,1992:140.3,1993:144.5,1994:148.2,1995:152.4,1996:156.9,
  1997:160.5,1998:163.0,1999:166.6,2000:172.2,2001:177.1,2002:179.9,2003:184.0,
  2004:188.9,2005:195.3,2006:201.6,2007:207.3,2008:215.3,2009:214.5,2010:218.1,
  2011:224.9,2012:229.6,2013:233.0,2014:236.7,2015:237.0,2016:240.0,2017:245.1,
  2018:251.1,2019:255.7,2020:258.8,2021:270.9,2022:292.7,2023:304.7,2024:314.2
};

function inflationCalculator(args: Record<string, unknown>): string {
  const { amount, from_year, to_year } = args as { amount: number; from_year: number; to_year: number };
  const fromCPI = CPI_DATA[from_year];
  const toCPI = CPI_DATA[to_year];
  if (!fromCPI) return `No CPI data available for ${from_year}. Supported range: 1913–2024.`;
  if (!toCPI) return `No CPI data available for ${to_year}. Supported range: 1913–2024.`;

  const adjusted = amount * (toCPI / fromCPI);
  const change = ((adjusted - amount) / amount) * 100;
  const dir = change >= 0 ? 'inflation' : 'deflation';

  return [
    `$${amount.toFixed(2)} in ${from_year}`,
    `= $${adjusted.toFixed(2)} in ${to_year}`,
    ``,
    `Cumulative ${dir}: ${Math.abs(change).toFixed(1)}%`,
    `CPI ${from_year}: ${fromCPI} | CPI ${to_year}: ${toCPI}`,
    `Source: US Bureau of Labor Statistics (embedded, no network call)`
  ].join('\n');
}

function calorieCalculator(args: Record<string, unknown>): string {
  const { age, gender, weight_kg, height_cm, activity_level, goal = 'maintain' } = args as {
    age: number; gender: string; weight_kg: number; height_cm: number; activity_level: string; goal?: string;
  };

  // Mifflin-St Jeor BMR
  let bmr: number;
  if (gender === 'male') {
    bmr = 10 * weight_kg + 6.25 * height_cm - 5 * age + 5;
  } else {
    bmr = 10 * weight_kg + 6.25 * height_cm - 5 * age - 161;
  }

  const multipliers: Record<string, number> = {
    sedentary: 1.2, light: 1.375, moderate: 1.55, active: 1.725, very_active: 1.9
  };
  const tdee = bmr * (multipliers[activity_level] || 1.55);

  const goalCalories: Record<string, number> = {
    lose: tdee - 500,
    maintain: tdee,
    gain: tdee + 500
  };

  return [
    `BMR (base metabolic rate): ${bmr.toFixed(0)} kcal/day`,
    `TDEE (total daily energy expenditure): ${tdee.toFixed(0)} kcal/day`,
    ``,
    `For ${goal === 'lose' ? 'weight loss' : goal === 'gain' ? 'weight gain' : 'maintenance'}: ${goalCalories[goal].toFixed(0)} kcal/day`,
    goal !== 'maintain' ? `(${goal === 'lose' ? '-' : '+'}500 kcal deficit/surplus = ~0.5 kg/week)` : null,
    ``,
    `Estimated macros (${goalCalories[goal].toFixed(0)} kcal):`,
    `Protein: ${(weight_kg * 2).toFixed(0)}g | Carbs: ${((goalCalories[goal] * 0.45) / 4).toFixed(0)}g | Fat: ${((goalCalories[goal] * 0.25) / 9).toFixed(0)}g`
  ].filter(Boolean).join('\n');
}

// ── New calculator implementations ────────────────────────────────────────────

function fmt(n: number): string {
  return n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function mortgageCalculator(args: Record<string, unknown>): string {
  const {
    home_price,
    down_payment,
    annual_rate,
    term_years = 30,
    property_tax_annual,
    insurance_annual
  } = args as {
    home_price: number;
    down_payment: number;
    annual_rate: number;
    term_years?: number;
    property_tax_annual?: number;
    insurance_annual?: number;
  };

  const loanAmount = home_price - down_payment;
  const downPct = (down_payment / home_price) * 100;
  const monthlyRate = annual_rate / 100 / 12;
  const n = term_years * 12;

  // M = P × [r(1+r)^n] / [(1+r)^n - 1]
  const calcPayment = (principal: number, months: number): number => {
    if (monthlyRate === 0) return principal / months;
    return principal * (monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
  };

  const monthlyPI = calcPayment(loanAmount, n);
  const totalPaid = monthlyPI * n;
  const totalInterest = totalPaid - loanAmount;

  const monthlyTax = property_tax_annual ? property_tax_annual / 12 : 0;
  const monthlyIns = insurance_annual ? insurance_annual / 12 : 0;
  const monthlyPITI = monthlyPI + monthlyTax + monthlyIns;

  const lines: string[] = [
    `Home price: $${fmt(home_price)}`,
    `Down payment: $${fmt(down_payment)} (${downPct.toFixed(1)}%)`,
    `Loan amount: $${fmt(loanAmount)}`,
    `Interest rate: ${annual_rate}% | Term: ${term_years} years`,
    ``,
    `Monthly principal & interest: $${fmt(monthlyPI)}`,
  ];

  if (monthlyTax > 0) lines.push(`Monthly property tax: $${fmt(monthlyTax)}`);
  if (monthlyIns > 0) lines.push(`Monthly insurance: $${fmt(monthlyIns)}`);
  if (monthlyTax > 0 || monthlyIns > 0) lines.push(`Total monthly payment (PITI): $${fmt(monthlyPITI)}`);

  lines.push(``, `Total paid over ${term_years} years: $${fmt(totalPaid)}`);
  lines.push(`Total interest paid: $${fmt(totalInterest)}`);
  lines.push(`Effective interest rate: ${((totalInterest / loanAmount) * 100).toFixed(1)}% of loan`);

  // 15 vs 30 comparison only when term is 30
  if (term_years === 30) {
    const payment15 = calcPayment(loanAmount, 180);
    const totalPaid15 = payment15 * 180;
    const interest15 = totalPaid15 - loanAmount;
    lines.push(``);
    lines.push(`── 15 vs 30-year comparison ──`);
    lines.push(`15-year monthly payment: $${fmt(payment15)} (+$${fmt(payment15 - monthlyPI)}/mo)`);
    lines.push(`15-year total interest: $${fmt(interest15)}`);
    lines.push(`30-year total interest: $${fmt(totalInterest)}`);
    lines.push(`Interest saved going 15-year: $${fmt(totalInterest - interest15)}`);
  }

  return lines.join('\n');
}

function investmentReturnCalculator(args: Record<string, unknown>): string {
  const {
    initial_investment,
    years,
    final_value,
    annual_return_rate,
    monthly_contribution = 0
  } = args as {
    initial_investment: number;
    years: number;
    final_value?: number;
    annual_return_rate?: number;
    monthly_contribution?: number;
  };

  const pmt = monthly_contribution ?? 0;

  if (final_value !== undefined) {
    // Calculate ROI and CAGR from known final value
    const totalInvested = initial_investment + pmt * years * 12;
    const roi = ((final_value - totalInvested) / totalInvested) * 100;
    const cagr = (Math.pow(final_value / initial_investment, 1 / years) - 1) * 100;
    const doublingTime = 72 / cagr;

    return [
      `Initial investment: $${fmt(initial_investment)}`,
      pmt > 0 ? `Monthly contributions: $${fmt(pmt)}` : null,
      `Final value: $${fmt(final_value)}`,
      `Period: ${years} years`,
      ``,
      `Total invested: $${fmt(totalInvested)}`,
      `Total return: $${fmt(final_value - totalInvested)}`,
      `ROI: ${roi.toFixed(2)}%`,
      `CAGR: ${cagr.toFixed(2)}% per year`,
      `Doubling time (Rule of 72): ${doublingTime.toFixed(1)} years`
    ].filter(Boolean).join('\n');
  }

  if (annual_return_rate !== undefined) {
    // Project future value
    const r = annual_return_rate / 100;
    const months = years * 12;
    const monthlyRate = r / 12;

    // FV of lump sum
    let fv = initial_investment * Math.pow(1 + r, years);

    // FV of monthly contributions: PMT × ((1+r)^n - 1) / r  (using monthly rate)
    if (pmt > 0 && monthlyRate > 0) {
      fv += pmt * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
    } else if (pmt > 0) {
      fv += pmt * months;
    }

    const totalInvested = initial_investment + pmt * months;
    const totalReturn = fv - totalInvested;
    const roi = (totalReturn / totalInvested) * 100;
    const cagr = (Math.pow(fv / initial_investment, 1 / years) - 1) * 100;
    const doublingTime = annual_return_rate > 0 ? 72 / annual_return_rate : Infinity;

    return [
      `Initial investment: $${fmt(initial_investment)}`,
      pmt > 0 ? `Monthly contributions: $${fmt(pmt)}` : null,
      `Annual return rate: ${annual_return_rate}%`,
      `Period: ${years} years`,
      ``,
      `Projected final value: $${fmt(fv)}`,
      `Total invested: $${fmt(totalInvested)}`,
      `Total return: $${fmt(totalReturn)}`,
      `ROI: ${roi.toFixed(2)}%`,
      `CAGR: ${cagr.toFixed(2)}% per year`,
      `Doubling time (Rule of 72): ${isFinite(doublingTime) ? doublingTime.toFixed(1) + ' years' : 'N/A'}`
    ].filter(Boolean).join('\n');
  }

  return 'Provide either final_value (to calculate ROI/CAGR) or annual_return_rate (to project future value).';
}

function retirementCalculator(args: Record<string, unknown>): string {
  const {
    current_age,
    retirement_age,
    current_savings,
    monthly_contribution,
    expected_return = 7,
    inflation_rate = 2.5
  } = args as {
    current_age: number;
    retirement_age: number;
    current_savings: number;
    monthly_contribution: number;
    expected_return?: number;
    inflation_rate?: number;
  };

  const yearsToRetirement = retirement_age - current_age;
  if (yearsToRetirement <= 0) return 'Retirement age must be greater than current age.';

  const months = yearsToRetirement * 12;
  const nominalMonthlyRate = expected_return / 100 / 12;

  // FV of current savings (lump sum)
  const fvLump = current_savings * Math.pow(1 + expected_return / 100, yearsToRetirement);

  // FV of monthly contributions
  let fvContribs = 0;
  if (nominalMonthlyRate > 0) {
    fvContribs = monthly_contribution * ((Math.pow(1 + nominalMonthlyRate, months) - 1) / nominalMonthlyRate);
  } else {
    fvContribs = monthly_contribution * months;
  }

  const nominalTotal = fvLump + fvContribs;

  // Real return adjustment
  const realReturn = ((1 + expected_return / 100) / (1 + inflation_rate / 100) - 1) * 100;
  const realMonthlyRate = realReturn / 100 / 12;

  const fvLumpReal = current_savings * Math.pow(1 + realReturn / 100, yearsToRetirement);
  let fvContribsReal = 0;
  if (realMonthlyRate > 0) {
    fvContribsReal = monthly_contribution * ((Math.pow(1 + realMonthlyRate, months) - 1) / realMonthlyRate);
  } else {
    fvContribsReal = monthly_contribution * months;
  }
  const inflationAdjustedTotal = fvLumpReal + fvContribsReal;

  const totalContributions = current_savings + monthly_contribution * months;
  const totalGrowth = nominalTotal - totalContributions;

  // 4% rule: annual withdrawal = savings × 0.04; monthly = annual / 12
  const annualIncome4pct = nominalTotal * 0.04;
  const monthlyIncome4pct = annualIncome4pct / 12;

  // Draw-down over 25 years at same nominal rate
  const drawdownMonths = 25 * 12;
  let monthlyDrawdown = 0;
  if (nominalMonthlyRate > 0) {
    monthlyDrawdown = nominalTotal * (nominalMonthlyRate * Math.pow(1 + nominalMonthlyRate, drawdownMonths)) /
      (Math.pow(1 + nominalMonthlyRate, drawdownMonths) - 1);
  } else {
    monthlyDrawdown = nominalTotal / drawdownMonths;
  }

  return [
    `Current age: ${current_age} | Retirement age: ${retirement_age}`,
    `Years to retirement: ${yearsToRetirement}`,
    `Current savings: $${fmt(current_savings)}`,
    `Monthly contribution: $${fmt(monthly_contribution)}`,
    `Expected return: ${expected_return}% nominal | Inflation: ${inflation_rate}%`,
    `Real return: ${realReturn.toFixed(2)}%`,
    ``,
    `Projected savings at retirement (nominal): $${fmt(nominalTotal)}`,
    `Inflation-adjusted value (today's dollars): $${fmt(inflationAdjustedTotal)}`,
    ``,
    `Total contributions: $${fmt(totalContributions)}`,
    `Total growth: $${fmt(totalGrowth)}`,
    ``,
    `Retirement income (4% rule): $${fmt(monthlyIncome4pct)}/month ($${fmt(annualIncome4pct)}/year)`,
    `Monthly income if drawn down over 25 years: $${fmt(monthlyDrawdown)}/month`
  ].join('\n');
}

function electricityCostCalculator(args: Record<string, unknown>): string {
  const {
    watts,
    hours_per_day,
    days = 30,
    cost_per_kwh = 0.12
  } = args as {
    watts: number;
    hours_per_day: number;
    days?: number;
    cost_per_kwh?: number;
  };

  const dailyKwh = (watts * hours_per_day) / 1000;
  const weeklyKwh = dailyKwh * 7;
  const monthlyKwh = dailyKwh * 30;
  const annualKwh = dailyKwh * 365;

  const dailyCost = dailyKwh * cost_per_kwh;
  const weeklyCost = weeklyKwh * cost_per_kwh;
  const periodKwh = dailyKwh * days;
  const periodCost = periodKwh * cost_per_kwh;
  const annualCost = annualKwh * cost_per_kwh;
  const costPerHour = (watts / 1000) * cost_per_kwh;

  return [
    `Device: ${watts}W running ${hours_per_day}h/day`,
    `Rate: $${cost_per_kwh}/kWh`,
    ``,
    `Cost per hour: $${costPerHour.toFixed(4)}`,
    ``,
    `Daily:   ${dailyKwh.toFixed(3)} kWh  →  $${dailyCost.toFixed(4)}`,
    `Weekly:  ${weeklyKwh.toFixed(3)} kWh  →  $${weeklyCost.toFixed(2)}`,
    `Monthly (30d): ${monthlyKwh.toFixed(3)} kWh  →  $${(monthlyKwh * cost_per_kwh).toFixed(2)}`,
    days !== 30 ? `Custom (${days}d): ${periodKwh.toFixed(3)} kWh  →  $${periodCost.toFixed(2)}` : null,
    `Annual:  ${annualKwh.toFixed(1)} kWh  →  $${annualCost.toFixed(2)}`
  ].filter(Boolean).join('\n');
}

function salesTaxCalculator(args: Record<string, unknown>): string {
  const {
    price,
    tax_rate,
    mode = 'add'
  } = args as { price: number; tax_rate: number; mode?: string };

  if (mode === 'add') {
    const taxAmount = price * (tax_rate / 100);
    const total = price + taxAmount;
    return [
      `Pre-tax price: $${fmt(price)}`,
      `Tax rate: ${tax_rate}%`,
      `Tax amount: $${fmt(taxAmount)}`,
      `Total (with tax): $${fmt(total)}`
    ].join('\n');
  }

  if (mode === 'remove') {
    const preTax = price / (1 + tax_rate / 100);
    const taxAmount = price - preTax;
    const effectiveRate = (taxAmount / preTax) * 100;
    return [
      `Tax-inclusive price: $${fmt(price)}`,
      `Tax rate applied: ${tax_rate}%`,
      `Pre-tax amount: $${fmt(preTax)}`,
      `Tax amount: $${fmt(taxAmount)}`,
      `Effective tax rate on pre-tax: ${effectiveRate.toFixed(4)}%`
    ].join('\n');
  }

  return 'Invalid mode. Use "add" or "remove".';
}

function gcd(a: number, b: number): number {
  a = Math.abs(Math.round(a));
  b = Math.abs(Math.round(b));
  while (b !== 0) {
    const t = b;
    b = a % b;
    a = t;
  }
  return a;
}

function fractionCalculator(args: Record<string, unknown>): string {
  const {
    numerator1,
    denominator1,
    operation,
    numerator2,
    denominator2
  } = args as {
    numerator1: number;
    denominator1: number;
    operation: string;
    numerator2: number;
    denominator2: number;
  };

  if (denominator1 === 0 || denominator2 === 0) return 'Denominator cannot be zero.';
  if (operation === 'divide' && numerator2 === 0) return 'Cannot divide by zero fraction.';

  let resNum: number;
  let resDen: number;
  let opSymbol: string;

  switch (operation) {
    case 'add':
      resNum = numerator1 * denominator2 + numerator2 * denominator1;
      resDen = denominator1 * denominator2;
      opSymbol = '+';
      break;
    case 'subtract':
      resNum = numerator1 * denominator2 - numerator2 * denominator1;
      resDen = denominator1 * denominator2;
      opSymbol = '−';
      break;
    case 'multiply':
      resNum = numerator1 * numerator2;
      resDen = denominator1 * denominator2;
      opSymbol = '×';
      break;
    case 'divide':
      resNum = numerator1 * denominator2;
      resDen = denominator1 * numerator2;
      opSymbol = '÷';
      break;
    default:
      return 'Invalid operation. Use add, subtract, multiply, or divide.';
  }

  // Reduce to lowest terms
  const sign = resDen < 0 ? -1 : 1;
  resNum *= sign;
  resDen *= sign;
  const divisor = gcd(Math.abs(resNum), Math.abs(resDen));
  const simplifiedNum = resNum / divisor;
  const simplifiedDen = resDen / divisor;

  const decimal = simplifiedNum / simplifiedDen;

  // Mixed number form
  let mixedStr = '';
  if (Math.abs(simplifiedNum) > Math.abs(simplifiedDen) && simplifiedDen !== 1) {
    const wholePart = Math.trunc(simplifiedNum / simplifiedDen);
    const remainder = Math.abs(simplifiedNum % simplifiedDen);
    if (remainder === 0) {
      mixedStr = `${wholePart}`;
    } else {
      mixedStr = `${wholePart} ${remainder}/${simplifiedDen}`;
    }
  } else {
    mixedStr = simplifiedDen === 1 ? `${simplifiedNum}` : `${simplifiedNum}/${simplifiedDen}`;
  }

  const fractionStr = simplifiedDen === 1 ? `${simplifiedNum}` : `${simplifiedNum}/${simplifiedDen}`;
  const equation = `${numerator1}/${denominator1} ${opSymbol} ${numerator2}/${denominator2}`;

  return [
    `Equation: ${equation}`,
    `Result (fraction): ${fractionStr}`,
    `Result (decimal): ${decimal.toFixed(6).replace(/\.?0+$/, '')}`,
    `Result (mixed number): ${mixedStr}`
  ].join('\n');
}

function speedCalculator(args: Record<string, unknown>): string {
  const { mode, distance_km, time_seconds, speed_kmh } = args as {
    mode: string;
    distance_km?: number;
    time_seconds?: number;
    speed_kmh?: number;
  };

  const KM_TO_MILES = 0.621371;

  function formatTime(seconds: number): string {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.round(seconds % 60);
    const parts: string[] = [];
    if (h > 0) parts.push(`${h}h`);
    if (m > 0) parts.push(`${m}m`);
    if (s > 0 || parts.length === 0) parts.push(`${s}s`);
    return parts.join(' ');
  }

  if (mode === 'speed') {
    if (distance_km === undefined || time_seconds === undefined) {
      return 'For mode "speed", provide distance_km and time_seconds.';
    }
    const speedKmh = distance_km / (time_seconds / 3600);
    const speedMph = speedKmh * KM_TO_MILES;
    const distMiles = distance_km * KM_TO_MILES;
    return [
      `Distance: ${distance_km} km (${distMiles.toFixed(2)} miles)`,
      `Time: ${formatTime(time_seconds)} (${time_seconds.toLocaleString()} seconds)`,
      ``,
      `Speed: ${speedKmh.toFixed(2)} km/h`,
      `Speed: ${speedMph.toFixed(2)} mph`,
      `Speed: ${(speedKmh / 3.6).toFixed(2)} m/s`
    ].join('\n');
  }

  if (mode === 'time') {
    if (distance_km === undefined || speed_kmh === undefined) {
      return 'For mode "time", provide distance_km and speed_kmh.';
    }
    const timeHours = distance_km / speed_kmh;
    const timeSecs = timeHours * 3600;
    const distMiles = distance_km * KM_TO_MILES;
    const speedMph = speed_kmh * KM_TO_MILES;
    return [
      `Distance: ${distance_km} km (${distMiles.toFixed(2)} miles)`,
      `Speed: ${speed_kmh} km/h (${speedMph.toFixed(2)} mph)`,
      ``,
      `Time: ${formatTime(timeSecs)}`,
      `Time: ${timeHours.toFixed(4)} hours`,
      `Time: ${(timeHours * 60).toFixed(2)} minutes`,
      `Time: ${timeSecs.toFixed(0)} seconds`
    ].join('\n');
  }

  if (mode === 'distance') {
    if (speed_kmh === undefined || time_seconds === undefined) {
      return 'For mode "distance", provide speed_kmh and time_seconds.';
    }
    const distKm = speed_kmh * (time_seconds / 3600);
    const distMiles = distKm * KM_TO_MILES;
    const speedMph = speed_kmh * KM_TO_MILES;
    return [
      `Speed: ${speed_kmh} km/h (${speedMph.toFixed(2)} mph)`,
      `Time: ${formatTime(time_seconds)} (${time_seconds.toLocaleString()} seconds)`,
      ``,
      `Distance: ${distKm.toFixed(4)} km`,
      `Distance: ${distMiles.toFixed(4)} miles`,
      `Distance: ${(distKm * 1000).toFixed(1)} meters`
    ].join('\n');
  }

  return 'Invalid mode. Use "speed", "time", or "distance".';
}
