export type LatLng = {
  lat: number;
  lng: number;
};

const EARTH_RADIUS_KM = 6371;

function toRadians(value: number): number {
  return (value * Math.PI) / 180;
}

export function haversineKm(a: LatLng, b: LatLng): number {
  const dLat = toRadians(b.lat - a.lat);
  const dLng = toRadians(b.lng - a.lng);

  const aa =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(a.lat)) * Math.cos(toRadians(b.lat)) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(aa), Math.sqrt(1 - aa));
  return EARTH_RADIUS_KM * c;
}

export function sanitizePhoneNumber(raw: string): string {
  return raw.replace(/[^\d]/g, "").slice(-10);
}

export function isValidTenDigitPhone(phoneNumber: string): boolean {
  return /^\d{10}$/.test(phoneNumber);
}

export function randomOtpCode(): string {
  const min = 1000;
  const max = 9999;
  const code = Math.floor(Math.random() * (max - min + 1)) + min;
  return String(code);
}

export function normalizeSkill(value: string): string {
  return value.trim().toLowerCase();
}

export function formatWhatsAppPhone(phoneNumber: string): string {
  if (phoneNumber.length === 10) {
    return `91${phoneNumber}`;
  }
  return phoneNumber;
}

export function createWhatsAppLink(phoneNumber: string, message: string): string {
  const waNumber = formatWhatsAppPhone(phoneNumber);
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${waNumber}?text=${encoded}`;
}
