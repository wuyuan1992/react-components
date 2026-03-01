// Common utility types used across the application

/** Ref with imperative methods pattern */
export interface ComponentRef<TMethods> {
	/** Get component instance */
	getInstance?: () => TMethods | null;
}

/** Callback ref type */
export type CallbackRef<T> = (instance: T | null) => void;

/** Either a mutable ref object or a callback ref */
export type Ref<T> = React.RefObject<T> | CallbackRef<T>;

/** Size properties */
export interface Size {
	width: number | string;
	height: number | string;
}

/** Loading state */
export interface LoadingState {
	isLoading: boolean;
	error?: Error | null;
}

/** Pagination info */
export interface Pagination {
	page: number;
	pageSize: number;
	total: number;
}

/** Sort direction */
export type SortDirection = "asc" | "desc" | null;

/** Filter operator */
export type FilterOperator =
	| "equals"
	| "contains"
	| "startsWith"
	| "endsWith"
	| "gt"
	| "lt"
	| "gte"
	| "lte";

/** Filter condition */
export interface FilterCondition {
	field: string;
	operator: FilterOperator;
	value: unknown;
}
