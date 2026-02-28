"use client"

import type { CSSProperties, ReactElement } from "react"
import {
  ScatterChart as RechartsScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
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

export interface ScatterPoint {
  x: number
  y: number
  /** Optional third dimension — controls bubble size when `showBubble` is true */
  z?: number
}

export interface ScatterSeries {
  /** Key used to look up label and color from `config` */
  key: string
  data: ScatterPoint[]
}

export interface ScatterChartProps {
  /**
   * One or more scatter series. Each series is independently colored via `config`.
   *
   * @example
   * ```tsx
   * const series = [
   *   { key: "a", data: [{ x: 10, y: 20 }, { x: 30, y: 50 }] },
   *   { key: "b", data: [{ x: 15, y: 35 }, { x: 25, y: 45 }] },
   * ]
   * ```
   */
  series: ScatterSeries[]
  /**
   * Maps each series key to a display label and color.
   *
   * @example
   * ```tsx
   * const config = {
   *   a: { label: "Group A", color: "var(--color-chart-1)" },
   *   b: { label: "Group B", color: "var(--color-chart-2)" },
   * }
   * ```
   */
  config: ChartConfig
  /** Label shown below the x-axis */
  xAxisLabel?: string
  /** Label shown beside the y-axis */
  yAxisLabel?: string
  /**
   * When true, a third `z` dimension controls each dot's size.
   * Range of bubble sizes in px — defaults to `[40, 400]`.
   */
  showBubble?: boolean
  bubbleRange?: [number, number]
  /** Chart height in px — defaults to `300` */
  height?: number
  /** Show grid lines — defaults to `true` */
  showGrid?: boolean
  /** Show hover tooltip — defaults to `true` */
  showTooltip?: boolean
  /** Show legend — defaults to `false` */
  showLegend?: boolean
  className?: string
}

export function ScatterChart({
  series,
  config,
  xAxisLabel,
  yAxisLabel,
  showBubble = false,
  bubbleRange = [40, 400],
  height = 300,
  showGrid = true,
  showTooltip = true,
  showLegend = false,
  className,
}: ScatterChartProps): ReactElement {
  return (
    <ChartContainer
      config={config}
      className={cn("w-full", className)}
      style={{ height, aspectRatio: "auto" } as CSSProperties}
    >
      <RechartsScatterChart margin={{ top: 4, right: 4, left: -16, bottom: 4 }}>
        {showGrid && (
          <CartesianGrid strokeDasharray="3 3" />
        )}
        <XAxis
          type="number"
          dataKey="x"
          name={xAxisLabel ?? "X"}
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          label={
            xAxisLabel
              ? { value: xAxisLabel, position: "insideBottom", offset: -4 }
              : undefined
          }
        />
        <YAxis
          type="number"
          dataKey="y"
          name={yAxisLabel ?? "Y"}
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          label={
            yAxisLabel
              ? { value: yAxisLabel, angle: -90, position: "insideLeft" }
              : undefined
          }
        />
        {showBubble && (
          <ZAxis
            type="number"
            dataKey="z"
            range={bubbleRange}
            name="Size"
          />
        )}
        {showTooltip && (
          <ChartTooltip
            cursor={{ strokeDasharray: "3 3" }}
            content={<ChartTooltipContent />}
          />
        )}
        {showLegend && (
          <ChartLegend content={<ChartLegendContent />} />
        )}
        {series.map((s) => (
          <Scatter
            key={s.key}
            name={s.key}
            data={s.data}
            fill={`var(--color-${s.key})`}
            fillOpacity={0.8}
          />
        ))}
      </RechartsScatterChart>
    </ChartContainer>
  )
}
