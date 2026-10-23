import { WHATSAPP_NUMBER } from "@/lib/site";

export interface WhatsAppData {
  model: string;
  price: string;
  deposit: string;
  loan: string;
  tenure: string;
  interest: string;
  monthly: string;
}

export function generateWhatsAppBookingUrl(data: WhatsAppData): string {
  const message = [
    "Hi Ridzuan,",
    "",
    `Saya nak place booking untuk BYD ${data.model}!`,
    "",
    `Model: ${data.model}`,
    `Price: RM${data.price}`,
    `Deposit: RM${data.deposit}`,
    `Loan: RM${data.loan}`,
    `Tenure: ${data.tenure} Years`,
    `Interest: ${data.interest}%`,
    `Monthly: RM${data.monthly}`,
    "",
    "Boleh bantu saya dengan proses booking? Terima kasih!",
  ].join("\n");

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
