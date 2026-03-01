"use client"

import { Separator } from "@/components/ui/separator"
import { PageHeader, ExampleSection, CodeBlock, PropTable } from "../shared"

export function SeparatorView() {
  return (
    <div>
      <PageHeader title="Separator" description="A visual divider between sections." />
      <ExampleSection title="Basic">
        <div className="space-y-4">
          <div>
            <p className="text-sm">Section 1</p>
          </div>
          <Separator />
          <div>
            <p className="text-sm">Section 2</p>
          </div>
          <Separator orientation="vertical" className="h-6 mx-2 inline-block" />
          <span className="text-sm">Inline text</span>
        </div>
        <CodeBlock code={`<Separator />\n<Separator orientation="vertical" />`} />
      </ExampleSection>
    </div>
  )
}
