"use client"

import { useState, useCallback, type ReactNode } from "react"
import {
  DndContext,
  DragOverlay,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  useDroppable,
  type DragEndEvent,
  type DragStartEvent,
  type UniqueIdentifier,
} from "@dnd-kit/core"
import { useDraggable } from "@dnd-kit/core"
import { cn } from "@/lib/utils"

export interface DroppableContainerProps {
  /** 容器 ID */
  id: UniqueIdentifier
  /** 子元素 */
  children: ReactNode
  /** 类名 */
  className?: string
  /** 是否高亮显示（当有项目拖入时） */
  highlight?: boolean
}

export interface DraggableItemProps {
  /** 项目 ID */
  id: UniqueIdentifier
  /** 子元素 */
  children: ReactNode
  /** 类名 */
  className?: string
  /** 是否禁用 */
  disabled?: boolean
}

export interface DragDropContainerProps<T> {
  /** 容器列表 */
  containers: Array<{
    id: UniqueIdentifier
    title?: string
    items: T[]
  }>
  /** 获取项目 ID 的函数 */
  getItemId: (item: T) => UniqueIdentifier
  /** 渲染项目的函数 */
  renderItem: (item: T, containerId: UniqueIdentifier) => ReactNode
  /** 渲染容器的函数 */
  renderContainer?: (
    container: { id: UniqueIdentifier; title?: string; items: T[] },
    children: ReactNode,
    isOver: boolean
  ) => ReactNode
  /** 项目移动回调 */
  onItemMove?: (
    itemId: UniqueIdentifier,
    fromContainerId: UniqueIdentifier,
    toContainerId: UniqueIdentifier
  ) => void
  /** 容器类名 */
  containerClassName?: string
  /** 项目类名 */
  itemClassName?: string
  /** 整体类名 */
  className?: string
}

function DroppableContainer({ id, children, className, highlight }: DroppableContainerProps) {
  const { setNodeRef, isOver } = useDroppable({
    id,
  })

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "min-h-[100px] rounded-lg border-2 border-dashed border-[var(--color-border)] p-4 transition-colors",
        (isOver || highlight) && "border-[var(--color-primary)] bg-[var(--color-primary)]/5",
        className
      )}
    >
      {children}
    </div>
  )
}

function DraggableItem({ id, children, className, disabled }: DraggableItemProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id,
    disabled,
  })

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(isDragging && "opacity-50", className)}
      {...listeners}
      {...attributes}
    >
      {children}
    </div>
  )
}

export function DragDropContainer<T>({
  containers,
  getItemId,
  renderItem,
  renderContainer,
  onItemMove,
  containerClassName,
  itemClassName,
  className,
}: DragDropContainerProps<T>) {
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null)
  const [overContainerId, setOverContainerId] = useState<UniqueIdentifier | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor)
  )

  const findContainerByItemId = useCallback(
    (itemId: UniqueIdentifier): UniqueIdentifier | undefined => {
      for (const container of containers) {
        if (container.items.some((item) => getItemId(item) === itemId)) {
          return container.id
        }
      }
      return undefined
    },
    [containers, getItemId]
  )

  const handleDragStart = useCallback((event: DragStartEvent) => {
    const { active } = event
    setActiveId(active.id)
  }, [])

  const handleDragOver = useCallback(
    (event: { over: { id: UniqueIdentifier } | null }) => {
      const { over } = event
      if (over) {
        // 检查是否悬停在容器上
        const container = containers.find((c) => c.id === over.id)
        if (container) {
          setOverContainerId(container.id)
        } else {
          // 检查是否悬停在项目上
          const itemContainer = findContainerByItemId(over.id)
          if (itemContainer) {
            setOverContainerId(itemContainer)
          }
        }
      }
    },
    [containers, findContainerByItemId]
  )

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event
      setActiveId(null)
      setOverContainerId(null)

      if (!over) return

      const activeId = active.id
      const fromContainerId = findContainerByItemId(activeId)

      let toContainerId: UniqueIdentifier | undefined

      // 检查目标是否是容器
      const targetContainer = containers.find((c) => c.id === over.id)
      if (targetContainer) {
        toContainerId = targetContainer.id
      } else {
        // 检查目标是否是项目
        toContainerId = findContainerByItemId(over.id)
      }

      if (toContainerId && fromContainerId && fromContainerId !== toContainerId) {
        onItemMove?.(activeId, fromContainerId, toContainerId)
      }
    },
    [containers, findContainerByItemId, onItemMove]
  )

  const activeItem = activeId
    ? containers.flatMap((c) => c.items).find((item) => getItemId(item) === activeId)
    : null

  const activeContainer = activeId ? findContainerByItemId(activeId) : undefined

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className={cn("flex gap-4", className)}>
        {containers.map((container) => {
          const isOver = overContainerId === container.id && activeContainer !== container.id

          const content = (
            <DroppableContainer id={container.id} highlight={isOver} className={containerClassName}>
              <div className="flex flex-wrap gap-2">
                {container.items.map((item) => {
                  const itemId = getItemId(item)
                  return (
                    <DraggableItem key={itemId} id={itemId} className={itemClassName}>
                      {renderItem(item, container.id)}
                    </DraggableItem>
                  )
                })}
              </div>
            </DroppableContainer>
          )

          if (renderContainer) {
            return (
              <div key={container.id}>
                {renderContainer(container, content, isOver)}
              </div>
            )
          }

          return (
            <div key={container.id} className="flex-1">
              {container.title && (
                <h3 className="mb-2 font-medium text-[var(--color-foreground)]">{container.title}</h3>
              )}
              {content}
            </div>
          )
        })}
      </div>

      <DragOverlay>
        {activeItem && activeContainer && (
          <div className="shadow-lg">{renderItem(activeItem, activeContainer)}</div>
        )}
      </DragOverlay>
    </DndContext>
  )
}

DragDropContainer.displayName = "DragDropContainer"

export { DroppableContainer, DraggableItem }
