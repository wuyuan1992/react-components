"use client"

import type { CSSProperties, ReactElement } from "react"
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
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
import type { CurveType, DataPoint } from "./chart-types"

export interface LineChartProps {
  /** Data array — each object is one point on the x-axis */
  data: DataPoint[]
  /**
   * Maps each series key to a display label and color.
   * Colors support CSS variables, hex, or theme keys.
   *
   * @example
   * ```tsx
   * const config = {
   *   revenue: { label: "Revenue", color: "var(--color-chart-1)" },
   *   cost: { label: "Cost", color: "var(--color-chart-2)" },
   * }
   * ```
   */
  config: ChartConfig
  /** Keys from `data` to render as individual lines */
  lines: string[]
  /** Key in data used for the x-axis categories */
  xAxisKey: string
  /** Curve interpolation style — defaults to `"monotone"` */
  curveType?: CurveType
  /** Show data-point dots on each line — defaults to `false` */
  showDots?: boolean
  /** Chart height in px — defaults to `300` */
  height?: number
  /** Show horizontal grid lines — defaults to `true` */
  showGrid?: boolean
  /** Show hover tooltip — defaults to `true` */
  showTooltip?: boolean
  /** Show bottom legend — defaults to `false` */
  showLegend?: boolean
  className?: string
}

export function LineChart({
  data,
  config,
  lines,
  xAxisKey,
  curveType = "monotone",
  showDots = false,
  height = 300,
  showGrid = true,
  showTooltip = true,
  showLegend = false,
  className,
}: LineChartProps): ReactElement {
  return (
    <ChartContainer
      config={config}
      className={cn("w-full", className)}
      style={{ height, aspectRatio: "auto" } as CSSProperties}
    >
      <RechartsLineChart
        data={data}
        margin={{ top: 4, right: 4, left: -16, bottom: 4 }}
      >
        {showGrid && (
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
        )}
        <XAxis
          dataKey={xAxisKey}
          tickLine={false}
          axisLine={false}
          tickMargin={8}
        />
        <YAxis tickLine={false} axisLine={false} tickMargin={8} />
        {showTooltip && (
          <ChartTooltip content={<ChartTooltipContent />} />
        )}
        {showLegend && (
          <ChartLegend content={<ChartLegendContent />} />
        )}
        {lines.map((key) => (
          <Line
            key={key}
            type={curveType}
            dataKey={key}
            stroke={`var(--color-${key})`}
            strokeWidth={2}
            dot={showDots}
            activeDot={{ r: 4 }}
          />
        ))}
      </RechartsLineChart>
    </ChartContainer>
  )
}
