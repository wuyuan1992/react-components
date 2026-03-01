"use client"

import { useRef, type ReactNode } from "react"
import { useVirtualizer } from "@tanstack/react-virtual"
import { cn } from "@/lib/utils"

export interface VirtualGridProps<T> {
  /** 数据项列表 */
  items: T[]
  /** 估算的每一行高度 */
  estimateRowHeight?: number
  /** 每行列数 */
  columns?: number
  /** 列表高度 */
  height?: number | string
  /** 列表宽度 */
  width?: number | string
  /** 过度扫描 */
  overscan?: number
  /** 列间距 */
  columnGap?: number
  /** 行间距 */
  rowGap?: number
  /** 渲染每一项的函数 */
  renderItem: (item: T, index: number) => ReactNode
  /** 列表容器类名 */
  className?: string
  /** 内部容器类名 */
  innerClassName?: string
}

function VirtualGridInner<T>({
  items,
  estimateRowHeight = 50,
  columns = 1,
  height = 400,
  width = "100%",
  overscan = 3,
  columnGap = 0,
  rowGap = 0,
  renderItem,
  className,
  innerClassName,
}: VirtualGridProps<T>) {
  const parentRef = useRef<HTMLDivElement>(null)

  const rowCount = Math.ceil(items.length / columns)

  const rowVirtualizer = useVirtualizer({
    count: rowCount,
    getScrollElement: () => parentRef.current,
    estimateSize: () => estimateRowHeight + rowGap,
    overscan,
  })

  const virtualRows = rowVirtualizer.getVirtualItems()

  return (
    <div
      ref={parentRef}
      className={cn("overflow-auto", className)}
      style={{ height, width }}
    >
      <div
        className={cn("relative", innerClassName)}
        style={{ height: `${rowVirtualizer.getTotalSize()}px` }}
      >
        {virtualRows.map((virtualRow) => {
          const startIndex = virtualRow.index * columns
          const rowItems = items.slice(startIndex, startIndex + columns)

          return (
            <div
              key={virtualRow.key}
              className="absolute left-0 top-0 flex w-full"
              style={{
                height: `${virtualRow.size}px`,
                transform: `translateY(${virtualRow.start}px)`,
                gap: columnGap,
              }}
            >
              {rowItems.map((item, i) => (
                <div
                  key={startIndex + i}
                  className="flex-1"
                  style={{ minWidth: 0 }}
                >
                  {renderItem(item, startIndex + i)}
                </div>
              ))}
            </div>
          )
        })}
      </div>
    </div>
  )
}

/** 虚拟网格组件 */
export function VirtualGrid<T>(props: VirtualGridProps<T>) {
  return <VirtualGridInner {...props} />
}

VirtualGrid.displayName = "VirtualGrid"
