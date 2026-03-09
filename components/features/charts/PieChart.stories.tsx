import type { Meta, StoryObj } from "@storybook/react"
import { PieChart } from "./PieChart"
import type { ChartConfig } from "@/components/ui/chart"

const meta = {
  title: "Features/Charts/PieChart",
  component: PieChart,
  tags: ["autodocs"],
} satisfies Meta<typeof PieChart>

export default meta
type Story = StoryObj<typeof meta>

const browserData = [
  { name: "chrome", value: 275 },
  { name: "safari", value: 200 },
  { name: "firefox", value: 187 },
  { name: "edge", value: 173 },
  { name: "other", value: 90 },
]

const browserConfig = {
  chrome: { label: "Chrome", color: "var(--color-chart-1)" },
  safari: { label: "Safari", color: "var(--color-chart-2)" },
  firefox: { label: "Firefox", color: "var(--color-chart-3)" },
  edge: { label: "Edge", color: "var(--color-chart-4)" },
  other: { label: "Other", color: "color-chart-5)" },
} satisfies ChartConfig

export const Default: Story = {
  args: {
    data: browserData,
    config: browserConfig,
    height: 300,
  },
}

export const Donut: Story = {
  args: {
    data: browserData,
    config: browserConfig,
    donut: true,
    height: 300,
  },
}

export const WithLabels: Story = {
  args: {
    data: browserData,
    config: browserConfig,
    showLabel: true,
    height: 350,
  },
}

export const NoLegend: Story = {
  args: {
    data: browserData,
    config: browserConfig,
    showLegend: false,
    height: 300,
  },
}

export const NoTooltip: Story = {
  args: {
    data: browserData,
    config: browserConfig,
    showTooltip: false,
    height: 300,
  },
}
