"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PageHeader, ExampleSection, CodeBlock, PropTable } from "../shared"

export function InputView() {
  return (
    <div>
      <PageHeader title="Input" description="Displays a form input field." />
      <ExampleSection title="Basic">
        <div className="space-y-3 max-w-sm">
          <Input placeholder="Enter your email" />
          <Input type="password" placeholder="Password" />
          <Input disabled placeholder="Disabled input" />
        </div>
        <CodeBlock
          code={`<Input placeholder="Enter your email" />
<Input type="password" placeholder="Password" />
<Input disabled placeholder="Disabled input" />`}
        />
      </ExampleSection>
      <ExampleSection title="With Label">
        <div className="space-y-2 max-w-sm">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="you@example.com" />
        </div>
        <CodeBlock
          code={`<Label htmlFor="email">Email</Label>
<Input id="email" type="email" placeholder="you@example.com" />`}
        />
      </ExampleSection>
      <PropTable
        props={[
          { name: "type", type: "string", default: '"text"', description: "Input type" },
          { name: "placeholder", type: "string", description: "Placeholder text" },
          { name: "disabled", type: "boolean", default: "false", description: "Disable input" },
        ]}
      />
    </div>
  )
}
