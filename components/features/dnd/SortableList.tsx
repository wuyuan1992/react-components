"use client"

import { useState, useCallback, useMemo, type ReactNode } from "react"
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
  type UniqueIdentifier,
} from "@dnd-kit/core"
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  horizontalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { cn } from "@/lib/utils"

export interface SortableItemProps {
  /** 项目 ID */
  id: UniqueIdentifier
  /** 是否禁用拖拽 */
  disabled?: boolean
  /** 子元素 */
  children: ReactNode
  /** 类名 */
  className?: string
  /** 拖拽手柄选择器 */
  handleSelector?: string
}

export interface SortableListProps<T> {
  /** 数据项列表 */
  items: T[]
  /** 获取项目 ID 的函数 */
  getId: (item: T) => UniqueIdentifier
  /** 渲染每一项的函数 */
  renderItem: (item: T, index: number, isDragging: boolean) => ReactNode
  /** 排序变化回调 */
  onReorder?: (items: T[]) => void
  /** 拖拽开始回调 */
  onDragStart?: (item: T) => void
  /** 拖拽结束回调 */
  onDragEnd?: (item: T, newIndex: number) => void
  /** 排序策略 */
  strategy?: "vertical" | "horizontal"
  /** 是否禁用拖拽 */
  disabled?: boolean
  /** 列表类名 */
  className?: string
  /** 每一项类名 */
  itemClassName?: string
}

function SortableItem({ id, disabled, children, className, handleSelector }: SortableItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
    disabled,
    data: {
      handleSelector,
    },
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  // 如果有拖拽手柄，只在手柄上应用拖拽事件
  const dragListeners = handleSelector ? {} : listeners

  return (
    <div ref={setNodeRef} style={style} className={cn(isDragging && "z-10", className)} {...attributes} {...dragListeners}>
      {children}
    </div>
  )
}

export function SortableList<T>({
  items,
  getId,
  renderItem,
  onReorder,
  onDragStart,
  onDragEnd,
  strategy = "vertical",
  disabled = false,
  className,
  itemClassName,
}: SortableListProps<T>) {
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  // 创建 ID 到索引的映射，避免重复 findIndex
  const itemIndexMap = useMemo(() => {
    const map = new Map<UniqueIdentifier, number>()
    items.forEach((item, index) => {
      map.set(getId(item), index)
    })
    return map
  }, [items, getId])

  const itemIds = useMemo(() => items.map(getId), [items, getId])

  const handleDragStart = useCallback(
    (event: DragStartEvent) => {
      const { active } = event
      setActiveId(active.id)
      const index = itemIndexMap.get(active.id)
      if (index !== undefined) {
        const item = items[index]
        if (item) {
          onDragStart?.(item)
        }
      }
    },
    [items, itemIndexMap, onDragStart]
  )

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event
      setActiveId(null)

      if (over && active.id !== over.id) {
        const oldIndex = itemIndexMap.get(active.id)
        const newIndex = itemIndexMap.get(over.id)

        if (oldIndex !== undefined && newIndex !== undefined) {
          const newItems = arrayMove(items, oldIndex, newIndex)
          onReorder?.(newItems)

          const movedItem = newItems[newIndex]
          if (movedItem) {
            onDragEnd?.(movedItem, newIndex)
          }
        }
      }
    },
    [items, itemIndexMap, onReorder, onDragEnd]
  )

  const sortingStrategy = strategy === "horizontal" ? horizontalListSortingStrategy : verticalListSortingStrategy

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <SortableContext items={itemIds} strategy={sortingStrategy}>
        <div className={cn(strategy === "vertical" ? "flex flex-col" : "flex flex-row", className)}>
          {items.map((item, index) => {
            const id = getId(item)
            const isDragging = activeId === id

            return (
              <SortableItem key={id} id={id} disabled={disabled} className={itemClassName}>
                {renderItem(item, index, isDragging)}
              </SortableItem>
            )
          })}
        </div>
      </SortableContext>
    </DndContext>
  )
}

SortableList.displayName = "SortableList"
