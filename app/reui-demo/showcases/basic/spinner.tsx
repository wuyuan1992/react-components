"use client"

import { Spinner } from "@/components/ui/spinner"
import { PageHeader, ExampleSection, CodeBlock, PropTable } from "../shared"

export function SpinnerView() {
  return (
    <div>
      <PageHeader title="Spinner" description="A loading spinner indicator." />
      <ExampleSection title="Basic">
        <div className="flex items-center gap-4">
          <Spinner className="size-4" />
          <Spinner className="size-6" />
          <Spinner className="size-8" />
        </div>
        <CodeBlock code={`<Spinner className="size-4" />\n<Spinner className="size-8" />`} />
      </ExampleSection>
    </div>
  )
}
