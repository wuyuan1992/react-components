"use client"

import { useEffect, useRef, forwardRef, useImperativeHandle, useState, useCallback } from "react"
import * as d3 from "d3"
import { cn } from "@/lib/utils"
import "./flamegraph.css"

interface D3FlameGraphChart {
  minHeight: (value: number) => D3FlameGraphChart
  width: (value: number) => D3FlameGraphChart
  height: (value: number) => D3FlameGraphChart
  title: (value: string) => D3FlameGraphChart
  selfValue: (value: boolean) => D3FlameGraphChart
  transitionDuration: (value: number) => D3FlameGraphChart
  tooltip: (value: boolean) => D3FlameGraphChart
  setZoom: (value: boolean) => D3FlameGraphChart
  color: (fn: (d: { data: FlameGraphNode; depth: number }) => string) => D3FlameGraphChart
  onClick: (fn: (d: { data: FlameGraphNode }) => void) => D3FlameGraphChart
  onHover: (fn: (d: { data: FlameGraphNode } | null) => void) => D3FlameGraphChart
  resetZoom: () => void
}

type FlameGraphChart = D3FlameGraphChart

export interface FlameGraphNode {
  /** Node label (function name, module, etc.) */
  name: string
  /** Numeric value — time spent or sample count */
  value: number
  /** Child nodes */
  children?: FlameGraphNode[]
  /** Additional data attached to the node */
  [key: string]: unknown
}

export interface FlameGraphRef {
  /** Replace the chart data */
  update: (data: FlameGraphNode) => void
  /** Reset zoom to the root frame */
  resetZoom: () => void
  /** Remove all chart elements */
  clear: () => void
}

export interface FlameGraphProps {
  /** Flame graph data tree */
  data?: FlameGraphNode
  /** Chart height in pixels or CSS string */
  height?: number | string
  /** Chart width in pixels or CSS string */
  width?: number | string
  /** Minimum frame height in pixels */
  minHeight?: number
  /** Show tooltip on hover */
  showDetails?: boolean
  /** Enable click-to-zoom */
  enableZoom?: boolean
  /** Custom frame color function */
  colorFunction?: (d: { data: FlameGraphNode; depth: number }) => string
  /** Called when a frame is clicked */
  onClick?: (d: { data: FlameGraphNode }) => void
  /** Called when a frame is hovered; null on mouse-out */
  onHover?: (d: { data: FlameGraphNode } | null) => void
  /** Additional class name */
  className?: string
  /** Chart title displayed above the flame graph */
  title?: string
}

const FlameGraphComponent = forwardRef<FlameGraphRef, FlameGraphProps>(
  (
    {
      data,
      height = 400,
      width = "100%",
      minHeight = 0,
      showDetails = true,
      enableZoom = true,
      colorFunction,
      onClick,
      onHover,
      className,
      title,
    },
    ref
  ) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const chartRef = useRef<FlameGraphChart | null>(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const flamegraphFnRef = useRef<(() => FlameGraphChart) | null>(null)
    const cssLoadedRef = useRef(false)

    // Load d3-flame-graph script and CSS via CDN
    useEffect(() => {
      if (typeof window === "undefined") return

      // Load CSS once
      if (!cssLoadedRef.current) {
        const link = document.createElement("link")
        link.rel = "stylesheet"
        link.href = "https://unpkg.com/d3-flame-graph@4.1.3/dist/d3-flamegraph.css"
        document.head.appendChild(link)
        cssLoadedRef.current = true
      }

      // Check if already loaded by a previous render
      if ((d3 as unknown as Record<string, unknown>).flamegraph) {
        // @ts-expect-error d3-flame-graph extends d3 at runtime via CDN script
        flamegraphFnRef.current = d3.flamegraph
        setIsLoaded(true)
        return
      }

      const script = document.createElement("script")
      script.src = "https://unpkg.com/d3-flame-graph@4.1.3/dist/d3-flamegraph.min.js"
      script.async = true
      script.onload = () => {
        // @ts-expect-error d3-flame-graph extends d3 at runtime via CDN script
        flamegraphFnRef.current = d3.flamegraph
        setIsLoaded(true)
      }
      script.onerror = () => {
        setError("Failed to load flame graph library")
      }
      document.head.appendChild(script)

      return () => {
        // Script is kept in DOM — other component instances may still use it
      }
    }, [])

    // Initialize chart with current props
    const initChart = useCallback(() => {
      if (!isLoaded || !containerRef.current || !flamegraphFnRef.current) return

      // Clear previous chart before re-initializing
      d3.select(containerRef.current).selectAll("*").remove()

      try {
        const chart = flamegraphFnRef.current()
        chart.minHeight(minHeight)
        chart.width(containerRef.current.clientWidth)
        chart.height(typeof height === "number" ? height : 400)
        chart.title(title ?? "")
        chart.selfValue(true)
        chart.transitionDuration(250)

        if (showDetails) {
          chart.tooltip(true)
        }

        if (enableZoom) {
          chart.setZoom(true)
        }

        if (colorFunction) {
          chart.color(colorFunction)
        }

        if (onClick) {
          chart.onClick(onClick)
        }

        if (onHover) {
          chart.onHover(onHover)
        }

        chartRef.current = chart

        if (data) {
          d3.select(containerRef.current).datum(data).call(chart as unknown as (...args: unknown[]) => void)
        }
      } catch (err) {
        console.error("FlameGraph init error:", err)
        setError("Failed to initialize flame graph")
      }
    }, [isLoaded, data, height, minHeight, showDetails, enableZoom, colorFunction, onClick, onHover, title])

    useEffect(() => {
      initChart()

      const handleResize = () => {
        if (containerRef.current && chartRef.current) {
          chartRef.current.width(containerRef.current.clientWidth)
          d3.select(containerRef.current).call(chartRef.current as unknown as (...args: unknown[]) => void)
        }
      }

      window.addEventListener("resize", handleResize)

      return () => {
        window.removeEventListener("resize", handleResize)
        if (containerRef.current) {
          d3.select(containerRef.current).selectAll("*").remove()
        }
      }
    }, [initChart])

    useImperativeHandle(
      ref,
      () => ({
        update: (newData: FlameGraphNode) => {
          if (containerRef.current && chartRef.current) {
            d3.select(containerRef.current).datum(newData).call(chartRef.current as unknown as (...args: unknown[]) => void)
          }
        },
        resetZoom: () => {
          if (chartRef.current) {
            chartRef.current.resetZoom()
          }
        },
        clear: () => {
          if (containerRef.current) {
            d3.select(containerRef.current).selectAll("*").remove()
          }
        },
      }),
      []
    )

    return (
      <div
        className={cn("overflow-hidden rounded-md border border-border bg-background", className)}
        style={{ height, width }}
      >
        <div ref={containerRef} className="flamegraph-container h-full w-full">
          {error && (
            <div className="flex h-full items-center justify-center text-sm text-destructive">
              {error}
            </div>
          )}
          {!isLoaded && !error && (
            <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
              Loading flame graph...
            </div>
          )}
        </div>
      </div>
    )
  }
)

FlameGraphComponent.displayName = "FlameGraph"

export { FlameGraphComponent as FlameGraph }
