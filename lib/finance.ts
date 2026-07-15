export interface FinanceInput {
  otr: number;
  rebate: number;
  rebateEnabled: boolean;
  cspRebate: number;
  cspEnabled: boolean;
  depositPercent: number;
  customDeposit: number | null;
  tenure: number;
  interestRate: number;
}

export interface FinanceResult {
  effectivePrice: number;
  rebateAmount: number;
  cspAmount: number;
  depositAmount: number;
  loanAmount: number;
  totalInterest: number;
  totalRepayment: number;
  monthly: number;
  daily: number;
}

export function calculateFinance(input: FinanceInput): FinanceResult {
  const rebateAmount = input.rebateEnabled ? input.rebate : 0;
  const cspAmount = input.cspEnabled ? input.cspRebate : 0;
  const effectivePrice = input.otr - rebateAmount - cspAmount;

  const depositAmount =
    input.customDeposit !== null && input.customDeposit > 0
      ? Math.min(input.customDeposit, effectivePrice)
      : effectivePrice * (input.depositPercent / 100);

  const loanAmount = effectivePrice - depositAmount;

  const totalInterest =
    loanAmount * (input.interestRate / 100) * input.tenure;

  const totalRepayment = loanAmount + totalInterest;

  const monthly =
    input.tenure > 0 ? totalRepayment / (input.tenure * 12) : 0;

  const daily = monthly / 30;

  return {
    effectivePrice,
    rebateAmount,
    cspAmount,
    depositAmount,
    loanAmount,
    totalInterest,
    totalRepayment,
    monthly,
    daily,
  };
}

export function fmt(n: number): string {
  return Math.round(n).toLocaleString("en-MY");
}

export function fmtDec(n: number): string {
  return n.toLocaleString("en-MY", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}



const CARD_LOAN_PCT = 0.9;       // 90% loan-to-value for card estimate
const CARD_INTEREST_RATE = 0.023; // 2.3% p.a. flat rate for card estimate
const CARD_TENURE = 9;            // 9 years for card estimate
const MONTHS_PER_YEAR = 12;

/** Monthly payment used on vehicle cards: (OTR - rebate) × 90% loan × 2.3% flat × 9 years */
export function calcCardMonthly(otr: number, rebate: number): number {
  const loanAmount = (otr - rebate) * CARD_LOAN_PCT;
  const totalRepayment = loanAmount + loanAmount * CARD_INTEREST_RATE * CARD_TENURE;
  return totalRepayment / (CARD_TENURE * MONTHS_PER_YEAR);
}

/** Monthly payment for 0% down (full loan): (OTR - rebate) × 100% loan × 2.3% flat × 9 years */
export function calcFullLoanMonthly(otr: number, rebate: number): number {
  const loanAmount = otr - rebate;
  const totalRepayment = loanAmount + loanAmount * CARD_INTEREST_RATE * CARD_TENURE;
  return totalRepayment / (CARD_TENURE * MONTHS_PER_YEAR);
}
