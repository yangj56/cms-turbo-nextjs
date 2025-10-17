import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function queryParamToNumber(param: string | string[] | undefined) {
	if (!param) return undefined;
	const value = Array.isArray(param) ? param[0] : param;
	if (!value) return undefined;
	const num = Number.parseInt(value, 10);
	return Number.isNaN(num) ? undefined : num;
}

export function queryParamToString(param: string | string[] | undefined) {
	if (!param) return "";
	return param as string;
}

export const cacheOptions: RequestInit = {
	cache: "no-cache",
};
