export interface WhatsAppData {
  model: string;
  price: string;
  deposit: string;
  loan: string;
  tenure: string;
  interest: string;
  monthly: string;
}

export function generateWhatsAppUrl(data: WhatsAppData): string {
  const msg = [
    "Hi Ridzuan,",
    "",
    "Saya berminat dengan BYD " + data.model + ".",
    "",
    "Model: " + data.model,
    "Price: RM" + data.price,
    "Deposit: RM" + data.deposit,
    "Loan: RM" + data.loan,
    "Tenure: " + data.tenure + " Years",
    "Interest: " + data.interest + "%",
    "Monthly: RM" + data.monthly,
    "",
    "Boleh bantu saya dengan quotation rasmi?",
  ].join("\n");

  return "https://wa.me/601131933930?text=" + encodeURIComponent(msg);
}

export function generateWhatsAppBookingUrl(data: WhatsAppData): string {
  const msg = [
    "Hi Ridzuan,",
    "",
    "Saya nak place booking untuk BYD " + data.model + "!",
    "",
    "Model: " + data.model,
    "Price: RM" + data.price,
    "Deposit: RM" + data.deposit,
    "Loan: RM" + data.loan,
    "Tenure: " + data.tenure + " Years",
    "Interest: " + data.interest + "%",
    "Monthly: RM" + data.monthly,
    "",
    "Boleh bantu saya dengan proses booking? Terima kasih!",
  ].join("\n");

  return "https://wa.me/601131933930?text=" + encodeURIComponent(msg);
}
