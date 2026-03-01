"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { PageHeader, ExampleSection, CodeBlock, PropTable } from "../shared"

export function SelectView() {
  return (
    <div>
      <PageHeader title="Select" description="Displays a list of options for the user to pick from." />
      <ExampleSection title="Basic">
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="orange">Orange</SelectItem>
          </SelectContent>
        </Select>
        <CodeBlock
          code={`<Select>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="Select a fruit" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="apple">Apple</SelectItem>
    <SelectItem value="banana">Banana</SelectItem>
  </SelectContent>
</Select>`}
        />
      </ExampleSection>
      <PropTable
        props={[
          { name: "value", type: "string", description: "Controlled selected value" },
          { name: "defaultValue", type: "string", description: "Default selected value" },
          { name: "onValueChange", type: "function", description: "Callback when value changes" },
        ]}
      />
    </div>
  )
}
