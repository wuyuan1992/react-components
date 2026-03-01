"use client"

import { useEffect, useRef, useCallback, forwardRef, useImperativeHandle, useState } from "react"
import Gantt from "frappe-gantt"
import { cn } from "@/lib/utils"
import "./gantt.css"

export interface GanttTask {
  /** 任务 ID */
  id: string
  /** 任务名称 */
  name: string
  /** 开始时间 */
  start: string
  /** 结束时间 */
  end: string
  /** 进度百分比 (0-100) */
  progress?: number
  /** 任务依赖（任务 ID 数组） */
  dependencies?: string[]
  /** 自定义类名 */
  custom_class?: string
  /** 颜色 */
  color?: string
  /** 额外属性 */
  [key: string]: unknown
}

export type GanttViewMode = "Quarter Day" | "Half Day" | "Day" | "Week" | "Month" | "Year"

export interface GanttChartRef {
  /** 切换视图模式 */
  setViewMode: (mode: GanttViewMode) => void
  /** 滚动到指定日期 */
  scrollToDate: (date: string) => void
  /** 刷新图表 */
  refresh: (tasks: GanttTask[]) => void
}

export interface GanttChartProps {
  /** 任务列表 */
  tasks: GanttTask[]
  /** 视图模式 */
  viewMode?: GanttViewMode
  /** 语言 */
  locale?: string
  /** 自定义弹窗 HTML */
  customPopupHtml?: (task: GanttTask) => string
  /** 点击任务回调 */
  onTaskClick?: (task: GanttTask) => void
  /** 日期变化回调 */
  onDateChange?: (task: GanttTask, start: Date, end: Date) => void
  /** 进度变化回调 */
  onProgressChange?: (task: GanttTask, progress: number) => void
  /** 视图变化回调 */
  onViewChange?: (mode: GanttViewMode) => void
  /** 高度 */
  height?: number | string
  /** 宽度 */
  width?: number | string
  /** 类名 */
  className?: string
  /** 是否启用拖拽调整日期 */
  draggable?: boolean
  /** 是否启用进度条拖拽 */
  progressDraggable?: boolean
  /** 是否可点击 */
  clickable?: boolean
}

const GanttChart = forwardRef<GanttChartRef, GanttChartProps>(
  (
    {
      tasks,
      viewMode = "Day",
      locale = "en",
      customPopupHtml,
      onTaskClick,
      onDateChange,
      onProgressChange,
      onViewChange,
      height = 400,
      width = "100%",
      className,
      draggable = true,
      progressDraggable = true,
      clickable = true,
    },
    ref
  ) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const ganttRef = useRef<Gantt | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [isReady, setIsReady] = useState(false)

    const refresh = useCallback((newTasks: GanttTask[]) => {
      if (ganttRef.current) {
        ganttRef.current.refresh(newTasks)
      }
    }, [])

    const setViewMode = useCallback((mode: GanttViewMode) => {
      if (ganttRef.current) {
        ganttRef.current.change_view_mode(mode)
        onViewChange?.(mode)
      }
    }, [onViewChange])

    const scrollToToday = useCallback(() => {
      if (ganttRef.current) {
        ganttRef.current.scroll_to_today()
      }
    }, [])

    useImperativeHandle(
      ref,
      () => ({
        setViewMode,
        scrollToDate: () => {
          scrollToToday()
        },
        refresh,
      }),
      [setViewMode, scrollToToday, refresh]
    )

    useEffect(() => {
      if (!containerRef.current || tasks.length === 0) {
        setIsReady(true)
        return
      }

      // 清理旧内容
      containerRef.current.innerHTML = ""

      const ganttOptions: Record<string, unknown> = {
        view_mode: viewMode,
        language: locale,
        draggable,
        progress: progressDraggable,
        clickable,
      }

      // 添加可选回调
      if (onTaskClick) ganttOptions.on_click = onTaskClick
      if (onDateChange) ganttOptions.on_date_change = onDateChange
      if (onProgressChange) ganttOptions.on_progress_change = onProgressChange
      if (onViewChange) ganttOptions.on_view_change = onViewChange
      if (customPopupHtml) ganttOptions.custom_popup_html = customPopupHtml

      try {
        ganttRef.current = new Gantt(containerRef.current, tasks, ganttOptions)
        setError(null)
        setIsReady(true)
      } catch (err) {
        console.error("Gantt initialization error:", err)
        setError("Failed to initialize Gantt chart")
        setIsReady(true)
      }

      return () => {
        ganttRef.current = null
        if (containerRef.current) {
          containerRef.current.innerHTML = ""
        }
      }
    }, [tasks, viewMode, locale, draggable, progressDraggable, clickable, customPopupHtml, onTaskClick, onDateChange, onProgressChange, onViewChange])

    return (
      <div
        className={cn("overflow-auto rounded-md border border-[var(--color-border)] bg-[var(--color-background)]", className)}
        style={{ height, width }}
      >
        {error && (
          <div className="flex h-full items-center justify-center text-sm text-[var(--color-destructive)]">
            {error}
          </div>
        )}
        {!isReady && !error && (
          <div className="flex h-full items-center justify-center text-sm text-[var(--color-muted-foreground)]">
            Loading Gantt chart...
          </div>
        )}
        <div
          ref={containerRef}
          className="gantt-container"
          style={{ display: error || !isReady ? "none" : "block" }}
        />
      </div>
    )
  }
)

GanttChart.displayName = "GanttChart"

export { GanttChart }
