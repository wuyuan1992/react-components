import type { Meta, StoryObj } from "@storybook/react"
import { Slider } from "./slider"
import { Label } from "./label"

const meta = {
  title: "UI/Slider",
  component: Slider,
  tags: ["autodocs"],
} satisfies Meta<typeof Slider>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    defaultValue: [50],
    max: 100,
    step: 1,
    className: "w-60",
  },
}

export const WithLabel: Story = {
  render: () => (
    <div className="w-60 space-y-3">
      <div className="flex justify-between">
        <Label>Volume</Label>
        <span className="text-sm text-muted-foreground">50%</span>
      </div>
      <Slider defaultValue={[50]} max={100} step={1} />
    </div>
  ),
}

export const Range: Story = {
  render: () => (
    <div className="w-60 space-y-3">
      <div className="flex justify-between">
        <Label>Price Range</Label>
        <span className="text-sm text-muted-foreground">$200 - $800</span>
      </div>
      <Slider defaultValue={[200, 800]} max={1000} step={50} />
    </div>
  ),
}

export const Steps: Story = {
  render: () => (
    <div className="w-60 space-y-3">
      <Label>Steps of 25</Label>
      <Slider defaultValue={[50]} max={100} step={25} />
    </div>
  ),
}

export const Disabled: Story = {
  render: () => (
    <div className="w-60 space-y-3">
      <Label>Disabled</Label>
      <Slider defaultValue={[50]} disabled />
    </div>
  ),
}

export const MinMax: Story = {
  render: () => (
    <div className="w-60 space-y-3">
      <div className="flex justify-between">
        <Label>Temperature (°C)</Label>
        <span className="text-sm text-muted-foreground">Range: -20 to 40</span>
      </div>
      <Slider defaultValue={[20]} min={-20} max={40} step={5} />
    </div>
  ),
}
