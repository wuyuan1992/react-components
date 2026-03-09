import type { Meta, StoryObj } from "@storybook/react"
import { Textarea } from "./textarea"
import { Label } from "./label"

const meta = {
  title: "UI/Textarea",
  component: Textarea,
  tags: ["autodocs"],
} satisfies Meta<typeof Textarea>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: "Type your message here.",
  },
}

export const WithLabel: Story = {
  render: () => (
    <div className="grid w-full max-w-sm gap-1.5">
      <Label htmlFor="message">Message</Label>
      <Textarea id="message" placeholder="Type your message here." />
    </div>
  ),
}

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: "Disabled textarea",
  },
}

export const Invalid: Story = {
  args: {
    "aria-invalid": true,
    placeholder: "Invalid textarea",
    defaultValue: "Invalid value",
  },
}

export const WithDefaultValue: Story = {
  args: {
    defaultValue: "This is some default text that appears in the textarea.",
  },
}

export const Resizable: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-full max-w-sm">
      <div className="grid gap-1.5">
        <Label>No resize</Label>
        <Textarea className="resize-none" placeholder="Cannot resize" />
      </div>
      <div className="grid gap-1.5">
        <Label>Vertical resize only</Label>
        <Textarea className="resize-y" placeholder="Resize vertically" />
      </div>
      <div className="grid gap-1.5">
        <Label>Horizontal resize only</Label>
        <Textarea className="resize-x" placeholder="Resize horizontally" />
      </div>
    </div>
  ),
}

export const Rows: Story = {
  args: {
    rows: 6,
    placeholder: "This textarea has 6 rows",
  },
}
