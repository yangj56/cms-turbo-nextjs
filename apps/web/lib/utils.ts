import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Media } from "./payload-types";

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

export function formatDate(dateString: string) {
	return new Date(dateString).toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});
}

const isMedia = (
	imageUrl: string | null | undefined | Media,
): imageUrl is Media => {
	if (imageUrl && typeof imageUrl === "object" && "url" in imageUrl) {
		return true;
	}
	return false;
};

export function formatImageUrl(
	imageUrl: string | null | undefined | Media,
): string {
	if (!imageUrl) return "";
	if (typeof imageUrl === "string") {
		return imageUrl;
	}
	if (isMedia(imageUrl)) {
		return `${process.env.NEXT_PUBLIC_CMS_URL}${imageUrl.url}`;
	}
	return "";
}

export function formatImageAlt(
	imageAlt: string | null | undefined | Media,
): string {
	if (!imageAlt) return "";
	if (typeof imageAlt === "string") {
		return imageAlt;
	}
	if (isMedia(imageAlt)) {
		if (imageAlt.alt) {
			return imageAlt.alt;
		}
		return imageAlt.filename || "";
	}
	return "";
}

export const cacheOptions: RequestInit = {
	cache: "no-cache",
	headers: {
		"x-vercel-protection-bypass": "mmMdkTtHgOvtQdBp4UaZYtJtwMb8cyws",
	},
};
