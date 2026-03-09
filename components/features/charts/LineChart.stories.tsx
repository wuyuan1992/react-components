import type { Meta, StoryObj } from "@storybook/react"
import { LineChart } from "./LineChart"
import type { ChartConfig } from "@/components/ui/chart"

const meta = {
  title: "Features/Charts/LineChart",
  component: LineChart,
  tags: ["autodocs"],
} satisfies Meta<typeof LineChart>

export default meta
type Story = StoryObj<typeof meta>

const sampleData = [
  { month: "Jan", revenue: 4000, cost: 2400 },
  { month: "Feb", revenue: 3000, cost: 1398 },
  { month: "Mar", revenue: 2000, cost: 9800 },
  { month: "Apr", revenue: 2780, cost: 3908 },
  { month: "May", revenue: 1890, cost: 4800 },
  { month: "Jun", revenue: 2390, cost: 3800 },
]

const chartConfig = {
  revenue: { label: "Revenue", color: "var(--color-chart-1)" },
  cost: { label: "Cost", color: "var(--color-chart-2)" },
} satisfies ChartConfig

export const Default: Story = {
  args: {
    data: sampleData,
    config: chartConfig,
    lines: ["revenue", "cost"],
    xAxisKey: "month",
    height: 300,
  },
}

export const WithDots: Story = {
  args: {
    data: sampleData,
    config: chartConfig,
    lines: ["revenue", "cost"],
    xAxisKey: "month",
    showDots: true,
    height: 300,
  },
}

export const WithLegend: Story = {
  args: {
    data: sampleData,
    config: chartConfig,
    lines: ["revenue", "cost"],
    xAxisKey: "month",
    showLegend: true,
  },
}

export const NoGrid: Story = {
  args: {
    data: sampleData,
    config: chartConfig,
    lines: ["revenue", "cost"],
    xAxisKey: "month",
    showGrid: false,
  },
}

export const SingleLine: Story = {
  args: {
    data: sampleData,
    config: { revenue: { label: "Revenue", color: "var(--color-chart-1)" } },
    lines: ["revenue"],
    xAxisKey: "month",
  },
}

export const StepCurve: Story = {
  args: {
    data: sampleData,
    config: chartConfig,
    lines: ["revenue", "cost"],
    xAxisKey: "month",
    curveType: "step",
  },
}

export const NoTooltip: Story = {
  args: {
    data: sampleData,
    config: chartConfig,
    lines: ["revenue", "cost"],
    xAxisKey: "month",
    showTooltip: false,
  },
}
