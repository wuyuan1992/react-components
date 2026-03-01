"use client"

import { useEffect, useRef, forwardRef, useImperativeHandle, useState, useCallback } from "react"
import * as d3 from "d3"
import { cn } from "@/lib/utils"
import "./flamegraph.css"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FlameGraphChart = any

export interface FlameGraphNode {
  /** 节点名称 */
  name: string
  /** 节点值（占用时间/样本数） */
  value: number
  /** 子节点 */
  children?: FlameGraphNode[]
  /** 额外属性 */
  [key: string]: unknown
}

export interface FlameGraphRef {
  /** 更新数据 */
  update: (data: FlameGraphNode) => void
  /** 重置缩放 */
  resetZoom: () => void
  /** 清空图表 */
  clear: () => void
}

export interface FlameGraphProps {
  /** 火焰图数据 */
  data?: FlameGraphNode
  /** 图表高度 */
  height?: number | string
  /** 图表宽度 */
  width?: number | string
  /** 最小帧宽度（像素） */
  minHeight?: number
  /** 是否显示详细信息 */
  showDetails?: boolean
  /** 是否启用缩放 */
  enableZoom?: boolean
  /** 自定义颜色函数 */
  colorFunction?: (d: { data: FlameGraphNode; depth: number }) => string
  /** 点击回调 */
  onClick?: (d: { data: FlameGraphNode }) => void
  /** 悬停回调 */
  onHover?: (d: { data: FlameGraphNode } | null) => void
  /** 类名 */
  className?: string
  /** 标题 */
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

    // 加载 d3-flame-graph 脚本和 CSS
    useEffect(() => {
      if (typeof window === "undefined") return

      // 加载 CSS（只加载一次）
      if (!cssLoadedRef.current) {
        const link = document.createElement("link")
        link.rel = "stylesheet"
        link.href = "https://unpkg.com/d3-flame-graph@4.1.3/dist/d3-flamegraph.css"
        document.head.appendChild(link)
        cssLoadedRef.current = true
      }

      // 检查是否已经加载
      if ((d3 as unknown as Record<string, unknown>).flamegraph) {
        // @ts-expect-error d3 扩展属性
        flamegraphFnRef.current = d3.flamegraph
        setIsLoaded(true)
        return
      }

      const script = document.createElement("script")
      script.src = "https://unpkg.com/d3-flame-graph@4.1.3/dist/d3-flamegraph.min.js"
      script.async = true
      script.onload = () => {
        // @ts-expect-error d3 扩展属性
        flamegraphFnRef.current = d3.flamegraph
        setIsLoaded(true)
      }
      script.onerror = () => {
        setError("Failed to load flame graph library")
      }
      document.head.appendChild(script)

      return () => {
        // 不移除脚本，因为可能其他组件也在使用
      }
    }, [])

    // 初始化图表
    const initChart = useCallback(() => {
      if (!isLoaded || !containerRef.current || !flamegraphFnRef.current) return

      // 清理旧图表
      d3.select(containerRef.current).selectAll("*").remove()

      try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        const chart = flamegraphFnRef.current()
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        chart.minHeight(minHeight)
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        chart.width(containerRef.current.clientWidth)
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        chart.height(typeof height === "number" ? height : 400)
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        chart.title(title ?? "")
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        chart.selfValue(true)
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        chart.transitionDuration(250)

        if (showDetails) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-call
          chart.tooltip(true)
        }

        if (enableZoom) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-call
          chart.setZoom(true)
        }

        if (colorFunction) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-call
          chart.color(colorFunction)
        }

        if (onClick) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-call
          chart.onClick(onClick)
        }

        if (onHover) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-call
          chart.onHover(onHover)
        }

        chartRef.current = chart

        if (data) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-call
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
          // eslint-disable-next-line @typescript-eslint/no-unsafe-call
          chartRef.current.width(containerRef.current.clientWidth)
          // eslint-disable-next-line @typescript-eslint/no-unsafe-call
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
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call
            d3.select(containerRef.current).datum(newData).call(chartRef.current as unknown as (...args: unknown[]) => void)
          }
        },
        resetZoom: () => {
          if (chartRef.current) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call
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
        className={cn("overflow-hidden rounded-md border border-[var(--color-border)] bg-[var(--color-background)]", className)}
        style={{ height, width }}
      >
        <div ref={containerRef} className="flamegraph-container h-full w-full">
          {error && (
            <div className="flex h-full items-center justify-center text-sm text-[var(--color-destructive)]">
              {error}
            </div>
          )}
          {!isLoaded && !error && (
            <div className="flex h-full items-center justify-center text-sm text-[var(--color-muted-foreground)]">
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
