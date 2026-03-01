"use client"

import type { ColumnDef, Header } from "@tanstack/react-table"
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

// Helper to create sortable header
export function SortableHeader<TData, TValue>({ column, title }: { column: Header<TData, TValue>["column"]; title: string }) {
  return (
    <Button variant="ghost" size="sm" className="-ml-3 h-8 data-[state=open]:bg-accent" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
      <span>{title}</span>
      {column.getIsSorted() === "asc" ? <ArrowUp className="ml-2 h-4 w-4" /> : column.getIsSorted() === "desc" ? <ArrowDown className="ml-2 h-4 w-4" /> : <ArrowUpDown className="ml-2 h-4 w-4" />}
    </Button>
  )
}

// Create text column
export function textColumn<TData>(
  accessor: keyof TData,
  header: string,
  options?: { sortable?: boolean; className?: string }
): ColumnDef<TData> {
  return {
    accessorKey: accessor as string,
    header: options?.sortable
      ? ({ column }) => <SortableHeader column={column} title={header} />
      : header,
    cell: ({ getValue }) => {
      const value = getValue()
      return <span className={options?.className}>{String(value ?? "")}</span>
    },
    enableSorting: options?.sortable,
  }
}

// Create status/badge column
export function statusColumn<TData>(
  accessor: keyof TData,
  header: string,
  statusConfig: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }>
): ColumnDef<TData> {
  return {
    accessorKey: accessor as string,
    header,
    cell: ({ getValue }) => {
      const value = String(getValue() ?? "")
      const config = statusConfig[value] ?? { label: value, variant: "secondary" as const }
      return <Badge variant={config.variant}>{config.label}</Badge>
    },
  }
}

// Create date column
export function dateColumn<TData>(accessor: keyof TData, header: string, options?: { format?: Intl.DateTimeFormatOptions; sortable?: boolean }): ColumnDef<TData> {
  return {
    accessorKey: accessor as string,
    header: options?.sortable
      ? ({ column }) => <SortableHeader column={column} title={header} />
      : header,
    cell: ({ getValue }) => {
      const value = getValue()
      if (!value) return null
      const date = new Date(value as string | Date)
      return date.toLocaleDateString("en-US", options?.format ?? { year: "numeric", month: "short", day: "numeric" })
    },
    enableSorting: options?.sortable ?? true,
  }
}

// Create number column
export function numberColumn<TData>(accessor: keyof TData, header: string, options?: { format?: Intl.NumberFormatOptions; sortable?: boolean }): ColumnDef<TData> {
  return {
    accessorKey: accessor as string,
    header: options?.sortable
      ? ({ column }) => <SortableHeader column={column} title={header} />
      : header,
    cell: ({ getValue }) => {
      const value = getValue()
      if (value == null) return null
      return (value as number).toLocaleString("en-US", options?.format)
    },
    enableSorting: options?.sortable ?? true,
  }
}

// Create currency column
export function currencyColumn<TData>(accessor: keyof TData, header: string, currency = "USD"): ColumnDef<TData> {
  return {
    accessorKey: accessor as string,
    header: ({ column }) => <SortableHeader column={column} title={header} />,
    cell: ({ getValue }) => {
      const value = getValue()
      if (value == null) return null
      return (value as number).toLocaleString("en-US", { style: "currency", currency })
    },
    enableSorting: true,
  }
}

// Create boolean/check column
export function booleanColumn<TData>(accessor: keyof TData, header: string, options?: { trueLabel?: string; falseLabel?: string }): ColumnDef<TData> {
  return {
    accessorKey: accessor as string,
    header,
    cell: ({ getValue }) => {
      const value = getValue() as boolean
      return (
        <Badge variant={value ? "default" : "secondary"} className={cn(value && "bg-success text-success-foreground")}>
          {value ? (options?.trueLabel ?? "Yes") : (options?.falseLabel ?? "No")}
        </Badge>
      )
    },
    enableSorting: true,
  }
}

// Create actions column
export function actionsColumn<TData>(actions: (row: TData) => React.ReactNode, header = "Actions"): ColumnDef<TData> {
  return {
    id: "actions",
    header,
    cell: ({ row }) => actions(row.original),
    enableSorting: false,
    enableHiding: false,
  }
}

// Create avatar/user column
export function userColumn<TData>(
  accessor: keyof TData,
  header: string,
  options?: { imageAccessor?: keyof TData; emailAccessor?: keyof TData }
): ColumnDef<TData> {
  return {
    accessorKey: accessor as string,
    header,
    cell: ({ row }) => {
      const name = row.getValue(accessor as string) as string
      const image = options?.imageAccessor ? String((row.original as Record<string, unknown>)[options.imageAccessor as string] ?? "") : null
      const email = options?.emailAccessor ? String((row.original as Record<string, unknown>)[options.emailAccessor as string] ?? "") : null

      return (
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-sm font-medium">
            {image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={image} alt={name} className="h-8 w-8 rounded-full object-cover" />
            ) : (
              name?.charAt(0)?.toUpperCase() ?? "?"
            )}
          </div>
          <div className="flex flex-col">
            <span className="font-medium">{name}</span>
            {email && <span className="text-xs text-muted-foreground">{email}</span>}
          </div>
        </div>
      )
    },
  }
}
