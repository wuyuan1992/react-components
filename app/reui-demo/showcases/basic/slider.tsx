"use client"

import { useState } from "react"
import { Slider } from "@/components/ui/slider"
import { PageHeader, ExampleSection, CodeBlock, PropTable } from "../shared"

export function SliderView() {
  const [value, setValue] = useState([50])
  return (
    <div>
      <PageHeader title="Slider" description="An input to select a value from a range." />
      <ExampleSection title="Basic">
        <div className="w-full max-w-sm space-y-4">
          <Slider value={value} onValueChange={setValue} max={100} step={1} />
          <p className="text-sm text-muted-foreground">Value: {value[0]}</p>
        </div>
        <CodeBlock
          code={`<Slider value={value} onValueChange={setValue} max={100} step={1} />`}
        />
      </ExampleSection>
    </div>
  )
}
