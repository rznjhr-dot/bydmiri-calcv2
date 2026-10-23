/** Single source of truth for contact details and WhatsApp deep links. */

export const PHONE_DISPLAY = "011 3193 3930";
export const PHONE_E164 = "+601131933930";
export const WHATSAPP_NUMBER = "601131933930";

export const SHOWROOM_ADDRESS = "Lot 1829, Jalan Krokop Utama, 98000 Miri, Sarawak";

export function waLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const WHATSAPP_URL = waLink(
  "Hi Ridzuan, I'm interested in a BYD in Miri. Could you help me?"
);

export const TEST_DRIVE_WHATSAPP_URL = waLink(
  "Hi Ridzuan, I'd like to book a BYD test drive in Miri. Could you help me?"
);
