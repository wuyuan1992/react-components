"use client"

import type { CSSProperties, ReactElement } from "react"
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Cell,
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

export interface BarChartProps {
  /** Data array — each object is one group of bars */
  data: DataPoint[]
  /**
   * Maps each bar key to a display label and color.
   *
   * @example
   * ```tsx
   * const config = {
   *   sales: { label: "Sales", color: "var(--color-chart-1)" },
   *   returns: { label: "Returns", color: "var(--color-chart-2)" },
   * }
   * ```
   */
  config: ChartConfig
  /** Keys from `data` to render as individual bar series */
  bars: string[]
  /** Key in data used for the x-axis categories */
  xAxisKey: string
  /**
   * `"horizontal"` renders bars left-to-right (value axis on x).
   * `"vertical"` is the default (categories on x-axis).
   */
  layout?: "horizontal" | "vertical"
  /** Stack all bars on top of each other — defaults to `false` */
  stacked?: boolean
  /** Corner radius applied to bars — defaults to `4` */
  radius?: number
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

export function BarChart({
  data,
  config,
  bars,
  xAxisKey,
  layout = "vertical",
  stacked = false,
  radius = 4,
  height = 300,
  showGrid = true,
  showTooltip = true,
  showLegend = false,
  className,
}: BarChartProps): ReactElement {
  const isHorizontal = layout === "horizontal"

  return (
    <ChartContainer
      config={config}
      className={cn("w-full", className)}
      style={{ height, aspectRatio: "auto" } as CSSProperties}
    >
      <RechartsBarChart
        data={data}
        layout={isHorizontal ? "vertical" : "horizontal"}
        margin={{ top: 4, right: 4, left: isHorizontal ? 0 : -16, bottom: 4 }}
      >
        {showGrid && (
          <CartesianGrid
            vertical={isHorizontal}
            horizontal={!isHorizontal}
            strokeDasharray="3 3"
          />
        )}
        {isHorizontal ? (
          <>
            <XAxis type="number" tickLine={false} axisLine={false} tickMargin={8} />
            <YAxis
              dataKey={xAxisKey}
              type="category"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              width={80}
            />
          </>
        ) : (
          <>
            <XAxis
              dataKey={xAxisKey}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis tickLine={false} axisLine={false} tickMargin={8} />
          </>
        )}
        {showTooltip && (
          <ChartTooltip content={<ChartTooltipContent />} />
        )}
        {showLegend && (
          <ChartLegend content={<ChartLegendContent />} />
        )}
        {bars.map((key) => (
          <Bar
            key={key}
            dataKey={key}
            fill={`var(--color-${key})`}
            radius={radius}
            stackId={stacked ? "stack" : undefined}
          />
        ))}
      </RechartsBarChart>
    </ChartContainer>
  )
}

export interface SingleBarChartProps {
  /**
   * Data where each item has `name` and `value`.
   * Each bar segment gets its color from `config[item.name]`.
   */
  data: Array<{ name: string; value: number }>
  /**
   * Maps each `name` value to a label and color.
   *
   * @example
   * ```tsx
   * const config = {
   *   chrome: { label: "Chrome", color: "var(--color-chart-1)" },
   *   firefox: { label: "Firefox", color: "var(--color-chart-2)" },
   * }
   * ```
   */
  config: ChartConfig
  /** Key for the x-axis labels — defaults to `"name"` */
  nameKey?: string
  /** Key for bar values — defaults to `"value"` */
  valueKey?: string
  /** Corner radius applied to bars — defaults to `4` */
  radius?: number
  /** Chart height in px — defaults to `300` */
  height?: number
  /** Show grid lines — defaults to `true` */
  showGrid?: boolean
  /** Show hover tooltip — defaults to `true` */
  showTooltip?: boolean
  className?: string
}

/** Bar chart where each bar has its own color from config */
export function SingleBarChart({
  data,
  config,
  nameKey = "name",
  valueKey = "value",
  radius = 4,
  height = 300,
  showGrid = true,
  showTooltip = true,
  className,
}: SingleBarChartProps): ReactElement {
  return (
    <ChartContainer
      config={config}
      className={cn("w-full", className)}
      style={{ height, aspectRatio: "auto" } as CSSProperties}
    >
      <RechartsBarChart
        data={data}
        margin={{ top: 4, right: 4, left: -16, bottom: 4 }}
      >
        {showGrid && (
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
        )}
        <XAxis
          dataKey={nameKey}
          tickLine={false}
          axisLine={false}
          tickMargin={8}
        />
        <YAxis tickLine={false} axisLine={false} tickMargin={8} />
        {showTooltip && (
          <ChartTooltip content={<ChartTooltipContent />} />
        )}
        <Bar dataKey={valueKey} radius={radius}>
          {data.map((item) => (
            <Cell
              key={item[nameKey as keyof typeof item]}
              fill={`var(--color-${item[nameKey as keyof typeof item]})`}
            />
          ))}
        </Bar>
      </RechartsBarChart>
    </ChartContainer>
  )
}
