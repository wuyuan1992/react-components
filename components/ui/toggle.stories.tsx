import type { Meta, StoryObj } from "@storybook/react"
import { Toggle } from "./toggle"
import { Bold, Italic, Underline, Strikethrough } from "lucide-react"

const meta = {
  title: "UI/Toggle",
  component: Toggle,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "outline"],
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg"],
    },
  },
} satisfies Meta<typeof Toggle>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: <Bold className="size-4" />,
    "aria-label": "Toggle bold",
  },
}

export const Variants: Story = {
  render: () => (
    <div className="flex gap-4">
      <Toggle aria-label="Toggle default">
        <Bold className="size-4" />
      </Toggle>
      <Toggle variant="outline" aria-label="Toggle outline">
        <Bold className="size-4" />
      </Toggle>
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Toggle size="sm" aria-label="Toggle small">
        <Bold className="size-3" />
      </Toggle>
      <Toggle size="default" aria-label="Toggle default">
        <Bold className="size-4" />
      </Toggle>
      <Toggle size="lg" aria-label="Toggle large">
        <Bold className="size-5" />
      </Toggle>
    </div>
  ),
}

export const WithText: Story = {
  render: () => (
    <div className="flex gap-4">
      <Toggle aria-label="Toggle italic">
        <Italic className="size-4" />
        Italic
      </Toggle>
      <Toggle aria-label="Toggle underline">
        <Underline className="size-4" />
        Underline
      </Toggle>
    </div>
  ),
}

export const Pressed: Story = {
  args: {
    children: <Bold className="size-4" />,
    "aria-label": "Toggle bold",
    defaultPressed: true,
  },
}

export const Disabled: Story = {
  args: {
    children: <Bold className="size-4" />,
    "aria-label": "Toggle bold",
    disabled: true,
  },
}

export const FormattingToolbar: Story = {
  render: () => (
    <div className="flex items-center gap-1 p-1 rounded-md border bg-muted">
      <Toggle aria-label="Toggle bold">
        <Bold className="size-4" />
      </Toggle>
      <Toggle aria-label="Toggle italic" defaultPressed>
        <Italic className="size-4" />
      </Toggle>
      <Toggle aria-label="Toggle underline">
        <Underline className="size-4" />
      </Toggle>
      <Toggle aria-label="Toggle strikethrough" disabled>
        <Strikethrough className="size-4" />
      </Toggle>
    </div>
  ),
}
