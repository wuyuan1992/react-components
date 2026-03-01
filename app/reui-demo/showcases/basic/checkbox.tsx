"use client"

import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { PageHeader, ExampleSection, CodeBlock, PropTable } from "../shared"

export function CheckboxView() {
  const [checked, setChecked] = useState(true)
  return (
    <div>
      <PageHeader title="Checkbox" description="A control that allows the user to toggle options." />
      <ExampleSection title="Basic">
        <div className="flex items-center space-x-2">
          <Checkbox id="terms" checked={checked} onCheckedChange={(v) => setChecked(!!v)} />
          <Label htmlFor="terms">Accept terms and conditions</Label>
        </div>
        <CodeBlock
          code={`<Checkbox id="terms" checked={checked} onCheckedChange={setChecked} />
<Label htmlFor="terms">Accept terms and conditions</Label>`}
        />
      </ExampleSection>
      <PropTable
        props={[
          { name: "checked", type: "boolean", description: "Checked state" },
          { name: "onCheckedChange", type: "function", description: "Callback when checked changes" },
        ]}
      />
    </div>
  )
}
