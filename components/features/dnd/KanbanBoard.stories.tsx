import type { Meta, StoryObj } from "@storybook/react"
import { KanbanBoard } from "./KanbanBoard"
import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const meta = {
  title: "Features/DnD/KanbanBoard",
  component: KanbanBoard,
  tags: ["autodocs"],
} satisfies Meta<typeof KanbanBoard<KanbanItem>>

export default meta
type Story = StoryObj<typeof meta>

interface KanbanItem {
  id: string
  title: string
  priority: "high" | "medium" | "low"
  tags?: string[]
}

const priorityColors = {
  high: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  medium: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  low: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
}

function KanbanDemo() {
  const [columns, setColumns] = useState([
    {
      id: "todo",
      title: "To Do",
      color: "#6366f1",
      items: [
        { id: "1", title: "Setup project structure", priority: "high" as const, tags: ["setup"] },
        { id: "2", title: "Create database schema", priority: "medium" as const, tags: ["backend"] },
        { id: "3", title: "Design UI components", priority: "low" as const, tags: ["frontend", "design"] },
      ],
    },
    {
      id: "in-progress",
      title: "In Progress",
      color: "#f59e0b",
      items: [
        { id: "4", title: "Implement authentication", priority: "high" as const, tags: ["backend", "security"] },
        { id: "5", title: "Build API endpoints", priority: "medium" as const, tags: ["backend"] },
      ],
    },
    {
      id: "done",
      title: "Done",
      color: "#22c55e",
      items: [
        { id: "6", title: "Write unit tests", priority: "medium" as const, tags: ["testing"] },
      ],
    },
  ])

  const handleItemMove = (
    itemId: string,
    _fromColumnId: string,
    toColumnId: string,
    newIndex: number
  ) => {
    let movedItem: KanbanItem | undefined

    const newColumns = columns.map((column) => {
      const itemIndex = column.items.findIndex((item) => item.id === itemId)
      if (itemIndex !== -1) {
        movedItem = column.items[itemIndex]
        return {
          ...column,
          items: column.items.filter((item) => item.id !== itemId),
        }
      }
      return column
    })

    if (movedItem) {
      setColumns(
        newColumns.map((column) => {
          if (column.id === toColumnId) {
            const newItems = [...column.items]
            newItems.splice(newIndex, 0, movedItem!)
            return { ...column, items: newItems }
          }
          return column
        })
      )
    }
  }

  return (
    <KanbanBoard
      columns={columns}
      getItemId={(item) => item.id}
      renderItem={(item) => (
        <Card className="p-3 space-y-2">
          <div className="flex items-start justify-between">
            <span className="font-medium text-sm">{item.title}</span>
            <span className={`text-xs px-1.5 py-0.5 rounded ${priorityColors[item.priority]}`}>
              {item.priority}
            </span>
          </div>
          {item.tags && (
            <div className="flex flex-wrap gap-1">
              {item.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </Card>
      )}
      onItemMove={handleItemMove}
      className="p-4"
    />
  )
}

export const Default: Story = {
  render: () => <KanbanDemo />,
}

export const EmptyColumns: Story = {
  render: () => {
    const [columns] = useState([
      { id: "todo", title: "To Do", color: "#6366f1", items: [] },
      { id: "in-progress", title: "In Progress", color: "#f59e0b", items: [] },
      { id: "done", title: "Done", color: "#22c55e", items: [] },
    ])

    return (
      <KanbanBoard
        columns={columns}
        getItemId={(item: KanbanItem) => item.id}
        renderItem={(item) => <Card className="p-3">{item.title}</Card>}
        className="p-4"
      />
    )
  },
}
