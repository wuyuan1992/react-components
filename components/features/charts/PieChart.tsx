"use client"

import type { CSSProperties, ReactElement } from "react"
import {
  PieChart as RechartsPieChart,
  Pie,
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

export interface PieChartProps {
  /**
   * Data array — each item is one pie segment.
   * The key identified by `nameKey` must match a key in `config`.
   *
   * @example
   * ```tsx
   * const data = [
   *   { browser: "chrome", visitors: 275 },
   *   { browser: "safari", visitors: 200 },
   * ]
   * ```
   */
  data: Record<string, string | number>[]
  /**
   * Maps each segment name to a label and color.
   *
   * @example
   * ```tsx
   * const config = {
   *   chrome: { label: "Chrome", color: "var(--color-chart-1)" },
   *   safari: { label: "Safari", color: "var(--color-chart-2)" },
   * }
   * ```
   */
  config: ChartConfig
  /** Key in data that identifies each segment — defaults to `"name"` */
  nameKey?: string
  /** Key in data that holds the numeric value — defaults to `"value"` */
  dataKey?: string
  /**
   * Render as a donut chart by providing an inner radius.
   * Pass `true` for a sensible default (60% of outerRadius).
   */
  donut?: boolean | number
  /** Outer radius as px or percentage string — defaults to `"80%"` */
  outerRadius?: number | string
  /** Gap between segments in degrees — defaults to `2` */
  paddingAngle?: number
  /** Show labels on segments — defaults to `false` */
  showLabel?: boolean
  /** Show hover tooltip — defaults to `true` */
  showTooltip?: boolean
  /** Show legend — defaults to `true` */
  showLegend?: boolean
  /** Chart height in px — defaults to `300` */
  height?: number
  className?: string
}

export function PieChart({
  data,
  config,
  nameKey = "name",
  dataKey = "value",
  donut = false,
  outerRadius = "80%",
  paddingAngle = 2,
  showLabel = false,
  showTooltip = true,
  showLegend = true,
  height = 300,
  className,
}: PieChartProps): ReactElement {
  const innerRadius =
    donut === true
      ? "55%"
      : typeof donut === "number"
        ? donut
        : undefined

  return (
    <ChartContainer
      config={config}
      className={cn("w-full", className)}
      style={{ height, aspectRatio: "auto" } as CSSProperties}
    >
      <RechartsPieChart margin={{ top: 4, right: 4, bottom: 4, left: 4 }}>
        {showTooltip && (
          <ChartTooltip content={<ChartTooltipContent nameKey={nameKey} />} />
        )}
        {showLegend && (
          <ChartLegend content={<ChartLegendContent nameKey={nameKey} />} />
        )}
        <Pie
          data={data}
          dataKey={dataKey}
          nameKey={nameKey}
          cx="50%"
          cy="50%"
          outerRadius={outerRadius}
          innerRadius={innerRadius}
          paddingAngle={paddingAngle}
          label={
            showLabel
              ? ({ name, percent }) =>
                  `${name} ${((percent ?? 0) * 100).toFixed(0)}%`
              : false
          }
          labelLine={showLabel}
        >
          {data.map((item, index) => {
            const key = String(item[nameKey])
            return (
              <Cell
                key={`cell-${index}`}
                fill={`var(--color-${key})`}
                stroke="var(--color-background)"
                strokeWidth={2}
              />
            )
          })}
        </Pie>
      </RechartsPieChart>
    </ChartContainer>
  )
}
