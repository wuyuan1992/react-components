"use client"

import { useState } from "react"
import { Toggle } from "@/components/ui/toggle"
import { PageHeader, ExampleSection, CodeBlock, PropTable } from "../shared"

export function ToggleView() {
  const [pressed, setPressed] = useState(false)
  return (
    <div>
      <PageHeader title="Toggle" description="A two-state button that can be on or off." />
      <ExampleSection title="Basic">
        <div className="flex gap-2">
          <Toggle aria-label="Toggle bold" pressed={pressed} onPressedChange={setPressed}>
            <span className="font-bold">B</span>
          </Toggle>
          <Toggle variant="outline" aria-label="Toggle italic">
            <span className="italic">I</span>
          </Toggle>
        </div>
        <CodeBlock code={`<Toggle pressed={pressed} onPressedChange={setPressed}>B</Toggle>`} />
      </ExampleSection>
    </div>
  )
}
