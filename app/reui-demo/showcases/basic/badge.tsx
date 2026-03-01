"use client"

import { Badge } from "@/components/ui/badge"
import { PageHeader, ExampleSection, CodeBlock, PropTable } from "../shared"

export function BadgeView() {
  return (
    <div>
      <PageHeader title="Badge" description="Displays a badge or label." />
      <ExampleSection title="Variants">
        <div className="flex flex-wrap gap-3">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="outline">Outline</Badge>
        </div>
        <CodeBlock
          code={`<Badge>Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="destructive">Destructive</Badge>`}
        />
      </ExampleSection>
      <PropTable
        props={[
          { name: "variant", type: "string", default: '"default"', description: "Badge style variant" },
        ]}
      />
    </div>
  )
}
