"use client"

import type { CSSProperties, ReactElement } from "react"
import {
  ComposedChart as RechartsComposedChart,
  Bar,
  Line,
  Area,
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

interface BarElement {
  type: "bar"
  dataKey: string
  /** Optionally stack bars sharing the same id */
  stackId?: string
  radius?: number
}

interface LineElement {
  type: "line"
  dataKey: string
  curveType?: CurveType
  strokeWidth?: number
  showDots?: boolean
}

interface AreaElement {
  type: "area"
  dataKey: string
  curveType?: CurveType
  fillOpacity?: number
  strokeWidth?: number
  /** Optionally stack areas sharing the same id */
  stackId?: string
}

export type ComposedChartElement = BarElement | LineElement | AreaElement

export interface ComposedChartProps {
  /** Data array — each object is one group on the x-axis */
  data: DataPoint[]
  /**
   * Maps each element key to a display label and color.
   *
   * @example
   * ```tsx
   * const config = {
   *   revenue: { label: "Revenue", color: "var(--color-chart-1)" },
   *   profit: { label: "Profit", color: "var(--color-chart-2)" },
   *   growth: { label: "Growth %", color: "var(--color-chart-3)" },
   * }
   * ```
   */
  config: ChartConfig
  /**
   * Ordered list of chart elements to render.
   * Elements are layered in declaration order (later = on top).
   *
   * @example
   * ```tsx
   * const elements = [
   *   { type: "bar", dataKey: "revenue" },
   *   { type: "area", dataKey: "profit", fillOpacity: 0.2 },
   *   { type: "line", dataKey: "growth", curveType: "linear" },
   * ]
   * ```
   */
  elements: ComposedChartElement[]
  /** Key in data used for the x-axis categories */
  xAxisKey: string
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

export function ComposedChart({
  data,
  config,
  elements,
  xAxisKey,
  height = 300,
  showGrid = true,
  showTooltip = true,
  showLegend = false,
  className,
}: ComposedChartProps): ReactElement {
  return (
    <ChartContainer
      config={config}
      className={cn("w-full", className)}
      style={{ height, aspectRatio: "auto" } as CSSProperties}
    >
      <RechartsComposedChart
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
        {elements.map((el) => {
          const color = `var(--color-${el.dataKey})`

          if (el.type === "bar") {
            return (
              <Bar
                key={el.dataKey}
                dataKey={el.dataKey}
                fill={color}
                radius={el.radius ?? 4}
                stackId={el.stackId}
              />
            )
          }

          if (el.type === "line") {
            return (
              <Line
                key={el.dataKey}
                type={el.curveType ?? "monotone"}
                dataKey={el.dataKey}
                stroke={color}
                strokeWidth={el.strokeWidth ?? 2}
                dot={el.showDots ?? false}
                activeDot={{ r: 4 }}
              />
            )
          }

          // area
          return (
            <Area
              key={el.dataKey}
              type={el.curveType ?? "monotone"}
              dataKey={el.dataKey}
              stroke={color}
              fill={color}
              strokeWidth={el.strokeWidth ?? 2}
              fillOpacity={el.fillOpacity ?? 0.2}
              stackId={el.stackId}
            />
          )
        })}
      </RechartsComposedChart>
    </ChartContainer>
  )
}
