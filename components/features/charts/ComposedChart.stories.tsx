import type { Meta, StoryObj } from "@storybook/react"
import { ComposedChart } from "./ComposedChart"
import type { ChartConfig } from "@/components/ui/chart"

const meta = {
  title: "Features/Charts/ComposedChart",
  component: ComposedChart,
  tags: ["autodocs"],
} satisfies Meta<typeof ComposedChart>

export default meta
type Story = StoryObj<typeof meta>

const composedData = [
  { month: "Jan", revenue: 4000, cost: 2400, profit: 1600 },
  { month: "Feb", revenue: 3000, cost: 1398, profit: 1602 },
  { month: "Mar", revenue: 5000, cost: 9800, profit: -4800 },
  { month: "Apr", revenue: 2780, cost: 3908, profit: -1128 },
  { month: "May", revenue: 6890, cost: 4800, profit: 2090 },
  { month: "Jun", revenue: 5390, cost: 3800, profit: 1590 },
]

const chartConfig = {
  revenue: { label: "Revenue", color: "var(--color-chart-1)" },
  cost: { label: "Cost", color: "var(--color-chart-2)" },
  profit: { label: "Profit", color: "var(--color-chart-3)" },
} satisfies ChartConfig

export const BarAndLine: Story = {
  args: {
    data: composedData,
    config: chartConfig,
    xAxisKey: "month",
    elements: [
      { type: "bar", dataKey: "revenue" },
      { type: "bar", dataKey: "cost" },
      { type: "line", dataKey: "profit" },
    ],
    height: 300,
  },
}

export const MultipleBars: Story = {
  args: {
    data: composedData,
    config: chartConfig,
    xAxisKey: "month",
    elements: [
      { type: "bar", dataKey: "revenue" },
      { type: "bar", dataKey: "cost" },
      { type: "bar", dataKey: "profit" },
    ],
    height: 300,
  },
}

export const AreaAndLine: Story = {
  args: {
    data: composedData,
    config: chartConfig,
    xAxisKey: "month",
    elements: [
      { type: "area", dataKey: "revenue" },
      { type: "line", dataKey: "profit" },
    ],
    height: 300,
  },
}

export const WithLegend: Story = {
  args: {
    data: composedData,
    config: chartConfig,
    xAxisKey: "month",
    elements: [
      { type: "bar", dataKey: "revenue" },
      { type: "bar", dataKey: "cost" },
      { type: "line", dataKey: "profit" },
    ],
    showLegend: true,
    height: 300,
  },
}

export const StackedBars: Story = {
  args: {
    data: composedData,
    config: chartConfig,
    xAxisKey: "month",
    elements: [
      { type: "bar", dataKey: "revenue", stackId: "a" },
      { type: "bar", dataKey: "cost", stackId: "a" },
    ],
    height: 300,
  },
}
