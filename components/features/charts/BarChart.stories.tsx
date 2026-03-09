import type { Meta, StoryObj } from "@storybook/react"
import { BarChart, SingleBarChart } from "./BarChart"
import type { ChartConfig } from "@/components/ui/chart"

const meta = {
  title: "Features/Charts/BarChart",
  component: BarChart,
  tags: ["autodocs"],
} satisfies Meta<typeof BarChart>

export default meta
type Story = StoryObj<typeof meta>

const sampleData = [
  { month: "Jan", sales: 4000, returns: 400 },
  { month: "Feb", sales: 3000, returns: 300 },
  { month: "Mar", sales: 2000, returns: 200 },
  { month: "Apr", sales: 2780, returns: 278 },
  { month: "May", sales: 1890, returns: 189 },
  { month: "Jun", sales: 2390, returns: 239 },
]

const chartConfig = {
  sales: { label: "Sales", color: "var(--color-chart-1)" },
  returns: { label: "Returns", color: "var(--color-chart-2)" },
} satisfies ChartConfig

export const Default: Story = {
  args: {
    data: sampleData,
    config: chartConfig,
    bars: ["sales", "returns"],
    xAxisKey: "month",
  },
}

export const WithLegend: Story = {
  args: {
    data: sampleData,
    config: chartConfig,
    bars: ["sales", "returns"],
    xAxisKey: "month",
    showLegend: true,
  },
}

export const Horizontal: Story = {
  args: {
    data: sampleData,
    config: chartConfig,
    bars: ["sales", "returns"],
    xAxisKey: "month",
    layout: "horizontal",
  },
}

export const Stacked: Story = {
  args: {
    data: sampleData,
    config: chartConfig,
    bars: ["sales", "returns"],
    xAxisKey: "month",
    stacked: true,
  },
}

export const NoGrid: Story = {
  args: {
    data: sampleData,
    config: chartConfig,
    bars: ["sales", "returns"],
    xAxisKey: "month",
    showGrid: false,
  },
}

// SingleBarChart stories
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
  other: { label: "Other", color: "var(--color-chart-5)" },
} satisfies ChartConfig

/* @ts-expect-error - SingleBarChart uses different props than BarChart */
export const SingleBar: Story = {
  render: () => (
    <SingleBarChart
      data={browserData}
      config={browserConfig}
      nameKey="name"
      valueKey="value"
      height={250}
    />
  ),
}

/* @ts-expect-error - SingleBarChart uses different props than BarChart */
export const SingleBarCustomRadius: Story = {
  render: () => (
    <SingleBarChart
      data={browserData}
      config={browserConfig}
      nameKey="name"
      valueKey="value"
      radius={8}
      height={250}
    />
  ),
}
