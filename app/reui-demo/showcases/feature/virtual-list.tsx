"use client"

import { useState, useCallback } from "react"
import { VirtualList, InfiniteScrollList } from "@/components/features/virtual-list"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { PageHeader, ExampleSection, CodeBlock } from "../shared"

export function VirtualListView() {
  const [items] = useState(() =>
    Array.from({ length: 10000 }, (_, i) => ({
      id: i,
      name: `Item ${i + 1}`,
      value: Math.floor(Math.random() * 1000),
    }))
  )

  const [infiniteItems, setInfiniteItems] = useState(() =>
    Array.from({ length: 20 }, (_, i) => ({ id: i, name: `Infinite Item ${i + 1}` }))
  )
  const [isLoading, setIsLoading] = useState(false)

  const loadMore = useCallback(() => {
    if (isLoading) return
    setIsLoading(true)
    setTimeout(() => {
      const newItems = Array.from({ length: 20 }, (_, i) => ({
        id: infiniteItems.length + i,
        name: `Infinite Item ${infiniteItems.length + i + 1}`,
      }))
      setInfiniteItems((prev) => [...prev, ...newItems])
      setIsLoading(false)
    }, 1000)
  }, [infiniteItems.length, isLoading])

  return (
    <div>
      <PageHeader title="Virtual List" description="High-performance virtualized list for rendering large datasets with @tanstack/react-virtual." />
      <ExampleSection title="Virtual List (10,000 items)">
        <div className="h-[300px] border rounded-lg">
          <VirtualList
            items={items}
            estimateSize={50}
            height="100%"
            renderItem={(item, index) => (
              <div className="flex items-center justify-between border-b border-[var(--color-border)] px-4 py-3 hover:bg-[var(--color-accent)]">
                <span className="font-medium">{item.name}</span>
                <Badge variant="secondary">{item.value}</Badge>
              </div>
            )}
          />
        </div>
        <CodeBlock
          code={`import { VirtualList } from "@/components/features/virtual-list"

<VirtualList
  items={items}
  estimateSize={50}
  height="300px"
  renderItem={(item, index) => (
    <div className="p-3 border-b">
      {item.name}
    </div>
  )}
/>`}
        />
      </ExampleSection>
      <ExampleSection title="Infinite Scroll">
        <div className="h-[300px] border rounded-lg">
          <InfiniteScrollList
            items={infiniteItems}
            isLoading={isLoading}
            hasMore={infiniteItems.length < 100}
            onLoadMore={loadMore}
            height="100%"
            renderItem={(item) => (
              <div className="flex items-center border-b border-[var(--color-border)] px-4 py-3 hover:bg-[var(--color-accent)]">
                {item.name}
              </div>
            )}
          />
        </div>
      </ExampleSection>
    </div>
  )
}
