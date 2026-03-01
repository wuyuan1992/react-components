"use client"

import {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
} from "@/components/ui/empty"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { PageHeader, ExampleSection, CodeBlock, PropTable } from "../shared"

export function EmptyView() {
  return (
    <div>
      <PageHeader title="Empty" description="A placeholder for empty states." />
      <ExampleSection title="Basic">
        <Empty className="w-[300px] h-[200px] border rounded-lg">
          <EmptyHeader>
            <EmptyTitle>No results found</EmptyTitle>
            <EmptyDescription>Try searching for something else.</EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button variant="outline"><Plus className="mr-2 size-4" />Add new</Button>
          </EmptyContent>
        </Empty>
        <CodeBlock
          code={`<Empty>
  <EmptyHeader>
    <EmptyTitle>No results</EmptyTitle>
  </EmptyHeader>
  <EmptyContent>
    <Button>Add new</Button>
  </EmptyContent>
</Empty>`}
        />
      </ExampleSection>
    </div>
  )
}
