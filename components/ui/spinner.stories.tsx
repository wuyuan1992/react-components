import type { Meta, StoryObj } from "@storybook/react"
import { Spinner } from "./spinner"
import { Button } from "./button"

const meta = {
  title: "UI/Spinner",
  component: Spinner,
  tags: ["autodocs"],
} satisfies Meta<typeof Spinner>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Spinner className="size-3" />
      <Spinner className="size-4" />
      <Spinner className="size-6" />
      <Spinner className="size-8" />
      <Spinner className="size-10" />
    </div>
  ),
}

export const InButton: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button disabled>
        <Spinner /> Loading...
      </Button>
      <Button variant="outline" disabled>
        <Spinner /> Processing
      </Button>
    </div>
  ),
}
