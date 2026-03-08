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
  /** Unique item ID */
  id: UniqueIdentifier
  /** Disable dragging for this item */
  disabled?: boolean
  /** Item content */
  children: ReactNode
  /** Additional class name */
  className?: string
  /** CSS selector for the drag handle element */
  handleSelector?: string
}

export interface SortableListProps<T> {
  /** List of data items */
  items: T[]
  /** Returns a unique ID for each item */
  getId: (item: T) => UniqueIdentifier
  /** Renders each item; receives the item, its index, and whether it is being dragged */
  renderItem: (item: T, index: number, isDragging: boolean) => ReactNode
  /** Called with the reordered array after a successful drag */
  onReorder?: (items: T[]) => void
  /** Called when a drag starts */
  onDragStart?: (item: T) => void
  /** Called when a drag ends, with the moved item and its new index */
  onDragEnd?: (item: T, newIndex: number) => void
  /** Sorting direction strategy */
  strategy?: "vertical" | "horizontal"
  /** Disable all dragging */
  disabled?: boolean
  /** Class name for the list container */
  className?: string
  /** Class name applied to each item wrapper */
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

  // When a drag handle is configured, restrict drag events to the handle only
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

  // Build an ID-to-index map to avoid repeated O(n) findIndex calls
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
