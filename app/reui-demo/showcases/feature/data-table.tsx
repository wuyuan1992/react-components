"use client"

import { DataTable } from "@/components/features/table"
import type { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { PageHeader, ExampleSection, CodeBlock, PropTable } from "../shared"

export function DataTableView() {
  interface User {
    id: string
    name: string
    email: string
    role: string
    status: string
    createdAt: Date
  }

  const users: User[] = [
    { id: "1", name: "John Doe", email: "john@example.com", role: "admin", status: "active", createdAt: new Date("2024-01-15") },
    { id: "2", name: "Jane Smith", email: "jane@example.com", role: "user", status: "active", createdAt: new Date("2024-02-20") },
    { id: "3", name: "Bob Wilson", email: "bob@example.com", role: "user", status: "inactive", createdAt: new Date("2024-03-10") },
    { id: "4", name: "Alice Brown", email: "alice@example.com", role: "guest", status: "pending", createdAt: new Date("2024-04-05") },
    { id: "5", name: "Charlie Davis", email: "charlie@example.com", role: "user", status: "active", createdAt: new Date("2024-05-12") },
  ]

  const columns = [
    { accessorKey: "name", header: "Name", cell: ({ getValue }: { getValue: () => unknown }) => <span className="font-medium">{String(getValue())}</span> },
    { accessorKey: "email", header: "Email" },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ getValue }: { getValue: () => unknown }) => {
        const role = String(getValue())
        const variant = role === "admin" ? "default" : role === "user" ? "secondary" : "outline"
        return <Badge variant={variant}>{role}</Badge>
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ getValue }: { getValue: () => unknown }) => {
        const status = String(getValue())
        const colorClass = status === "active" ? "bg-success text-success-foreground" : status === "inactive" ? "bg-destructive text-destructive-foreground" : "bg-warning text-warning-foreground"
        return <Badge className={colorClass}>{status}</Badge>
      },
    },
    {
      accessorKey: "createdAt",
      header: "Created",
      cell: ({ getValue }: { getValue: () => unknown }) => (getValue() as Date).toLocaleDateString(),
    },
  ]

  return (
    <div>
      <PageHeader title="Data Table" description="Full-featured data table with sorting, filtering, pagination, and selection powered by TanStack Table." />
      <ExampleSection title="Users Table">
        <DataTable
          columns={columns}
          data={users}
          searchable
          searchPlaceholder="Search users..."
          pagination
          selectable
          getRowId={(row) => row.id}
        />
        <CodeBlock
          code={`import { DataTable } from "@/components/features/table"
import type { ColumnDef } from "@tanstack/react-table"

const columns: ColumnDef<User>[] = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "role", header: "Role" },
]

<DataTable
  columns={columns}
  data={users}
  searchable
  pagination
  selectable
/>`}
        />
      </ExampleSection>
    </div>
  )
}

// Form View
