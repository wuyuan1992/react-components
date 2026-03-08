"use client"

import { useState, useCallback, useMemo, forwardRef, useRef, useEffect, type ReactNode } from "react"
import {
  GridLayout as RGLGridLayout,
  ResponsiveGridLayout as RGLResponsiveGridLayout,
  verticalCompactor,
  horizontalCompactor,
  noCompactor,
  type Layout,
  type LayoutItem,
} from "react-grid-layout"
import { cn } from "@/lib/utils"
import "react-grid-layout/css/styles.css"
import "./grid-layout.css"

export type { Layout, LayoutItem }

export interface GridLayoutItem extends LayoutItem {
  /** If true, item cannot be dragged */
  draggable?: boolean
  /** If true, item cannot be resized */
  resizable?: boolean
}

export interface GridLayoutProps {
  /** Layout items configuration */
  layout?: GridLayoutItem[]
  /** Child elements to render in the grid */
  children: ReactNode
  /** Called when layout changes */
  onLayoutChange?: (layout: GridLayoutItem[]) => void
  /** Number of columns (default: 12) */
  cols?: number
  /** Row height in pixels (default: 100) */
  rowHeight?: number
  /** Gap between items [horizontal, vertical] (default: [16, 16]) */
  gap?: [number, number]
  /** Enable responsive breakpoints */
  responsive?: boolean
  /** Breakpoints for responsive mode */
  breakpoints?: { lg: number; md: number; sm: number; xs: number; xxs: number }
  /** Columns per breakpoint */
  colsPerBreakpoint?: { lg: number; md: number; sm: number; xs: number; xxs: number }
  /** Enable/disable dragging */
  draggable?: boolean
  /** Enable/disable resizing */
  resizable?: boolean
  /** Container class name */
  className?: string
  /** Container height (for fixed height layouts) */
  height?: number | string
  /** Compact type: vertical | horizontal | null */
  compactType?: "vertical" | "horizontal" | null
  /** Prevent collision when moving items */
  preventCollision?: boolean
}

const defaultBreakpoints = { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }
const defaultColsPerBreakpoint = { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }

const getCompactor = (type: "vertical" | "horizontal" | null) => {
  switch (type) {
    case "vertical":
      return verticalCompactor
    case "horizontal":
      return horizontalCompactor
    case null:
      return noCompactor
    default:
      return verticalCompactor
  }
}

export const GridLayoutComponent = forwardRef<HTMLDivElement, GridLayoutProps>(
  (
    {
      layout: externalLayout,
      children,
      onLayoutChange,
      cols = 12,
      rowHeight = 100,
      gap = [16, 16],
      responsive = false,
      breakpoints = defaultBreakpoints,
      colsPerBreakpoint = defaultColsPerBreakpoint,
      draggable = true,
      resizable = true,
      className,
      height,
      compactType = "vertical",
      preventCollision = false,
    },
    ref
  ) => {
    const [internalLayout, setInternalLayout] = useState<GridLayoutItem[]>(externalLayout ?? [])
    const containerRef = useRef<HTMLDivElement>(null)
    const [width, setWidth] = useState(1200)

    useEffect(() => {
      const container = containerRef.current
      if (!container) return

      const resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          setWidth(entry.contentRect.width)
        }
      })
      resizeObserver.observe(container)
      return () => resizeObserver.disconnect()
    }, [])

    const currentLayout = externalLayout ?? internalLayout

    const handleLayoutChange = useCallback(
      (newLayout: Layout) => {
        const layoutItems = [...newLayout] as GridLayoutItem[]
        if (!externalLayout) {
          setInternalLayout(layoutItems)
        }
        onLayoutChange?.(layoutItems)
      },
      [externalLayout, onLayoutChange]
    )

    const containerStyle = useMemo(() => {
      const style: React.CSSProperties = {}
      if (height !== undefined) {
        style.height = typeof height === "number" ? `${height}px` : height
        style.overflowY = "auto"
      }
      return style
    }, [height])

    const responsiveLayouts = useMemo(() => {
      const layouts: Record<string, Layout> = {}
      for (const bp of Object.keys(breakpoints)) {
        layouts[bp] = currentLayout
      }
      return layouts
    }, [currentLayout, breakpoints])

    const compactor = getCompactor(compactType)

    const setRefs = useCallback(
      (node: HTMLDivElement | null) => {
        (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = node
        if (typeof ref === "function") {
          ref(node)
        } else if (ref) {
          ref.current = node
        }
      },
      [ref]
    )

    if (responsive) {
      return (
        <div ref={setRefs} className={cn("w-full", className)} style={containerStyle}>
          <RGLResponsiveGridLayout
            className="layout"
            width={width}
            breakpoints={breakpoints}
            cols={colsPerBreakpoint}
            layouts={responsiveLayouts}
            rowHeight={rowHeight}
            margin={gap}
            dragConfig={{ enabled: draggable }}
            resizeConfig={{ enabled: resizable }}
            compactor={compactor}
            constraints={preventCollision ? [] : undefined}
            onLayoutChange={handleLayoutChange}
            style={{ position: "relative" }}
          >
            {children}
          </RGLResponsiveGridLayout>
        </div>
      )
    }

    return (
      <div ref={setRefs} className={cn("w-full", className)} style={containerStyle}>
        <RGLGridLayout
          className="layout"
          layout={currentLayout}
          gridConfig={{ cols, rowHeight, margin: gap }}
          width={width}
          dragConfig={{ enabled: draggable }}
          resizeConfig={{ enabled: resizable }}
          compactor={compactor}
          constraints={preventCollision ? [] : undefined}
          onLayoutChange={handleLayoutChange}
          style={{ position: "relative", minHeight: rowHeight }}
        >
          {children}
        </RGLGridLayout>
      </div>
    )
  }
)

GridLayoutComponent.displayName = "GridLayout"

export interface GridItemProps {
  /** Unique key for the grid item (must match layout item's i) */
  itemKey: string
  /** Content to render */
  children: ReactNode
  /** Additional class name */
  className?: string
  /** Show a border around the item */
  showBorder?: boolean
  /** Background color */
  background?: string
}

export function GridItem({
  itemKey,
  children,
  className,
  showBorder = true,
  background,
}: GridItemProps) {
  return (
    <div
      key={itemKey}
      className={cn(
        "rounded-lg overflow-hidden",
        showBorder && "border",
        className
      )}
      style={background ? { backgroundColor: background } : undefined}
    >
      {children}
    </div>
  )
}

GridItem.displayName = "GridItem"

/** Hook to manage grid layout state */
export function useGridLayout(initialLayout: GridLayoutItem[] = []) {
  const [layout, setLayout] = useState<GridLayoutItem[]>(initialLayout)

  const updateLayout = useCallback((newLayout: GridLayoutItem[]) => {
    setLayout(newLayout)
  }, [])

  const addItem = useCallback((item: GridLayoutItem) => {
    setLayout((prev) => [...prev, item])
  }, [])

  const removeItem = useCallback((id: string) => {
    setLayout((prev) => prev.filter((item) => item.i !== id))
  }, [])

  const updateItem = useCallback((id: string, updates: Partial<GridLayoutItem>) => {
    setLayout((prev) =>
      prev.map((item) => (item.i === id ? { ...item, ...updates } : item))
    )
  }, [])

  return {
    layout,
    setLayout: updateLayout,
    addItem,
    removeItem,
    updateItem,
  }
}

export { RGLGridLayout, RGLResponsiveGridLayout }
