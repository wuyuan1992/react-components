import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function isActive(pathname: string, href: string) {
	const normalizedPathname = pathname.replace(/\/$/, "");
	const normalizedHref = href.replace(/\/$/, "");
	return (
		normalizedPathname === normalizedHref ||
		(normalizedPathname.startsWith(normalizedHref) && normalizedHref !== "")
	);
}

export function absoluteUrl(path: string) {
	return `${process.env.NEXT_PUBLIC_APP_URL}${path}`;
}

export function formatLabel(value: string): string {
	return value
		.split("-")
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(" ");
}

export function normalizeSlug(value: string): string {
	return value.toLowerCase().replace(/\s+/g, "-");
}

/**
 * Generate a unique ID with optional prefix
 */
export function generateId(prefix = "id"): string {
	return `${prefix}-${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Format bytes to human readable string
 */
export function formatBytes(bytes: number, decimals = 2): string {
	if (bytes === 0) return "0 Bytes";
	const k = 1024;
	const dm = decimals < 0 ? 0 : decimals;
	const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
	const i = Math.floor(Math.log(bytes) / Math.log(k));
	return `${Number.parseFloat((bytes / k ** i).toFixed(dm))} ${sizes[i]}`;
}

/**
 * Format date as relative time (e.g., "5m ago", "2h ago")
 */
export function formatRelativeTime(date: Date): string {
	const now = new Date();
	const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

	if (diffInSeconds < 60) return "just now";
	if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
	if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
	if (diffInSeconds < 604800)
		return `${Math.floor(diffInSeconds / 86400)}d ago`;
	return date.toLocaleDateString();
}

/**
 * Truncate text with ellipsis
 */
export function truncate(text: string, length = 50): string {
	if (text.length <= length) return text;
	return `${text.substring(0, length)}...`;
}

/**
 * Safe JSON parse with fallback
 */
export function safeJsonParse<T>(json: string, fallback: T): T {
	try {
		return JSON.parse(json) as T;
	} catch {
		return fallback;
	}
}

/**
 * Debounce function (utility version, not hook)
 */
export function debounce<T extends (...args: unknown[]) => void>(
	func: T,
	wait: number,
): (...args: Parameters<T>) => void {
	let timeout: NodeJS.Timeout | null = null;
	return function executedFunction(...args: Parameters<T>) {
		const later = () => {
			timeout = null;
			func(...args);
		};
		if (timeout) clearTimeout(timeout);
		timeout = setTimeout(later, wait);
	};
}

/**
 * Throttle function
 */
export function throttle<T extends (...args: unknown[]) => void>(
	func: T,
	limit: number,
): (...args: Parameters<T>) => void {
	let inThrottle: boolean;
	return function executedFunction(...args: Parameters<T>) {
		if (!inThrottle) {
			func(...args);
			inThrottle = true;
			setTimeout(() => (inThrottle = false), limit);
		}
	};
}

/**
 * Clamp number between min and max
 */
export function clamp(value: number, min: number, max: number): number {
	return Math.min(Math.max(value, min), max);
}

/**
 * Get object property by path (dot notation)
 */
export function get(
	obj: unknown,
	path: string,
	defaultValue?: unknown,
): unknown {
	const travel = (regexp: RegExp) =>
		String.prototype.split
			.call(path, regexp)
			.filter(Boolean)
			.reduce(
				(res, key) =>
					res !== null && res !== undefined
						? (res as Record<string, unknown>)[key]
						: res,
				obj,
			);
	const result = travel(/[,[\]]+?/) || travel(/[,[\].]+?/);
	return result === undefined || result === null ? defaultValue : result;
}
