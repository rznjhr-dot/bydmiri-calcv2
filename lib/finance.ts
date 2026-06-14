export interface FinanceInput {
  otr: number;
  rebate: number;
  rebateEnabled: boolean;
  depositPercent: number;
  customDeposit: number | null;
  tenure: number;
  interestRate: number;
}

export interface FinanceResult {
  effectivePrice: number;
  rebateAmount: number;
  depositAmount: number;
  loanAmount: number;
  totalInterest: number;
  totalRepayment: number;
  monthly: number;
  daily: number;
}

export function calculateFinance(input: FinanceInput): FinanceResult {
  const effectivePrice = input.rebateEnabled
    ? input.otr - input.rebate
    : input.otr;

  const rebateAmount = input.rebateEnabled ? input.rebate : 0;

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

export function rm(n: number): string {
  return "RM" + fmt(n);
}

export function rmDec(n: number): string {
  return "RM" + fmtDec(n);
}
