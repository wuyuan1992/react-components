import type {
	ColumnFiltersState,
	PaginationState,
	RowSelectionState,
	SortingState,
	VisibilityState,
} from "@tanstack/react-table";
import { useState } from "react";

export interface UseTableStateReturn {
	/** Current sorting state */
	sorting: SortingState;
	/** Update sorting state */
	setSorting: (
		state: SortingState | ((prev: SortingState) => SortingState),
	) => void;
	/** Current column filters state */
	columnFilters: ColumnFiltersState;
	/** Update column filters state */
	setColumnFilters: (
		state:
			| ColumnFiltersState
			| ((prev: ColumnFiltersState) => ColumnFiltersState),
	) => void;
	/** Column visibility state */
	visibility: VisibilityState;
	/** Update column visibility state */
	setVisibility: (
		state: VisibilityState | ((prev: VisibilityState) => VisibilityState),
	) => void;
	/** Row selection state */
	rowSelection: RowSelectionState;
	/** Update row selection state */
	setRowSelection: (
		state: RowSelectionState | ((prev: RowSelectionState) => RowSelectionState),
	) => void;
	/** Pagination state */
	pagination: PaginationState;
	/** Update pagination state */
	setPagination: (
		state: PaginationState | ((prev: PaginationState) => PaginationState),
	) => void;
}

/**
 * Hook for managing TanStack Table state
 *
 * @param initialPageSize - Initial page size (default: 10)
 * @param initialRowSelection - Initial row selection state (default: {})
 * @returns Object containing table state and setters
 *
 * @example
 * ```tsx
 * const tableState = useTableState(10)
 * const table = useReactTable({
 *   ...tableState,
 *   // other table options
 * })
 * ```
 */
export function useTableState(
	initialPageSize = 10,
	initialRowSelection: RowSelectionState = {},
): UseTableStateReturn {
	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [visibility, setVisibility] = useState<VisibilityState>({});
	const [rowSelection, setRowSelection] =
		useState<RowSelectionState>(initialRowSelection);
	const [pagination, setPagination] = useState<PaginationState>({
		pageIndex: 0,
		pageSize: initialPageSize,
	});

	return {
		sorting,
		setSorting,
		columnFilters,
		setColumnFilters,
		visibility,
		setVisibility,
		rowSelection,
		setRowSelection,
		pagination,
		setPagination,
	};
}
