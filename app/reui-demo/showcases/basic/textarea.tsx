"use client"

import { Textarea } from "@/components/ui/textarea"
import { PageHeader, ExampleSection, CodeBlock, PropTable } from "../shared"

export function TextareaView() {
  return (
    <div>
      <PageHeader title="Textarea" description="Displays a multi-line text input." />
      <ExampleSection title="Basic">
        <div className="max-w-sm">
          <Textarea placeholder="Type your message here." rows={4} />
        </div>
        <CodeBlock code={`<Textarea placeholder="Type your message here." rows={4} />`} />
      </ExampleSection>
      <PropTable
        props={[
          { name: "rows", type: "number", default: "3", description: "Number of visible text lines" },
          { name: "placeholder", type: "string", description: "Placeholder text" },
        ]}
      />
    </div>
  )
}
