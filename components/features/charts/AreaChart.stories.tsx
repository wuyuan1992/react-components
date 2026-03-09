import type { Meta, StoryObj } from "@storybook/react"
import { AreaChart } from "./AreaChart"
import type { ChartConfig } from "@/components/ui/chart"

const meta = {
  title: "Features/Charts/AreaChart",
  component: AreaChart,
  tags: ["autodocs"],
} satisfies Meta<typeof AreaChart>

export default meta
type Story = StoryObj<typeof meta>

const sampleData = [
  { month: "Jan", revenue: 4000, profit: 2400 },
  { month: "Feb", revenue: 3000, profit: 1398 },
  { month: "Mar", revenue: 2000, profit: 9800 },
  { month: "Apr", revenue: 2780, profit: 3908 },
  { month: "May", revenue: 1890, profit: 4800 },
  { month: "Jun", revenue: 2390, profit: 3800 },
]

const chartConfig = {
  revenue: { label: "Revenue", color: "var(--color-chart-1)" },
  profit: { label: "Profit", color: "var(--color-chart-2)" },
} satisfies ChartConfig

export const Default: Story = {
  args: {
    data: sampleData,
    config: chartConfig,
    areas: ["revenue", "profit"],
    xAxisKey: "month",
    height: 300,
  },
}

export const Stacked: Story = {
  args: {
    data: sampleData,
    config: chartConfig,
    areas: ["revenue", "profit"],
    xAxisKey: "month",
    stacked: true,
    height: 300,
  },
}

export const WithLegend: Story = {
  args: {
    data: sampleData,
    config: chartConfig,
    areas: ["revenue", "profit"],
    xAxisKey: "month",
    showLegend: true,
  },
}

export const NoGrid: Story = {
  args: {
    data: sampleData,
    config: chartConfig,
    areas: ["revenue", "profit"],
    xAxisKey: "month",
    showGrid: false,
  },
}

export const SingleArea: Story = {
  args: {
    data: sampleData,
    config: { revenue: { label: "Revenue", color: "var(--color-chart-1)" } },
    areas: ["revenue"],
    xAxisKey: "month",
  },
}

export const SolidFill: Story = {
  args: {
    data: sampleData,
    config: chartConfig,
    areas: ["revenue", "profit"],
    xAxisKey: "month",
    fillOpacity: 0.3,
    height: 300,
  },
}
