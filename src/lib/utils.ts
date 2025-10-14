import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface FormatNumberOptions {
  value?: number;
  digit?: number;
  offsetRate?: number;
  toFixed?: boolean;
  failoverValue?: string;
}
/**
 * @example
 * formatNumber({ value: 1000, digit: 2 }) // 1,000.00
 * formatNumber({ value: 1000, digit: 2, offsetRate: 1000 }) // 1.00
 * formatNumber({ value: 1000, digit: 2, toFixed: true }) // 1,000.00
 * formatNumber({ value: 1000, digit: 2, failoverValue: "0" }) // 1,000.00
 * formatNumber({ value: 1000, digit: 2, toFixed: true, failoverValue: "0" }) // 1,000.00
 * formatNumber({ value: 1000, digit: 2, toFixed: true, failoverValue: "0" }) // 1,000.00
 */

export function formatNumber({
  value,
  digit = 0,
  offsetRate,
  toFixed,
  failoverValue = "0",
}: FormatNumberOptions): string {
  if (value == null || isNaN(value)) {
    return failoverValue;
  }

  let num = offsetRate ? value / offsetRate : value;
  const isNegative = num < 0;

  num = Math.abs(num);

  // Round to specified digits
  const rounded = Number(`${Math.round(Number(`${num}e+${digit}`))}e-${digit}`);

  // Format the number
  const [intPart, fractionPart = ""] = toFixed
    ? rounded.toFixed(digit).split(".")
    : rounded.toString().split(".");

  const intPartFormatted = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  const result =
    intPartFormatted + (fractionPart && digit > 0 ? `.${fractionPart}` : "");

  return (isNegative ? "-" : "") + result;
}
