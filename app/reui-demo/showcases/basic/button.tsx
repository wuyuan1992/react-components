"use client"

import { Button } from "@/components/ui/button"
import { Plus, Mail, Search, Trash } from "lucide-react"
import { Spinner } from "@/components/ui/spinner"
import { PageHeader, ExampleSection, CodeBlock, PropTable } from "../shared"

export function ButtonView() {
  return (
    <div>
      <PageHeader
        title="Button"
        description="Triggers an action or event, such as submitting a form or opening a dialog."
      />
      <ExampleSection title="Variants">
        <div className="flex flex-wrap gap-3">
          <Button>Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>
        <CodeBlock
          code={`<Button>Default</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>`}
        />
      </ExampleSection>
      <ExampleSection title="Sizes">
        <div className="flex flex-wrap items-center gap-3">
          <Button size="xs">Extra Small</Button>
          <Button size="sm">Small</Button>
          <Button>Default</Button>
          <Button size="lg">Large</Button>
          <Button size="icon"><Plus className="size-4" /></Button>
        </div>
        <CodeBlock
          code={`<Button size="xs">Extra Small</Button>
<Button size="sm">Small</Button>
<Button>Default</Button>
<Button size="lg">Large</Button>
<Button size="icon"><Plus className="size-4" /></Button>`}
        />
      </ExampleSection>
      <ExampleSection title="With Icons">
        <div className="flex flex-wrap gap-3">
          <Button><Mail className="mr-2 size-4" />Login with Email</Button>
          <Button variant="outline"><Search className="mr-2 size-4" />Search</Button>
          <Button variant="destructive"><Trash className="mr-2 size-4" />Delete</Button>
        </div>
        <CodeBlock
          code={`<Button><Mail className="mr-2 size-4" />Login with Email</Button>
<Button variant="outline"><Search className="mr-2 size-4" />Search</Button>`}
        />
      </ExampleSection>
      <ExampleSection title="States">
        <div className="flex flex-wrap gap-3">
          <Button disabled>Disabled</Button>
          <Button className="opacity-70 pointer-events-none">
            <Spinner className="size-4 mr-2" />
            Loading
          </Button>
        </div>
        <CodeBlock code={`<Button disabled>Disabled</Button>`} />
      </ExampleSection>
      <PropTable
        props={[
          { name: "variant", type: "string", default: '"default"', description: "Button style variant" },
          { name: "size", type: "string", default: '"default"', description: "Button size" },
          { name: "loading", type: "boolean", default: "false", description: "Show loading spinner" },
          { name: "asChild", type: "boolean", default: "false", description: "Render as child element" },
        ]}
      />
    </div>
  )
}
