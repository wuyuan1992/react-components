import type { Meta, StoryObj } from "@storybook/react"
import { VirtualList } from "./VirtualList"
import { Card } from "@/components/ui/card"

const meta = {
  title: "Features/VirtualList/VirtualList",
  component: VirtualList,
  tags: ["autodocs"],
} satisfies Meta<typeof VirtualList<{ id: number; name: string; email: string }>>

export default meta
type Story = StoryObj<typeof meta>

interface User {
  id: number
  name: string
  email: string
  avatar: string
}

const generateUsers = (count: number): User[] =>
  Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`,
  }))

export const Default: Story = {
  render: () => {
    const users = generateUsers(1000)

    return (
      <VirtualList
        items={users}
        height={400}
        estimateSize={72}
        renderItem={(user) => (
          <Card className="flex items-center gap-3 p-3 m-2">
            <img
              src={user.avatar}
              alt={user.name}
              className="size-10 rounded-full"
            />
            <div>
              <div className="font-medium">{user.name}</div>
              <div className="text-sm text-muted-foreground">{user.email}</div>
            </div>
          </Card>
        )}
      />
    )
  },
}

export const CompactList: Story = {
  render: () => {
    const items = Array.from({ length: 500 }, (_, i) => ({
      id: i,
      text: `Item ${i + 1} - Lorem ipsum dolor sit amet`,
    }))

    return (
      <VirtualList
        items={items}
        height={300}
        estimateSize={40}
        renderItem={(item) => (
          <div className="flex items-center h-10 px-4 border-b border-border hover:bg-muted/50">
            {item.text}
          </div>
        )}
      />
    )
  },
}

export const VariableHeight: Story = {
  render: () => {
    const items = Array.from({ length: 100 }, (_, i) => ({
      id: i,
      lines: Math.floor(Math.random() * 5) + 1,
    }))

    return (
      <VirtualList
        items={items}
        height={400}
        estimateSize={80}
        renderItem={(item) => (
          <div className="p-3 border-b border-border">
            {Array.from({ length: item.lines }, (_, j) => (
              <p key={j} className="text-sm mb-1">
                Line {j + 1} of item {item.id + 1}
              </p>
            ))}
          </div>
        )}
      />
    )
  },
}

export const LargeDataset: Story = {
  render: () => {
    const items = Array.from({ length: 10000 }, (_, i) => ({
      id: i,
      index: i,
    }))

    return (
      <div>
        <div className="text-sm text-muted-foreground mb-2">
          Rendering 10,000 items with virtualization
        </div>
        <VirtualList
          items={items}
          height={400}
          estimateSize={40}
          renderItem={(item) => (
            <div className="flex items-center h-10 px-4 border-b border-border">
              <span className="font-mono text-sm">Row #{item.index + 1}</span>
            </div>
          )}
        />
      </div>
    )
  },
}
