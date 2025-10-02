
export function formatCEP(input: string): string {
  const digits = input.replace(/\D/g, "").slice(0, 8);
  if (digits.length <= 2) return digits;
  if (digits.length <= 5) return digits.slice(0,2) + "." + digits.slice(2);
  if (digits.length <= 8) return digits.slice(0,2) + "." + digits.slice(2,5) + "-" + digits.slice(5);
  return digits.slice(0,2) + "." + digits.slice(2,5) + "-" + digits.slice(5,8);
}
export function unmaskCEP(masked: string): string { return masked.replace(/\D/g, ""); }
