"use client"

import { useState, useCallback, type ReactNode } from "react"
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
  type DragOverEvent,
  type UniqueIdentifier,
} from "@dnd-kit/core"
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { cn } from "@/lib/utils"

export interface KanbanColumn<T> {
  /** 列 ID */
  id: UniqueIdentifier
  /** 列标题 */
  title: string
  /** 列中的项目 */
  items: T[]
  /** 列颜色 */
  color?: string
}

export interface KanbanBoardProps<T> {
  /** 列表数据 */
  columns: KanbanColumn<T>[]
  /** 获取项目 ID 的函数 */
  getItemId: (item: T) => UniqueIdentifier
  /** 渲染项目的函数 */
  renderItem: (item: T, columnId: UniqueIdentifier) => ReactNode
  /** 渲染列头的函数 */
  renderColumnHeader?: (column: KanbanColumn<T>) => ReactNode
  /** 项目移动回调 */
  onItemMove?: (
    itemId: UniqueIdentifier,
    fromColumnId: UniqueIdentifier,
    toColumnId: UniqueIdentifier,
    newIndex: number
  ) => void
  /** 列变化回调 */
  onColumnsChange?: (columns: KanbanColumn<T>[]) => void
  /** 列类名 */
  columnClassName?: string
  /** 项目类名 */
  itemClassName?: string
  /** 板类名 */
  className?: string
}

interface SortableItemProps {
  id: UniqueIdentifier
  columnId: UniqueIdentifier
  children: ReactNode
  className?: string
}

function KanbanItem({ id, children, className }: SortableItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
    data: {
      type: "item",
    },
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(isDragging && "opacity-50", className)}
      {...attributes}
      {...listeners}
    >
      {children}
    </div>
  )
}

export function KanbanBoard<T>({
  columns,
  getItemId,
  renderItem,
  renderColumnHeader,
  onItemMove,
  onColumnsChange,
  columnClassName,
  itemClassName,
  className,
}: KanbanBoardProps<T>) {
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null)
  const [overColumnId, setOverColumnId] = useState<UniqueIdentifier | null>(null)

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

  const findColumnByItemId = useCallback(
    (itemId: UniqueIdentifier): UniqueIdentifier | undefined => {
      for (const column of columns) {
        if (column.items.some((item) => getItemId(item) === itemId)) {
          return column.id
        }
      }
      return undefined
    },
    [columns, getItemId]
  )

  const findColumnById = useCallback(
    (columnId: UniqueIdentifier): KanbanColumn<T> | undefined => {
      return columns.find((col) => col.id === columnId)
    },
    [columns]
  )

  const handleDragStart = useCallback((event: DragStartEvent) => {
    const { active } = event
    setActiveId(active.id)
    const columnId = findColumnByItemId(active.id)
    setOverColumnId(columnId ?? null)
  }, [findColumnByItemId])

  const handleDragOver = useCallback(
    (event: DragOverEvent) => {
      const { active, over } = event
      if (!over) return

      const activeColumnId = findColumnByItemId(active.id)
      const overId = over.id

      // 检查是否悬停在列上
      const overColumn = findColumnById(overId)

      if (activeColumnId && overColumn) {
        // 从一个列移动到另一个列
        if (activeColumnId !== overColumn.id) {
          setOverColumnId(overColumn.id)
        }
      }
    },
    [findColumnByItemId, findColumnById]
  )

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event
      setActiveId(null)
      setOverColumnId(null)

      if (!over) return

      const activeId = active.id
      const overId = over.id

      const fromColumnId = findColumnByItemId(activeId)
      if (!fromColumnId) return

      // 查找目标列
      let toColumnId: UniqueIdentifier | undefined
      let toIndex = 0

      for (const column of columns) {
        const itemIndex = column.items.findIndex((item) => getItemId(item) === overId)
        if (itemIndex !== -1) {
          toColumnId = column.id
          toIndex = itemIndex
          break
        }
      }

      // 如果没有找到项目，检查是否悬停在列上
      if (!toColumnId) {
        toColumnId = overId
        const targetColumn = findColumnById(toColumnId)
        if (targetColumn) {
          toIndex = targetColumn.items.length
        }
      }

      if (toColumnId && fromColumnId) {
        if (fromColumnId !== toColumnId) {
          onItemMove?.(activeId, fromColumnId, toColumnId, toIndex)
        } else {
          // 同一列内排序
          const column = findColumnById(fromColumnId)
          if (column) {
            const oldIndex = column.items.findIndex((item) => getItemId(item) === activeId)
            const newItems = arrayMove(column.items, oldIndex, toIndex)
            const newColumns = columns.map((col) =>
              col.id === fromColumnId ? { ...col, items: newItems } : col
            )
            onColumnsChange?.(newColumns)
          }
        }
      }
    },
    [columns, findColumnByItemId, findColumnById, getItemId, onItemMove, onColumnsChange]
  )

  const activeItem = activeId
    ? columns.flatMap((col) => col.items).find((item) => getItemId(item) === activeId)
    : null

  const activeColumn = activeId ? findColumnByItemId(activeId) : undefined

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className={cn("flex gap-4 overflow-x-auto", className)}>
        {columns.map((column) => (
          <div
            key={column.id}
            className={cn(
              "flex min-w-[280px] flex-col rounded-lg border border-[var(--color-border)] bg-[var(--color-muted)]",
              overColumnId === column.id && overColumnId !== activeColumn && "ring-2 ring-[var(--color-primary)]",
              columnClassName
            )}
          >
            {renderColumnHeader ? (
              renderColumnHeader(column)
            ) : (
              <div
                className="flex items-center justify-between border-b border-[var(--color-border)] px-4 py-3"
                style={{ borderTopColor: column.color, borderTopWidth: 3 }}
              >
                <h3 className="font-medium text-[var(--color-foreground)]">{column.title}</h3>
                <span className="text-sm text-[var(--color-muted-foreground)]">{column.items.length}</span>
              </div>
            )}

            <div className="flex-1 overflow-y-auto p-2">
              <SortableContext items={column.items.map(getItemId)} strategy={verticalListSortingStrategy}>
                <div className="flex flex-col gap-2">
                  {column.items.map((item) => {
                    const itemId = getItemId(item)
                    return (
                      <KanbanItem
                        key={itemId}
                        id={itemId}
                        columnId={column.id}
                        className={itemClassName}
                      >
                        {renderItem(item, column.id)}
                      </KanbanItem>
                    )
                  })}
                </div>
              </SortableContext>
            </div>
          </div>
        ))}
      </div>

      <DragOverlay>
        {activeItem && activeColumn && (
          <div className="shadow-lg">{renderItem(activeItem, activeColumn)}</div>
        )}
      </DragOverlay>
    </DndContext>
  )
}

KanbanBoard.displayName = "KanbanBoard"
