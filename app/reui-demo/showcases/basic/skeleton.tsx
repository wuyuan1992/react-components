"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { PageHeader, ExampleSection, CodeBlock, PropTable } from "../shared"

export function SkeletonView() {
  return (
    <div>
      <PageHeader title="Skeleton" description="A placeholder for loading content." />
      <ExampleSection title="Basic">
        <div className="flex items-center space-x-4">
          <Skeleton className="size-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
        <CodeBlock
          code={`<Skeleton className="size-12 rounded-full" />
<Skeleton className="h-4 w-[250px]" />`}
        />
      </ExampleSection>
    </div>
  )
}
