"use client"

import { useRef, useCallback, type ReactNode } from "react"
import { useVirtualizer } from "@tanstack/react-virtual"
import { cn } from "@/lib/utils"

export interface VirtualListProps<T> {
  /** 数据项列表 */
  items: T[]
  /** 估算的每一项高度 */
  estimateSize?: number
  /** 列表高度 */
  height?: number | string
  /** 列表宽度 */
  width?: number | string
  /** 是否启用虚拟化 */
  enabled?: boolean
  /** 过度扫描（预渲染的可见范围外的项目数） */
  overscan?: number
  /** 渲染每一项的函数 */
  renderItem: (item: T, index: number, virtualItem: { index: number; start: number; size: number }) => ReactNode
  /** 列表容器类名 */
  className?: string
  /** 内部容器类名 */
  innerClassName?: string
  /** 每一项的类名 */
  itemClassName?: string
  /** 获取每一项实际高度的函数 */
  measureElement?: (element: HTMLElement, item: T, index: number) => number
}

function VirtualListInner<T>({
  items,
  estimateSize = 50,
  height = 400,
  width = "100%",
  enabled = true,
  overscan = 3,
  renderItem,
  className,
  innerClassName,
  itemClassName,
  measureElement,
}: VirtualListProps<T>) {
  const parentRef = useRef<HTMLDivElement>(null)

  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => estimateSize,
    overscan,
    enabled,
  })

  const measureRefCallback = useCallback(
    (node: HTMLElement | null, index: number) => {
      if (node && measureElement) {
        const item = items[index]
        if (item) {
          const size = measureElement(node, item, index)
          if (size !== virtualizer.options.estimateSize(index)) {
            virtualizer.measureElement(node)
          }
        }
      }
    },
    [items, measureElement, virtualizer]
  )

  const virtualItems = virtualizer.getVirtualItems()

  return (
    <div
      ref={parentRef}
      className={cn("overflow-auto", className)}
      style={{ height, width }}
    >
      <div
        className={cn("relative", innerClassName)}
        style={{ height: `${virtualizer.getTotalSize()}px` }}
      >
        {virtualItems.map((virtualItem) => (
          <div
            key={virtualItem.key}
            ref={(node) => measureRefCallback(node, virtualItem.index)}
            className={cn("absolute left-0 top-0 w-full", itemClassName)}
            style={{
              height: `${virtualItem.size}px`,
              transform: `translateY(${virtualItem.start}px)`,
            }}
          >
            {renderItem(items[virtualItem.index]!, virtualItem.index, virtualItem)}
          </div>
        ))}
      </div>
    </div>
  )
}

/** 高性能虚拟列表组件 */
export function VirtualList<T>(props: VirtualListProps<T>) {
  return <VirtualListInner {...props} />
}

VirtualList.displayName = "VirtualList"
