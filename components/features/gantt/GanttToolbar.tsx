"use client"

import { forwardRef, useImperativeHandle, useRef, useState, useCallback } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { GanttChart, type GanttTask, type GanttViewMode, type GanttChartRef } from "./GanttChart"
import { cn } from "@/lib/utils"

export interface GanttWithToolbarRef {
  setViewMode: (mode: GanttViewMode) => void
  refresh: (tasks: GanttTask[]) => void
  goToToday: () => void
  nextView: () => void
  prevView: () => void
}

export interface GanttWithToolbarProps {
  /** 任务列表 */
  tasks: GanttTask[]
  /** 初始视图模式 */
  initialViewMode?: GanttViewMode
  /** 视图模式列表 */
  viewModes?: GanttViewMode[]
  /** 高度 */
  height?: number | string
  /** 宽度 */
  width?: number | string
  /** 类名 */
  className?: string
  /** 是否显示工具栏 */
  showToolbar?: boolean
  /** 点击任务回调 */
  onTaskClick?: (task: GanttTask) => void
  /** 日期变化回调 */
  onDateChange?: (task: GanttTask, start: Date, end: Date) => void
  /** 进度变化回调 */
  onProgressChange?: (task: GanttTask, progress: number) => void
  /** 视图变化回调 */
  onViewChange?: (mode: GanttViewMode) => void
}

const VIEW_MODES: GanttViewMode[] = ["Day", "Week", "Month", "Year"]

const GanttWithToolbar = forwardRef<GanttWithToolbarRef, GanttWithToolbarProps>(
  (
    {
      tasks,
      initialViewMode = "Day",
      viewModes = VIEW_MODES,
      height = 400,
      width = "100%",
      className,
      showToolbar = true,
      onTaskClick,
      onDateChange,
      onProgressChange,
      onViewChange,
    },
    ref
  ) => {
    const ganttRef = useRef<GanttChartRef>(null)
    const [viewMode, setViewMode] = useState<GanttViewMode>(initialViewMode)

    const handleViewModeChange = useCallback(
      (mode: GanttViewMode) => {
        setViewMode(mode)
        ganttRef.current?.setViewMode(mode)
        onViewChange?.(mode)
      },
      [onViewChange]
    )

    const handlePrevView = useCallback(() => {
      const currentIndex = viewModes.indexOf(viewMode)
      if (currentIndex > 0) {
        handleViewModeChange(viewModes[currentIndex - 1]!)
      }
    }, [viewMode, viewModes, handleViewModeChange])

    const handleNextView = useCallback(() => {
      const currentIndex = viewModes.indexOf(viewMode)
      if (currentIndex < viewModes.length - 1) {
        handleViewModeChange(viewModes[currentIndex + 1]!)
      }
    }, [viewMode, viewModes, handleViewModeChange])

    useImperativeHandle(
      ref,
      () => ({
        setViewMode: handleViewModeChange,
        refresh: (tasks: GanttTask[]) => ganttRef.current?.refresh(tasks),
        goToToday: () => ganttRef.current?.scrollToDate(new Date().toISOString()),
        nextView: handleNextView,
        prevView: handlePrevView,
      }),
      [handleViewModeChange, handleNextView, handlePrevView]
    )

    return (
      <div className={cn("flex flex-col", className)} style={{ height, width }}>
        {showToolbar && (
          <div className="flex items-center justify-between gap-2 border-b border-[var(--color-border)] px-4 py-2">
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrevView}
                disabled={viewModes.indexOf(viewMode) === 0}
                className="inline-flex h-8 w-8 items-center justify-center rounded-md text-[var(--color-foreground)] hover:bg-[var(--color-accent)] disabled:cursor-not-allowed disabled:opacity-50"
                title="上一个视图"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={handleNextView}
                disabled={viewModes.indexOf(viewMode) === viewModes.length - 1}
                className="inline-flex h-8 w-8 items-center justify-center rounded-md text-[var(--color-foreground)] hover:bg-[var(--color-accent)] disabled:cursor-not-allowed disabled:opacity-50"
                title="下一个视图"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            <div className="flex items-center gap-1">
              {viewModes.map((mode) => (
                <button
                  key={mode}
                  onClick={() => handleViewModeChange(mode)}
                  className={cn(
                    "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                    viewMode === mode
                      ? "bg-[var(--color-primary)] text-[var(--color-primary-foreground)]"
                      : "text-[var(--color-foreground)] hover:bg-[var(--color-accent)]"
                  )}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="flex-1 overflow-hidden">
          <GanttChart
            ref={ganttRef}
            tasks={tasks}
            viewMode={viewMode}
            onTaskClick={onTaskClick}
            onDateChange={onDateChange}
            onProgressChange={onProgressChange}
            className="h-full border-0"
          />
        </div>
      </div>
    )
  }
)

GanttWithToolbar.displayName = "GanttWithToolbar"

export { GanttWithToolbar }
