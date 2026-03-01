// Table components - TanStack Table integration with shadcn/ui
export { DataTable, type DataTableProps } from "./data-table"
export {
  SortableHeader,
  textColumn,
  statusColumn,
  dateColumn,
  numberColumn,
  currencyColumn,
  booleanColumn,
  actionsColumn,
  userColumn,
} from "./column-helpers"

// Re-export useful types from @tanstack/react-table
export type { ColumnDef, Row, SortingState, ColumnFiltersState, VisibilityState, RowSelectionState, PaginationState } from "@tanstack/react-table"
