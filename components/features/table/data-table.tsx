"use client"

import { useState, useMemo } from "react"
import type { Row, ColumnDef, SortingState, ColumnFiltersState, VisibilityState, RowSelectionState, PaginationState } from "@tanstack/react-table"
import { useReactTable, getCoreRowModel, getPaginationRowModel, getSortedRowModel, getFilteredRowModel, flexRender } from "@tanstack/react-table"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Search, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react"
import { cn } from "@/lib/utils"

export interface DataTableProps<TData, TValue = unknown> {
  /** Column definitions */
  columns: ColumnDef<TData, TValue>[]
  /** Table data */
  data: TData[]
  /** Enable search filtering */
  searchable?: boolean
  /** Search placeholder text */
  searchPlaceholder?: string
  /** Column to search in (defaults to all columns) */
  searchColumn?: string
  /** Enable pagination */
  pagination?: boolean
  /** Page size options */
  pageSizeOptions?: number[]
  /** Default page size */
  defaultPageSize?: number
  /** Enable row selection */
  selectable?: boolean
  /** Selected row IDs */
  selectedRows?: RowSelectionState
  /** Row selection change handler */
  onSelectionChange?: (selection: RowSelectionState) => void
  /** Enable column visibility toggle */
  columnVisibility?: boolean
  /** Loading state */
  isLoading?: boolean
  /** Empty state message */
  emptyMessage?: string
  /** Table className */
  className?: string
  /** Get row ID - defaults to index */
  getRowId?: (row: TData, index: number) => string
  /** Row click handler */
  onRowClick?: (row: Row<TData>) => void
  /** Row is clickable */
  rowClickable?: boolean
}

export function DataTable<TData, TValue = unknown>({
  columns,
  data,
  searchable = false,
  searchPlaceholder = "Search...",
  searchColumn,
  pagination = true,
  pageSizeOptions = [10, 20, 30, 50, 100],
  defaultPageSize = 10,
  selectable = false,
  selectedRows = {},
  onSelectionChange,
  columnVisibility: enableColumnVisibility = false,
  isLoading = false,
  emptyMessage = "No results.",
  className,
  getRowId,
  onRowClick,
  rowClickable = false,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [visibility, setVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState<RowSelectionState>(selectedRows)
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: defaultPageSize,
  })

  // Add selection column if selectable
  const tableColumns = useMemo(() => {
    if (!selectable) return columns
    return [
      {
        id: "__select__",
        header: ({ table }) => (
          <Checkbox
            checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
        enableSorting: false,
        enableHiding: false,
        size: 40,
      },
      ...columns,
    ] as ColumnDef<TData, TValue>[]
  }, [columns, selectable])

  const table = useReactTable({
    data,
    columns: tableColumns,
    state: {
      sorting,
      columnFilters,
      columnVisibility: visibility,
      rowSelection,
      pagination: pagination ? { pageIndex, pageSize } : undefined,
    },
    enableRowSelection: selectable,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setVisibility,
    onRowSelectionChange: (updater) => {
      const newSelection = typeof updater === "function" ? updater(rowSelection) : updater
      setRowSelection(newSelection)
      onSelectionChange?.(newSelection)
    },
    onPaginationChange: pagination
      ? (updater) => {
          const newState = typeof updater === "function" ? updater({ pageIndex, pageSize }) : updater
          setPagination(newState)
        }
      : undefined,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: pagination ? getPaginationRowModel() : undefined,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getRowId,
    manualPagination: !pagination,
  })

  return (
    <div className={cn("space-y-4", className)}>
      {/* Toolbar */}
      {(searchable || enableColumnVisibility) && (
        <div className="flex items-center gap-2">
          {searchable && (
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={searchPlaceholder}
                value={(table.getColumn(searchColumn ?? "")?.getFilterValue() as string) ?? ""}
                onChange={(e) => table.getColumn(searchColumn ?? "")?.setFilterValue(e.target.value)}
                className="pl-8"
              />
            </div>
          )}
          {enableColumnVisibility && (
            <Select
              value=""
              onValueChange={(value) => {
                if (value) {
                  setVisibility((prev) => ({ ...prev, [value]: prev[value] === false ? true : false }))
                }
              }}
            >
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Columns" />
              </SelectTrigger>
              <SelectContent>
                {table.getAllColumns().map((column) => {
                  if (!column.getCanHide()) return null
                  return (
                    <SelectItem key={column.id} value={column.id}>
                      <div className="flex items-center gap-2">
                        <Checkbox checked={column.getIsVisible()} />
                        {column.id}
                      </div>
                    </SelectItem>
                  )
                })}
              </SelectContent>
            </Select>
          )}
        </div>
      )}

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} style={{ width: header.getSize() !== 150 ? header.getSize() : undefined }}>
                    {header.isPlaceholder ? null : (
                      <div
                        className={cn("flex items-center gap-1", header.column.getCanSort() && "cursor-pointer select-none")}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {header.column.getCanSort() && (
                          <span className="ml-1">
                            {header.column.getIsSorted() === "asc" ? (
                              <ArrowUp className="h-4 w-4" />
                            ) : header.column.getIsSorted() === "desc" ? (
                              <ArrowDown className="h-4 w-4" />
                            ) : (
                              <ArrowUpDown className="h-4 w-4 opacity-50" />
                            )}
                          </span>
                        )}
                      </div>
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={table.getAllColumns().length} className="h-24 text-center">
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary" />
                  </div>
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={cn(rowClickable && "cursor-pointer hover:bg-muted/50")}
                  onClick={() => rowClickable && onRowClick?.(row)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={table.getAllColumns().length} className="h-24 text-center">
                  {emptyMessage}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {pagination && (
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            {selectable && (
              <span>
                {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s) selected.
              </span>
            )}
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Rows per page</span>
              <Select
                value={String(pageSize)}
                onValueChange={(value) => {
                  setPagination({ pageIndex: 0, pageSize: Number(value) })
                }}
              >
                <SelectTrigger className="h-8 w-[70px]">
                  <SelectValue placeholder={pageSize} />
                </SelectTrigger>
                <SelectContent side="top">
                  {pageSizeOptions.map((size) => (
                    <SelectItem key={size} value={String(size)}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                Page {pageIndex + 1} of {table.getPageCount()}
              </span>
              <div className="flex items-center gap-1">
                <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setPagination((p) => ({ ...p, pageIndex: 0 }))} disabled={pageIndex === 0}>
                  <ChevronsLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setPagination((p) => ({ ...p, pageIndex: p.pageIndex - 1 }))} disabled={pageIndex === 0}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setPagination((p) => ({ ...p, pageIndex: p.pageIndex + 1 }))} disabled={pageIndex >= table.getPageCount() - 1}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setPagination((p) => ({ ...p, pageIndex: table.getPageCount() - 1 }))} disabled={pageIndex >= table.getPageCount() - 1}>
                  <ChevronsRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
