import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function queryParamToNumber(param: string | string[] | undefined) {
  if (!param) return undefined;
  const num = parseInt(param as string);
  return isNaN(num) ? undefined : num;
}

export function queryParamToString(param: string | string[] | undefined) {
  if (!param) return "";
  return param as string;
}
