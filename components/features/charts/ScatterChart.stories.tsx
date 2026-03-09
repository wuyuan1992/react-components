import type { Meta, StoryObj } from "@storybook/react"
import { ScatterChart } from "./ScatterChart"
import type { ChartConfig } from "@/components/ui/chart"

const meta = {
  title: "Features/Charts/ScatterChart",
  component: ScatterChart,
  tags: ["autodocs"],
} satisfies Meta<typeof ScatterChart>

export default meta
type Story = StoryObj<typeof meta>

const chartConfig = {
  A: { label: "Group A", color: "var(--color-chart-1)" },
  B: { label: "Group B", color: "var(--color-chart-2)" },
  C: { label: "Group C", color: "var(--color-chart-3)" },
} satisfies ChartConfig

export const Default: Story = {
  args: {
    series: [
      {
        key: "A",
        data: [
          { x: 100, y: 200 },
          { x: 120, y: 180 },
          { x: 150, y: 220 },
          { x: 170, y: 190 },
        ],
      },
      {
        key: "B",
        data: [
          { x: 200, y: 250 },
          { x: 220, y: 230 },
          { x: 250, y: 270 },
          { x: 280, y: 260 },
        ],
      },
      {
        key: "C",
        data: [
          { x: 300, y: 320 },
          { x: 320, y: 300 },
          { x: 350, y: 350 },
          { x: 380, y: 330 },
        ],
      },
    ],
    config: chartConfig,
    height: 300,
  },
}

export const SingleSeries: Story = {
  args: {
    series: [
      {
        key: "A",
        data: [
          { x: 100, y: 200 },
          { x: 120, y: 180 },
          { x: 150, y: 220 },
          { x: 170, y: 190 },
        ],
      },
    ],
    config: { A: chartConfig.A },
    height: 300,
  },
}

export const WithLegend: Story = {
  args: {
    series: [
      {
        key: "A",
        data: [
          { x: 100, y: 200 },
          { x: 150, y: 220 },
          { x: 170, y: 190 },
        ],
      },
      {
        key: "B",
        data: [
          { x: 200, y: 250 },
          { x: 250, y: 270 },
          { x: 280, y: 260 },
        ],
      },
    ],
    config: { A: chartConfig.A, B: chartConfig.B },
    showLegend: true,
    height: 300,
  },
}

export const BubbleChart: Story = {
  args: {
    series: [
      {
        key: "A",
        data: [
          { x: 100, y: 200, z: 100 },
          { x: 150, y: 220, z: 200 },
          { x: 170, y: 190, z: 150 },
        ],
      },
      {
        key: "B",
        data: [
          { x: 200, y: 250, z: 180 },
          { x: 250, y: 270, z: 120 },
          { x: 280, y: 260, z: 250 },
        ],
      },
    ],
    config: { A: chartConfig.A, B: chartConfig.B },
    showBubble: true,
    height: 300,
  },
}
