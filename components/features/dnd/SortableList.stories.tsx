import type { Meta, StoryObj } from "@storybook/react"
import { SortableList } from "./SortableList"
import { useState } from "react"
import { Card } from "@/components/ui/card"
import { GripVertical } from "lucide-react"

const meta = {
  title: "Features/DnD/SortableList",
  component: SortableList,
  tags: ["autodocs"],
} satisfies Meta<typeof SortableList<{ id: string; title: string }>>

export default meta
type Story = StoryObj<typeof meta>

interface TaskItem {
  id: string
  title: string
}

function SortableListDemo({ initialItems, strategy = "vertical" }: { initialItems: TaskItem[]; strategy?: "vertical" | "horizontal" }) {
  const [items, setItems] = useState(initialItems)

  return (
    <SortableList
      items={items}
      getId={(item) => item.id}
      onReorder={setItems}
      strategy={strategy}
      className={strategy === "horizontal" ? "gap-2" : "gap-2"}
      renderItem={(item, _index, isDragging) => (
        <Card
          className={`flex items-center gap-2 p-3 ${
            isDragging ? "ring-2 ring-primary shadow-lg" : ""
          }`}
        >
          <GripVertical className="size-4 text-muted-foreground cursor-grab" />
          <span>{item.title}</span>
        </Card>
      )}
    />
  )
}

const defaultItems: TaskItem[] = [
  { id: "1", title: "Complete project proposal" },
  { id: "2", title: "Review pull requests" },
  { id: "3", title: "Write documentation" },
  { id: "4", title: "Fix navigation bug" },
  { id: "5", title: "Update dependencies" },
]

export const Default: Story = {
  render: () => <SortableListDemo initialItems={defaultItems} />,
}

export const Horizontal: Story = {
  render: () => (
    <SortableListDemo
      initialItems={[
        { id: "a", title: "Backlog" },
        { id: "b", title: "In Progress" },
        { id: "c", title: "Review" },
        { id: "d", title: "Done" },
      ]}
      strategy="horizontal"
    />
  ),
}

export const MinimalItems: Story = {
  render: () => (
    <SortableListDemo
      initialItems={[
        { id: "1", title: "Single item" },
        { id: "2", title: "Another item" },
      ]}
    />
  ),
}

export const ManyItems: Story = {
  render: () => {
    const manyItems = Array.from({ length: 15 }, (_, i) => ({
      id: `item-${i}`,
      title: `Task ${i + 1}: ${["Design", "Develop", "Test", "Deploy", "Review"][i % 5]}`,
    }))
    return <SortableListDemo initialItems={manyItems} />
  },
}
