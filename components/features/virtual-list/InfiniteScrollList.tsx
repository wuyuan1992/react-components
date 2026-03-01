"use client"

import { useRef, useCallback, useEffect, type ReactNode } from "react"
import { useVirtualizer } from "@tanstack/react-virtual"
import { cn } from "@/lib/utils"

export interface InfiniteScrollListProps<T> {
  /** 数据项列表 */
  items: T[]
  /** 是否正在加载 */
  isLoading?: boolean
  /** 是否还有更多数据 */
  hasMore?: boolean
  /** 加载更多的回调 */
  onLoadMore?: () => void
  /** 估算的每一项高度 */
  estimateSize?: number
  /** 列表高度 */
  height?: number | string
  /** 列表宽度 */
  width?: number | string
  /** 过度扫描 */
  overscan?: number
  /** 渲染每一项的函数 */
  renderItem: (item: T, index: number) => ReactNode
  /** 加载中显示的组件 */
  loadingComponent?: ReactNode
  /** 没有更多数据显示的组件 */
  endComponent?: ReactNode
  /** 列表容器类名 */
  className?: string
  /** 内部容器类名 */
  innerClassName?: string
}

function InfiniteScrollListInner<T>({
  items,
  isLoading = false,
  hasMore = true,
  onLoadMore,
  estimateSize = 50,
  height = 400,
  width = "100%",
  overscan = 3,
  renderItem,
  loadingComponent,
  endComponent,
  className,
  innerClassName,
}: InfiniteScrollListProps<T>) {
  const parentRef = useRef<HTMLDivElement>(null)

  const count = items.length + (isLoading ? 1 : 0) + (!hasMore && items.length > 0 ? 1 : 0)

  const virtualizer = useVirtualizer({
    count,
    getScrollElement: () => parentRef.current,
    estimateSize: (index) => {
      if (index === items.length) return isLoading ? 60 : 0
      if (index === items.length + 1) return 40
      return estimateSize
    },
    overscan,
  })

  const lastItemIndex = items.length - 1
  const virtualItems = virtualizer.getVirtualItems()

  const loadMore = useCallback(() => {
    if (!isLoading && hasMore && onLoadMore) {
      onLoadMore()
    }
  }, [isLoading, hasMore, onLoadMore])

  // 检测是否滚动到底部
  useEffect(() => {
    const lastItem = virtualItems[virtualItems.length - 1]

    if (!lastItem) return

    if (lastItem.index >= lastItemIndex && hasMore && !isLoading) {
      loadMore()
    }
  }, [virtualItems, lastItemIndex, hasMore, isLoading, loadMore])

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
        {virtualItems.map((virtualItem) => {
          // 渲染加载中状态
          if (virtualItem.index === items.length && isLoading) {
            return (
              <div
                key="loading"
                className="absolute left-0 top-0 flex w-full items-center justify-center"
                style={{
                  height: `${virtualItem.size}px`,
                  transform: `translateY(${virtualItem.start}px)`,
                }}
              >
                {loadingComponent ?? (
                  <div className="text-sm text-[var(--color-muted-foreground)]">加载中...</div>
                )}
              </div>
            )
          }

          // 渲染结束标记
          if (virtualItem.index === items.length + 1 && !hasMore && items.length > 0) {
            return (
              <div
                key="end"
                className="absolute left-0 top-0 flex w-full items-center justify-center"
                style={{
                  height: `${virtualItem.size}px`,
                  transform: `translateY(${virtualItem.start}px)`,
                }}
              >
                {endComponent ?? (
                  <div className="text-sm text-[var(--color-muted-foreground)]">没有更多数据了</div>
                )}
              </div>
            )
          }

          const item = items[virtualItem.index]
          if (!item) return null

          return (
            <div
              key={virtualItem.key}
              className="absolute left-0 top-0 w-full"
              style={{
                height: `${virtualItem.size}px`,
                transform: `translateY(${virtualItem.start}px)`,
              }}
            >
              {renderItem(item, virtualItem.index)}
            </div>
          )
        })}
      </div>
    </div>
  )
}

/** 无限滚动虚拟列表组件 */
export function InfiniteScrollList<T>(props: InfiniteScrollListProps<T>) {
  return <InfiniteScrollListInner {...props} />
}

InfiniteScrollList.displayName = "InfiniteScrollList"
