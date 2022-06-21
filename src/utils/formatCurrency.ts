export const formatWithDecimal = (value: any, maxDecimal: number = 2, type?: string) => {
  return new Intl.NumberFormat(type ?? 'en-US', { style: 'decimal', minimumFractionDigits: maxDecimal }).format(value)
}