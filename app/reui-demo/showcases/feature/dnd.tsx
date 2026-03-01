"use client"

import { useState, useCallback } from "react"
import { SortableList, KanbanBoard, type KanbanColumn } from "@/components/features/dnd"
import type { UniqueIdentifier } from "@dnd-kit/core"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { PageHeader, ExampleSection, CodeBlock, PropTable } from "../shared"

export function DnDView() {
  // Sortable List
  const [sortableItems, setSortableItems] = useState([
    { id: "1", title: "Task 1", priority: "high" },
    { id: "2", title: "Task 2", priority: "medium" },
    { id: "3", title: "Task 3", priority: "low" },
    { id: "4", title: "Task 4", priority: "high" },
    { id: "5", title: "Task 5", priority: "medium" },
  ])

  // Kanban Board
  const [kanbanColumns, setKanbanColumns] = useState<KanbanColumn<{ id: string; title: string }>[]>([
    { id: "todo", title: "To Do", items: [{ id: "t1", title: "Setup project" }, { id: "t2", title: "Create components" }] },
    { id: "in-progress", title: "In Progress", items: [{ id: "t3", title: "Write tests" }] },
    { id: "done", title: "Done", items: [{ id: "t4", title: "Design mockups" }] },
  ])

  const handleItemMove = useCallback(
    (itemId: UniqueIdentifier, fromColumnId: UniqueIdentifier, toColumnId: UniqueIdentifier, newIndex: number) => {
      setKanbanColumns((prev) => {
        const newColumns = [...prev]
        let movedItem: { id: string; title: string } | undefined

        // Remove from source column
        for (const column of newColumns) {
          const itemIndex = column.items.findIndex((item) => item.id === itemId)
          if (itemIndex !== -1) {
            movedItem = column.items[itemIndex]
            column.items = [...column.items.slice(0, itemIndex), ...column.items.slice(itemIndex + 1)]
            break
          }
        }

        // Add to target column
        if (movedItem) {
          const targetColumn = newColumns.find((col) => col.id === toColumnId)
          if (targetColumn) {
            targetColumn.items = [
              ...targetColumn.items.slice(0, newIndex),
              movedItem,
              ...targetColumn.items.slice(newIndex),
            ]
          }
        }

        return newColumns
      })
    },
    []
  )

  return (
    <div>
      <PageHeader title="Drag & Drop" description="Flexible drag and drop components with @dnd-kit for sortable lists, kanban boards, and more." />
      <ExampleSection title="Sortable List">
        <div className="max-w-md border rounded-lg p-4">
          <SortableList
            items={sortableItems}
            getId={(item) => item.id}
            onReorder={setSortableItems}
            renderItem={(item, index, isDragging) => (
              <div
                className={cn(
                  "flex items-center justify-between rounded-md border px-4 py-3",
                  isDragging && "border-[var(--color-primary)] bg-[var(--color-primary)]/10"
                )}
              >
                <span>{item.title}</span>
                <Badge variant={item.priority === "high" ? "destructive" : "secondary"}>{item.priority}</Badge>
              </div>
            )}
            itemClassName="mb-2 last:mb-0"
          />
        </div>
        <CodeBlock
          code={`import { SortableList } from "@/components/features/dnd"

<SortableList
  items={items}
  getId={(item) => item.id}
  onReorder={setItems}
  renderItem={(item, index, isDragging) => (
    <div className="p-3 border rounded">
      {item.title}
    </div>
  )}
/>`}
        />
      </ExampleSection>
      <ExampleSection title="Kanban Board">
        <KanbanBoard
          columns={kanbanColumns}
          getItemId={(item) => item.id}
          onItemMove={handleItemMove}
          renderItem={(item, columnId) => (
            <div className="rounded-md border border-[var(--color-border)] bg-[var(--color-background)] p-3 shadow-sm">
              {item.title}
            </div>
          )}
          itemClassName="mb-2"
          className="h-[300px]"
        />
      </ExampleSection>
    </div>
  )
}
