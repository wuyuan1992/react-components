"use client"

import { useState } from "react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { PageHeader, ExampleSection, CodeBlock, PropTable } from "../shared"

export function CollapsibleView() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div>
      <PageHeader title="Collapsible" description="An interactive component to show/hide content." />
      <ExampleSection title="Basic">
        <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-[350px] space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold">Pedigree</span>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm">
                <ChevronRight className={cn("size-4 transition-transform", isOpen && "rotate-90")} />
              </Button>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent className="space-y-2">
            <p className="text-sm text-muted-foreground">Hidden content revealed here.</p>
          </CollapsibleContent>
        </Collapsible>
        <CodeBlock
          code={`<Collapsible open={isOpen} onOpenChange={setIsOpen}>
  <CollapsibleTrigger>Toggle</CollapsibleTrigger>
  <CollapsibleContent>Hidden content</CollapsibleContent>
</Collapsible>`}
        />
      </ExampleSection>
    </div>
  )
}
