const rateFormatter = new Intl.NumberFormat("en-ZA", {
  style: "currency",
  currency: "ZAR",
  maximumFractionDigits: 0,
});

export function formatRate(amount: number): string {
  return rateFormatter.format(amount).replace(/\s/g, "");
}
