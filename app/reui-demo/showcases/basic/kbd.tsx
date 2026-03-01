"use client"

import { Kbd, KbdGroup } from "@/components/ui/kbd"
import { PageHeader, ExampleSection, CodeBlock, PropTable } from "../shared"

export function KbdView() {
  return (
    <div>
      <PageHeader title="Keyboard" description="Keyboard key display component." />
      <ExampleSection title="Basic">
        <div className="flex items-center gap-4">
          <Kbd>⌘</Kbd>
          <Kbd>Ctrl</Kbd>
          <KbdGroup>
            <Kbd>⌘</Kbd>
            <Kbd>K</Kbd>
          </KbdGroup>
        </div>
        <CodeBlock code={`<Kbd>⌘</Kbd>\n<KbdGroup><Kbd>⌘</Kbd><Kbd>K</Kbd></KbdGroup>`} />
      </ExampleSection>
    </div>
  )
}
