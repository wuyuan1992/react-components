"use client"

import type { CSSProperties, ReactElement } from "react"
import {
  AreaChart as RechartsAreaChart,
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

export interface AreaChartProps {
  /** Data array — each object is one point on the x-axis */
  data: DataPoint[]
  /**
   * Maps each series key to a display label and color.
   *
   * @example
   * ```tsx
   * const config = {
   *   revenue: { label: "Revenue", color: "var(--color-chart-1)" },
   *   expenses: { label: "Expenses", color: "var(--color-chart-2)" },
   * }
   * ```
   */
  config: ChartConfig
  /** Keys from `data` to render as individual area series */
  areas: string[]
  /** Key in data used for the x-axis categories */
  xAxisKey: string
  /** Stack areas on top of each other — defaults to `false` */
  stacked?: boolean
  /** Curve interpolation style — defaults to `"monotone"` */
  curveType?: CurveType
  /**
   * Fill opacity for area regions.
   * `"gradient"` applies a top-to-transparent gradient — defaults to `"gradient"`.
   */
  fillOpacity?: number | "gradient"
  /** Stroke width for area lines — defaults to `2` */
  strokeWidth?: number
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

export function AreaChart({
  data,
  config,
  areas,
  xAxisKey,
  stacked = false,
  curveType = "monotone",
  fillOpacity = "gradient",
  strokeWidth = 2,
  height = 300,
  showGrid = true,
  showTooltip = true,
  showLegend = false,
  className,
}: AreaChartProps): ReactElement {
  const useGradient = fillOpacity === "gradient"
  const resolvedFillOpacity = useGradient ? 1 : fillOpacity

  return (
    <ChartContainer
      config={config}
      className={cn("w-full", className)}
      style={{ height, aspectRatio: "auto" } as CSSProperties}
    >
      <RechartsAreaChart
        data={data}
        margin={{ top: 4, right: 4, left: -16, bottom: 4 }}
      >
        {useGradient && (
          <defs>
            {areas.map((key) => (
              <linearGradient
                key={key}
                id={`gradient-${key}`}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor={`var(--color-${key})`}
                  stopOpacity={0.3}
                />
                <stop
                  offset="95%"
                  stopColor={`var(--color-${key})`}
                  stopOpacity={0}
                />
              </linearGradient>
            ))}
          </defs>
        )}
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
        {areas.map((key) => (
          <Area
            key={key}
            type={curveType}
            dataKey={key}
            stroke={`var(--color-${key})`}
            strokeWidth={strokeWidth}
            fill={
              useGradient ? `url(#gradient-${key})` : `var(--color-${key})`
            }
            fillOpacity={resolvedFillOpacity}
            stackId={stacked ? "stack" : undefined}
          />
        ))}
      </RechartsAreaChart>
    </ChartContainer>
  )
}
