import type { Meta, StoryObj } from "@storybook/react"
import { RadarChart } from "./RadarChart"
import type { ChartConfig } from "@/components/ui/chart"

const meta = {
  title: "Features/Charts/RadarChart",
  component: RadarChart,
  tags: ["autodocs"],
} satisfies Meta<typeof RadarChart>

export default meta
type Story = StoryObj<typeof meta>

const radarData = [
  { metric: "Speed", teamA: 80, teamB: 90 },
  { metric: "Strength", teamA: 85, teamB: 75 },
  { metric: "Defense", teamA: 70, teamB: 80 },
  { metric: "Stamina", teamA: 90, teamB: 85 },
  { metric: "Agility", teamA: 75, teamB: 70 },
  { metric: "Strategy", teamA: 80, teamB: 88 },
]

const radarConfig = {
  teamA: { label: "Team A", color: "var(--color-chart-1)" },
  teamB: { label: "Team B", color: "var(--color-chart-2)" },
} satisfies ChartConfig

export const Default: Story = {
  args: {
    data: radarData,
    config: radarConfig,
    radars: ["teamA", "teamB"],
    angleKey: "metric",
    height: 350,
  },
}

export const SingleRadar: Story = {
  args: {
    data: radarData,
    config: { teamA: radarConfig.teamA },
    radars: ["teamA"],
    angleKey: "metric",
    height: 350,
  },
}

export const WithLegend: Story = {
  args: {
    data: radarData,
    config: radarConfig,
    radars: ["teamA", "teamB"],
    angleKey: "metric",
    showLegend: true,
    height: 350,
  },
}

export const NoGrid: Story = {
  args: {
    data: radarData,
    config: radarConfig,
    radars: ["teamA", "teamB"],
    angleKey: "metric",
    showGrid: false,
    height: 350,
  },
}
