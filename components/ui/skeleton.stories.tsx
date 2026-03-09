import type { Meta, StoryObj } from "@storybook/react"
import { Skeleton } from "./skeleton"

const meta = {
  title: "UI/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
} satisfies Meta<typeof Skeleton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    className: "w-48 h-4",
  },
}

export const Card: Story = {
  render: () => (
    <div className="flex flex-col space-y-3 w-72">
      <Skeleton className="h-32 w-full rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
  ),
}

export const AvatarWithText: Story = {
  render: () => (
    <div className="flex items-center space-x-4">
      <Skeleton className="size-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-24" />
      </div>
    </div>
  ),
}

export const TableRow: Story = {
  render: () => (
    <div className="flex flex-col space-y-3 w-full max-w-md">
      <div className="flex items-center space-x-4">
        <Skeleton className="size-10 rounded-full" />
        <Skeleton className="h-4 flex-1" />
        <Skeleton className="h-4 w-16" />
      </div>
      <div className="flex items-center space-x-4">
        <Skeleton className="size-10 rounded-full" />
        <Skeleton className="h-4 flex-1" />
        <Skeleton className="h-4 w-16" />
      </div>
      <div className="flex items-center space-x-4">
        <Skeleton className="size-10 rounded-full" />
        <Skeleton className="h-4 flex-1" />
        <Skeleton className="h-4 w-16" />
      </div>
    </div>
  ),
}
