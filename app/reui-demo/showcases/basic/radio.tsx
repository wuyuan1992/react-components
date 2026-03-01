"use client"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { PageHeader, ExampleSection, CodeBlock, PropTable } from "../shared"

export function RadioGroupView() {
  return (
    <div>
      <PageHeader title="Radio Group" description="A set of checkable buttons with no two pressed." />
      <ExampleSection title="Basic">
        <RadioGroup defaultValue="option-one">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-one" id="r1" />
            <Label htmlFor="r1">Option One</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-two" id="r2" />
            <Label htmlFor="r2">Option Two</Label>
          </div>
        </RadioGroup>
        <CodeBlock
          code={`<RadioGroup defaultValue="option-one">
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="option-one" id="r1" />
    <Label htmlFor="r1">Option One</Label>
  </div>
</RadioGroup>`}
        />
      </ExampleSection>
    </div>
  )
}
