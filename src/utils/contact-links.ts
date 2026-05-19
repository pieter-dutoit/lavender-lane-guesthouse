export function getTelephoneHref(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

export function getEmailHref(email: string): string {
  return `mailto:${email}`;
}
