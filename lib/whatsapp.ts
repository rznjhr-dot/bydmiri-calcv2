export interface WhatsAppData {
  model: string;
  price: string;
  deposit: string;
  loan: string;
  tenure: string;
  interest: string;
  monthly: string;
}

const PHONE = "601131933930";

function buildMessage(data: WhatsAppData, intent: "enquiry" | "booking"): string {
  const greeting = intent === "booking"
    ? `Saya nak place booking untuk BYD ${data.model}!`
    : `Saya berminat dengan BYD ${data.model}.`;

  const closing = intent === "booking"
    ? "Boleh bantu saya dengan proses booking? Terima kasih!"
    : "Boleh bantu saya dengan quotation rasmi?";

  return [
    "Hi Ridzuan,",
    "",
    greeting,
    "",
    `Model: ${data.model}`,
    `Price: RM${data.price}`,
    `Deposit: RM${data.deposit}`,
    `Loan: RM${data.loan}`,
    `Tenure: ${data.tenure} Years`,
    `Interest: ${data.interest}%`,
    `Monthly: RM${data.monthly}`,
    "",
    closing,
  ].join("\n");
}

function waUrl(phone: string, text: string): string {
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}

export function generateWhatsAppUrl(data: WhatsAppData): string {
  return waUrl(PHONE, buildMessage(data, "enquiry"));
}

export function generateWhatsAppBookingUrl(data: WhatsAppData): string {
  return waUrl(PHONE, buildMessage(data, "booking"));
}
