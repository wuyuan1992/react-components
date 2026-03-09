import type { Meta, StoryObj } from "@storybook/react"
import { DataTable } from "./data-table"
import type { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"

const meta = {
  title: "Features/Table/DataTable",
  component: DataTable,
  tags: ["autodocs"],
} satisfies Meta<typeof DataTable<User>>

export default meta
type Story = StoryObj<typeof meta>

interface User {
  id: string
  name: string
  email: string
  role: "admin" | "user" | "guest"
  status: "active" | "inactive"
  createdAt: string
}

const userData: User[] = [
  { id: "1", name: "John Doe", email: "john@example.com", role: "admin", status: "active", createdAt: "2024-01-15" },
  { id: "2", name: "Jane Smith", email: "jane@example.com", role: "user", status: "active", createdAt: "2024-02-20" },
  { id: "3", name: "Bob Wilson", email: "bob@example.com", role: "user", status: "inactive", createdAt: "2024-03-10" },
  { id: "4", name: "Alice Brown", email: "alice@example.com", role: "guest", status: "active", createdAt: "2024-04-05" },
  { id: "5", name: "Charlie Davis", email: "charlie@example.com", role: "user", status: "active", createdAt: "2024-05-12" },
  { id: "6", name: "Eva Martinez", email: "eva@example.com", role: "admin", status: "active", createdAt: "2024-06-18" },
  { id: "7", name: "Frank Lee", email: "frank@example.com", role: "user", status: "inactive", createdAt: "2024-07-22" },
  { id: "8", name: "Grace Kim", email: "grace@example.com", role: "user", status: "active", createdAt: "2024-08-30" },
]

const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <span className="font-medium">{row.getValue("name")}</span>,
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      const role = row.getValue("role") as string
      const variant = role === "admin" ? "default" : role === "user" ? "secondary" : "outline"
      return <Badge variant={variant}>{role}</Badge>
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      return (
        <Badge variant={status === "active" ? "default" : "destructive"}>
          {status}
        </Badge>
      )
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created",
  },
]

function TableWithSelection() {
  const [selectedRows, setSelectedRows] = useState<Record<string, boolean>>({})

  return (
    <div className="space-y-4">
      <div className="text-sm text-muted-foreground">
        Selected: {Object.keys(selectedRows).length} row(s)
      </div>
      <DataTable
        columns={columns}
        data={userData}
        selectable
        selectedRows={selectedRows}
        onSelectionChange={setSelectedRows}
        getRowId={(row) => row.id}
      />
    </div>
  )
}

export const Default: Story = {
  args: {
    columns,
    data: userData,
  },
}

export const WithSearch: Story = {
  args: {
    columns,
    data: userData,
    searchable: true,
    searchPlaceholder: "Search users...",
    searchColumn: "name",
  },
}

export const WithSelection: Story = {
  render: () => <TableWithSelection />,
}

export const WithoutPagination: Story = {
  args: {
    columns,
    data: userData,
    pagination: false,
  },
}

export const Loading: Story = {
  args: {
    columns,
    data: [],
    isLoading: true,
  },
}

export const Empty: Story = {
  args: {
    columns,
    data: [],
    emptyMessage: "No users found. Try adding some!",
  },
}

export const CustomPageSize: Story = {
  args: {
    columns,
    data: [...userData, ...userData, ...userData],
    defaultPageSize: 5,
    pageSizeOptions: [5, 10, 20],
  },
}
