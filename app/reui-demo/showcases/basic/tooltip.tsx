"use client"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import { PageHeader, ExampleSection, CodeBlock, PropTable } from "../shared"

export function TooltipView() {
  return (
    <div>
      <PageHeader title="Tooltip" description="A popup that displays info on hover." />
      <ExampleSection title="Basic">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline">Hover me</Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Add to library</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <CodeBlock
          code={`<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild><Button>Hover</Button></TooltipTrigger>
    <TooltipContent>Add to library</TooltipContent>
  </Tooltip>
</TooltipProvider>`}
        />
      </ExampleSection>
    </div>
  )
}
