import type { Meta, StoryObj } from "@storybook/react"
import { Separator } from "./separator"

const meta = {
  title: "UI/Separator",
  component: Separator,
  tags: ["autodocs"],
} satisfies Meta<typeof Separator>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="w-80">
      <p className="text-sm">Content above</p>
      <Separator className="my-4" />
      <p className="text-sm">Content below</p>
    </div>
  ),
}

export const Vertical: Story = {
  render: () => (
    <div className="flex h-8 items-center gap-4">
      <span className="text-sm">Left</span>
      <Separator orientation="vertical" />
      <span className="text-sm">Right</span>
    </div>
  ),
}

export const WithHeading: Story = {
  render: () => (
    <div className="w-80 space-y-4">
      <div>
        <h4 className="text-sm font-medium">Section 1</h4>
        <p className="text-muted-foreground text-sm">Content for section 1</p>
      </div>
      <Separator />
      <div>
        <h4 className="text-sm font-medium">Section 2</h4>
        <p className="text-muted-foreground text-sm">Content for section 2</p>
      </div>
      <Separator />
      <div>
        <h4 className="text-sm font-medium">Section 3</h4>
        <p className="text-muted-foreground text-sm">Content for section 3</p>
      </div>
    </div>
  ),
}

export const Dashed: Story = {
  render: () => (
    <div className="w-80">
      <p className="text-sm">Content above</p>
      <Separator className="my-4 border-dashed" />
      <p className="text-sm">Content below</p>
    </div>
  ),
}
