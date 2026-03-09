import type { Meta, StoryObj } from "@storybook/react"
import { Kbd } from "./kbd"

const meta = {
  title: "UI/Kbd",
  component: Kbd,
  tags: ["autodocs"],
} satisfies Meta<typeof Kbd>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: "Ctrl",
  },
}

export const KeyboardShortcuts: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Kbd>Ctrl</Kbd>
        <span className="text-muted-foreground text-xs">+</span>
        <Kbd>C</Kbd>
        <span className="text-muted-foreground text-sm">Copy</span>
      </div>
      <div className="flex items-center gap-2">
        <Kbd>Ctrl</Kbd>
        <span className="text-muted-foreground text-xs">+</span>
        <Kbd>V</Kbd>
        <span className="text-muted-foreground text-sm">Paste</span>
      </div>
      <div className="flex items-center gap-2">
        <Kbd>Ctrl</Kbd>
        <span className="text-muted-foreground text-xs">+</span>
        <Kbd>Shift</Kbd>
        <span className="text-muted-foreground text-xs">+</span>
        <Kbd>Z</Kbd>
        <span className="text-muted-foreground text-sm">Redo</span>
      </div>
      <div className="flex items-center gap-2">
        <Kbd>⌘</Kbd>
        <span className="text-muted-foreground text-xs">+</span>
        <Kbd>K</Kbd>
        <span className="text-muted-foreground text-sm">Command Palette</span>
      </div>
    </div>
  ),
}

export const SpecialKeys: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Kbd>Enter</Kbd>
      <Kbd>Esc</Kbd>
      <Kbd>Tab</Kbd>
      <Kbd>Space</Kbd>
      <Kbd>↑</Kbd>
      <Kbd>↓</Kbd>
      <Kbd>←</Kbd>
      <Kbd>→</Kbd>
      <Kbd>Delete</Kbd>
      <Kbd>Backspace</Kbd>
    </div>
  ),
}

export const InContextMenu: Story = {
  render: () => (
    <div className="w-64 rounded-md border p-2">
      <div className="flex cursor-pointer items-center justify-between rounded-sm px-2 py-1.5 hover:bg-accent">
        <span className="text-sm">Copy</span>
        <span className="text-xs text-muted-foreground">Ctrl+C</span>
      </div>
      <div className="flex cursor-pointer items-center justify-between rounded-sm px-2 py-1.5 hover:bg-accent">
        <span className="text-sm">Paste</span>
        <span className="text-xs text-muted-foreground">Ctrl+V</span>
      </div>
      <div className="flex cursor-pointer items-center justify-between rounded-sm px-2 py-1.5 hover:bg-accent">
        <span className="text-sm">Cut</span>
        <span className="text-xs text-muted-foreground">Ctrl+X</span>
      </div>
    </div>
  ),
}
