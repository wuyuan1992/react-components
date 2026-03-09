import type { Meta, StoryObj } from "@storybook/react"
import { Progress } from "./progress"

const meta = {
  title: "UI/Progress",
  component: Progress,
  tags: ["autodocs"],
} satisfies Meta<typeof Progress>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    value: 60,
    className: "w-60",
  },
}

export const Zero: Story = {
  args: {
    value: 0,
    className: "w-60",
  },
}

export const Complete: Story = {
  args: {
    value: 100,
    className: "w-60",
  },
}

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-6 w-60">
      <div className="flex flex-col gap-2">
        <span className="text-sm text-muted-foreground">0%</span>
        <Progress value={0} />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-sm text-muted-foreground">25%</span>
        <Progress value={25} />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-sm text-muted-foreground">50%</span>
        <Progress value={50} />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-sm text-muted-foreground">75%</span>
        <Progress value={75} />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-sm text-muted-foreground">100%</span>
        <Progress value={100} />
      </div>
    </div>
  ),
}
