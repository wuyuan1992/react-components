"use client"

import type { CSSProperties, ReactElement } from "react"
import {
  RadarChart as RechartsRadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"
import { cn } from "@/lib/utils"
import type { ChartConfig } from "@/components/ui/chart"
import type { DataPoint } from "./chart-types"

export interface RadarChartProps {
  /**
   * Data array — each object is one spoke on the radar.
   * Must contain the `angleKey` field plus each series key.
   *
   * @example
   * ```tsx
   * const data = [
   *   { subject: "Math", alice: 120, bob: 110 },
   *   { subject: "English", alice: 98, bob: 130 },
   * ]
   * ```
   */
  data: DataPoint[]
  /**
   * Maps each series key to a display label and color.
   *
   * @example
   * ```tsx
   * const config = {
   *   alice: { label: "Alice", color: "var(--color-chart-1)" },
   *   bob: { label: "Bob", color: "var(--color-chart-2)" },
   * }
   * ```
   */
  config: ChartConfig
  /** Keys from `data` to render as individual radar series */
  radars: string[]
  /** Key in data that holds the spoke category label */
  angleKey: string
  /** Fill opacity for radar areas — defaults to `0.2` */
  fillOpacity?: number
  /**
   * Render as lines only without fill.
   * Overrides `fillOpacity` to `0` — defaults to `false`.
   */
  lineOnly?: boolean
  /** Show polar grid — defaults to `true` */
  showGrid?: boolean
  /** Show radial axis values — defaults to `false` */
  showRadiusAxis?: boolean
  /** Chart height in px — defaults to `300` */
  height?: number
  /** Show hover tooltip — defaults to `true` */
  showTooltip?: boolean
  /** Show legend — defaults to `false` */
  showLegend?: boolean
  className?: string
}

export function RadarChart({
  data,
  config,
  radars,
  angleKey,
  fillOpacity = 0.2,
  lineOnly = false,
  showGrid = true,
  showRadiusAxis = false,
  height = 300,
  showTooltip = true,
  showLegend = false,
  className,
}: RadarChartProps): ReactElement {
  const resolvedFillOpacity = lineOnly ? 0 : fillOpacity

  return (
    <ChartContainer
      config={config}
      className={cn("w-full", className)}
      style={{ height, aspectRatio: "auto" } as CSSProperties}
    >
      <RechartsRadarChart
        data={data}
        margin={{ top: 8, right: 8, bottom: 8, left: 8 }}
      >
        {showGrid && <PolarGrid />}
        <PolarAngleAxis dataKey={angleKey} tick={{ fontSize: 12 }} />
        {showRadiusAxis && <PolarRadiusAxis tick={{ fontSize: 10 }} />}
        {showTooltip && (
          <ChartTooltip content={<ChartTooltipContent />} />
        )}
        {showLegend && (
          <ChartLegend content={<ChartLegendContent />} />
        )}
        {radars.map((key) => (
          <Radar
            key={key}
            name={key}
            dataKey={key}
            stroke={`var(--color-${key})`}
            fill={`var(--color-${key})`}
            fillOpacity={resolvedFillOpacity}
          />
        ))}
      </RechartsRadarChart>
    </ChartContainer>
  )
}
