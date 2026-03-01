"use client"

import { useState } from "react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { PageHeader, ExampleSection, CodeBlock, PropTable } from "../shared"

export function SwitchView() {
  const [enabled, setEnabled] = useState(false)
  return (
    <div>
      <PageHeader title="Switch" description="A control to toggle between checked and unchecked." />
      <ExampleSection title="Basic">
        <div className="flex items-center space-x-2">
          <Switch id="airplane-mode" checked={enabled} onCheckedChange={setEnabled} />
          <Label htmlFor="airplane-mode">Airplane Mode</Label>
        </div>
        <p className="text-sm text-muted-foreground mt-2">Status: {enabled ? "On" : "Off"}</p>
        <CodeBlock
          code={`<Switch id="airplane-mode" checked={enabled} onCheckedChange={setEnabled} />
<Label htmlFor="airplane-mode">Airplane Mode</Label>`}
        />
      </ExampleSection>
    </div>
  )
}
