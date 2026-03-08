"use client"

import { GridLayoutComponent, useGridLayout, type GridLayoutItem } from "./GridLayout"

interface WidgetData {
  id: string
  title: string
  content: string
  color: string
}

const defaultWidgets: WidgetData[] = [
  { id: "widget-1", title: "Statistics", content: "Total Users: 1,234", color: "hsl(var(--chart-1))" },
  { id: "widget-2", title: "Revenue", content: "$12,345.67", color: "hsl(var(--chart-2))" },
  { id: "widget-3", title: "Active Sessions", content: "89 active", color: "hsl(var(--chart-3))" },
  { id: "widget-4", title: "Notifications", content: "3 new alerts", color: "hsl(var(--chart-4))" },
  { id: "widget-5", title: "Recent Activity", content: "Last update: 2 min ago", color: "hsl(var(--chart-5))" },
  { id: "widget-6", title: "Quick Actions", content: "Add, Edit, Delete", color: "hsl(var(--primary))" },
]

const defaultLayout: GridLayoutItem[] = [
  { i: "widget-1", x: 0, y: 0, w: 4, h: 2 },
  { i: "widget-2", x: 4, y: 0, w: 4, h: 2 },
  { i: "widget-3", x: 8, y: 0, w: 4, h: 2 },
  { i: "widget-4", x: 0, y: 2, w: 6, h: 3 },
  { i: "widget-5", x: 6, y: 2, w: 6, h: 3 },
  { i: "widget-6", x: 0, y: 5, w: 12, h: 2 },
]

interface GridLayoutDemoProps {
  /** Enable responsive breakpoints */
  responsive?: boolean
  /** Enable/disable editing (drag and resize) */
  editable?: boolean
  /** Custom layout */
  layout?: GridLayoutItem[]
  /** Custom widgets */
  widgets?: WidgetData[]
  /** Layout change callback */
  onLayoutChange?: (layout: GridLayoutItem[]) => void
  /** Container class name */
  className?: string
}

export function GridLayoutDemo({
  responsive = true,
  editable = true,
  layout: externalLayout,
  widgets = defaultWidgets,
  onLayoutChange,
  className,
}: GridLayoutDemoProps) {
  const { layout, setLayout } = useGridLayout(externalLayout ?? defaultLayout)

  const handleLayoutChange = (newLayout: GridLayoutItem[]) => {
    setLayout(newLayout)
    onLayoutChange?.(newLayout)
  }

  return (
    <GridLayoutComponent
      layout={layout}
      onLayoutChange={handleLayoutChange}
      responsive={responsive}
      draggable={editable}
      resizable={editable}
      rowHeight={80}
      gap={[16, 16]}
      className={className}
    >
      {widgets.map((widget) => (
        <div key={widget.id} className="h-full">
          <div className="h-full rounded-lg border bg-card p-4 shadow-sm transition-shadow hover:shadow-md">
            <div className="mb-2 flex items-center gap-2">
              <div
                className="h-2.5 w-2.5 shrink-0 rounded-full"
                style={{ backgroundColor: widget.color }}
              />
              <h3 className="text-sm font-semibold">{widget.title}</h3>
            </div>
            <p className="text-sm text-muted-foreground">{widget.content}</p>
          </div>
        </div>
      ))}
    </GridLayoutComponent>
  )
}

GridLayoutDemo.displayName = "GridLayoutDemo"

export { defaultWidgets, defaultLayout }
export type { WidgetData }
